import React, { Fragment } from "react";
import { Link } from "gatsby";
import { Helmet } from "react-helmet";

import SEO from "../components/seo/seo";

const AccessibilityPage = () => {
  return (
    <Fragment>
      <SEO title="Page three" />
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Title ASDASDASDDASDASDASD</title>
      </Helmet>
      <h1>Hi from the second page</h1>
      <p>Welcome to page 2</p>
      <Link to="/">Go back to the homepage</Link>
    </Fragment>
  );
};

export default AccessibilityPage;
