import { BLOGG_LANDINGSSIDE_BLOGS_QUERYResult } from "@/app/_sanity/query-types";
import { Avatar, avatarUrl } from "../../../../dev/_ui/avatar/Avatar";

type Blogg = NonNullable<BLOGG_LANDINGSSIDE_BLOGS_QUERYResult>["bloggposts"][0];

export const queryToAvatars = (
  queryResponseEditorialStaff: Blogg["writers"],
): Avatar[] => {
  return (
    queryResponseEditorialStaff?.map((queryData) => ({
      name: queryData.title ?? "",
      imageSrc: avatarUrl(queryData.avatar_id?.current ?? "missing"),
      description: queryData.description ?? "",
    })) ?? []
  );
};
