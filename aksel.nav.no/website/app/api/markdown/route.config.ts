import DesignTokens from "./routes/design-tokens";
import Grunnleggende from "./routes/grunnleggende";
import Ikoner from "./routes/ikoner";
import Komponenter from "./routes/komponenter";
import LLM from "./routes/llm";
import Maler from "./routes/maler";

type MarkdownRoute = () => Promise<string>;

type Routes = Record<`/${string}`, MarkdownRoute>;

const MARKDOWN_ROUTES: Routes = {
  "/komponenter": Komponenter.markdown,
  "/grunnleggende": Grunnleggende.markdown,
  "/grunnleggende/styling/design-tokens": DesignTokens.markdown,
  "/komponenter/ikoner": Ikoner.markdown,
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

export {
  AVALIABLE_MARKDOWN_ROUTES,
  MARKDOWN_ROUTES,
  DYNAMIC_ROUTE_PREFIXES,
  isValidRoute,
};
