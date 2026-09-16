import { enhanceImageData } from "./image-enhancement";

export type StudentDetails = {
  branch: string;
  enrollmentNumber: string;
  subject: string;
  examPhase: string;
};

export type PdfQualityPreset = "high" | "standard" | "compact";

export interface QualityPresetConfig {
  id: PdfQualityPreset;
  label: string;
  badge?: string;
  description: string;
  targetSizeDesc: string;
  maxDimension: number;
  jpegQuality: number;
}

export const QUALITY_PRESETS: Record<PdfQualityPreset, QualityPresetConfig> = {
  standard: {
    id: "standard",
    label: "Standard",
    badge: "Recommended",
    description: "Great balance of crisp text and manageable file size",
    targetSizeDesc: "~400–700 KB/page",
    maxDimension: 1800,
    jpegQuality: 0.82,
  },
  high: {
    id: "high",
    label: "High Quality",
    description: "Maximum resolution & sharp details for complex diagrams",
    targetSizeDesc: "~1.2–2.5 MB/page",
    maxDimension: 2400,
    jpegQuality: 0.92,
  },
  compact: {
    id: "compact",
    label: "Small File",
    description: "Strong compression for email or tight portal upload limits",
    targetSizeDesc: "~150–350 KB/page",
    maxDimension: 1200,
    jpegQuality: 0.65,
  },
};

export type UploadedImage = {
  id: string;
  name: string;
  dataUrl: string;
  originalDataUrl: string;
  size?: number;
  isCropped?: boolean;
  currentQuad?: [
    { x: number; y: number },
    { x: number; y: number },
    { x: number; y: number },
    { x: number; y: number },
  ];
  confidence?: number;
  file?: File | Blob;
  thumbnailUrl?: string;
};

const sanitize = (value: string) =>
  value
    .trim()
    .replace(/[^a-zA-Z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "Unknown";

export const buildFileName = (d: StudentDetails) =>
  `${sanitize(d.branch)}_${sanitize(d.enrollmentNumber)}_${sanitize(d.subject)}_${sanitize(d.examPhase)}.pdf`;

/**
 * Standard A4 document dimensions in PostScript points (1 pt = 1/72 inch).
 * A4 size: 210mm x 297mm = 595.28 pt x 841.89 pt.
 */
export const A4_PORTRAIT_WIDTH = 595.28;
export const A4_PORTRAIT_HEIGHT = 841.89;

// Preload jsPDF module in advance to eliminate any dynamic import pause during generation
let jsPdfPromise: Promise<typeof import("jspdf")> | null = null;
export function preloadJsPdf() {
  if (!jsPdfPromise && typeof window !== "undefined") {
    jsPdfPromise = import("jspdf");
  }
  return jsPdfPromise;
}

// Helper to safely convert base64 data URLs to Blob without relying on fetch()
function dataUrlToBlob(dataUrl: string): Blob {
  try {
    const commaIdx = dataUrl.indexOf(",");
    const header = commaIdx >= 0 ? dataUrl.slice(0, commaIdx) : "";
    const base64 = commaIdx >= 0 ? dataUrl.slice(commaIdx + 1) : dataUrl;
    const mimeMatch = header.match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : "image/jpeg";
    const binary = atob(base64);
    const len = binary.length;
    const u8arr = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      u8arr[i] = binary.charCodeAt(i);
    }
    return new Blob([u8arr], { type: mime });
  } catch {
    return new Blob([], { type: "image/jpeg" });
  }
}

// Cache for prepared page byte buffers to avoid re-encoding on consecutive runs
const optimizedPageCache = new Map<
  string,
  { imageBytes: Uint8Array; width: number; height: number }
>();

export function clearOptimizedPageCache() {
  optimizedPageCache.clear();
}

/**
 * Efficiently decodes an image using createImageBitmap directly from Blob/File where possible.
 */
const decodeImage = async (
  image: UploadedImage,
  pageIndex: number,
): Promise<{
  naturalWidth: number;
  naturalHeight: number;
  draw: (
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
    w: number,
    h: number,
  ) => void;
  cleanup: () => void;
}> => {
  if (typeof createImageBitmap === "function") {
    try {
      let blob: Blob | null = null;
      if (image.blob) {
        blob = image.blob;
      } else if (image.file) {
        blob = image.file;
      } else if (image.dataUrl.startsWith("data:")) {
        blob = dataUrlToBlob(image.dataUrl);
        image.blob = blob;
      } else if (image.dataUrl.startsWith("blob:")) {
        const response = await fetch(image.dataUrl);
        blob = await response.blob();
        image.blob = blob;
      }

      if (blob && blob.size > 0) {
        const bitmap = await createImageBitmap(blob);
        return {
          naturalWidth: bitmap.width,
          naturalHeight: bitmap.height,
          draw: (ctx, w, h) => {
            ctx.drawImage(bitmap, 0, 0, w, h);
          },
          cleanup: () => {
            try {
              bitmap.close();
            } catch {
              // ignore
            }
          },
        };
      }
    } catch {
      // Fall through to standard Image element
    }
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      resolve({
        naturalWidth: img.naturalWidth || img.width,
        naturalHeight: img.naturalHeight || img.height,
        draw: (ctx, w, h) => {
          ctx.drawImage(img, 0, 0, w, h);
        },
        cleanup: () => {
          img.onload = null;
          img.onerror = null;
          img.src = "";
        },
      });
    };
    img.onerror = () =>
      reject(
        new Error(
          `Page ${pageIndex + 1} (${image.name || "Image"}) could not be read or decoded. Please verify the image file.`,
        ),
      );
    img.src = image.dataUrl;
  });
};

/**
 * Creates lightweight thumbnail separately from full-resolution image.
 */
export async function createThumbnail(source: Blob | string, maxDim = 240): Promise<string> {
  try {
    let blob: Blob;
    if (typeof source === "string") {
      if (source.startsWith("blob:")) {
        const res = await fetch(source);
        blob = await res.blob();
      } else {
        return source;
      }
    } else {
      blob = source;
    }

    if (typeof createImageBitmap === "function") {
      const bmp = await createImageBitmap(blob, {
        resizeWidth: maxDim,
        resizeQuality: "medium",
      });
      const canvas = document.createElement("canvas");
      canvas.width = bmp.width;
      canvas.height = bmp.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(bmp, 0, 0);
        bmp.close();
        const thumbBlob = await new Promise<Blob | null>((resolve) =>
          canvas.toBlob(resolve, "image/jpeg", 0.7),
        );
        canvas.width = 1;
        canvas.height = 1;
        if (thumbBlob) {
          return URL.createObjectURL(thumbBlob);
        }
      }
    }
  } catch {
    // Fall back to original
  }
  return typeof source === "string" ? source : URL.createObjectURL(source);
}

/**
 * Optimizes an uploaded assignment image based on user-selected quality:
 * - Scales resolution based on selected compression preset while strictly preserving aspect ratio
 * - Cleanses heavy camera metadata bloat
 * - Preserves handwriting and diagrams
 * - Zero white margins or padding
 * - Returns pure Uint8Array to eliminate Base64 memory overhead
 */
const optimizeImageForPdf = async (
  image: UploadedImage,
  index: number,
  enableSmartFilter = true,
  qualityPreset: PdfQualityPreset = "standard",
): Promise<{
  imageBytes: Uint8Array;
  width: number;
  height: number;
}> => {
  const cacheKey = `${image.id}_${image.dataUrl}_${qualityPreset}_${enableSmartFilter}`;
  if (optimizedPageCache.has(cacheKey)) {
    const cached = optimizedPageCache.get(cacheKey);
    if (cached && cached.imageBytes && cached.imageBytes.length > 0) {
      return {
        imageBytes: cached.imageBytes,
        width: cached.width,
        height: cached.height,
      };
    }
    optimizedPageCache.delete(cacheKey);
  }

  const decoded = await decodeImage(image, index);
  try {
    const rawWidth = decoded.naturalWidth;
    const rawHeight = decoded.naturalHeight;

    if (!rawWidth || !rawHeight || rawWidth <= 0 || rawHeight <= 0) {
      throw new Error(`Page ${index + 1} (${image.name || "Image"}) has invalid dimensions.`);
    }

    const preset = QUALITY_PRESETS[qualityPreset] || QUALITY_PRESETS.standard;
    const maxSide = Math.max(rawWidth, rawHeight);
    const scale = maxSide > preset.maxDimension ? preset.maxDimension / maxSide : 1;

    const targetWidth = Math.max(1, Math.round(rawWidth * scale));
    const targetHeight = Math.max(1, Math.round(rawHeight * scale));

    let imageBytes: Uint8Array | null = null;

    // Prefer OffscreenCanvas for non-blocking canvas rendering if supported
    if (typeof OffscreenCanvas !== "undefined") {
      try {
        const offCanvas = new OffscreenCanvas(targetWidth, targetHeight);
        const ctx = offCanvas.getContext("2d");
        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "medium";
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, targetWidth, targetHeight);
          decoded.draw(ctx, targetWidth, targetHeight);
          // Release raw decoded image memory immediately to free RAM
          decoded.cleanup();

          if (enableSmartFilter) {
            const imgData = ctx.getImageData(0, 0, targetWidth, targetHeight);
            enhanceImageData(imgData);
            ctx.putImageData(imgData, 0, 0);
          }

          const blob = await offCanvas.convertToBlob({
            type: "image/jpeg",
            quality: preset.jpegQuality,
          });

          if (blob && blob.size > 0) {
            const arrayBuffer = await blob.arrayBuffer();
            const u8 = new Uint8Array(arrayBuffer);
            if (u8.length > 0) {
              imageBytes = u8;
            }
          }
        }
      } catch {
        // Fall back to standard DOM canvas
      }
    }

    // Standard DOM canvas fallback if OffscreenCanvas did not complete
    if (!imageBytes) {
      const canvas = document.createElement("canvas");
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error(`Page ${index + 1}: Canvas graphics context is unavailable.`);
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "medium";
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, targetWidth, targetHeight);
      decoded.draw(ctx, targetWidth, targetHeight);
      // Release raw decoded image memory immediately
      decoded.cleanup();

      if (enableSmartFilter) {
        const imgData = ctx.getImageData(0, 0, targetWidth, targetHeight);
        enhanceImageData(imgData);
        ctx.putImageData(imgData, 0, 0);
      }

      let blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/jpeg", preset.jpegQuality),
      );

      if (!blob || blob.size === 0) {
        const dataUrl = canvas.toDataURL("image/jpeg", preset.jpegQuality);
        if (dataUrl && dataUrl.length > 30) {
          blob = dataUrlToBlob(dataUrl);
        }
      }

      canvas.width = 1;
      canvas.height = 1;

      if (!blob || blob.size === 0) {
        throw new Error(`Page ${index + 1}: Failed to encode image.`);
      }

      const arrayBuffer = await blob.arrayBuffer();
      imageBytes = new Uint8Array(arrayBuffer);
    }

    if (!imageBytes || imageBytes.length === 0) {
      throw new Error(`Page ${index + 1}: Encoded image buffer is empty.`);
    }

    const result = {
      imageBytes,
      width: targetWidth,
      height: targetHeight,
    };

    if (optimizedPageCache.size < 60) {
      optimizedPageCache.set(cacheKey, result);
    }

    return result;
  } finally {
    decoded.cleanup();
  }
};

export type PdfProgressStage = "preparing" | "processing" | "creating" | "finalizing" | "ready";

export interface PdfGenerationProgress {
  stage: PdfProgressStage;
  percent: number;
  current?: number;
  total?: number;
}

export type ProgressCallback = (progress: PdfGenerationProgress) => void;

/**
 * Generates an assignment PDF with maximum possible speed and controlled concurrency.
 * Preserves strict page order, quality modes, and memory stability on all devices.
 */
export async function generateAssignmentPdf(
  details: StudentDetails,
  images: UploadedImage[],
  enableSmartFilter = false,
  qualityPreset: PdfQualityPreset = "compact",
  onProgress?: ProgressCallback,
): Promise<{ blob: Blob; fileName: string }> {
  const validImages = images.filter((img) => Boolean(img?.dataUrl));
  if (validImages.length === 0) {
    throw new Error("No images provided to generate PDF. Please upload at least one page.");
  }

  const total = validImages.length;

  onProgress?.({
    stage: "preparing",
    percent: 10,
    current: 0,
    total,
  });

  // Start jsPDF import concurrently
  const jsPdfModulePromise = preloadJsPdf() || import("jspdf");

  // Controlled concurrency: 3 on mobile (safe and fast with instant memory release), 4-5 on desktop
  const isMobile =
    typeof navigator !== "undefined" &&
    (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      (navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : false));

  const concurrency = isMobile
    ? 3
    : typeof navigator !== "undefined" && navigator.hardwareConcurrency
      ? Math.min(5, Math.max(3, Math.floor(navigator.hardwareConcurrency * 0.75)))
      : 3;

  const { jsPDF } = await jsPdfModulePromise;

  let doc: InstanceType<typeof jsPDF> | null = null;
  let nextPageToAdd = 0;
  const completedPages = new Map<
    number,
    { imageBytes: Uint8Array; width: number; height: number }
  >();

  const drainCompletedPages = () => {
    while (completedPages.has(nextPageToAdd)) {
      const page = completedPages.get(nextPageToAdd)!;
      completedPages.delete(nextPageToAdd);

      if (!page || !page.imageBytes || page.imageBytes.length === 0) {
        throw new Error(`Page ${nextPageToAdd + 1}: Image data could not be rendered for PDF.`);
      }

      const orientation = page.width > page.height ? "landscape" : "portrait";
      if (nextPageToAdd === 0) {
        doc = new jsPDF({
          unit: "pt",
          format: [page.width, page.height],
          orientation,
          compress: false, // JPEGs are already compressed; prevents slow single-threaded JS Deflate passes
        });

        doc.setProperties({
          title: buildFileName(details).replace(/\.pdf$/i, ""),
          subject: details.subject || undefined,
          author: details.enrollmentNumber
            ? `${details.enrollmentNumber}${details.branch ? ` (${details.branch})` : ""}`
            : undefined,
          creator: "Krunal Nikam",
        });

        doc.addImage(page.imageBytes, "JPEG", 0, 0, page.width, page.height, undefined, "FAST");
      } else if (doc) {
        doc.addPage([page.width, page.height], orientation);
        doc.addImage(page.imageBytes, "JPEG", 0, 0, page.width, page.height, undefined, "FAST");
      }

      nextPageToAdd++;
      const percent = Math.min(95, Math.round(15 + (nextPageToAdd / total) * 75));
      onProgress?.({
        stage: "processing",
        percent,
        current: nextPageToAdd,
        total,
      });
    }
  };

  // Process images concurrently with strict order preserved in PDF assembly
  let workerIndex = 0;
  const poolSize = Math.min(concurrency, total);

  const workers = Array.from({ length: poolSize }, async () => {
    while (workerIndex < total) {
      const idx = workerIndex++;
      const item = validImages[idx]!;
      const optimized = await optimizeImageForPdf(item, idx, enableSmartFilter, qualityPreset);
      completedPages.set(idx, optimized);
      drainCompletedPages();
    }
  });

  await Promise.all(workers);
  drainCompletedPages();

  if (!doc) {
    throw new Error("PDF document could not be assembled.");
  }

  onProgress?.({
    stage: "finalizing",
    percent: 98,
    current: total,
    total,
  });

  const blob = doc.output("blob");

  onProgress?.({
    stage: "ready",
    percent: 100,
    current: total,
    total,
  });

  return { blob, fileName: buildFileName(details) };
}

export const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};
