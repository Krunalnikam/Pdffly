import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as os from "node:os";
import { getStore } from "@netlify/blobs";

const BLOB_STORE_NAME = "pdfly-storage";

// In-memory memory cache for fast reads across serverless invocations
const memoryCache = new Map<string, unknown>();

let cachedBlobStore: ReturnType<typeof getStore> | null = null;
let blobsDisabled = false;

function getBlobStore(): ReturnType<typeof getStore> | null {
  if (blobsDisabled) return null;
  if (!cachedBlobStore) {
    try {
      const siteID = process.env.NETLIFY_SITE_ID || process.env.SITE_ID;
      const token = process.env.NETLIFY_BLOBS_TOKEN || process.env.NETLIFY_AUTH_TOKEN;
      if (siteID && token) {
        cachedBlobStore = getStore({ name: BLOB_STORE_NAME, siteID, token });
      } else {
        cachedBlobStore = getStore({ name: BLOB_STORE_NAME });
      }
    } catch {
      cachedBlobStore = null;
      blobsDisabled = true;
    }
  }
  return cachedBlobStore;
}

export function getDataDir(): string {
  if (process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return path.join(os.tmpdir(), "pdfly-data");
  }
  return path.join(process.cwd(), "data");
}

/**
 * Reads JSON data for a specific store key.
 * Checks Netlify Blobs -> Local primary file -> Bundled seed file -> Fallback default.
 */
export async function readStorageData<T>(
  storeKey: string,
  fileName: string,
  defaultValue: T,
): Promise<T> {
  // 1. Check Netlify Blobs persistent cloud storage
  const store = getBlobStore();
  if (store) {
    try {
      const blobData = await store.get(storeKey, { type: "json" });
      if (blobData !== null && blobData !== undefined) {
        memoryCache.set(storeKey, blobData);
        return blobData as T;
      }
    } catch {
      // Blobs unavailable in current container
    }
  }

  // 2. Check memory cache
  if (memoryCache.has(storeKey)) {
    return memoryCache.get(storeKey) as T;
  }

  // 3. Check primary filesystem path
  const primaryFile = path.join(getDataDir(), fileName);
  try {
    const content = await fs.readFile(primaryFile, "utf-8");
    const parsed = JSON.parse(content) as T;
    if (parsed !== null && parsed !== undefined) {
      memoryCache.set(storeKey, parsed);
      return parsed;
    }
  } catch {
    // Continue to seed fallback
  }

  // 4. Check bundled seed file in process.cwd()/data/
  const seedFile = path.join(process.cwd(), "data", fileName);
  try {
    const content = await fs.readFile(seedFile, "utf-8");
    const parsed = JSON.parse(content) as T;
    if (parsed !== null && parsed !== undefined) {
      memoryCache.set(storeKey, parsed);
      return parsed;
    }
  } catch {
    // None found
  }

  // 5. Fallback in /tmp/ cache
  try {
    const tmpFile = path.join(os.tmpdir(), "pdfly-data", fileName);
    const content = await fs.readFile(tmpFile, "utf-8");
    const parsed = JSON.parse(content) as T;
    if (parsed !== null && parsed !== undefined) {
      memoryCache.set(storeKey, parsed);
      return parsed;
    }
  } catch {
    // Ignore
  }

  return defaultValue;
}

/**
 * Writes JSON data for a specific store key across all persistent layers:
 * 1. Netlify Blobs (persists across all Lambda instances & deploys)
 * 2. Memory cache (instant local access)
 * 3. Primary filesystem path
 * 4. Fallback /tmp directory
 * 5. process.cwd()/data directory if writable
 */
export async function writeStorageData<T>(
  storeKey: string,
  fileName: string,
  data: T,
): Promise<void> {
  // Update in-memory cache immediately
  memoryCache.set(storeKey, data);

  // 1. Netlify Blobs cloud persistence
  const store = getBlobStore();
  if (store) {
    try {
      await store.setJSON(storeKey, data);
    } catch (blobErr) {
      console.warn(`[StorageProvider] Netlify Blobs write warning for ${storeKey}:`, blobErr);
    }
  }

  const serialized = JSON.stringify(data, null, 2);

  // 2. Primary directory
  const primaryDir = getDataDir();
  const primaryFile = path.join(primaryDir, fileName);
  try {
    await fs.mkdir(primaryDir, { recursive: true });
    await fs.writeFile(primaryFile, serialized, "utf-8");
  } catch {
    // Non-fatal, proceed to tmp
  }

  // 3. Temporary directory
  try {
    const tmpDir = path.join(os.tmpdir(), "pdfly-data");
    await fs.mkdir(tmpDir, { recursive: true });
    await fs.writeFile(path.join(tmpDir, fileName), serialized, "utf-8");
  } catch {
    // Non-fatal
  }

  // 4. Project data directory (Preview environment persistence)
  try {
    const cwdDataDir = path.join(process.cwd(), "data");
    await fs.mkdir(cwdDataDir, { recursive: true });
    await fs.writeFile(path.join(cwdDataDir, fileName), serialized, "utf-8");
  } catch {
    // Non-fatal in read-only container
  }
}
