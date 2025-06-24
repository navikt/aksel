import { BLOGG_LANDINGSSIDE_BLOGS_QUERYResult } from "@/app/_sanity/query-types";
import { Avatar, avatarUrl } from "../../_ui/Avatar";

type Blogg = NonNullable<BLOGG_LANDINGSSIDE_BLOGS_QUERYResult>["bloggposts"][0];

export const queryToAvatars = (
  queryResponseEditorialStaff: Blogg["editorial_staff_teams"],
): Avatar[] => {
  return (
    queryResponseEditorialStaff?.map((queryData) => ({
      name: queryData.title ?? "",
      imageSrc: avatarUrl(queryData.avatar_id?.current ?? "missing"),
      description: queryData.description ?? "",
    })) ?? []
  );
};
