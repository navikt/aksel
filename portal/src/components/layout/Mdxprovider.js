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

const MdxWrapper = ({ element }) => (
  <div className="mdx-content">
    <section className="section">
      <MDXProvider
        components={{
          h1: Innholdstittel,
          h2: Systemtittel,
          h3: Undertittel,
          a: Lenke,
          code: (props) => {
            return <Codeblock {...props} />;
          },
          inlineCode: InlineCode,
        }}
      >
        {element}
      </MDXProvider>
    </section>
  </div>
);

export default MdxWrapper;
