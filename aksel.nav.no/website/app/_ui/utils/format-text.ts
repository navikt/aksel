import { BLOGG_LANDINGSSIDE_BLOGS_QUERY_RESULT } from "@/app/_sanity/query-types";

/**
 * Capitalize the first letter of a string.
 */
function capitalizeText(inputString: string): string {
  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}

type RedaksjonTypeValue = NonNullable<
  NonNullable<BLOGG_LANDINGSSIDE_BLOGS_QUERY_RESULT>["bloggposts"][number]["writers"]
>[number]["type"];

export const humanizeRedaksjonType = (type: RedaksjonTypeValue) => {
  switch (type) {
    case "miljoe":
      return "Miljø";
    case "team":
      return "Team";
    default:
      if (process.env.NODE_ENV === "production") {
        console.warn(`unexpected RedaksjonTypeValue: ${type}`);
      }
      return type ?? "bad value";
  }
};

/**
 * Abbreviate a name while keeping the first and last names intact.
 */
function abbrName(name: string): string {
  return name
    .split(" ")
    .filter((val) => val.trim() !== "") // Remove any empty strings caused by extra spaces
    .map((val, index, arr) =>
      index !== 0 && index !== arr.length - 1 ? val.charAt(0) + "." : val,
    )
    .join(" ");
}

function removeEmojiesFromText(inputString: string) {
  return inputString
    .replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]|[\uFE00-\uFE0F])/g,
      "",
    )
    .replace(/\s+/g, " ")
    .trim();
}

export { abbrName, capitalizeText, removeEmojiesFromText };
