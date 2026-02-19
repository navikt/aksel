import Komponenter from "./routes/komponenter";

type MarkdownRoute = () => Promise<string>;

type Routes = Record<`/${string}`, MarkdownRoute>;

const MARKDOWN_ROUTES: Routes = {
  "/komponenter": Komponenter.markdown,
};

const AVALIABLE_MARKDOWN_ROUTES = Object.keys(MARKDOWN_ROUTES);

function markdownForRoute(route: string): Promise<string> {
  const markdownFunc = MARKDOWN_ROUTES[route as keyof Routes];

  if (!markdownFunc) {
    return Promise.reject(new Error("Markdown route not found"));
  }

  return markdownFunc();
}

export { AVALIABLE_MARKDOWN_ROUTES, markdownForRoute };
