import React from "react";
import BetaLayout from "./BetaLayout";
import OldLayout from "./OldLayout";

const Layout = (props) => {
  return props.location.pathname.startsWith("/beta/") ? (
    <BetaLayout {...props} />
  ) : (
    <OldLayout {...props} />
  );
};

export default Layout;
