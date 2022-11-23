const template = (variables, { tpl }) => {
  return tpl`
${variables.imports};
${variables.interfaces};

const ${variables.componentName} = forwardRef((${variables.props}) => {
  return ${variables.jsx};
});
export default ${variables.componentName}
`;
};

module.exports = template;
