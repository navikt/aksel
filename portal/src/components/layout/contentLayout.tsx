import React, { ReactNode } from "react";

import "./layout.less";

interface Props {
  children: ReactNode;
  location: Location;
  pageContext: any;
}

const ContentLayout = ({ children, location, pageContext }: Props) => {
  return <main className="dsportal__main">{children}</main>;
};

export default ContentLayout;
