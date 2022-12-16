export const getImage = (key: string, variant: "OG" | "thumbnail") => {
  const bloggOptions = 11;

  const hash = Math.abs(
    key.split("").reduce(function (a, b) {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0)
  );

  const ogSrc = "https://aksel.nav.no/images/og/blogg";
  const thumbnailSrc = "/images/thumbnail/blogg";

  return `${variant === "OG" ? ogSrc : thumbnailSrc}/image-${
    (hash % bloggOptions) + 1
  }.${variant === "OG" ? "png" : "svg"}`;
};
