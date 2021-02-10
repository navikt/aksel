const reactDocgen = require("react-docgen-typescript").withDefaultConfig({
  propFilter(prop) {
    if (prop.parent) {
      if (prop.name === "className") {
        return true;
      }
      return !prop.parent.fileName.includes("node_modules");
    }
    return true;
  },
});

const notIgnored = (node, options) => {
  if (!node || !(options && options.ignore)) return false;
  return Object.keys(options.ignore).every(
    (key) => !node.relativePath.includes(key)
  );
};

const isTSX = (node) =>
  ["application/typescript", "text/tsx"].includes(node.internal.mediaType) ||
  node.extension === "tsx";

const isJSX = (node) =>
  ["application/javascript", "text/jsx"].includes(node.internal.mediaType);

const canParse = (node, options) =>
  node && options && isTSX(node) && !isJSX(node) && notIgnored(node, options);

const flattenProps = (props) =>
  props
    ? Object.entries(props).map(([key, value]) => ({
        ...value,
        name: key,
        defaultValue: value.defaultValue?.value,
      }))
    : [];

const onCreateNode = (
  { node, actions, createNodeId, createContentDigest },
  options
) => {
  if (!canParse(node, options)) return;

  try {
    let parsed = null;
    parsed = reactDocgen.parse(node.absolutePath)[0];
    /* if (!node.absolutePath.includes("nav-frontend")) {
      console.log(JSON.stringify(flattenProps(parsed.props), null, 4));
    } */

    if (parsed && parsed.displayName) {
      const metadataNode = {
        name: parsed.displayName,
        relativePath: node.relativePath,
        description: parsed.description,
        props: flattenProps(parsed.props),
        path: node.relativePath,
        basePath: node.relativePath.split("/")[0],
        id: createNodeId(`${node.id}react-docgen${node.relativePath}`),
        children: [],
        parent: node.id,
        internal: {
          contentDigest: createContentDigest(node),
          type: `ComponentMetadata`,
        },
      };

      actions.createNode(metadataNode);
      actions.createParentChildLink({ parent: node, child: metadataNode });
    } else {
      console.warn("No displayname " + node.absolutePath);
    }
  } catch (err) {
    console.warn("Could not generate props for: ", node.absolutePath);
  }
};

exports.onCreateNode = onCreateNode;

exports.createSchemaCustomization = ({ actions }) => {
  const typeDefs = `
    type TypeType @noInfer {
      name: String
    }
    type TsType @noInfer {
      name: String
      raw: String
    }
    type PropsType @noInfer {
      beta: Boolean
      name: String!
      description: String
      required: Boolean
      type: TypeType
      tsType: TsType
      defaultValue: String
    }
    type ComponentMetadata implements Node @noInfer {
      name: String!
      description: String
      props: [PropsType]
    }
  `;
  actions.createTypes(typeDefs);
};
