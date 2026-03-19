/**
 * Client-side image compression using the Canvas API.
 * Resizes and converts images to WebP (with JPEG fallback) before upload,
 * reducing file sizes by 60-90% with no backend cost.
 */

const supportsWebP = (() => {
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL("image/webp").startsWith("data:image/webp");
  } catch {
    return false;
  }
})();

const OUTPUT_TYPE = supportsWebP ? "image/webp" : "image/jpeg";
export const OUTPUT_EXT = supportsWebP ? "webp" : "jpg";

/** Maximum file size allowed for upload (512 KB) */
export const MAX_UPLOAD_SIZE = 512 * 1024;

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image for compression"));
    img.src = src;
  });
}

/**
 * Compress and resize an image using the Canvas API.
 * Returns a Blob ready for upload.
 */
export async function compressImage(
  file: File,
  maxWidth: number = 1200,
  quality: number = 0.8
): Promise<Blob> {
  const url = URL.createObjectURL(file);
  try {
    const img = await loadImage(url);

    let width = img.naturalWidth;
    let height = img.naturalHeight;

    // Only downscale, never upscale
    if (width > maxWidth) {
      height = Math.round((height * maxWidth) / width);
      width = maxWidth;
    }

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas 2D context not available");

    // Use high-quality downsampling
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, 0, 0, width, height);

    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        blob => (blob ? resolve(blob) : reject(new Error("Compression failed"))),
        OUTPUT_TYPE,
        quality
      );
    });
  } finally {
    URL.revokeObjectURL(url);
  }
}

/**
 * Generate a small thumbnail for menu card display.
 */
export async function generateThumbnail(
  file: File,
  maxWidth: number = 400,
  quality: number = 0.75
): Promise<Blob> {
  return compressImage(file, maxWidth, quality);
}

