import { MARKDOWN_ROUTES } from "@/app/api/markdown/route.config";
import Grunnleggende from "./routes/grunnleggende";
import Komponenter from "./routes/komponenter";
import Maler from "./routes/maler";

async function markdownForRoute(route: string): Promise<string> {
  const staticHandler = MARKDOWN_ROUTES[route];

  /* Found "static" version, ie a spesific route created for path */
  if (staticHandler) {
    return staticHandler();
  }

  /* Strip the leading slash to get the Sanity slug, e.g. "komponenter/core/button" */
  const slug = route.slice(1);

  /* Handles all "dynamic" paths like komponenter/core/button etc that has no "hardcoded" route */
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

export { markdownForRoute };
