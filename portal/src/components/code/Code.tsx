import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";

// import every component that needs to be available in Code blocks and add it to the scope

const Code = ({ codeString, language, ...props }) => {
  return <div> Her skulle det vært kode</div>;
};

export default Code;
