import unParsedMetadata, { type AkselIcon } from "@navikt/aksel-icons/metadata";
import type { McpResource } from "../types.js";

const ICONS_CATALOG_URI = "aksel-icons://category-catalog";
const MIME_TYPE = "application/json";

const categoriesMap = new Map<
  string,
  { category: string; subcategories: Set<string>; iconCount: number }
>();

const metadata = unParsedMetadata as unknown as Record<string, AkselIcon>;

for (const icon of Object.values(metadata)) {
  let entry = categoriesMap.get(icon.category);
  if (!entry) {
    entry = {
      category: icon.category,
      subcategories: new Set(),
      iconCount: 0,
    };
    categoriesMap.set(icon.category, entry);
  }

  entry.subcategories.add(icon.sub_category);
  entry.iconCount++;
}

const categories = Array.from(categoriesMap.values()).map((entry) => ({
  category: entry.category,
  subcategories: Array.from(entry.subcategories).sort(),
  iconCount: entry.iconCount,
}));

const iconsCatalogResource: McpResource = {
  name: "Aksel Icons Catalog",
  uri: ICONS_CATALOG_URI,
  description:
    "Catalog of Aksel icon categories and subcategories with counts. Use this to discover the taxonomy, then call aksel_find_icons to search within it.",
  mimeType: MIME_TYPE,
  async callback() {
    return {
      contents: [
        {
          uri: ICONS_CATALOG_URI,
          mimeType: MIME_TYPE,
          text: JSON.stringify({
            categories,
            totalIcons: Object.keys(metadata).length,
          }),
        },
      ],
    };
  },
};

export { iconsCatalogResource, metadata };
