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
import startCase from "lodash.startcase";

const Layout = (props) => {
  useEffect(() => {
    return globalHistory.listen(() => {
      const contentPane = document.getElementsByClassName("mainContent")[0];
      contentPane.scrollTop = 0;
      window.scrollTo(0, 0);
    });
  }, []);

  let source = startCase(props.path.split("/")[1]);
  source = source === "Designsystem" ? "Designsystemet" : source;

  return (
    <>
      <Helmet
        title={props.pageContext?.frontmatter?.title}
        titleTemplate={`%s - ${
          source === "" ? "" : source + " -"
        }  NAV Verktøykassen`}
      >
        <html lang="no" />
        {props.pageContext?.frontmatter?.ingress && (
          <meta
            name="description"
            content={props.pageContext?.frontmatter?.ingress}
          />
        )}
      </Helmet>
      <a href="#hovedinnhold" id="skip-link">
        Hopp til innhold
      </a>
      <div className="mainWrapper">
        {props.path !== "/" && (
          <Header location={props.location} title={source} />
        )}
        {props.path.startsWith("/designsystem") && (
          <Breadcrumb location={props.location} />
        )}
        <div className="contentWrapper">
          {props?.pageResources?.page?.path !== "/404.html" && (
            <Sidebar className="leftNavigation" location={props.location} />
          )}
          <main
            id="hovedinnhold"
            className={cl("mainContent", {
              "dsportal--fullwidth": props.path === "/",
              forside: props.path === "/",
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
