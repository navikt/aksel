/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import { default as cl } from "classnames";

import Header from "../header/header";
import Sidebar from "../sidebar/Sidebar";
import Main from "../main/Main";
import Footer from "../footer/Footer";
import "./layout.less";
import LayoutPicker from "./layoutPicker";

const Layout = ({ children, path }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  // TODO: How to handle initial load? cant assume that user will enter from homepage
  // ! Seems like layout is re-rendered for each page?
  const [home, setHome] = useState(true);

  useEffect(() => {
    setHome(path === "/");
  }, [path]);

  return (
    <div className="app dsportal">
      <Header
        className="dsportal__header"
        siteTitle={data.site.siteMetadata?.title || `Title`}
      />
      <Main
        className={cl("dsportal__main", {
          "dsportal--fullwidth": home,
        })}
      >
        <LayoutPicker>{children}</LayoutPicker>
      </Main>
      {home ? null : <Sidebar className="dsportal__sidebar" />}
      <Footer className="dsportal__footer" />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
