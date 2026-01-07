import { ENDRINGSLOGG_QUERY_RESULT } from "@/app/_sanity/query-types";

export const bumpHeadingLevels = (
  content: ENDRINGSLOGG_QUERY_RESULT[number]["content"],
) => {
  return content?.map((block) => {
    const clone = { ...block };
    if (clone._type === "block") {
      if (clone.style === "h2") {
        clone.style = "h3";
      } else if (clone.style === "h3") {
        clone.style = "h4";
      } else if (clone.style === "h4") {
        // @ts-expect-error - h5 cannot be selected in Sanity Studio
        clone.style = "h5";
      }
    }
    return clone;
  });
};
