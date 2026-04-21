// ./src/sanity/lib/url-for-image.ts
import { sanityClient } from 'sanity:client';
import imageUrlBuilder from "@sanity/image-url";
import type { SanityAsset } from '@sanity/image-url/lib/types/types';

export const imageBuilder = imageUrlBuilder(sanityClient);

export function urlForImage(source: SanityAsset) {
  // Use auto format for optimal format delivery (WebP/AVIF when supported)
  return imageBuilder.image(source).auto('format');
}