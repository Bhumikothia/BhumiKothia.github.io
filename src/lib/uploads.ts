/**
 * Resolves image paths written by the /admin editor, e.g.
 *   "/src/assets/images/beyond/outreach-2025.jpg"
 * to optimisable Astro images. The build fails with a clear message if a
 * referenced file is missing, so a broken image never goes live.
 */
import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('/src/assets/images/**/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
});

export function resolveImage(path: string | undefined): ImageMetadata | undefined {
  if (!path) return undefined;
  const key = path.startsWith('/') ? path : `/${path}`;
  const found = files[key];
  if (!found) {
    throw new Error(
      `Image not found: "${path}". Upload it through the editor, or place it under src/assets/images/ and use a path like "/src/assets/images/beyond/photo.jpg".`,
    );
  }
  return found.default;
}
