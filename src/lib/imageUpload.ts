import { supabase } from "./supabase";

export interface UploadImageResult {
  url: string;
  path: string;
}

export const uploadMenuItemImage = async (file: File, itemId: string): Promise<UploadImageResult> => {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${itemId}-${Date.now()}.${fileExt}`;
    const filePath = `menu-items/${fileName}`;

    const { data, error } = await supabase.storage.from("menu-items").upload(filePath, file, {
      cacheControl: "31536000",
      upsert: false
    });

    if (error) throw error;

    const {
      data: { publicUrl }
    } = supabase.storage.from("menu-items").getPublicUrl(filePath);

    return {
      url: publicUrl,
      path: data.path
    };
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export const deleteMenuItemImage = async (imagePath: string): Promise<void> => {
  try {
    const path = imagePath.replace(/^.*menu-items\//, "menu-items/");

    const { error } = await supabase.storage.from("menu-items").remove([path]);

    if (error) throw error;
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};

export const getOptimizedImageUrl = (url: string, _width?: number): string => {
  if (!url) return "";
  // Supabase Image Transformations require a paid add-on.
  // Return the original public URL; client-side optimizations
  // (lazy loading, decoding="async", preloadImage) handle the rest.
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
