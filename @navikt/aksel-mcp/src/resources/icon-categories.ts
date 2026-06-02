import unParsedMetadata, { AkselIcon } from "@navikt/aksel-icons/metadata";
import type { McpResource } from "../types.js";

const URI = "aksel-icons://categories";
const MIME_TYPE = "application/json";

const categoriesMap = new Map<
  string,
  { category: string; subcategories: Set<string>; iconCount: number }
>();

/* TODO: Unsure why it can't resolve the types correctly here */
const metadata = unParsedMetadata as unknown as Record<string, AkselIcon>;

for (const icon of Object.values(metadata)) {
  if (!categoriesMap.has(icon.category)) {
    categoriesMap.set(icon.category, {
      category: icon.category,
      subcategories: new Set(),
      iconCount: 0,
    });
  }
  const entry = categoriesMap.get(icon.category)!;
  entry.subcategories.add(icon.sub_category);
  entry.iconCount++;
}

const categories = Array.from(categoriesMap.values()).map((entry) => ({
  category: entry.category,
  subcategories: Array.from(entry.subcategories).sort(),
  iconCount: entry.iconCount,
}));

const iconCategoriesResource: McpResource = {
  name: "Aksel Icon Categories",
  uri: URI,
  description:
    "List of all icon categories and subcategories in the Aksel icon library. Use this to discover available categories, then use aksel_icons_search tool to find specific icons within a category.",
  mimeType: MIME_TYPE,
  async callback() {
    return {
      contents: [
        {
          uri: URI,
          mimeType: MIME_TYPE,
          text: JSON.stringify(
            { categories, totalIcons: Object.keys(metadata).length },
            null,
            2,
          ),
        },
      ],
    };
  },
};

export { iconCategoriesResource, metadata };
