import Grunnleggende from "./routes/grunnleggende";
import Komponenter from "./routes/komponenter";
/* import Komponent from "./routes/komponent"; */
import LLM from "./routes/llm";
import Maler from "./routes/maler";

type MarkdownRoute = () => Promise<string>;

type Routes = Record<`/${string}`, MarkdownRoute>;

const MARKDOWN_ROUTES: Routes = {
  "/komponenter": Komponenter.markdown,
  "/grunnleggende": Grunnleggende.markdown,
  "/monster-maler": Maler.markdown,
  "/llm": LLM.markdown,
};

const AVALIABLE_MARKDOWN_ROUTES = Object.keys(MARKDOWN_ROUTES);

/**
 * Allows for dynamic routes under the specified prefixes,
 * e.g. "/komponenter/core/button"
 */
const DYNAMIC_ROUTE_PREFIXES = [
  "/komponenter/",
  "/grunnleggende/",
  "/monster-maler/",
] as const;

function isValidRoute(route: string): boolean {
  if (AVALIABLE_MARKDOWN_ROUTES.includes(route)) {
    return true;
  }

  return DYNAMIC_ROUTE_PREFIXES.some((prefix) => route.startsWith(prefix));
}

async function markdownForRoute(route: string): Promise<string> {
  const staticHandler = MARKDOWN_ROUTES[route as keyof Routes];
  if (staticHandler) {
    return staticHandler();
  }

  /* Strip the leading slash to get the Sanity slug, e.g. "komponenter/core/button" */
  const slug = route.slice(1);

  if (route.startsWith("/komponenter/")) {
    return Komponenter.markdownForSlug(slug);
  }
  if (route.startsWith("/grunnleggende/")) {
    return Grunnleggende.markdownForSlug(slug);
  }
  if (route.startsWith("/monster-maler/")) {
    return Maler.markdownForSlug(slug);
  }

  return Promise.reject(new Error("Markdown route not found"));
}

export { AVALIABLE_MARKDOWN_ROUTES, isValidRoute, markdownForRoute };
