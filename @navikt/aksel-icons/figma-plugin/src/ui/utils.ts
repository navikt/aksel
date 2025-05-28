import { AkselIcon } from "@navikt/aksel-icons/metadata";

const subCategorizeIcons = (
  icons: AkselIcon[],
): { sub_category: string; icons: AkselIcon[] }[] => {
  const categories: { sub_category: string; icons: AkselIcon[] }[] = [];

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
  icons: AkselIcon[],
): {
  category: string;
  sub_categories: { sub_category: string; icons: AkselIcon[] }[];
}[] => {
  const categories: {
    category: string;
    icons: AkselIcon[];
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

const noFill = (icon: AkselIcon, icons: AkselIcon[]) => {
  const foundFill = icons.find(
    (x) => x.name.endsWith("Fill") && x.name.replace("Fill", "") === icon.name,
  );
  return !foundFill;
};

export const getFillIcon = (icons: AkselIcon[]) => {
  return icons.filter(
    (x, _, z) => x.variant.toLowerCase() === "fill" || noFill(x, z),
  );
};
