import React, { Fragment } from "react";
import { Link } from "gatsby";

import SEO from "../components/seo/seo";

const AccessibilityPage = () => (
  <Fragment>
    <SEO title="Page three" />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
  </Fragment>
);

export default AccessibilityPage;
