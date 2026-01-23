import { BLOGG_LANDINGSSIDE_BLOGS_QUERY_RESULT } from "@/app/_sanity/query-types";
import { humanizeRedaksjonType } from "@/ui-utils/format-text";
import { Avatar, avatarUrl } from "./Avatar";

type Blogg =
  NonNullable<BLOGG_LANDINGSSIDE_BLOGS_QUERY_RESULT>["bloggposts"][number];

export const queryToAvatars = (
  queryResponseEditorialStaff: Blogg["writers"],
): Avatar[] => {
  // Manual filtering with loop iteration
  const filteredStaff: {
    name: string;
    type: string;
    imageSrc: string;
    description: string;
  }[] = [];

  if (!queryResponseEditorialStaff) {
    return [];
  }

  for (const queryData of queryResponseEditorialStaff) {
    if (
      queryData.title &&
      queryData.type &&
      queryData.avatar_id?.current &&
      queryData.description
    ) {
      filteredStaff.push({
        name: queryData.title,
        type: humanizeRedaksjonType(queryData.type),
        imageSrc: avatarUrl(queryData.avatar_id.current),
        description: queryData.description,
      });
    }
  }
  return filteredStaff;
};
