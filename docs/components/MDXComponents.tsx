import { ErrorFilled, Settings, SuccessFilled } from "@navikt/ds-icons";
import { Alert, Title, Link, BodyLong } from "@navikt/ds-react";
import Alertstripe from "nav-frontend-alertstriper";
import Chevron from "nav-frontend-chevron";
import Ekspanderbartpanel from "nav-frontend-ekspanderbartpanel";
import Etikett from "nav-frontend-etiketter";
import Hjelpetekst from "nav-frontend-hjelpetekst";
import {
  Hamburgerknapp,
  Menyknapp,
  Nesteknapp,
  Systemerknapp,
  Søkeknapp,
  Tilbakeknapp,
  Xknapp,
} from "nav-frontend-ikonknapper";
import { Knapp } from "nav-frontend-knapper";
import Lenkepanel, { LenkepanelBase } from "nav-frontend-lenkepanel";
import Lenke from "nav-frontend-lenker";
import Lesmerpanel from "nav-frontend-lesmerpanel";
import Modal from "nav-frontend-modal";
import Panel from "nav-frontend-paneler";
import Popover, { PopoverBase } from "nav-frontend-popover";
import {
  BekreftCheckboksPanel,
  CheckboksPanelGruppe,
  Checkbox,
  CheckboxGruppe,
  Feiloppsummering,
  FnrInput,
  Input,
  Label,
  Radio,
  RadioGruppe,
  Select,
  SkjemaGruppe,
  Textarea,
  TextareaControlled,
} from "nav-frontend-skjema";
import Snakkeboble from "nav-frontend-snakkeboble";
import Spinner from "nav-frontend-spinner";
import Stegindikator from "nav-frontend-stegindikator";
import "nav-frontend-tabell-style";
import Tabs from "nav-frontend-tabs";
import Tekstomrade from "nav-frontend-tekstomrade";
import { ToggleGruppe, ToggleKnapp } from "nav-frontend-toggle";
import {
  Element,
  Feilmelding,
  Ingress,
  Innholdstittel,
  Normaltekst,
  Sidetittel,
  Systemtittel,
  Undertekst,
  UndertekstBold,
  Undertittel,
} from "nav-frontend-typografi";
import Veileder from "nav-frontend-veileder";
import Veilederpanel from "nav-frontend-veilederpanel";
import EkspanderbartpanelExample from "../examples/ekspanderbartpanel/ekspanderbartpanel-base";
import FormValidationExample from "../examples/form-validation/FormValidationExample";
import ModalExample from "../examples/modal/modal-example";
import BekreftcheckboxpanelExample2 from "../examples/navfrontendskjema/bekreftcheckboxpanel/Feilmelding";
import BekreftcheckboxpanelExample1 from "../examples/navfrontendskjema/bekreftcheckboxpanel/Normal";
import FnrInputExample from "../examples/navfrontendskjema/fnr-input-example";
import RadioPanelGruppeExample from "../examples/navfrontendskjema/radiopanelgruppe";
import TextareaExample from "../examples/navfrontendskjema/textarea-example";
import PopoverDropdownEksempel from "../examples/popover/_popover-dropdown.example";
import PopoverInputEksempel from "../examples/popover/_popover-input.example";
import PopoverNormalEksempel from "../examples/popover/_popover-normal.example";
import PopoverOrienteringEksempel from "../examples/popover/_popover-orientering.example";
import Palette from "../examples/resources/colors/Palette";
import IconDownload from "../examples/resources/icons/IconDownload";
import IconPage from "../examples/resources/icons/IconPage";
import TekstomradeExample from "../examples/tekstomrade/tekstomrade-example";
import {
  ButtonIcon,
  FigmaIcon,
  GithubLogo,
  NAVLogoCircle,
  SketchLogo,
  TypoIcon,
  VeilederIcon,
  W3CLogo,
  ZeplinLogo,
} from "./assets/svg";
import Preview from "./code-preview/Preview";
import Bash from "./code/Bash";
import Import from "./code/Import";
import Inline from "./code/Inline";
import Npm from "./npm/Npm";
import Proptable from "./props/Proptable";
import TableOfContents from "./table-of-contents/TableOfContents";

const components = {
  h1: (props) => <Title size="2xl" level={1} {...props} />,
  h2: (props) => <Title size="l" level={2} {...props} />,
  h3: (props) => <Title size="s" level={3} {...props} />,
  h4: (props) => <Title size="s" level={4} {...props} />,
  p: (props) => <BodyLong size="m" {...props} />,
  a: (props) => <Link {...props} />,
  code: (props) => <Inline {...props} />,
  SuccessIcon: () => (
    <SuccessFilled style={{ color: "var(--navds-color-green-70)" }} />
  ),
  ErrorIcon: () => (
    <ErrorFilled style={{ color: "var(--navds-color-red-60)" }} />
  ),
  Bash,
  Preview,
  Import,
  Npm,
  TableOfContents,
  Alert,
  Link,
  Knapp,
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
  Innholdstittel,
  Systemtittel,
  Sidetittel,
  Undertekst,
  Feilmelding,
  UndertekstBold,
  Ingress,
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
  Lenkepanel,
  LenkepanelBase,
  Lesmerpanel,
  Modal,
  Panel,
  Popover,
  PopoverBase,
  Radio,
  RadioGruppe,
  Select,
  Checkbox,
  CheckboxGruppe,
  TextareaControlled,
  Textarea,
  Snakkeboble,
  Spinner,
  Stegindikator,
  Tabs,
  Tekstomrade,
  ToggleGruppe,
  ToggleKnapp,
  Veileder,
  Veilederpanel,
  Proptable,
  ButtonIcon,
  TypoIcon,
  VeilederIcon,
  NAVLogoCircle,
  W3CLogo,
  SketchLogo,
  FigmaIcon,
  ZeplinLogo,
  GithubLogo,
  BekreftcheckboxpanelExample1,
  BekreftcheckboxpanelExample2,
  EkspanderbartpanelExample,
  FnrInputExample,
  ModalExample,
  PopoverDropdownEksempel,
  PopoverInputEksempel,
  PopoverNormalEksempel,
  PopoverOrienteringEksempel,
  RadioPanelGruppeExample,
  TekstomradeExample,
  TextareaExample,
  FormValidationExample,
  Palette,
  IconPage,
  IconDownload,
};

export default components;
