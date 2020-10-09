import { graphql, useStaticQuery } from "gatsby";
const useAllMdx = () =>
  useStaticQuery(graphql`
    query AllMdx {
      allMdx(sort: { fields: frontmatter___rank }) {
        edges {
          node {
            slug
            frontmatter {
              title
              rank
            }
          }
        }
      }
    }
  `);

export const useMainMenuItems = () =>
  useAllMdx()
    .allMdx.edges.filter(
      (edge) =>
        edge.node.frontmatter.rank !== null &&
        edge.node.slug.split("/").length === 1
    )
    .map((edge) => ({
      link: `/${edge.node.slug}`,
      title: edge.node.frontmatter.title,
    }));

export default (location) =>
  useAllMdx()
    .allMdx.edges.filter(
      (edge) =>
        edge.node.slug.split("/").length === 2 &&
        edge.node.slug.split("/")[0].startsWith(location.pathname.split("/")[1])
    )
    .map((edge) => ({
      link: `/${edge.node.slug}`,
      title: edge.node.frontmatter.title,
    }));
