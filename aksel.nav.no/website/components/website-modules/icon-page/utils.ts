import meta from "@navikt/aksel-icons/metadata";

type IconType = (typeof meta)[keyof typeof meta];

const subCategorizeIcons = (
  icons: IconType[],
): { sub_category: string; icons: IconType[] }[] => {
  const categories: { sub_category: string; icons: IconType[] }[] = [];

  for (const icon of icons) {
    const i = categories.findIndex(
      ({ sub_category }) => icon.sub_category === sub_category,
    );
    i !== -1
      ? categories[i].icons.push(icon)
      : categories.push({ sub_category: icon.sub_category, icons: [icon] });
  }
  return categories.sort((a, b) =>
    a.sub_category.localeCompare(b.sub_category),
  );
};

export const categorizeIcons = (
  icons: IconType[],
): {
  category: string;
  sub_categories: { sub_category: string; icons: IconType[] }[];
}[] => {
  const categories: {
    category: string;
    icons: IconType[];
  }[] = [];

  for (const icon of icons) {
    const i = categories.findIndex(
      ({ category }) => icon.category === category,
    );
    i !== -1
      ? categories[i].icons.push(icon)
      : categories.push({ category: icon.category, icons: [icon] });
  }
  return categories
    .sort((a, b) => a.category.localeCompare(b.category))
    .map((x) => ({ ...x, sub_categories: subCategorizeIcons(x.icons) }));
};

const noFill = (icon: IconType, icons: IconType[]) => {
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
};

/* Some icons are mistakenly labeled with "filled", so we need to handle both "fill" and "filled" */
export const getFillIcon = (icons: IconType[]) => {
  return icons.filter(
    (x, _, z) => x.variant.toLowerCase().startsWith("fill") || noFill(x, z),
  );
};
