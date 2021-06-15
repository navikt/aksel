import React, { useEffect } from "react";
import { default as cl } from "classnames";
import { Helmet } from "react-helmet";

import Header from "./header/header";
import Breadcrumb from "./Breadcrumb";
import Sidebar from "./sidebar/Sidebar";
import LayoutPicker from "./layoutPicker";
import MdxWrapper from "./Mdxprovider";
import { globalHistory } from "@reach/router";
import "./layout.less";

const Layout = (props) => {
  useEffect(() => {
    return globalHistory.listen(() => {
      const contentPane = document.getElementsByClassName("mainContent")[0];
      contentPane.scrollTop = 0;
      window.scrollTo(0, 0);
    });
  }, []);

  return (
    <>
      <Helmet
        title={props.pageContext?.frontmatter?.title}
        titleTemplate="%s - NAV Designsystem"
      >
        <html lang="no" />
        {props.pageContext?.frontmatter?.ingress && (
          <meta
            name="description"
            content={props.pageContext?.frontmatter?.ingress}
          />
        )}
      </Helmet>
      <div className="mainWrapper">
        <Header location={props.location} />
        <Breadcrumb location={props.location} />
        <div className="contentWrapper">
          {!(
            ["/", "/404.html", "/designsystem/"].includes(
              props.pageResources?.page?.path
            ) || props.location.pathname === "/404.html"
          ) && <Sidebar className="leftNavigation" location={props.location} />}
          <main
            id="hovedinnhold"
            className={cl("mainContent", {
              "dsportal--fullwidth": props.path === "/",
            })}
          >
            <LayoutPicker {...props}>
              <MdxWrapper>{props.children}</MdxWrapper>
            </LayoutPicker>
          </main>
        </div>
      </div>
    </>
  );
};
export default Layout;
