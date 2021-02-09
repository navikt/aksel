import React from "react";
import { MDXProvider } from "@mdx-js/react";
import Codeblock, { InlineCode } from "../code/Code";

import {
  Innholdstittel,
  Systemtittel,
  Undertittel,
} from "nav-frontend-typografi";
import Lenke from "nav-frontend-lenker";

import { FileIcon, Cog } from "../assets/images/svg";
import Example from "../example/Example";

const MdxWrapper = (props) => (
  <MDXProvider
    components={{
      h1: Innholdstittel,
      h2: Systemtittel,
      h3: (props) => <Undertittel {...props} tag="h3" />,
      a: Lenke,
      code: (props) => <Codeblock {...props} />,
      inlineCode: (props) => <InlineCode {...props} />,
      Undertittel,
      InlineCode,
      FileIcon,
      Cog,
      Example,
    }}
    {...props}
  />
);

export default MdxWrapper;
