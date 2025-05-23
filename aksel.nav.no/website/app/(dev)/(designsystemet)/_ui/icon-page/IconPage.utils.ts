import Fuse from "fuse.js";
import meta, { AkselIcon } from "@navikt/aksel-icons/metadata";

const strokeIcons = Object.values(meta).filter(
  (x) => x.variant.toLowerCase() === "stroke",
);

/* Some icons are mistakenly labeled with "filled", so we need to handle both "fill" and "filled" */
const fillIcons = Object.values(meta).filter(
  (iconMetadata, _, iconArray) =>
    iconMetadata.variant.toLowerCase().startsWith("fill") ||
    noFill(iconMetadata, iconArray),
);

/**
 * For icons with no fill variant, we want to show the stroke variant
 * instead of the fill variant.
 */
function noFill(icon: AkselIcon, icons: AkselIcon[]) {
  const foundFill = icons.find((x) => {
    if (x.name.endsWith("Fill") || x.name.endsWith("Filled")) {
      return (
        x.name.replace("Fill", "") === icon.name ||
        x.name.replace("Filled", "") === icon.name
      );
    }
    return false;
  });

  return !foundFill;
}

/* ------------------------------ Categorizing ------------------------------ */
function categorizeIcons(icons: AkselIcon[]): {
  category: string;
  icons: AkselIcon[];
}[] {
  const categoryMap = new Map<string, AkselIcon[]>();

  for (const icon of icons) {
    const category = categoryMap.get(icon.category);
    if (!category) {
      categoryMap.set(icon.category, [icon]);
    } else {
      category.push(icon);
    }
  }

  return Array.from(categoryMap.entries())
    .map(([category, _icons]) => ({ category, icons: _icons }))
    .sort((a, b) => a.category.localeCompare(b.category));
}

/* --------------------------- Fuse search config --------------------------- */
function fuseSearch(icons: AkselIcon[]) {
  return new Fuse(icons, {
    threshold: 0.2,
    keys: [
      { name: "name", weight: 3 },
      { name: "category", weight: 2 },
      { name: "sub_category", weight: 2 },
      { name: "keywords", weight: 3 },
      { name: "variant", weight: 1 },
    ],
    shouldSort: false,
  });
}

const strokeIconSearch = fuseSearch(strokeIcons);
const fillIconSearch = fuseSearch(fillIcons);

function searchIcons({
  toggle,
  query,
}: {
  query: string;
  toggle: "stroke" | "fill";
}) {
  const icons = toggle === "stroke" ? strokeIcons : fillIcons;
  const fuse = toggle === "stroke" ? strokeIconSearch : fillIconSearch;

  if (!query || query.length < 2) {
    return icons;
  }

  return fuse.search(query).map((result) => result.item);
}

export { strokeIcons, fillIcons, searchIcons, categorizeIcons };
