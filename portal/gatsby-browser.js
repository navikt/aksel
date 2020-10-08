import React from "react";
import { MDXProvider } from "@mdx-js/react";
// import { preToCodeBlock } from 'mdx-utils';

import { Sidetittel } from "nav-frontend-typografi";
import Lenke from "nav-frontend-lenker";
const components = {
  h1: Sidetittel,
  a: Lenke,
};

export const wrapRootElement = ({ element }) => {
  return <MDXProvider components={components}>{element}</MDXProvider>;
};
