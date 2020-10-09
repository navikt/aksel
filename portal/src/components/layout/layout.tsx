import React from "react";
import { default as cl } from "classnames";

import Header from "../header/header";
import Sidebar from "../sidebar/Sidebar";
import Main from "../main/Main";
import LayoutPicker from "./layoutPicker";
import MdxWrapper from "./Mdxprovider";

import "./layout.less";

const Layout = ({ children, path, location, pageResources, ...props }) => (
  <div id="app">
    <div className="mainWrapper">
      <Header />
      <div className="contentWrapper">
        {path !== "/" && (
          <Sidebar className="leftNavigation" location={location} />
        )}
        <Main
          className={cl("mainContent", {
            "dsportal--fullwidth": path === "/",
          })}
        >
          {pageResources.component.isMDXComponent ? (
            <LayoutPicker location={location} {...props}>
              <MdxWrapper element={children}></MdxWrapper>
            </LayoutPicker>
          ) : (
            <div>{children}</div>
          )}
        </Main>
      </div>
    </div>
  </div>
);

export default Layout;
