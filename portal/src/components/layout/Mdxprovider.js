import React from "react";
import { MDXProvider } from "@mdx-js/react";
import Codeblock, { InlineCode } from "../code/Code";
// import { preToCodeBlock } from 'mdx-utils';

import {
  Innholdstittel,
  Systemtittel,
  Undertittel,
} from "nav-frontend-typografi";
import Lenke from "nav-frontend-lenker";

import "./layout.less";
import { graphql, useStaticQuery } from "gatsby";

const MdxWrapper = ({ element, ...props }) => {
  const genId = (content) => content.toLowerCase().split(" ").join("");

  const components = {
    h1: (props) => {
      const id = genId(props.children);
      return <Innholdstittel id={id} {...props} />;
    },
    h2: (props) => {
      const id = genId(props.children);
      return <Systemtittel id={id} {...props} />;
    },
    h3: (props) => {
      const id = genId(props.children);
      return <Undertittel id={id} {...props} tag="h3" />;
    },
    a: Lenke,
    code: (props) => {
      return <Codeblock {...props} />;
    },
    inlineCode: InlineCode,
  };

  return (
    <div className="mdx-content">
      <section className="section">
        <MDXProvider components={{ ...components }}>{element}</MDXProvider>
      </section>
    </div>
  );
};

export default MdxWrapper;
