import { MARKDOWN_PAGE_PATHS } from "@/app/api/llm/helpers/docs-structure";
import Codemods from "./routes/codemods";
import DesignTokens from "./routes/design-tokens";
import Grunnleggende from "./routes/grunnleggende";
import Ikoner from "./routes/ikoner";
import Komponenter from "./routes/komponenter";
import LLM from "./routes/llm";
import Maler from "./routes/maler";
import TailwindConfig from "./routes/tailwind-config";

const ROUTES = {
  "/komponenter": Komponenter.markdown,
  "/grunnleggende": Grunnleggende.markdown,
  "/monster-maler": Maler.markdown,
  "/llm": LLM.markdown,
  [MARKDOWN_PAGE_PATHS.TOKENS]: DesignTokens.markdown,
  [MARKDOWN_PAGE_PATHS.TAILWIND_CONFIG]: TailwindConfig.markdown,
  [MARKDOWN_PAGE_PATHS.CODEMODS]: Codemods.markdown,
  [MARKDOWN_PAGE_PATHS.ICONS]: Ikoner.markdown,
} as const satisfies Record<`/${string}`, () => Promise<string>>;

const DYNAMIC_ROUTES = {
  "/komponenter/": Komponenter.markdownForSlug,
  "/grunnleggende/": Grunnleggende.markdownForSlug,
  "/monster-maler/": Maler.markdownForSlug,
} as const satisfies Record<`/${string}/`, (slug: string) => Promise<string>>;

type StaticRoute = keyof typeof ROUTES;
type DynamicRoutePrefix = keyof typeof DYNAMIC_ROUTES;

class MarkdownRouteHandler {
  readonly #ROUTES = ROUTES;
  readonly #DYNAMIC_ROUTES = DYNAMIC_ROUTES;

  private isStaticRoute(route: string): route is StaticRoute {
    return route in this.#ROUTES;
  }

  isDynamicRoute(route: string): boolean {
    return Object.keys(this.#DYNAMIC_ROUTES).some((prefix) =>
      route.startsWith(prefix),
    );
  }

  isValidMarkdownRoute(route: string): boolean {
    if (this.isStaticRoute(route)) {
      return true;
    }

    return this.isDynamicRoute(route);
  }

  private async markdownForStaticRoute(route: StaticRoute): Promise<string> {
    return this.#ROUTES[route]();
  }

  private async markdownForDynamicRoute(route: string): Promise<string> {
    const prefix = (
      Object.keys(this.#DYNAMIC_ROUTES) as DynamicRoutePrefix[]
    ).find((p) => route.startsWith(p));

    if (!prefix) {
      throw new Error(`No dynamic route handler found for route: ${route}`);
    }

    /* Strip the leading slash to get the Sanity slug, e.g. "komponenter/core/button" */
    return this.#DYNAMIC_ROUTES[prefix](route.slice(1));
  }

  markdownForRoute(route: string): Promise<string> {
    /* Found "static" version, i.e. a specific route created for path */
    if (this.isStaticRoute(route)) {
      return this.markdownForStaticRoute(route);
    }

    /* Handles all "dynamic" paths like komponenter/core/button etc that has no "hardcoded" route */
    if (this.isDynamicRoute(route)) {
      return this.markdownForDynamicRoute(route);
    }

    return Promise.reject(new Error("Markdown route not found"));
  }
}

const MarkdownRoutes = new MarkdownRouteHandler();

export { MarkdownRoutes };
