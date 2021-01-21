import React from "react";
import BetaLayout from "./BetaLayout";
import OldLayout from "./OldLayout";

const Layout = (props) =>
  props.path.startsWith("/beta/") ? (
    <BetaLayout {...props} />
  ) : (
    <OldLayout {...props} />
  );

export default Layout;
