import Fuse, { type IFuseOptions } from "fuse.js";
import type { AkselIcon } from "@navikt/aksel-icons/metadata";
import { metadata } from "../resources/icons-catalog.js";

const icons = Object.values(metadata);

const fuseKeys: NonNullable<IFuseOptions<AkselIcon>["keys"]> = [
  { name: "name", weight: 100 },
  { name: "keywords", weight: 60 },
  { name: "sub_category", weight: 20 },
];

const fuseOptions: IFuseOptions<AkselIcon> = {
  keys: fuseKeys,
  includeScore: false,
  shouldSort: true,
  minMatchCharLength: 3,
  ignoreLocation: false,
  threshold: 0.2,
  distance: 50,
  useTokenSearch: true,
  ignoreDiacritics: true,
};

const fuse = new Fuse(icons, fuseOptions);

/**
 * Fuzzy-matches icons against name/keywords/sub_category, ordered by relevance.
 * Returns the full ranked match list; callers apply their own filters/limit.
 */
function searchIcons(query: string): AkselIcon[] {
  return fuse.search(query.trim()).map(({ item }) => item);
}

export { searchIcons };
