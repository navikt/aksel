import React from "react";
import { MDXProvider } from "@mdx-js/react";
import Codeblock, { InlineCode } from "../code/Code";

import {
  Innholdstittel,
  Systemtittel,
  Undertittel,
  Ingress,
} from "nav-frontend-typografi";
import Lenke from "nav-frontend-lenker";
import Alertstripe from "nav-frontend-alertstriper";

import { FileIcon, Cog } from "../assets/images/svg";
import Example from "../example/Example";

export const comps = {
  h1: Innholdstittel,
  h2: Systemtittel,
  h3: (props) => <Undertittel {...props} tag="h3" />,
  h4: (props) => <Undertittel {...props} tag="h4" />,
  Ingress: Ingress,
  ingress: Ingress,
  a: Lenke,
  code: (props) => <Codeblock {...props} />,
  inlineCode: (props) => <InlineCode {...props} />,
  Alertstripe: (props) => <Alertstripe {...props} />,
  alertstripe: (props) => <Alertstripe {...props} />,
  Undertittel,
  undertittel: (props) => <Undertittel {...props} />,
  InlineCode,
  FileIcon,
  Cog,
  Example,
};

const MdxWrapper = (props) => <MDXProvider components={comps} {...props} />;

export default MdxWrapper;
