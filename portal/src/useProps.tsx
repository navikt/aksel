import { graphql, useStaticQuery } from "gatsby";

const useAllProps = () =>
  useStaticQuery(graphql`
    query propsQuery {
      allComponentMetadata {
        nodes {
          props {
            name
            required
            tsType
            defaultValue {
              value
              computed
            }
          }
          parent {
            ... on File {
              relativePath
            }
          }
          displayName
        }
      }
    }
  `).allComponentMetadata.nodes.map((comp) => comp);

export const useProps = (path) => {
  const pathComp = path.match(/\/nav-frontend-(.*)\/md/)[1];
  const props = useAllProps();

  return props.filter((prop) => {
    const propPath = prop.parent.relativePath.match(
      /nav-frontend-(.*)\/src\//
    )[1];
    return propPath === pathComp;
  });
};
