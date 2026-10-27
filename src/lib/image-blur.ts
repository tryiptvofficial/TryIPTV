import placeholders from "./image-blur.generated.json";

const BLUR_PLACEHOLDERS: Record<string, string> = placeholders;

/**
 * Blur placeholder props for a string image path under /public/images.
 * Static imports get blurDataURL from Next.js; string srcs read it from the map built by
 * scripts/generate-image-blur.mjs (npm run images:blur). Unknown paths get no placeholder.
 *
 *   <Image src={src} {...blurProps(src)} ... />
 */
export function blurProps(src: string): { placeholder?: "blur"; blurDataURL?: string } {
  const blurDataURL = BLUR_PLACEHOLDERS[src];
  return blurDataURL ? { placeholder: "blur", blurDataURL } : {};
}
