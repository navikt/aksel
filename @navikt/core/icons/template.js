function defaultTemplate(
  { template },
  opts,
  { imports, interfaces, componentName, props, jsx, exports }
) {
  const plugins = ["jsx"];
  if (opts.typescript) {
    plugins.push("typescript");
  }

  imports.push({
    type: "ImportDeclaration",
    specifiers: [
      {
        type: "ImportSpecifier",
        imported: {
          type: "Identifier",
          name: "useId",
        },
      },
    ],
    source: {
      type: "StringLiteral",
      value: "./util/useId",
    },
  });

  props[0].properties.find((prop) => prop.key.name === "titleId").value = {
    type: "Identifier",
    name: "_titleId",
  };

  const typeScriptTpl = template.smart({ plugins });
  return typeScriptTpl.ast`
  ${imports}
  ${interfaces}
  const ${componentName} = React.forwardRef((${props}) => {
    let titleId: string | undefined = "title-" + useId(_titleId);
    titleId = title ? titleId : undefined;
    return ${jsx};
  });
  export default ${componentName}`;
}

module.exports = defaultTemplate;
