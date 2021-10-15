import { Table as DsTable } from "@navikt/ds-react";
import {
  SuccessFilled as SuccessIcon,
  ErrorFilled as ErrorIcon,
} from "@navikt/ds-icons";
import styled from "styled-components";

const Success = styled(SuccessIcon)`
  color: var(--navds-color-green-50);
`;

const Error = styled(ErrorIcon)`
  color: var(--navds-color-red-50);
`;

const Table = styled(DsTable)`
  .navds-table__cell > svg,
  .navds-table__cell > span {
    vertical-align: middle;
    margin-left: 50%;
    transform: translateX(-50%);
  }
`;

type CompT = {
  name: string;
  status: Partial<[boolean, boolean, boolean]>;
  desc?: React.ReactNode;
};

const Components: CompT[] = [
  {
    name: "Alertstriper",
    status: [true, true, true],
    desc: "Navn: Alert",
  },
  { name: "Chevron", status: [false], desc: "" },
  {
    name: "Core",
    status: [true, true, false],
    desc: <code>@navikt/ds-css</code>,
  },
  {
    name: "Ekspanderbartpanel",
    status: [true, true, true],
    desc: "Navn: Accordion, styling ikke oppdatert til nyeste versjon",
  },
  { name: "Etiketter", status: [true, true, false], desc: "Navn: Tag" },
  {
    name: "Fullbreddeknapp-style",
    status: [false],
    desc: "",
  },
  { name: "Grid", status: [true, true, false], desc: "Navn: Grid" },
  { name: "Hjelpetekst", status: [true, true, true], desc: "Navn: HelpText" },
  {
    name: "Ikoner-assets",
    status: [true, true, true],
    desc: <code>@navikt/ds-icons</code>,
  },
  {
    name: "js-utils",
    status: [true, true, false],
    desc:
      "Diverse util-funksjoner blir eksponert gjennom ds-react, men tar for det meste i bruk npm pakker",
  },
  { name: "Knapper", status: [true, true, true], desc: "Navn: Button" },
  { name: "Lenkepanel", status: [true, true, true], desc: "Navn: LinkPanel" },
  { name: "Lenker", status: [true, true, true], desc: "Navn: Link" },
  { name: "Lesmerpanel", status: [false], desc: "" },
  { name: "Lukknapp", status: [false], desc: `Bruk Button med "Close"-ikon` },
  { name: "Modal", status: [true, true, true], desc: "Navn: Modal" },
  { name: "Paneler", status: [true, true, true], desc: "Navn: Panel" },
  {
    name: "Bekrefcheckbokspanel",
    status: [true, true, true],
    desc: "Navn: ConfirmationPanel",
  },
  {
    name: "Checkbokspanel-gruppe",
    status: [false],
    desc: "Panel-versjon vil ikke tas videre i nytt system",
  },
  {
    name: "Checkbokspanel",
    status: [false],
    desc: "Panel-versjon vil ikke tas videre i nytt system",
  },
  {
    name: "Checkbox-gruppe",
    status: [true, true, true],
    desc: "Navn: CheckboxGroup",
  },
  { name: "Checkbox", status: [true, true, true], desc: "Navn: Checkbox" },
  {
    name: "Feiloppsummering",
    status: [true, true, false],
    desc: "Navn: ErrorSummary, API vil bli endret for denne",
  },
  {
    name: "Fnr-input",
    status: [false],
    desc:
      "Skjema-elementer med validering vil ikke bli lagt til med det første, men vil diskuteres i fremtiden",
  },
  { name: "Input", status: [true, true, true], desc: "Navn: TextField" },
  {
    name: "Label",
    status: [false],
    desc: "Skjema-elementer fikser dette selv",
  },
  { name: "Radio-Gruppe", status: [true, true, true], desc: "RadioGroup" },
  { name: "Radio", status: [true, true, true], desc: "Navn: Radio" },
  {
    name: "Radiopanel-gruppe",
    status: [false],
    desc: "Panel-versjon vil ikke tas videre i nytt system",
  },
  {
    name: "Radio-panel",
    status: [false],
    desc: "Panel-versjon vil ikke tas videre i nytt system",
  },
  { name: "Select", status: [true, true, true], desc: "Navn: Select" },
  { name: "Skjema-gruppe", status: [true, true, true], desc: "Navn: Fieldset" },
  {
    name: "Skjemaelement-feilemelding",
    status: [false],
    desc: "",
  },
  { name: "Textarea", status: [true, true, true], desc: "Navn: Textarea" },
  { name: "Togglegruppe", status: [true, false, false], desc: "" },
  { name: "ToggleKnapp", status: [true, false, false], desc: "" },
  {
    name: "Toggle",
    status: [true, false, false],
    desc: "Vil bli samme komponent som ToggleKnapp",
  },
  { name: "Popover", status: [true, true, true], desc: "Navn: Popover" },
  { name: "Snakkeboble", status: [true, true, true], desc: "SpeechBubble" },
  { name: "Spinner", status: [true, true, true], desc: "Navn: Loader" },
  { name: "Stegindikator", status: [true, false, false], desc: "" },
  {
    name: "Tabell-style",
    status: [true, true, false],
    desc: "Navn: Table, Er nå publisert som React-component",
  },
  { name: "Tabs", status: [true, false, false], desc: "" },
  { name: "Tekstomrade", status: [false], desc: "" },
  {
    name: "Typografi",
    status: [true, true, true],
    desc: "Navn: se typography-mappen i storybook",
  },
  { name: "veileder", status: [false], desc: "" },
  {
    name: "Veilederpanel",
    status: [true, true, true],
    desc: "Navn: GuidePanel",
  },
];

const NewComps: CompT[] = [
  {
    name: "AccordionMenu",
    status: [true, true, true],
    desc: "",
  },
  {
    name: "SearcField",
    status: [true, true, false],
    desc: "Denne vil undergå større endringer",
  },
  {
    name: "MicroCard",
    status: [true, true, false],
    desc: "Vil flyttes over i egen navno pakke for eksterne sider",
  },
  {
    name: "PageHeader",
    status: [true, true, false],
    desc: "Vil flyttes over i egen navno pakke for eksterne sider",
  },
  {
    name: "CopyToClipboard",
    status: [true, true, false],
    desc: "Vil flyttes over til @navikt/ds-react-internal pakke",
  },
  {
    name: "Table",
    status: [true, true, false],
    desc:
      "Implementer stylingen til nav-frontend-table-styles, API vil videreutvikles",
  },
  {
    name: "Switch",
    status: [true, false, false],
    desc: "",
  },
  {
    name: "Tooltip",
    status: [true, false, false],
    desc: "",
  },
  {
    name: "Timeline",
    status: [true, false, false],
    desc: "",
  },
];

const RoadmapTable = () => (
  <Table>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Komponent</Table.HeaderCell>
        <Table.HeaderCell>Med i nytt system</Table.HeaderCell>
        <Table.HeaderCell>Publisert i pakker</Table.HeaderCell>
        <Table.HeaderCell>Fullført**</Table.HeaderCell>
        <Table.HeaderCell>Info</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.HeaderCell>Nye komponenter</Table.HeaderCell>
        <Table.HeaderCell>
          <span>-</span>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <span>-</span>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <span>-</span>
        </Table.HeaderCell>
        <Table.HeaderCell>-</Table.HeaderCell>
      </Table.Row>
      {NewComps.map((comp) => {
        return (
          <Table.Row>
            <Table.HeaderCell>{comp.name}</Table.HeaderCell>
            <Table.DataCell>
              {comp.status?.[0] === undefined ? (
                <span>-</span>
              ) : comp.status?.[0] ? (
                <Success />
              ) : (
                <Error />
              )}
            </Table.DataCell>
            <Table.DataCell>
              {comp.status?.[1] === undefined ? (
                <span>-</span>
              ) : comp.status?.[1] ? (
                <Success />
              ) : (
                <Error />
              )}
            </Table.DataCell>
            <Table.DataCell>
              {comp.status?.[2] === undefined ? (
                <span>-</span>
              ) : comp.status?.[1] ? (
                <Success />
              ) : (
                <Error />
              )}
            </Table.DataCell>
            <Table.DataCell>{comp.desc ? comp.desc : "-"}</Table.DataCell>
          </Table.Row>
        );
      })}
      <Table.Row>
        <Table.HeaderCell>-</Table.HeaderCell>
        <Table.HeaderCell>
          <span>-</span>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <span>-</span>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <span>-</span>
        </Table.HeaderCell>
        <Table.HeaderCell>-</Table.HeaderCell>
      </Table.Row>

      {Components.map((comp) => {
        return (
          <Table.Row>
            <Table.HeaderCell>{comp.name}</Table.HeaderCell>
            <Table.DataCell>
              {comp.status?.[0] === undefined ? (
                <span>-</span>
              ) : comp.status?.[0] ? (
                <Success />
              ) : (
                <Error />
              )}
            </Table.DataCell>
            <Table.DataCell>
              {comp.status?.[1] === undefined ? (
                <span>-</span>
              ) : comp.status?.[1] ? (
                <Success />
              ) : (
                <Error />
              )}
            </Table.DataCell>
            <Table.DataCell>
              {comp.status?.[2] === undefined ? (
                <span>-</span>
              ) : comp.status?.[1] ? (
                <Success />
              ) : (
                <Error />
              )}
            </Table.DataCell>
            <Table.DataCell>{comp.desc ? comp.desc : "-"}</Table.DataCell>
          </Table.Row>
        );
      })}
    </Table.Body>
  </Table>
);

export default RoadmapTable;
