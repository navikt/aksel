const reactDocgen = require("react-docgen-typescript").withDefaultConfig({
  propFilter: { skipPropsWithoutDoc: true },
});

function isSource(node) {
  if (
    !node ||
    node.relativePath.indexOf("/example") !== -1 ||
    node.relativePath.indexOf(".docs") !== -1 ||
    node.relativePath.indexOf(".md") !== -1
  )
    return false;

  return true;
}

function canParse(node) {
  return node && isTSX(node) && isSource(node) && !isJSX(node);
}

function isTSX(node) {
  return (
    node.internal.mediaType === `application/typescript` ||
    node.internal.mediaType === `text/tsx` ||
    node.extension === "tsx"
  );
}

function isJSX(node) {
  return (
    node.internal.mediaType === `application/javascript` ||
    node.internal.mediaType === `text/jsx`
  );
}

function flattenProps(props) {
  const res = [];
  if (props) {
    Object.entries(props).forEach(([key, value]) => {
      value.name = key;
      res.push(value);
    });
  }

  return res;
}

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

function addAnnotations(prop) {
  // Prop looks like this: {
  //   "beta": null,
  //   "required": false,
  //   "name": "className",
  //   "description": "Additional css classes",
  //   "defaultValue": {
  //     "value": "''"
  //   },
  //   "tsType": {
  //     "name": "string",
  //     "raw": null
  //   },
  //   "type": null
  // },
  if (prop.description) {
    annotations.forEach(({ regex, name }) => {
      const match = prop.description.match(regex);
      if (match) {
        //console.log(prop.description.replace(regex, ""));
        prop.description = prop.description.replace(regex, "").trim();
        prop[name] = match[2] || match[1] || true;
      }
    });
  }

  return prop;
}

// Docs https://www.gatsbyjs.org/docs/actions/#createNode
function onCreateNode({
  node,
  actions,
  loadNodeContent,
  createNodeId,
  createContentDigest,
}) {
  if (!canParse(node)) return;

  // const sourceText = await loadNodeContent(node);
  let parsed = null;
  try {
    parsed = reactDocgen.parse(node.absolutePath)[0];
  } catch (err) {
    // eslint-disable-next-line no-console
    // console.warn('No component found in', node.absolutePath);
  }

  //console.log(node.absolutePath);
  // TabContent.tsx is being a pain so check for parsed.displayName
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
    console.log("NOT OK: " + node.absolutePath);
    console.log("- " + parsed.displayName);
    // console.log(parsed);
  }
}

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
