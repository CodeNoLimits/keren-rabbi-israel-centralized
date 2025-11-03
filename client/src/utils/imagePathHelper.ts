/**
 * Utility functions for handling image paths consistently across the application
 */

/**
 * Converts @assets/ prefix to the correct /attached_assets/ path for use in src attributes
 * @param imagePath - Image path from product data (may contain @assets/ prefix)
 * @returns Converted path suitable for use in img src attributes
 */
export const convertImagePath = (imagePath: string): string => {
  if (!imagePath) return '';
  
  // Replace @assets/ prefix with /attached_assets/
  return imagePath.replace('@assets/', '/attached_assets/');
};

/**
 * Gets the first available image from a product's images array
 * @param images - Array of image paths from product data (can be null or undefined)
 * @returns Converted path for the first image, or empty string if none available
 */
export const getFirstProductImage = (images?: string[] | null): string => {
  if (!images || images.length === 0) return '';
  return convertImagePath(images[0]);
};

/**
 * For use with import.meta.glob - converts @assets/ path to the format expected by the glob imports
 * @param imagePath - Image path from product data
 * @returns Path formatted for use with dynamically imported assets
 */
export const convertImagePathForGlob = (imagePath: string): string => {
  if (!imagePath) return '';
  
  // Remove @assets/ prefix and clean the path
  let cleanPath = imagePath.replace('@assets/', '').replace('/images/', '');
  
  // Return the path format expected by glob imports
  return `/attached_assets/${cleanPath}`;
};