import React, { Fragment } from "react";
import { routingPaths } from "../util/routing";

import LanguagePage from "../../pages/resources/language";

const LayoutPicker = ({ location, ...props }) => {
  const { languagePath } = routingPaths();
  let Component;
  switch (true) {
    case languagePath.includes(location.pathname):
      Component = LanguagePage;
      break;
    default:
      Component = Fragment;
      break;
  }

  return <Component {...props} />;
};

export default LayoutPicker;
