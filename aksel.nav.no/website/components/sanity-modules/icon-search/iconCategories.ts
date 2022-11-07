export interface CategoryT {
  category: string;
  icons: IconMetaT[];
}

export interface IconMetaT {
  name: string;
  description: string;
  created_at: string;
  pageName: string;
  visible?: boolean;
}

export const categorizeIcons = (icons: IconMetaT[]): CategoryT[] => {
  const categories: CategoryT[] = [];

  for (const icon of icons) {
    const i = categories.findIndex(
      ({ category }) => icon.pageName === category
    );
    i !== -1
      ? categories[i].icons.push(icon)
      : categories.push({ category: icon.pageName, icons: [icon] });
  }
  return categories.sort((a, b) => a.category.localeCompare(b.category));
};
