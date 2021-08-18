import { graphql, useStaticQuery } from "gatsby";

const usePages = () => {
  const res = useStaticQuery(graphql`
    query AllSitePage {
      allSitePage(sort: { fields: context___frontmatter___rank }) {
        edges {
          node {
            context {
              frontmatter {
                title
                rank
                ingress
                heading
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
    isVerktoykasse:
      edge.node?.componentPath?.includes("/verktoykasseArticle.jsx") || false,
  }));
  return res;
};

export const useBreadcrumb = (location) => {
  const pages = usePages();
  let crumb = location.pathname.replace(/^\//, "").replace(/\/$/, "");
  crumb = crumb
    .split("/")
    .map((_, i, a) => a.slice(0, i + 1).join("/"))
    .map((slug) => pages.find((page) => page.slug === slug));

  return crumb;
};

export const useMainMenu = (location) =>
  usePages()
    .filter(({ slug }) => {
      return (
        location.pathname.startsWith(`/${slug.split("/")[0]}`) && slug !== ""
      );
    })
    .sort((a, b) => {
      if (!!a.rank && !!b.rank) {
        return `${a.rank}`.localeCompare(`${b.rank}`, undefined, {
          numeric: true,
        });
      } else {
        if (a.slug.split("/").length < b.slug.split("/").length) return -1;
        if (a.slug.split("/").length > b.slug.split("/").length) return 1;
        if (!/^[a-zA-Z\s]+$/.test(a.title)) return 1;
        if (!/^[a-zA-Z\s]+$/.test(b.title)) return -1;
        return a.title.localeCompare(b.title);
      }
    });

export const usePageMenu = (location) => {
  const pages = usePages();

  if (!location.pathname.startsWith("/designsystem")) {
    return pages
      .filter(({ slug }) => {
        return (
          location.pathname.startsWith(`/${slug.split("/")[0]}`) && slug !== ""
        );
      })
      .sort((a, b) => {
        if (!!a.rank && !!b.rank) {
          return `${a.rank}`.localeCompare(`${b.rank}`, undefined, {
            numeric: true,
          });
        } else {
          if (a.slug.split("/").length < b.slug.split("/").length) return -1;
          if (a.slug.split("/").length > b.slug.split("/").length) return 1;
          if (!/^[a-zA-Z\s]+$/.test(a.title)) return 1;
          if (!/^[a-zA-Z\s]+$/.test(b.title)) return -1;
          return a.title.localeCompare(b.title);
        }
      });
  } else {
    return pages
      .filter(
        ({ slug }) =>
          slug.split("/").length === 3 &&
          slug.split("/")[1] === location.pathname.split("/")[2]
      )
      .sort((a, b) => {
        if (!/^[a-zA-Z\s]+$/.test(a.title)) return 1;
        if (!/^[a-zA-Z\s]+$/.test(b.title)) return -1;
        return a.title.localeCompare(b.title);
      });
  }
};

export const useNavigationPage = (location) => {
  const pages = usePages();
  if (!location.pathname.startsWith("/designsystem")) {
    return pages.find(
      ({ slug, link }) =>
        slug !== "" &&
        slug.split("/").length < 3 &&
        location.pathname.startsWith(link)
    );
  }

  const nav = pages.find(
    ({ slug, link }) =>
      slug !== "" &&
      slug.split("/").length === 2 &&
      location.pathname.startsWith(link)
  );
  return nav;
};

export const useContentPage = (location) => {
  const pages = usePages();

  const page = pages.find(({ slug, link }) => {
    return slug.split("/").length === 3 && location.pathname.startsWith(link);
  });

  return page
    ? {
        ...page,
        children: pages.filter(
          ({ slug }) =>
            slug.split("/").length === 4 &&
            `${slug}/`.startsWith(
              `${location.pathname.split("/").slice(1, 4).join("/")}/`
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
