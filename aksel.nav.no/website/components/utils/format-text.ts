export function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const abbrName = (name: string): string => {
  return name
    .split(" ")
    .map((val, index, arr) =>
      index !== 0 && index !== arr.length - 1 ? val.charAt(0) + "." : val
    )
    .join(" ");
};
