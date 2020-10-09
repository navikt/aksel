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

  const menuPaths = allSitePage.edges
    .map((edge) => edge.node.path)
    .filter((path) =>
      ["", "components", "patterns", "resources", "accessibility"].includes(
        path.replaceAll("/", "")
      )
    );

  const resourcePath = allSitePage.edges
    .map((edge) => edge.node.path)
    .filter((path) => path.startsWith("/resources/"));

  const languagePath = resourcePath.filter((path) =>
    path.startsWith("/resources/language/")
  );

  return { menuPaths, resourcePath, languagePath };
};
