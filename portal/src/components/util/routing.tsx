import { graphql, useStaticQuery } from "gatsby";

export const routingPaths = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { allSitePage } = useStaticQuery(graphql`
    query MyQuery {
      allSitePage {
        edges {
          node {
            path
            componentPath
          }
        }
      }
    }
  `);

  const menuPaths = allSitePage.edges.map((edge) => edge.node.path);

  return { menuPaths };
};
