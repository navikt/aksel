/**
 * The image is selected based on a hash derived from the key, ensuring a consistent fallback image for each unique key.
 *
 * @param key Unique key for the image, typically the title or slug of the blog post.
 * @param variant The variant of the image to return, either "OG" for Open Graph images or "thumbnail" for smaller thumbnail images.
 * @returns A URL to a fallback image based on the key and variant provided.
 */
function fallbackImageUrl(key: string, variant: "OG" | "thumbnail") {
  const bloggOptions = 9;

  const hash = Math.abs(
    key.split("").reduce(function (a, b) {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0),
  );

  const ogSrc = "https://aksel.nav.no/images/og/blogg";
  const thumbnailSrc = "/images/thumbnail/blogg";

  return `${variant === "OG" ? ogSrc : thumbnailSrc}/image-${
    (hash % bloggOptions) + 1
  }.${variant === "OG" ? "png" : "svg"}`;
}

export { fallbackImageUrl };
