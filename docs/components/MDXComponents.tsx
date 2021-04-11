import { Heading, Paragraph, Alert, Link } from "@navikt/ds-react";
import Bash from "./code/Bash";
import Import from "./code/Import";
import Preview from "./code-preview/Preview";
import Npm from "./npm/Npm";
import TableOfContents from "./table-of-contents/TableOfContents";
import { Knapp, Hovedknapp, Fareknapp, Flatknapp } from "nav-frontend-knapper";
import Alertstripe from "nav-frontend-alertstriper";
import Chevron from "nav-frontend-chevron";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import Etikett from "nav-frontend-etiketter";
import Hjelpetekst from "nav-frontend-hjelpetekst";
import { Element, Undertittel, Normaltekst } from "nav-frontend-typografi";
import {
  Hamburgerknapp,
  Tilbakeknapp,
  Nesteknapp,
  Xknapp,
  Søkeknapp,
  Menyknapp,
  Systemerknapp,
} from "nav-frontend-ikonknapper";
import {
  BekreftCheckboksPanel,
  CheckboksPanelGruppe,
  FnrInput,
  Feiloppsummering,
  Input,
  SkjemaGruppe,
  Label,
} from "nav-frontend-skjema";
import Lenke from "nav-frontend-lenker";
import { Settings } from "@navikt/ds-icons";
import BekreftcheckboxpanelExample1 from "../examples/bekreftcheckboxpanel/Normal";
import BekreftcheckboxpanelExample2 from "../examples/bekreftcheckboxpanel/Feilmelding";
import EkspanderbartpanelExample from "../examples/ekspanderbartpanel/ekspanderbartpanel-base";
import FnrInputExample from "../examples/navfrontendskjema/fnr-input-example";

export default {
  h1: (props) => <Heading size="xxl" level={1} {...props} />,
  h2: (props) => <Heading size="large" level={2} {...props} />,
  h3: (props) => <Heading size="small" level={3} {...props} />,
  h4: (props) => <Heading size="small" level={4} {...props} />,
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
  CheckboksPanelGruppe,
  Chevron,
  Ekspanderbartpanel,
  Etikett,
  Element,
  Normaltekst,
  Undertittel,
  Lenke,
  FnrInput,
  Input,
  Feiloppsummering,
  Hjelpetekst,
  Hamburgerknapp,
  Tilbakeknapp,
  Nesteknapp,
  Xknapp,
  Søkeknapp,
  Menyknapp,
  Systemerknapp,
  SkjemaGruppe,
  Label,
  BekreftcheckboxpanelExample1,
  BekreftcheckboxpanelExample2,
  EkspanderbartpanelExample,
  FnrInputExample,
};
