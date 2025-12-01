import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./client.server";

export function urlFor(source: any) {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined;
  }
  return imageUrlBuilder(sanityClient).image(source);
}
