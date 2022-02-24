import { capitalize } from "@material-ui/core";
import { EllipsisCircleH } from "@navikt/ds-icons";
import React, { useState } from "react";
import { Table } from "../";
import { Button } from "../..";
import { SortState } from "../..";

export default {
  title: "ds-react/table",
  component: Table,
};

export const Hot = () => {
  const [sort, setSort] = useState<SortState>();

  const columns = [
    {
      key: "eier",
      name: "Eier",
      render: (value) =>
        value ?? (
          <Button
            size="xsmall"
            style={{ marginTop: -2, marginBottom: -2, marginLeft: -6 }}
            variant="tertiary"
          >
            Start saken
          </Button>
        ),
      value: (oppgave) => oppgave.saksbehandler?.navn,
      width: 152,
    },
    {
      key: "status",
      name: "Status",
      value: (oppgave) =>
        ({
          ALLE: "Alle",
          VEDTAK_FATTET: "Innvilget",
          AVVENTER_SAKSBEHANDLER: "Mottatt",
          SENDT_GOSYS: "Sendt GOSYS",
          TILDELT_SAKSBEHANDLER: "Under behandling",
        }[oppgave.status]),
      width: 154,
    },
    {
      key: "område",
      name: "Område",
      value: (oppgave) =>
        capitalize(oppgave.personinformasjon.funksjonsnedsettelse[0]),
      width: 152,
    },
    {
      key: "søknadOm",
      name: "Søknad om",
      width: 192,
    },
    {
      key: "hjelpemiddelbruker",
      name: "Hjelpemiddelbruker",
      value: (oppgave) =>
        `${oppgave.personinformasjon.etternavn}, ${oppgave.personinformasjon.fornavn}`,
      width: 188,
    },
    {
      key: "fødselsnr",
      name: "Fødselsnr.",
      value: (oppgave) =>
        `${oppgave.personinformasjon.fnr.slice(
          0,
          6
        )} ${oppgave.personinformasjon.fnr.slice(6)}`,
      width: 124,
    },
    {
      key: "bosted",
      name: "Bosted",
      value: (oppgave) => oppgave.personinformasjon.bosted,
      width: 144,
    },
    {
      key: "formidlerNavn",
      name: "Formidler",
      width: 164,
    },
    {
      key: "mottattDato",
      name: "Mottatt dato",
      width: 124,
    },
    {
      key: "menu",
      sortable: false,
      render: (value) => (
        <span style={{ display: "flex", marginBlock: -2 }}></span>
      ),
      value: (oppgave) => oppgave.saksbehandler,
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div style={{ overflow: "auto" }}>
        <Table
          size="small"
          style={{ width: "initial" }}
          sort={sort}
          onSortChange={(sortKey) =>
            setSort({
              orderBy: sortKey,
              direction:
                sort?.direction === "ascending" ? "descending" : "ascending",
            })
          }
        >
          <Table.Header>
            <Table.Row>
              {columns.map(({ key, name, width, sortable = true }) => (
                <Table.ColumnHeader
                  style={{
                    width,
                    minWidth: width,
                    maxWidth: width,
                  }}
                  key={key}
                  sortable={sortable}
                  sortKey={key}
                >
                  <div
                    style={{
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {name}
                  </div>
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data
              .slice()
              .sort((a, b) => {
                if (sort) {
                  const comparator = (a, b, orderBy) => {
                    const lookup = (oppgave) => {
                      const column = columns.find(({ key }) => key === orderBy);

                      return column.value
                        ? column.value(oppgave)
                        : oppgave[orderBy];
                    };

                    if (lookup(b) < lookup(a) || lookup(b) === undefined) {
                      return -1;
                    }
                    if (lookup(b) > lookup(a)) {
                      return 1;
                    }
                    return 0;
                  };

                  return sort.direction === "ascending"
                    ? comparator(b, a, sort.orderBy)
                    : comparator(a, b, sort.orderBy);
                }
                return 1;
              })
              .map((oppgave) => (
                <Table.Row key={oppgave.saksid}>
                  {columns.map(
                    ({ key, value, width, render = (value) => value }) => (
                      <Table.DataCell
                        style={{
                          width,
                          minWidth: width,
                          maxWidth: width,
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                        }}
                        title={oppgave[key]}
                        key={key}
                      >
                        {render(value ? value(oppgave) : oppgave[key], oppgave)}
                      </Table.DataCell>
                    )
                  )}
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

const data = [
  {
    saksid: "111111",
    søknadOm:
      "Søknad om: Toalettforhøyer; kalender-/minnesystem; støttehåndtak; tidsur; komfyr-/elvakt",
    mottattDato: "2021-09-19T13:55:45",
    formidlerNavn: "Kari Johansen",
    personinformasjon: {
      fnr: "19044238651",
      funksjonsnedsettelse: ["bevegelse"],
      fornavn: "Petter Andreas",
      etternavn: "Hansen",
      poststed: "Trondheim",
      bosted: "TRONDHEIM",
    },
    saksbehandler: null,
    status: "AVVENTER_SAKSBEHANDLER",
    enhet: [
      {
        enhetsnummer: "6969",
        enhetsnavn: "Enhetsnavn",
      },
    ],
  },
  {
    saksid: "222222",
    søknadOm: "Hjelpemidler",
    mottattDato: "2021-09-24T13:55:45",
    formidlerNavn: "Kari Johansen",
    personinformasjon: {
      fnr: "13044238651",
      funksjonsnedsettelse: ["bevegelse"],
      fornavn: "Mia Cathrine",
      etternavn: "Svendsen",
      poststed: "Trondheim",
      bosted: "TRONDHEIM",
    },
    saksbehandler: null,
    status: "AVVENTER_SAKSBEHANDLER",
    enhet: [
      {
        enhetsnummer: "6969",
        enhetsnavn: "Enhetsnavn",
      },
    ],
  },

  {
    saksid: "5878444",
    søknadOm: "Hjelpemidler",
    mottattDato: "2021-09-20T13:55:45",
    formidlerNavn: "Kari Johansen",
    personinformasjon: {
      fnr: "130441386551",
      funksjonsnedsettelse: ["bevegelse"],
      fornavn: "Per Bjørkli",
      etternavn: "Hansen",
      poststed: "Trondheim",
      bosted: "TRONDHEIM",
    },
    saksbehandler: {
      epost: "a.b@nav.no",
      objectId: "23ea7485-1324-4b25-a763-6969",
      navn: "Geir Markusen",
    },
    status: "SENDT_GOSYS",
    enhet: [
      {
        enhetsnummer: "6969",
        enhetsnavn: "Enhetsnavn",
      },
    ],
  },

  {
    saksid: "1234567",
    søknadOm: "Hjelpemidler",
    mottattDato: "2021-06-25T13:55:45",
    formidlerNavn: "Kari Johansen",
    personinformasjon: {
      fnr: "06115559891",
      funksjonsnedsettelse: ["kognisjon"],
      fornavn: "Iver",
      etternavn: "Slettan",
      poststed: "Lade",
      bosted: "TRONDHEIM",
    },
    saksbehandler: {
      epost: "a.b@nav.no",
      objectId: "23ea7485-1324-4b25-a763-assdfdfa",
      navn: "Silje Saksbehandler",
    },
    status: "TILDELT_SAKSBEHANDLER",
    enhet: [
      {
        enhetsnummer: "6969",
        enhetsnavn: "Enhetsnavn",
      },
    ],
  },
  {
    saksid: "999999",
    søknadOm: "Hjelpemidler",
    mottattDato: "2021-06-25T16:55:45",
    formidlerNavn: "Kari Johansen",
    personinformasjon: {
      fnr: "16120101181",
      funksjonsnedsettelse: ["bevegelse"],
      fornavn: "Sondre",
      etternavn: "Hansen",
      poststed: "Lade",
      bosted: "TRONDHEIM",
    },
    saksbehandler: {
      epost: "a.b@nav.no",
      objectId: "23ea7485-1324-4b25-a763-6969",
      navn: "Geir Markusen",
    },
    status: "TILDELT_SAKSBEHANDLER",
    enhet: [
      {
        enhetsnummer: "6969",
        enhetsnavn: "Enhetsnavn",
      },
    ],
  },
  {
    saksid: "888888",
    søknadOm: "Hjelpemidler",
    mottattDato: "2021-09-19T13:55:45",
    formidlerNavn: "Kari Johansen",
    personinformasjon: {
      fnr: "19044238651",
      funksjonsnedsettelse: ["bevegelse"],
      fornavn: "Geir",
      etternavn: "Dalby",
      poststed: "Trondheim",
      bosted: "TRONDHEIM",
    },
    saksbehandler: {
      epost: "a.b@nav.no",
      objectId: "23ea7485-1324-4b25-a763-assdfdfa",
      navn: "Silje Saksbehandler",
    },
    status: "VEDTAK_FATTET",
    enhet: [
      {
        enhetsnummer: "6969",
        enhetsnavn: "Enhetsnavn",
      },
    ],
  },
];
