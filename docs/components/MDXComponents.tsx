import { Heading, Paragraph, Alert, Link } from "@navikt/ds-react";
import Bash from "./code/Bash";
import Import from "./code/Import";
import Preview from "./code-preview/Preview";
import Npm from "./npm/Npm";
import TableOfContents from "./table-of-contents/TableOfContents";
import { Knapp } from "nav-frontend-knapper";
import { Settings } from "@navikt/ds-icons";

const components = {
  h1: (props) => <Heading size="xxl" level={1} {...props} />,
  h2: (props) => <Heading size="large" level={2} {...props} />,
  h3: (props) => <Heading size="small" level={3} {...props} />,
  p: (props) => <Paragraph size="medium" {...props} />,
  a: (props) => <Link {...props} />,
  Bash,
  Preview,
  Import,
  Npm,
  TableOfContents,
  Alert,
  Link,
  Knapp,
  Settings,
};

export default components;
