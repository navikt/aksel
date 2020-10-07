import React, { Fragment } from "react";
import { Link } from "gatsby";

import SEO from "../components/seo/seo";

const SecondPage = () => (
  <Fragment>
    <SEO title="Page two" />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
  </Fragment>
);

export default SecondPage;
