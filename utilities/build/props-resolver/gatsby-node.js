const reactDocgen = require("react-docgen-typescript").withDefaultConfig({
  propFilter: { skipPropsWithoutDoc: true },
});

const isIgnored = (node, options) => {
  if (!node || !(options && options.ignore)) return false;
  for (const str in options.ignore) {
    if (node.relativePath.indexOf(str) !== -1) return false;
  }
  return true;
};

const isTSX = (node) =>
  node.internal.mediaType === `application/typescript` ||
  node.internal.mediaType === `text/tsx` ||
  node.extension === "tsx";

const isJSX = (node) =>
  node.internal.mediaType === `application/javascript` ||
  node.internal.mediaType === `text/jsx`;

const canParse = (node, options) =>
  node && options && isTSX(node) && !isJSX(node) && isIgnored(node, options);

const flattenProps = (props) => {
  const res = [];
  if (props) {
    Object.entries(props).forEach(([key, value]) => {
      value.name = key;
      value.defaultValue = JSON.stringify(value.defaultValue);
      res.push(value);
    });
  }
  return res;
};

const onCreateNode = (
  { node, actions, createNodeId, createContentDigest },
  options
) => {
  if (!canParse(node, options)) return;

  let parsed = null;
  try {
    parsed = reactDocgen.parse(node.absolutePath)[0];
  } catch (err) {
    console.warn("No component found in", node.absolutePath);
  }

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
    type defaultValue @noInfer {
      value: String
    }
    type PropsType @noInfer {
      beta: Boolean
      name: String!
      description: String
      required: Boolean
      type: TypeType
      tsType: TsType
      defaultValue: defaultValue
    }
    type ComponentMetadata implements Node @noInfer {
      name: String!
      description: String
      props: [PropsType]
    }
  `;
  actions.createTypes(typeDefs);
};
