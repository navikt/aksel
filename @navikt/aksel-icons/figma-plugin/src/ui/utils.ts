import meta from "@navikt/aksel-icons/metadata";

const subCategorizeIcons = (
  icons: typeof meta[1][]
): { sub_category: string; icons: typeof meta[1][] }[] => {
  const categories: { sub_category: string; icons: typeof meta[1][] }[] = [];

  for (const icon of icons) {
    const i = categories.findIndex(
      ({ sub_category }) => icon.sub_category === sub_category
    );
    i !== -1
      ? categories[i].icons.push(icon)
      : categories.push({ sub_category: icon.sub_category, icons: [icon] });
  }
  return categories.sort((a, b) =>
    a.sub_category.localeCompare(b.sub_category)
  );
};

export const categorizeIcons = (
  icons: typeof meta[1][]
): {
  category: string;
  sub_categories: { sub_category: string; icons: typeof meta[1][] }[];
}[] => {
  const categories: {
    category: string;
    icons: typeof meta[1][];
  }[] = [];

  for (const icon of icons) {
    const i = categories.findIndex(
      ({ category }) => icon.category === category
    );
    i !== -1
      ? categories[i].icons.push(icon)
      : categories.push({ category: icon.category, icons: [icon] });
  }
  return categories
    .sort((a, b) => a.category.localeCompare(b.category))
    .map((x) => ({ ...x, sub_categories: subCategorizeIcons(x.icons) }));
};

const noFill = (icon: typeof meta[1], icons: typeof meta[1][]) => {
  const foundFill = icons.find(
    (x) => x.name.endsWith("Fill") && x.name.replace("Fill", "") === icon.name
  );
  return !foundFill;
};

export const getFillIcon = (icons: typeof meta[1][]) => {
  return icons.filter(
    (x, _, z) => x.variant.toLowerCase() === "fill" || noFill(x, z)
  );
};
