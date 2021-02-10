import { graphql, useStaticQuery } from "gatsby";

const useAllProps = () =>
  useStaticQuery(graphql`
    query propsQuery {
      allComponentMetadata(sort: { order: ASC, fields: name }) {
        nodes {
          name
          relativePath
          props {
            defaultValue
            description
            name
            required
            type {
              name
            }
          }
        }
      }
    }
  `).allComponentMetadata.nodes.map((comp) => comp);

export const useProps = (path) => {
  const pathComp = path.match(/\/nav-frontend-(.*)\/md/)[1];
  const props = useAllProps();

  return props.filter((prop) => {
    const propPath = prop.relativePath.match(/nav-frontend-(.*)\/src\//)
      ? prop.relativePath.match(/nav-frontend-(.*)\/src\//)[1]
      : "";
    return propPath === pathComp;
  });
};
