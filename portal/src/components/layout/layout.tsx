import React from "react";
import { default as cl } from "classnames";

import Header from "./header/header";
import Sidebar from "./sidebar/Sidebar";
import LayoutPicker from "./layoutPicker";
import MdxWrapper from "./Mdxprovider";

import "./layout.less";

const Layout = ({ children, path, location, pageResources, ...props }) => {
  return (
    <div id="app">
      <div className="mainWrapper">
        <Header />
        <div className="contentWrapper">
          {path !== "/" && (
            <Sidebar className="leftNavigation" location={location} />
          )}
          <main
            className={cl("mainContent", {
              "dsportal--fullwidth": path === "/",
            })}
          >
            {!pageResources?.json?.pageContext?.frontmatter?.content ? (
              <div>{children}</div>
            ) : (
              <LayoutPicker location={location} {...props}>
                <MdxWrapper element={children}></MdxWrapper>
              </LayoutPicker>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
