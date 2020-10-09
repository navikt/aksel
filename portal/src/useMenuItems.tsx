import { graphql, useStaticQuery } from "gatsby";

export default (location) => {
  const sites = useStaticQuery(graphql`
    query AllMdx {
      allMdx {
        edges {
          node {
            slug
            frontmatter {
              title
            }
          }
        }
      }
    }
  `);

  return sites.allMdx.edges
    .filter(
      (edge) =>
        edge.node.slug.split("/").length === 2 &&
        edge.node.slug.split("/")[0].startsWith(location.pathname.split("/")[1])
    )
    .map((edge) => ({
      link: `/${edge.node.slug}`,
      title: edge.node.frontmatter.title,
    }));
};
