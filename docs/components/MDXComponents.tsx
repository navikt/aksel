import { Heading, Paragraph, Alert, Link } from "@navikt/ds-react";
import Bash from "./code/Bash";
import Import from "./code/Import";
import Preview from "./code-preview/Preview";
import Npm from "./npm/Npm";
import TableOfContents from "./table-of-contents/TableOfContents";
import { Knapp, Hovedknapp, Fareknapp, Flatknapp } from "nav-frontend-knapper";
import Alertstripe from "nav-frontend-alertstriper";
import { BekreftCheckboksPanel } from "nav-frontend-skjema";
import Lenke from "nav-frontend-lenker";
import { Settings } from "@navikt/ds-icons";
import BekreftcheckboxpanelExample1 from "../examples/bekreftcheckboxpanel/Normal";
import BekreftcheckboxpanelExample2 from "../examples/bekreftcheckboxpanel/Feilmelding";

export default {
  h1: (props) => <Heading size="xxl" level={1} {...props} />,
  h2: (props) => <Heading size="large" level={2} {...props} />,
  h3: (props) => <Heading size="small" level={3} {...props} />,
  p: (props) => <Paragraph size="medium" {...props} />,
  Bash,
  Preview,
  Import,
  Npm,
  TableOfContents,
  Alert,
  Link,
  Knapp,
  Fareknapp,
  Flatknapp,
  Hovedknapp,
  Settings,
  Alertstripe,
  BekreftCheckboksPanel,
  Lenke,
  BekreftcheckboxpanelExample1,
  BekreftcheckboxpanelExample2,
};
