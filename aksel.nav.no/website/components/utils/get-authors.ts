import { AkselBloggDocT, ResolveContributorsT, ResolveSlugT } from "@/types";

export const getAuthors = (
  blog: ResolveContributorsT<ResolveSlugT<AkselBloggDocT>>,
) => (blog?.contributors as any)?.map((x) => x?.title) ?? [];
