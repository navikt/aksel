import { graphql, useStaticQuery } from "gatsby";

const usePages = () =>
  useStaticQuery(graphql`
    query AllSitePage {
      allSitePage(sort: { fields: context___frontmatter___rank }) {
        edges {
          node {
            context {
              frontmatter {
                title
                rank
                ingress
              }
            }
            path
            componentPath
          }
        }
      }
    }
  `).allSitePage.edges.map((edge) => ({
    ...(edge.node?.context?.frontmatter || {}),
    slug: edge.node.path.replace(/^\/|\/$/g, ""),
    link: edge.node.path.replace(/\/$/, ""),
    componentPath: edge.node?.componentPath || "",
  }));

export const useBetaMenu = () =>
  usePages()
    .filter(
      ({ slug }) => slug.split("/").length > 1 && slug.split("/")[0] === "beta"
    )
    .sort((a, b) => a.slug.split("/").length - b.slug.split("/").length)
    .reduce((menu, page) => {
      if (page.slug.split("/").length === 2) {
        return [...menu, page];
      } else {
        const parent = menu.find(({ slug }) => page.slug.startsWith(slug));
        parent.children
          ? parent.children.push(page)
          : (parent.children = [page]);

        return menu;
      }
    }, []);

export const useBreadcrumb = (location) => {
  const pages = usePages();

  return location.pathname
    .replace(/^\//, "")
    .replace(/\/$/, "")
    .split("/")
    .slice(0, 2)
    .map((_, i, a) => a.slice(0, i + 1).join("/"))
    .map((slug) => pages.find((page) => page.slug === slug));
};

export const useMainMenu = () =>
  usePages().filter(
    ({ rank, slug }) =>
      ![null, undefined].includes(rank) && slug.split("/").length === 1
  );

export const usePageMenu = (location) =>
  usePages()
    .filter(
      ({ slug }) =>
        slug.split("/").length === 2 &&
        slug.split("/")[0] === location.pathname.split("/")[1]
    )
    .sort((a, b) => {
      if (!/^[a-zA-Z\s]+$/.test(a.title)) return 1;
      if (!/^[a-zA-Z\s]+$/.test(b.title)) return -1;
      return a.title.localeCompare(b.title);
    });

export const useNavigationPage = (location) =>
  usePages().find(
    ({ slug, link }) =>
      slug !== "" &&
      slug.split("/").length === 1 &&
      location.pathname.startsWith(link)
  );

export const useContentPage = (location) => {
  const pages = usePages();

  const page = pages.find(({ slug, link }) => {
    return slug.split("/").length === 2 && location.pathname.startsWith(link);
  });

  return page
    ? {
        ...page,
        children: pages.filter(
          ({ slug }) =>
            slug.split("/").length === 3 &&
            `${slug}/`.startsWith(
              `${location.pathname.split("/").slice(1, 3).join("/")}/`
            )
        ),
      }
    : undefined;
};

export const useComponentPath = (location) => {
  const pages = usePages();

  const page = pages.find(({ link }) => {
    return link === location.pathname;
  });
  return page;
};
