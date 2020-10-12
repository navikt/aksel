import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import LanguagePage from "./templates/language";
import ColorsPage from "./templates/colors";

const fixPath = (path) => (path.endsWith("/") ? path : path + "/");

const LayoutPicker = ({ location, ...props }) => {
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
  const resourcePath = allSitePage.edges
    .map((edge) => edge.node.path)
    .filter((path) => path.startsWith("/resources/"));

  const languagePath = resourcePath.filter((path) =>
    path.startsWith("/resources/language/")
  );
  const colorsPath = resourcePath.filter((path) =>
    path.startsWith("/resources/colors/")
  );

  let Component;
  switch (true) {
    case languagePath.includes(fixPath(location.pathname)):
      Component = LanguagePage;
      break;
    case colorsPath.includes(fixPath(location.pathname)):
      Component = ColorsPage;
      break;
    default:
      break;
  }
  return Component ? (
    <Component location={location} {...props} />
  ) : (
    props.children
  );
};

export default LayoutPicker;
