export const getImage = (key: string, variant: "OG" | "display") => {
  const largeOptions = 4;

  const hash = Math.abs(
    key.split("").reduce(function (a, b) {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0)
  );

  return `/images/thumbnail-large/Large-${(hash % largeOptions) - 1 + 1}.svg`;
};
