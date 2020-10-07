import React, { Fragment } from "react";

import SEO from "../components/seo/seo";

const NotFoundPage = () => (
  <Fragment>
    <SEO title="404: Not found" />
    <h1>404: Not Found</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Fragment>
);

export default NotFoundPage;
