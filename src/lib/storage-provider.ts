import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as os from "node:os";
import { getStore, setEnvironmentContext, connectLambda } from "@netlify/blobs";

const BLOB_STORE_NAME = "pdfly-storage";

// In-memory cache for fast reads across serverless invocations (bypassed for authoritative analytics)
const memoryCache = new Map<string, unknown>();

interface LambdaEventWithBlobs {
  httpMethod?: string;
  path?: string;
  body?: string | null;
  headers?: Record<string, string | undefined>;
  blobs?: string;
}

/**
 * Detect whether code is running inside Netlify's production or preview cloud runtime.
 */
export function isNetlifyProduction(): boolean {
  return Boolean(
    process.env.NETLIFY ||
    process.env.AWS_LAMBDA_FUNCTION_NAME ||
    process.env.NETLIFY_BLOBS_CONTEXT ||
    (typeof globalThis !== "undefined" &&
      (globalThis as Record<string, unknown>).netlifyBlobsContext) ||
    (process.env.SITE_ID && process.env.NETLIFY_BLOBS_TOKEN) ||
    (process.env.NETLIFY_SITE_ID && process.env.NETLIFY_BLOBS_TOKEN) ||
    (process.env.SITE_ID && process.env.NETLIFY_AUTH_TOKEN),
  );
}

/**
 * Initializes and normalizes Netlify environment context so strong consistency
 * calls do not throw BlobsConsistencyError when uncachedEdgeURL is missing.
 */
export function ensureNetlifyContext(event?: LambdaEventWithBlobs): void {
  try {
    if (event && event.blobs) {
      try {
        const rawData = Buffer.from(event.blobs, "base64").toString("utf-8");
        const data = JSON.parse(rawData) as Record<string, string | undefined>;
        const edgeURL = data.edgeURL || data.url;
        const uncachedEdgeURL = data.uncachedEdgeURL || data.uncached_url || edgeURL;
        const siteID =
          event.headers?.["x-nf-site-id"] ||
          event.headers?.["X-Nf-Site-Id"] ||
          data.siteID ||
          data.site_id ||
          process.env.NETLIFY_SITE_ID ||
          process.env.SITE_ID;
        const deployID =
          event.headers?.["x-nf-deploy-id"] ||
          event.headers?.["X-Nf-Deploy-Id"] ||
          data.deployID ||
          data.deploy_id;
        const token =
          data.token || process.env.NETLIFY_BLOBS_TOKEN || process.env.NETLIFY_AUTH_TOKEN;

        const environmentContext = {
          deployID,
          edgeURL,
          uncachedEdgeURL,
          siteID,
          token,
        };
        setEnvironmentContext(environmentContext);
        return;
      } catch {
        try {
          connectLambda(event as Parameters<typeof connectLambda>[0]);
        } catch {
          // ignore
        }
      }
    }

    const contextStr =
      (typeof globalThis !== "undefined" &&
        (globalThis as Record<string, unknown>).netlifyBlobsContext) ||
      process.env.NETLIFY_BLOBS_CONTEXT;
    if (contextStr && typeof contextStr === "string") {
      const raw = Buffer.from(contextStr, "base64").toString("utf-8");
      const parsed = JSON.parse(raw) as Record<string, string | undefined>;
      const edgeURL = parsed.edgeURL || parsed.url;
      const uncachedEdgeURL = parsed.uncachedEdgeURL || parsed.uncached_url || edgeURL;
      const siteID =
        parsed.siteID || parsed.site_id || process.env.NETLIFY_SITE_ID || process.env.SITE_ID;
      const deployID = parsed.deployID || parsed.deploy_id;
      const token =
        parsed.token || process.env.NETLIFY_BLOBS_TOKEN || process.env.NETLIFY_AUTH_TOKEN;

      setEnvironmentContext({
        deployID,
        edgeURL,
        uncachedEdgeURL,
        siteID,
        token,
      });
    }
  } catch {
    // Non-fatal
  }
}

/**
 * Obtains the Netlify Blobs store client without premature consistency restrictions
 * (consistency is applied per operation).
 */
export function getBlobStore(): ReturnType<typeof getStore> | null {
  try {
    ensureNetlifyContext();
    const siteID = process.env.NETLIFY_SITE_ID || process.env.SITE_ID;
    const token = process.env.NETLIFY_BLOBS_TOKEN || process.env.NETLIFY_AUTH_TOKEN;
    if (siteID && token) {
      return getStore({ name: BLOB_STORE_NAME, siteID, token });
    }
    return getStore({ name: BLOB_STORE_NAME });
  } catch {
    return null;
  }
}

/**
 * Reads directly from Netlify Blobs with strong consistency when supported,
 * falling back safely to standard consistency if the uncached edge URL is not configured.
 */
export async function readBlobSafe<T>(
  storeKey: string,
  forceStrong: boolean = true,
): Promise<T | null> {
  const store = getBlobStore();
  if (!store) return null;

  if (forceStrong) {
    try {
      const data = await store.get(storeKey, { type: "json", consistency: "strong" });
      if (data !== null && data !== undefined) {
        return data as T;
      }
    } catch {
      // If strong consistency throws BlobsConsistencyError due to environment context,
      // seamlessly retry with standard consistency
    }
  }

  try {
    const data = await store.get(storeKey, { type: "json" });
    if (data !== null && data !== undefined) {
      return data as T;
    }
  } catch (err) {
    console.warn(`[StorageProvider] Netlify Blobs read error for ${storeKey}:`, err);
  }

  return null;
}

/**
 * Writes directly to Netlify Blobs cloud persistence.
 */
export async function writeBlobSafe<T>(storeKey: string, data: T): Promise<boolean> {
  const store = getBlobStore();
  if (!store) return false;

  try {
    await store.setJSON(storeKey, data);
    return true;
  } catch (err) {
    console.warn(`[StorageProvider] Netlify Blobs write error for ${storeKey}:`, err);
    return false;
  }
}

export function getDataDir(): string {
  if (process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return path.join(os.tmpdir(), "pdfly-data");
  }
  return path.join(process.cwd(), "data");
}

/**
 * Reads JSON data for a specific store key.
 * Netlify Blobs (authoritative cloud) -> Memory cache -> Primary filesystem -> Bundled seed file -> Fallback default.
 */
export async function readStorageData<T>(
  storeKey: string,
  fileName: string,
  defaultValue: T,
  bypassMemoryCache: boolean = false,
): Promise<T> {
  // 1. Authoritative Netlify Blobs cloud storage read
  const blobData = await readBlobSafe<T>(storeKey, true);
  if (blobData !== null && blobData !== undefined) {
    memoryCache.set(storeKey, blobData);
    return blobData;
  }

  // 2. Check memory cache (unless bypassed)
  if (!bypassMemoryCache && memoryCache.has(storeKey)) {
    return memoryCache.get(storeKey) as T;
  }

  // 3. In Netlify production, if Blobs is configured, do not fall back to stale static files
  if (isNetlifyProduction() && getBlobStore() !== null) {
    return defaultValue;
  }

  // 4. Primary filesystem path
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

  // 5. Bundled seed file in process.cwd()/data/
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

  // 6. Fallback in /tmp/ cache
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
  await writeBlobSafe(storeKey, data);

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
