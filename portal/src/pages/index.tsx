import React from "react";
import { Link } from "gatsby";

import Image from "../components/image/image";
import SEO from "../components/seo/seo";
import GetStartedPage from "../components/get-started/GetStartedPage";

const IndexPage = () => (
  <>
    <SEO title="Home" />
    <GetStartedPage />
  </>
);

export default IndexPage;
