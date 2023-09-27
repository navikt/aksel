import { AkselBloggDocT, ResolveContributorsT, ResolveSlugT } from "@/types";

export * from "./util";
export * from "./amplitude";
export * from "./hooks";
export * from "./contexts";
export * from "./date-string";

export const isNew = (date: string) => {
  const date1 = new Date(date);
  const now = new Date();
  const timeDiff = Math.abs(now.getTime() - date1.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return diffDays <= 90;
};

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

export const getAuthors = (
  blog: ResolveContributorsT<ResolveSlugT<AkselBloggDocT>>
) => (blog?.contributors as any)?.map((x) => x?.title) ?? [];
