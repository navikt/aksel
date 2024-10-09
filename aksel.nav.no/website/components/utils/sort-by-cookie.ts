const CookieName = "Aksel:GP:UnderTema:SortOrder";

type SortOrderName = `${string}:${string}`;
type SortOrderValue = "updated" | "name";

export type ArticleSortOrder = Record<SortOrderName, SortOrderValue>;

/**
 * Takes in the Tema and Undertema with the current cookie collection
 * and returns the updated cookie string
 * @returns Updated cookie string or null if parsing fails. Use with `document.cookie`
 */
export function getUpdatedSortOrderCookie(
  category: SortOrderName,
  currentSortOrder: ArticleSortOrder,
): string | null {
  try {
    const newSortOrder = { ...currentSortOrder };
    if (newSortOrder[category] === "name") {
      delete newSortOrder[category];
    } else if (
      !newSortOrder[category] ||
      newSortOrder[category] === "updated"
    ) {
      newSortOrder[category] = "name";
    }
    return `${CookieName}=${JSON.stringify(newSortOrder)}`;
  } catch (error) {
    console.error("Failed parsing new sort order cookie for GP", error);
    return null;
  }
}

/**
 * Extracts the current Article sorting from cookies
 */
export function getArticleSortOrder(
  cookies: Record<string, string | undefined>,
): ArticleSortOrder | null {
  const currentSortOrder = cookies[CookieName];
  try {
    if (currentSortOrder) {
      return JSON.parse(currentSortOrder);
    }
    return null;
  } catch (error) {
    console.error("Failed parsing sort order cookie for GP", error);
    return null;
  }
}

export function getCookies(cookieString: string): Record<string, string> {
  return cookieString.split(";").reduce(
    (cookies, cookie) => {
      const [name, value] = cookie.split("=").map((c) => c.trim());
      cookies[name] = value;
      return cookies;
    },
    {} as Record<string, string>,
  );
}
