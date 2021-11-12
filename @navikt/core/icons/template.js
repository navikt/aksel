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
          name: "v4",
        },
      },
    ],
    source: {
      type: "StringLiteral",
      value: "uuid",
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
  function ${componentName}(${props}) {
    const titleId = _titleId ?? (title ?
      "icon-title-" + v4() : undefined);
    return ${jsx};
  }
  ${exports}`;
}

module.exports = defaultTemplate;
