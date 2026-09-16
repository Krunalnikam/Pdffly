/**
 * Client-side physical page detector & 4-point perspective scanner.
 * Optimized for ultra-fast, non-blocking asynchronous execution.
 *
 * CORE PRINCIPLE:
 * Preserves the ENTIRE physical sheet of paper.
 * - Detects the outer physical boundaries of the sheet against the desk/background.
 * - Never crops to text, handwriting, drawings, tables, or content blocks.
 * - Blank margins, headers, footers, and unwritten areas are part of the physical page and are strictly preserved.
 * - If the paper fills the frame or if outer boundary detection is uncertain, defaults to FULL_QUAD (0% crop).
 */

import { processDocumentPixels, type Quad, type DetectionResult } from "./detector-worker";

export type Corner = { x: number; y: number };
export type { Quad, DetectionResult };
export type Detection = DetectionResult;

export const CONFIDENCE_THRESHOLD = 0.48;
export const AUTO_CROP_PAD_FACTOR = 0.012;

/** The entire uncropped image frame (0-1 in all dimensions). */
export const FULL_QUAD = (): Quad => [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
  { x: 0, y: 1 },
];

export const SAFE_INSET_QUAD = (margin = 0): Quad => [
  { x: margin, y: margin },
  { x: 1 - margin, y: margin },
  { x: 1 - margin, y: 1 - margin },
  { x: margin, y: 1 - margin },
];

// Image cache to avoid re-decoding identical base64 strings repeatedly
const imageCache = new Map<string, HTMLImageElement>();

export const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    if (imageCache.has(src)) {
      const cached = imageCache.get(src)!;
      if (cached.complete && cached.naturalWidth > 0) {
        resolve(cached);
        return;
      }
    }
    const img = new Image();
    img.onload = () => {
      // Keep cache small (max 8 images)
      if (imageCache.size > 8) {
        const firstKey = imageCache.keys().next().value;
        if (firstKey) {
          const old = imageCache.get(firstKey);
          if (old) old.src = "";
          imageCache.delete(firstKey);
        }
      }
      imageCache.set(src, img);
      resolve(img);
    };
    img.onerror = () => reject(new Error("Could not read image"));
    img.src = src;
  });

export const clearImageCache = () => {
  imageCache.forEach((img) => {
    img.src = "";
  });
  imageCache.clear();
  detectionCache.clear();
  autoCropCache.clear();
};

const makeCanvas = (w: number, h: number) => {
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, w);
  canvas.height = Math.max(1, h);
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas not available");
  return { canvas, ctx };
};

/* ---------------------------------------------------------------- geometry */

export const dist = (a: Corner, b: Corner) => Math.hypot(a.x - b.x, a.y - b.y);

export const polyArea = (q: Corner[]) => {
  let a = 0;
  for (let i = 0; i < q.length; i++) {
    const p = q[i]!;
    const n = q[(i + 1) % q.length]!;
    a += p.x * n.y - n.x * p.y;
  }
  return Math.abs(a) / 2;
};

/** Validates that 4 points form a strictly convex, non-self-intersecting quadrilateral. */
export const isConvexQuad = (pts: Corner[]): boolean => {
  if (!pts || pts.length !== 4) return false;
  let sign = 0;
  for (let i = 0; i < 4; i++) {
    const p0 = pts[i]!;
    const p1 = pts[(i + 1) % 4]!;
    const p2 = pts[(i + 2) % 4]!;
    const cross = (p1.x - p0.x) * (p2.y - p0.y) - (p1.y - p0.y) * (p2.x - p0.x);
    if (Math.abs(cross) < 1e-7) return false; // Collinear points
    const s = Math.sign(cross);
    if (sign === 0) sign = s;
    else if (s !== sign) return false; // Non-convex / self-intersecting
  }
  const area = polyArea(pts);
  return area > 0.005; // At least 0.5% of total frame
};

/** Orders 4 points as TL, TR, BR, BL in screen coordinates. */
export const orderQuad = (pts: Corner[]): Quad => {
  if (!pts || pts.length !== 4) return FULL_QUAD();
  const cx = pts.reduce((s, p) => s + p.x, 0) / pts.length;
  const cy = pts.reduce((s, p) => s + p.y, 0) / pts.length;
  const sorted = [...pts].sort(
    (a, b) => Math.atan2(a.y - cy, a.x - cx) - Math.atan2(b.y - cy, b.x - cx),
  );
  let best = 0;
  let bestScore = Infinity;
  sorted.forEach((p, i) => {
    const s = p.x + p.y;
    if (s < bestScore) {
      bestScore = s;
      best = i;
    }
  });
  const rot = [...sorted.slice(best), ...sorted.slice(0, best)];
  return [rot[0]!, rot[1]!, rot[2]!, rot[3]!];
};

/**
 * Expands a quad slightly outwards from its center so that all outer paper edges,
 * blank margins, and corner borders are completely preserved.
 */
export const padQuad = (quad: Quad, factor = 0.008): Quad => {
  const cx = quad.reduce((s, p) => s + p.x, 0) / 4;
  const cy = quad.reduce((s, p) => s + p.y, 0) / 4;
  return quad.map((c) => ({
    x: Math.min(1, Math.max(0, c.x + (c.x - cx) * factor)),
    y: Math.min(1, Math.max(0, c.y + (c.y - cy) * factor)),
  })) as Quad;
};

/** Rotates normalized quad coordinates according to image rotations. */
export const rotateQuad = (quad: Quad, degrees: 90 | 180 | 270 | -90): Quad => {
  if (degrees === 90 || degrees === -270) {
    // 90 deg Clockwise: (x, y) -> (1 - y, x)
    const mapped = quad.map((c) => ({
      x: Math.max(0, Math.min(1, 1 - c.y)),
      y: Math.max(0, Math.min(1, c.x)),
    }));
    return [mapped[3]!, mapped[0]!, mapped[1]!, mapped[2]!];
  } else if (degrees === 180 || degrees === -180) {
    // 180 deg: (x, y) -> (1 - x, 1 - y)
    const mapped = quad.map((c) => ({
      x: Math.max(0, Math.min(1, 1 - c.x)),
      y: Math.max(0, Math.min(1, 1 - c.y)),
    }));
    return [mapped[2]!, mapped[3]!, mapped[0]!, mapped[1]!];
  } else {
    // 270 deg Clockwise / 90 deg Counter-Clockwise: (x, y) -> (y, 1 - x)
    const mapped = quad.map((c) => ({
      x: Math.max(0, Math.min(1, c.y)),
      y: Math.max(0, Math.min(1, 1 - c.x)),
    }));
    return [mapped[1]!, mapped[2]!, mapped[3]!, mapped[0]!];
  }
};

/* ------------------------------------------------ Worker Management */

let detectorWorker: Worker | null = null;
let workerTaskId = 0;
const detectCallbacks = new Map<number, (res: DetectionResult) => void>();
const warpCallbacks = new Map<
  number,
  (res: { outBuffer?: ArrayBuffer; w?: number; h?: number; success: boolean }) => void
>();

const detectionCache = new Map<string, Detection>();
const autoCropCache = new Map<
  string,
  { dataUrl: string; isCropped: boolean; quad?: Quad; confidence?: number; blob?: Blob }
>();

function getWorker(): Worker | null {
  if (typeof window === "undefined" || typeof Worker === "undefined") {
    return null;
  }
  if (!detectorWorker) {
    try {
      detectorWorker = new Worker(new URL("./detector-worker.ts", import.meta.url), {
        type: "module",
      });
      detectorWorker.onmessage = (
        e: MessageEvent<
          | { type?: "detect"; id: number; result: DetectionResult; success: boolean }
          | {
              type: "warp";
              id: number;
              outBuffer?: ArrayBuffer;
              w?: number;
              h?: number;
              success: boolean;
            }
        >,
      ) => {
        const data = e.data;
        if (data.type === "warp") {
          const cb = warpCallbacks.get(data.id);
          if (cb) {
            warpCallbacks.delete(data.id);
            cb(data);
          }
        } else {
          const cb = detectCallbacks.get(data.id);
          if (cb) {
            detectCallbacks.delete(data.id);
            cb(data.result);
          }
        }
      };
      detectorWorker.onerror = () => {
        detectorWorker = null;
      };
    } catch {
      detectorWorker = null;
    }
  }
  return detectorWorker;
}

const DETECT_DIM = 400; // Optimal macro dimension for paper detection: 2.5x faster, identical normalized accuracy

/* ------------------------------------------------ Primary Detection */

export async function detectDocument(dataUrl: string): Promise<Detection> {
  if (detectionCache.has(dataUrl)) {
    return detectionCache.get(dataUrl)!;
  }

  const img = await loadImage(dataUrl);

  const scale = Math.min(DETECT_DIM / Math.max(img.naturalWidth, img.naturalHeight), 1);
  const w = Math.max(1, Math.round(img.naturalWidth * scale));
  const h = Math.max(1, Math.round(img.naturalHeight * scale));

  const { canvas, ctx } = makeCanvas(w, h);
  ctx.drawImage(img, 0, 0, w, h);
  const imageData = ctx.getImageData(0, 0, w, h);
  canvas.width = 1;
  canvas.height = 1;

  const worker = getWorker();

  if (worker) {
    const result = await new Promise<Detection>((resolve) => {
      const taskId = ++workerTaskId;
      detectCallbacks.set(taskId, (res) => resolve(res));

      // Transfer the pixel buffer (zero copy to background thread)
      const buffer = imageData.data.buffer;
      worker.postMessage({ type: "detect", id: taskId, buffer, width: w, height: h }, [buffer]);
    });
    detectionCache.set(dataUrl, result);
    return result;
  }

  // Graceful fallback to inline execution
  const fallback = processDocumentPixels(imageData.data, w, h);
  detectionCache.set(dataUrl, fallback);
  return fallback;
}

/* ------------------------------------------------ Transformations */

const solve8 = (a: number[][], b: number[]) => {
  const n = 8;
  const m = a.map((row, i) => [...row, b[i]!]);
  for (let col = 0; col < n; col++) {
    let pivot = col;
    for (let r = col + 1; r < n; r++) {
      if (Math.abs(m[r]![col]!) > Math.abs(m[pivot]![col]!)) pivot = r;
    }
    if (Math.abs(m[pivot]![col]!) < 1e-12) return null;
    [m[col], m[pivot]] = [m[pivot]!, m[col]!];
    for (let r = 0; r < n; r++) {
      if (r === col) continue;
      const f = m[r]![col]! / m[col]![col]!;
      for (let c = col; c <= n; c++) m[r]![c]! -= f * m[col]![c]!;
    }
  }
  return m.map((row, i) => row[n]! / m[i]![i]!);
};

/**
 * Applies a high-precision 4-point perspective warp.
 * Straightens the angled sheet into a clean rectangular document while preserving all handwritten details.
 * Automatically scales very large images before warping to prevent memory spikes and maximize speed.
 */
export async function warpQuad(dataUrl: string, quad: Quad, maxDim = 2400) {
  const img = await loadImage(dataUrl);
  const iw = img.naturalWidth || img.width;
  const ih = img.naturalHeight || img.height;

  if (!iw || !ih || iw <= 0 || ih <= 0) {
    return { dataUrl, width: 1, height: 1 };
  }

  // Check if quad is valid and convex before attempting projective transformation
  if (!isConvexQuad(quad)) {
    console.warn("Invalid non-convex quadrilateral detected, using unwarped frame.");
    return { dataUrl, width: iw, height: ih };
  }

  // Check if quad is essentially full frame (0 to 1)
  const isFull =
    quad[0].x <= 0.008 &&
    quad[0].y <= 0.008 &&
    quad[1].x >= 0.992 &&
    quad[1].y <= 0.008 &&
    quad[2].x >= 0.992 &&
    quad[2].y >= 0.992 &&
    quad[3].x <= 0.008 &&
    quad[3].y >= 0.992;

  if (isFull) {
    return { dataUrl, width: iw, height: ih };
  }

  // Bound source image resolution to avoid reading 100+ MB pixel buffers for 48MP+ mobile photos
  const maxSourceDim = 2400;
  const srcScale = Math.min(maxSourceDim / Math.max(iw, ih), 1);
  const srcW = Math.max(10, Math.round(iw * srcScale));
  const srcH = Math.max(10, Math.round(ih * srcScale));

  const px = quad.map((c) => ({
    x: Math.max(0, Math.min(srcW, c.x * srcW)),
    y: Math.max(0, Math.min(srcH, c.y * srcH)),
  })) as Quad;

  const outW = Math.max(10, Math.round(Math.max(dist(px[0]!, px[1]!), dist(px[3]!, px[2]!))));
  const outH = Math.max(10, Math.round(Math.max(dist(px[0]!, px[3]!), dist(px[1]!, px[2]!))));
  const scale = Math.min(maxDim / Math.max(outW, outH), 1);
  const w = Math.max(10, Math.round(outW * scale));
  const h = Math.max(10, Math.round(outH * scale));

  const { canvas: scanvas, ctx: sctx } = makeCanvas(srcW, srcH);
  sctx.drawImage(img, 0, 0, srcW, srcH);
  const srcImageData = sctx.getImageData(0, 0, srcW, srcH);

  // Release source canvas memory
  scanvas.width = 1;
  scanvas.height = 1;

  const dst: Corner[] = [
    { x: 0, y: 0 },
    { x: w, y: 0 },
    { x: w, y: h },
    { x: 0, y: h },
  ];
  const A: number[][] = [];
  const B: number[] = [];
  for (let i = 0; i < 4; i++) {
    const u = dst[i]!.x;
    const v = dst[i]!.y;
    const x = px[i]!.x;
    const y = px[i]!.y;
    A.push([u, v, 1, 0, 0, 0, -u * x, -v * x]);
    B.push(x);
    A.push([0, 0, 0, u, v, 1, -u * y, -v * y]);
    B.push(y);
  }
  const sol = solve8(A, B);

  if (!sol) {
    const { canvas: out, ctx: octx } = makeCanvas(w, h);
    octx.drawImage(img, 0, 0, w, h);
    let fallbackUrl = "";
    let fallbackBlob: Blob | undefined;
    if (typeof out.toBlob === "function") {
      const blob = await new Promise<Blob | null>((resolve) =>
        out.toBlob(resolve, "image/jpeg", 0.92),
      );
      if (blob) {
        fallbackBlob = blob;
        fallbackUrl = URL.createObjectURL(blob);
      }
    }
    if (!fallbackUrl) fallbackUrl = out.toDataURL("image/jpeg", 0.92);
    out.width = 1;
    out.height = 1;
    return { dataUrl: fallbackUrl, width: w, height: h, blob: fallbackBlob };
  }

  // Attempt Web Worker execution for zero main-thread blocking
  const worker = getWorker();
  if (worker) {
    try {
      const warpResult = await new Promise<{
        outBuffer?: ArrayBuffer;
        w?: number;
        h?: number;
        success: boolean;
      }>((resolve) => {
        const taskId = ++workerTaskId;
        warpCallbacks.set(taskId, resolve);
        const buffer = srcImageData.data.buffer;
        worker.postMessage(
          {
            type: "warp",
            id: taskId,
            srcBuffer: buffer,
            iw: srcW,
            ih: srcH,
            w,
            h,
            sol,
          },
          [buffer],
        );
      });

      if (warpResult.success && warpResult.outBuffer) {
        const { canvas: out, ctx: octx } = makeCanvas(w, h);
        const outImgData = new ImageData(new Uint8ClampedArray(warpResult.outBuffer), w, h);
        octx.putImageData(outImgData, 0, 0);

        let resultUrl = "";
        let resultBlob: Blob | undefined;
        if (typeof out.toBlob === "function") {
          const blob = await new Promise<Blob | null>((resolve) =>
            out.toBlob(resolve, "image/jpeg", 0.92),
          );
          if (blob) {
            resultBlob = blob;
            resultUrl = URL.createObjectURL(blob);
          }
        }
        if (!resultUrl) {
          resultUrl = out.toDataURL("image/jpeg", 0.92);
        }
        out.width = 1;
        out.height = 1;
        return { dataUrl: resultUrl, width: w, height: h, blob: resultBlob };
      }
    } catch {
      // Fall through to fast local computation
    }
  }

  // Fast inline computation fallback
  const [h11, h12, h13, h21, h22, h23, h31, h32] = sol as number[];
  const { canvas: out, ctx: octx } = makeCanvas(w, h);
  const outImage = octx.createImageData(w, h);
  const od = outImage.data;
  const maxSrcX = srcW - 1;
  const maxSrcY = srcH - 1;
  const srcData = srcImageData.data;

  for (let y = 0; y < h; y++) {
    const rowOffset = y * w * 4;
    const yDenTerm = h32! * y + 1;
    const yNumXTerm = h12! * y + h13!;
    const yNumYTerm = h22! * y + h23!;

    for (let x = 0; x < w; x++) {
      const den = h31! * x + yDenTerm;
      const o = rowOffset + x * 4;

      if (Math.abs(den) < 1e-6) {
        od[o] = od[o + 1] = od[o + 2] = od[o + 3] = 255;
        continue;
      }

      const rawSx = (h11! * x + yNumXTerm) / den;
      const rawSy = (h21! * x + yNumYTerm) / den;

      if (isNaN(rawSx) || isNaN(rawSy) || !isFinite(rawSx) || !isFinite(rawSy)) {
        od[o] = od[o + 1] = od[o + 2] = od[o + 3] = 255;
        continue;
      }

      const sx = Math.max(0, Math.min(maxSrcX, rawSx));
      const sy = Math.max(0, Math.min(maxSrcY, rawSy));

      const x0 = Math.floor(sx);
      const y0 = Math.floor(sy);
      const x1 = Math.min(maxSrcX, x0 + 1);
      const y1 = Math.min(maxSrcY, y0 + 1);

      const fx = sx - x0;
      const fy = sy - y0;

      const w00 = (1 - fx) * (1 - fy);
      const w10 = fx * (1 - fy);
      const w01 = (1 - fx) * fy;
      const w11 = fx * fy;

      const i00 = (y0 * srcW + x0) * 4;
      const i10 = (y0 * srcW + x1) * 4;
      const i01 = (y1 * srcW + x0) * 4;
      const i11 = (y1 * srcW + x1) * 4;

      od[o] = Math.round(
        srcData[i00]! * w00 + srcData[i10]! * w10 + srcData[i01]! * w01 + srcData[i11]! * w11,
      );
      od[o + 1] = Math.round(
        srcData[i00 + 1]! * w00 +
          srcData[i10 + 1]! * w10 +
          srcData[i01 + 1]! * w01 +
          srcData[i11 + 1]! * w11,
      );
      od[o + 2] = Math.round(
        srcData[i00 + 2]! * w00 +
          srcData[i10 + 2]! * w10 +
          srcData[i01 + 2]! * w01 +
          srcData[i11 + 2]! * w11,
      );
      od[o + 3] = 255;
    }
  }
  octx.putImageData(outImage, 0, 0);

  let resultUrl = "";
  let resultBlob: Blob | undefined;
  if (typeof out.toBlob === "function") {
    const blob = await new Promise<Blob | null>((resolve) =>
      out.toBlob(resolve, "image/jpeg", 0.92),
    );
    if (blob) {
      resultBlob = blob;
      resultUrl = URL.createObjectURL(blob);
    }
  }
  if (!resultUrl) {
    resultUrl = out.toDataURL("image/jpeg", 0.92);
  }
  out.width = 1;
  out.height = 1;

  return { dataUrl: resultUrl, width: w, height: h, blob: resultBlob };
}

/** Rotates an image by 90, 180, 270, or -90 degrees. */
export async function rotateImage(dataUrl: string, degrees: 90 | 180 | 270 | -90) {
  if (degrees === 0) return dataUrl;
  const img = await loadImage(dataUrl);
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  const isPerpendicular = Math.abs(degrees) === 90 || Math.abs(degrees) === 270;
  const cw = isPerpendicular ? ih : iw;
  const ch = isPerpendicular ? iw : ih;
  const { canvas, ctx } = makeCanvas(cw, ch);
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((degrees * Math.PI) / 180);
  ctx.drawImage(img, -iw / 2, -ih / 2);

  let rotated = "";
  if (typeof canvas.toBlob === "function") {
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.95),
    );
    if (blob) {
      rotated = URL.createObjectURL(blob);
    }
  }
  if (!rotated) {
    rotated = canvas.toDataURL("image/jpeg", 0.95);
  }
  canvas.width = 1;
  canvas.height = 1;
  return rotated;
}

export const imageSize = async (dataUrl: string) => {
  const img = await loadImage(dataUrl);
  return { width: img.naturalWidth, height: img.naturalHeight };
};

/**
 * Automatically crops and straightens a document image by detecting outer paper sheet boundaries.
 * Preserves the full physical sheet of paper, margins, and content.
 */
export async function autoCropImage(dataUrl: string): Promise<{
  dataUrl: string;
  isCropped: boolean;
  quad?: Quad;
  confidence?: number;
  blob?: Blob;
}> {
  if (autoCropCache.has(dataUrl)) {
    return autoCropCache.get(dataUrl)!;
  }

  const detection = await detectDocument(dataUrl);

  if (detection.isConfident && detection.confidence >= CONFIDENCE_THRESHOLD) {
    const paddedQuad = padQuad(detection.quad, AUTO_CROP_PAD_FACTOR);
    const warped = await warpQuad(dataUrl, paddedQuad, 2000);
    const result = {
      dataUrl: warped.dataUrl,
      isCropped: true,
      quad: paddedQuad,
      confidence: detection.confidence,
      blob: warped.blob,
    };
    autoCropCache.set(dataUrl, result);
    return result;
  }

  // If confidence is below threshold, preserve the complete original image without aggressive/risky cropping
  const result = {
    dataUrl,
    isCropped: false,
    quad: FULL_QUAD(),
    confidence: detection.confidence,
  };
  autoCropCache.set(dataUrl, result);
  return result;
}
