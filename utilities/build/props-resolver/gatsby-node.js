const reactDocgen = require("react-docgen-typescript").withDefaultConfig({
  propFilter: { skipPropsWithoutDoc: true },
});

const annotations = [
  {
    regex: /@deprecated/,
    name: "deprecated",
    type: "Boolean",
  },
  {
    regex: /@hide/,
    name: "hide",
    type: "Boolean",
  },
  {
    regex: /@beta/,
    name: "beta",
    type: "Boolean",
  },
  {
    regex: /@propType (\w+|['"](.+)['"])\s*/,
    name: "annotatedType",
    type: "String",
  },
];

const isSource = (node, options) => {
  if (!node || !(options && options.ignore)) return false;
  for (const str in options.ignore) {
    if (node.relativePath.indexOf(str) !== -1) return false;
  }
  return true;
};

const isTSX = (node) => {
  return (
    node.internal.mediaType === `application/typescript` ||
    node.internal.mediaType === `text/tsx` ||
    node.extension === "tsx"
  );
};

const isJSX = (node) => {
  return (
    node.internal.mediaType === `application/javascript` ||
    node.internal.mediaType === `text/jsx`
  );
};

const canParse = (node, options) => {
  return (
    node && options && isTSX(node) && isSource(node, options) && !isJSX(node)
  );
};

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

const addAnnotations = (prop) => {
  if (prop.description) {
    annotations.forEach(({ regex, name }) => {
      const match = prop.description.match(regex);
      if (match) {
        prop.description = prop.description.replace(regex, "").trim();
        prop[name] = match[2] || match[1] || true;
      }
    });
  }

  return prop;
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
      props: flattenProps(parsed.props).map(addAnnotations),
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

// Add types fetched in `mdx.js` query in case no files are passed to infer from
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
      ${annotations.map(({ name, type }) => `${name}: ${type}`).join("\n")}
    }
    type ComponentMetadata implements Node @noInfer {
      name: String!
      description: String
      props: [PropsType]
    }
  `;
  actions.createTypes(typeDefs);
};
