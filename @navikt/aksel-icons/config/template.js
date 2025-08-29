const template = (variables, { tpl }) => {
  /*
   * Remove any react imports SVGR added
   * This allows us to de-duplicate the react import.
   */
  const imports = variables.imports.filter(
    (imp) =>
      !(imp.type === "ImportDeclaration" && imp.source.value === "react"),
  );

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

  variables.props[0].properties.find(
    (prop) => prop.key.name === "titleId",
  ).value = {
    type: "Identifier",
    name: "_titleId",
  };

  return tpl`
"use client";
import React, { forwardRef, type Ref, type SVGProps } from "react";
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
