function propTypesTemplate(
  { template },
  opts,
  { imports, interfaces, componentName, props, jsx, exports }
) {
  componentName.name = componentName.name.replace("Svg", "");
  const plugins = ["jsx"];
  if (opts.typescript) {
    plugins.push("typescript");
  }
  const typeScriptTpl = template.smart({ plugins });
  return typeScriptTpl.ast`${imports}

  ${interfaces}
  function ${componentName}(${props}) {

    return ${jsx};
    
  }
  const ForwardRef = React.forwardRef(${componentName});
  export default ForwardRef;
    `;
}
module.exports = propTypesTemplate;
