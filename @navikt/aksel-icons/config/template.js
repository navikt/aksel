const template = (variables, { tpl }) => {
  const imports = variables.imports;
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
      value: "react",
    },
  });

  variables.props[0].properties.find(
    (prop) => prop.key.name === "titleId"
  ).value = {
    type: "Identifier",
    name: "_titleId",
  };

  return tpl`
${imports};

${variables.interfaces};

const ${variables.componentName} = forwardRef((${variables.props}) => {
  let titleId: string | undefined = useId();
  titleId = title ? _titleId ? _titleId : "title-" + titleId : undefined;
  return ${variables.jsx};
});
export default ${variables.componentName}
`;
};

module.exports = template;
