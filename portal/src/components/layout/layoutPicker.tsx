import React, { Fragment } from "react";
import { routingPaths } from "../util/routing";
import path from "path";
import LanguagePage from "./templates/language";

const fixPath = (path) => (path.endsWith("/") ? path : path + "/");

const LayoutPicker = ({ location, ...props }) => {
  const { languagePath } = routingPaths();
  let Component;
  switch (true) {
    case languagePath.includes(fixPath(location.pathname)):
      Component = LanguagePage;
      break;
    default:
      break;
  }
  return Component ? <Component {...props} /> : props.children;
};

export default LayoutPicker;
