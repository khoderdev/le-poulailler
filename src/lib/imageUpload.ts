import { supabase } from "./supabase";
import { compressImage, generateThumbnail, OUTPUT_EXT } from "./imageCompression";

export interface UploadImageResult {
  url: string;
  path: string;
}

const THUMB_SUFFIX = "-thumb";

export const uploadMenuItemImage = async (file: File, itemId: string): Promise<UploadImageResult> => {
  try {
    const timestamp = Date.now();
    const baseName = `${itemId}-${timestamp}`;
    const fullPath = `menu-items/${baseName}.${OUTPUT_EXT}`;
    const thumbPath = `menu-items/${baseName}${THUMB_SUFFIX}.${OUTPUT_EXT}`;
    const contentType = OUTPUT_EXT === "webp" ? "image/webp" : "image/jpeg";

    // Compress original (max 1200px) and generate thumbnail (400px) in parallel
    const [compressedBlob, thumbnailBlob] = await Promise.all([
      compressImage(file, 1200, 0.82),
      generateThumbnail(file, 400, 0.75)
    ]);

    // Upload both to Supabase Storage in parallel
    const [fullResult, thumbResult] = await Promise.all([
      supabase.storage.from("menu-items").upload(fullPath, compressedBlob, {
        cacheControl: "31536000",
        upsert: false,
        contentType
      }),
      supabase.storage.from("menu-items").upload(thumbPath, thumbnailBlob, {
        cacheControl: "31536000",
        upsert: false,
        contentType
      })
    ]);

    if (fullResult.error) throw fullResult.error;
    if (thumbResult.error) {
      // Thumbnail upload failed — not critical, log and continue
      console.warn("Thumbnail upload failed:", thumbResult.error);
    }

    const {
      data: { publicUrl }
    } = supabase.storage.from("menu-items").getPublicUrl(fullPath);

    return {
      url: publicUrl,
      path: fullResult.data.path
    };
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export const deleteMenuItemImage = async (imagePath: string): Promise<void> => {
  try {
    const path = imagePath.replace(/^.*menu-items\//, "menu-items/");

    // Also build the thumbnail path to delete alongside
    const thumbPath = path.replace(/(\.[^.]+)$/, `${THUMB_SUFFIX}$1`);

    // Delete both full image and thumbnail in parallel (thumbnail may not exist for old images)
    const [fullResult] = await Promise.all([
      supabase.storage.from("menu-items").remove([path]),
      supabase.storage.from("menu-items").remove([thumbPath]).catch(() => {})
    ]);

    if (fullResult.error) throw fullResult.error;
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};

export const getOptimizedImageUrl = (url: string, width?: number): string => {
  if (!url) return "";

  // For small sizes (thumbnails), use the pre-generated -thumb version
  if (width && width <= 400 && url.includes("supabase")) {
    const thumbUrl = url.replace(/(\.[^.]+)$/, `${THUMB_SUFFIX}$1`);
    // Only return thumb URL if it differs (avoids infinite loop on already-thumb URLs)
    if (thumbUrl !== url) return thumbUrl;
  }

  return url;
};

// In-memory cache for preloaded images
const preloadedImages = new Set<string>();

export const preloadImage = (url: string): void => {
  if (!url || preloadedImages.has(url)) return;
  const img = new Image();
  img.src = url;
  preloadedImages.add(url);
};
