import React from "react";
import { default as cl } from "classnames";

import Header from "./header/header";
import Breadcrumb from "./Breadcrumb";
import Sidebar from "./sidebar/Sidebar";
import LayoutPicker from "./layoutPicker";
import MdxWrapper from "./Mdxprovider";

import "./layout.less";

const Layout = (props) => (
  <div id="app">
    <div className="mainWrapper">
      <Header />
      <Breadcrumb location={props.location} />
      <div className="contentWrapper">
        {props.path !== "/" && (
          <Sidebar className="leftNavigation" location={props.location} />
        )}
        <main
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
  </div>
);

export default Layout;
