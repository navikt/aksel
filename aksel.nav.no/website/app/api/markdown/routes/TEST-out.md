---
title: Alle komponenter i Aksel
url: https://aksel.nav.no/komponenter.md
---

# Alle komponenter

Oversikt over alle komponenter i Aksel

<component name="Accordion" status="ready" category="core">

# Accordion

Accordion er en liste der du kan vise og skjule innhold.

## Eksempler

### Eksempel: Demo

```tsx
import { Accordion, Link } from "@navikt/ds-react";

const Example = () => {
  return (
    <Accordion>
      <Accordion.Item>
        <Accordion.Header>Til deg som er mellom 62 og 67 år</Accordion.Header>
        <Accordion.Content>
          Hvis du er mellom 62 og 67 år når du søker, må du som hovedregel ha
          hatt en pensjonsgivende inntekt som tilsvarer x G, året før du fikk
          nedsatt arbeidsevnen. Nav kan gjøre <Link href="#">unntak</Link>.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Header>
          Til deg som har yrkesskade eller yrkessykdom
        </Accordion.Header>
        <Accordion.Content>
          Med yrkesskade mener vi at du har fått en skade som følge av en
          arbeidsulykke. Vi kan godkjenne en sykdom som yrkessykdom hvis den
          kommer av skadelig påvirkning fra arbeidsmiljøet.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Header>Til deg som er helt frisk</Accordion.Header>
        <Accordion.Content>
          Da er det lite som trengs å gjøres.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};
```

### Eksempel: Default open

```tsx
import { Accordion, Link } from "@navikt/ds-react";

const Example = () => {
  return (
    <Accordion>
      <Accordion.Item>
        <Accordion.Header>Til deg som er mellom 62 og 67 år</Accordion.Header>
        <Accordion.Content>
          Hvis du er mellom 62 og 67 år når du søker, må du som hovedregel ha
          hatt en pensjonsgivende inntekt som tilsvarer x G, året før du fikk
          nedsatt arbeidsevnen. Nav kan gjøre <Link href="#">unntak</Link>.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item defaultOpen>
        <Accordion.Header>
          Til deg som har yrkesskade eller yrkessykdom
        </Accordion.Header>
        <Accordion.Content>
          Med yrkesskade mener vi at du har fått en skade som følge av en
          arbeidsulykke. Vi kan godkjenne en sykdom som yrkessykdom hvis den
          kommer av skadelig påvirkning fra arbeidsmiljøet.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Header>Til deg som er helt frisk</Accordion.Header>
        <Accordion.Content>
          Da er det lite som trengs å gjøres.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};
```

### Eksempel: Size

```tsx
import { Accordion, Heading, Link } from "@navikt/ds-react";

const Example = () => {
  return (
    <>
      <Heading size="small" spacing textColor="subtle">
        size=large
      </Heading>
      <Accordion size="large">
        <Accordion.Item>
          <Accordion.Header>Til deg mellom 62 og 67 år</Accordion.Header>
          <Accordion.Content>
            Hvis du er mellom 62 og 67 år når du søker, må du som hovedregel ha
            hatt en pensjonsgivende inntekt som tilsvarer x G, året før du fikk
            nedsatt arbeidsevnen. Nav kan gjøre <Link href="#">unntak</Link>.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
      <br />

      <Heading size="small" spacing textColor="subtle">
        size=medium
      </Heading>
      <Accordion size="medium">
        <Accordion.Item>
          <Accordion.Header>Til deg mellom 62 og 67 år</Accordion.Header>
          <Accordion.Content>
            Hvis du er mellom 62 og 67 år når du søker, må du som hovedregel ha
            hatt en pensjonsgivende inntekt som tilsvarer x G, året før du fikk
            nedsatt arbeidsevnen. Nav kan gjøre <Link href="#">unntak</Link>.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
      <br />

      <Heading size="small" spacing textColor="subtle">
        size=small
      </Heading>
      <Accordion size="small">
        <Accordion.Item>
          <Accordion.Header>Til deg mellom 62 og 67 år</Accordion.Header>
          <Accordion.Content>
            Hvis du er mellom 62 og 67 år når du søker, må du som hovedregel ha
            hatt en pensjonsgivende inntekt som tilsvarer x G, året før du fikk
            nedsatt arbeidsevnen. Nav kan gjøre <Link href="#">unntak</Link>.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
      <br />
    </>
  );
};
```

### Eksempel: Controlled state

```tsx
import { useState } from "react";
import { Accordion, Button, VStack } from "@navikt/ds-react";

const Example = () => {
  const [open, setOpen] = useState(false);

  return (
    <VStack gap="space-8" align="center">
      <Button variant="secondary" onClick={() => setOpen(!open)}>
        Toggle Accordion
      </Button>
      <Accordion>
        <Accordion.Item open={open}>
          <Accordion.Header>Til deg som er mellom 62 og 67 år</Accordion.Header>
          <Accordion.Content>
            Hvis du er mellom 62 og 67 år når du søker, må du som hovedregel ha
            hatt en pensjonsgivende inntekt som tilsvarer x G, året før du fikk
            nedsatt arbeidsevnen. Nav kan gjøre unntak.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item open={open}>
          <Accordion.Header>
            Til deg som har yrkesskade eller yrkessykdom
          </Accordion.Header>
          <Accordion.Content>
            Med yrkesskade mener vi at du har fått en skade som følge av en
            arbeidsulykke. Vi kan godkjenne en sykdom som yrkessykdom hvis den
            kommer av skadelig påvirkning fra arbeidsmiljøet.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </VStack>
  );
};
```

## Retningslinjer

### Relatert innhold

Innholdet i Accordion bør høre sammen. Tenk på det som en liste. Hvis du bruker Accordion for å gruppere mye urelatert innhold blir det vanskeligere for brukeren å finne informasjonen de leter etter.

### Antall Items

- **DO: **: En Accordion brukes som en liste med relatert innhold.
- **DON'T: **: Ikke bruk Accordion med bare ett Item.

### Unngå viktig innhold

Du må regne med at innholdet i en Accordion blir oversett. Derfor bør innholdet ikke være avgjørende for at brukeren skjønner helheten i informasjonen du vil formidle.

### Innhold i Accordion.Header

Accordion.Header er kodet med `<button />` og vil ikke være et heading-element som h2, h3 eller lignende. På grunn av dette må man være forsiktig med å bruke rikt innhold her da skjermlesere vil ignorere semantikken. [Les mer om phrasing content på MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories#phrasing_content).

- **DON'T: **: Ikke legg inn rikt innhold i headeren.

## Props

**Accordion**

Component: `Accordion` | Extends: `HTMLDivElement`

| Prop                      | Type                                                              | Default  | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------------------- | ----------------------------------------------------------------- | -------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Deprecated: variant`     | `"default" \| "neutral"`                                          | -        | No       | **Deprecated:** Will be removed in a future major version. Use `data-color` instead.                                                                                                                                                                                                                                                                                                                                                         |
| `size`                    | `"large" \| "medium" \| "small"`                                  | "medium" | No       |                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `indent`                  | `boolean`                                                         | true     | No       | Whether to indent content or not.                                                                                                                                                                                                                                                                                                                                                                                                            |
| `children`                | `ReactNode`                                                       | -        | Yes      | Instances of `Accordion.Item`.                                                                                                                                                                                                                                                                                                                                                                                                               |
| `Deprecated: headingSize` | `"large" \| "medium" \| "small" \| "xsmall"`                      | -        | No       | **Deprecated:** No longer has any effect.                                                                                                                                                                                                                                                                                                                                                                                                    |
| `data-color`              | `AkselMainColorRole \| AkselBrandColorRole \| AkselMetaColorRole` | -        | No       | Overrides inherited color. We recommend only using `accent` and `neutral`. We have disallowed status-colors. @see 🏷️ {@link AkselColor } @see [📝 Documentation](https://aksel.nav.no/grunnleggende/styling/farger-tokens)                                                                                                                                                                                                                   |
| `as`                      | `"div" \| "section"`                                              | "div"    | No       | Changes the HTML element used for the root element. **When using `section`, provide either `aria-label` or `aria-labelledby` for better accessibility.** `axe-core` might warn about unique landmarks if you have multiple Accordions on page with the same label. In those cases consider updating to unique `aria-label` or `aria-labelledby` props. @see [📝 Landmarks unique](https://dequeuniversity.com/rules/axe/4.6/landmark-unique) |
| `className`               | `string`                                                          | -        | No       |                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `ref`                     | `Ref<HTMLDivElement>`                                             | -        | No       |                                                                                                                                                                                                                                                                                                                                                                                                                                              |

**Accordion.Item**

Component: `AccordionItem` | Extends: `HTMLDivElement`

| Prop           | Type                        | Default | Required | Description                                                                                 |
| -------------- | --------------------------- | ------- | -------- | ------------------------------------------------------------------------------------------- |
| `children`     | `ReactNode`                 | -       | Yes      | Content in Accordion.Item. Should include one Accordion.Header and one Accordion.Content.   |
| `open`         | `boolean`                   | -       | No       | Controlled open-state. Using this removes automatic control of open-state.                  |
| `defaultOpen`  | `boolean`                   | false   | No       | The open state when initially rendered. Use when you do not need to control the open state. |
| `onOpenChange` | `((open: boolean) => void)` | -       | No       | Callback for current open-state.                                                            |
| `className`    | `string`                    | -       | No       |                                                                                             |
| `ref`          | `Ref<HTMLDivElement>`       | -       | No       |                                                                                             |

**Accordion.Header**

Component: `AccordionHeader` | Extends: `HTMLButtonElement`

| Prop        | Type                     | Default | Required | Description                  |
| ----------- | ------------------------ | ------- | -------- | ---------------------------- |
| `children`  | `ReactNode`              | -       | Yes      | Text inside Accordion.Header |
| `className` | `string`                 | -       | No       |                              |
| `ref`       | `Ref<HTMLButtonElement>` | -       | No       |                              |

**Accordion.Content**

Component: `AccordionContent` | Extends: `HTMLDivElement`

| Prop        | Type                  | Default | Required | Description                      |
| ----------- | --------------------- | ------- | -------- | -------------------------------- |
| `children`  | `ReactNode`           | -       | Yes      | Content inside Accordion.Content |
| `className` | `string`              | -       | No       |                                  |
| `ref`       | `Ref<HTMLDivElement>` | -       | No       |                                  |

## Tokens

Komponent-tokens ikke støttet fra versjon 8.0.0 og nyere. Bruk theming og `data-color`-attrbutten for å style komponenter basert på tokens.

</component>

<component name="ActionMenu" status="ready" category="core">

# ActionMenu

ActionMenu er en nedtrekksmeny for handlinger og navigasjon. Ofte brukt for å samle relaterte handlinger og redusere unødvendig støy (visuell kompleksitet) i grensesnitt.

## Eksempler

### Eksempel: Items

```tsx
import { ChevronDownIcon } from "@navikt/aksel-icons";
import { ActionMenu, Button } from "@navikt/ds-react";

const Example = () => {
  return (
    <ActionMenu>
      <ActionMenu.Trigger>
        <Button
          data-color="neutral"
          variant="secondary"
          icon={<ChevronDownIcon aria-hidden />}
          iconPosition="right"
        >
          Meny
        </Button>
      </ActionMenu.Trigger>
      <ActionMenu.Content>
        <ActionMenu.Group label="Systemer og oppslagsverk">
          <ActionMenu.Item onSelect={console.info}>A-inntekt</ActionMenu.Item>
          <ActionMenu.Item onSelect={console.info}>
            Aa-registeret
          </ActionMenu.Item>
          <ActionMenu.Item onSelect={console.info}>Gosys</ActionMenu.Item>
          <ActionMenu.Item onSelect={console.info}>
            Modia Sykefraværsoppfølging
          </ActionMenu.Item>
          <ActionMenu.Item onSelect={console.info}>
            Modia Personoversikt
          </ActionMenu.Item>
        </ActionMenu.Group>
      </ActionMenu.Content>
    </ActionMenu>
  );
};
```

### Eksempel: Groups

Ved å gruppere elementer i ActionMenu vil menyen bli mer oversiktlig og lettere å navigere. Dette vil være ekstra viktig for komplese menyer som inneholder ulike kontekster og funksjonalitet.

```tsx
import {
  BarChartIcon,
  ChevronDownIcon,
  HandshakeIcon,
  MagnifyingGlassIcon,
  PersonGroupIcon,
  PersonIcon,
} from "@navikt/aksel-icons";
import { ActionMenu, Button } from "@navikt/ds-react";

const Example = () => {
  return (
    <ActionMenu>
      <ActionMenu.Trigger>
        <Button
          data-color="neutral"
          variant="secondary"
          icon={<ChevronDownIcon aria-hidden />}
          iconPosition="right"
        >
          Meny
        </Button>
      </ActionMenu.Trigger>
      <ActionMenu.Content>
        <ActionMenu.Group label="Gosys">
          <ActionMenu.Item onSelect={console.info} icon={<PersonIcon />}>
            Personoversikt
          </ActionMenu.Item>
          <ActionMenu.Item onSelect={console.info} icon={<PersonGroupIcon />}>
            Arbeidsgiveroversikt
          </ActionMenu.Item>
          <ActionMenu.Item onSelect={console.info} icon={<HandshakeIcon />}>
            Samhandlere
          </ActionMenu.Item>
          <ActionMenu.Item
            onSelect={console.info}
            disabled
            icon={<BarChartIcon />}
          >
            Oppgavestatistikk
          </ActionMenu.Item>
          <ActionMenu.Item
            onSelect={console.info}
            icon={<MagnifyingGlassIcon />}
          >
            Søk journalpost
          </ActionMenu.Item>
        </ActionMenu.Group>
        <ActionMenu.Divider />
        <ActionMenu.Group label="Systemer og oppslagsverk">
          <ActionMenu.Item onSelect={console.info}>A-inntekt</ActionMenu.Item>
          <ActionMenu.Item onSelect={console.info}>
            Aa-registeret
          </ActionMenu.Item>
          <ActionMenu.Item onSelect={console.info}>Modia</ActionMenu.Item>
        </ActionMenu.Group>
      </ActionMenu.Content>
    </ActionMenu>
  );
};
```

### Eksempel: Shortcuts

Du vil selv måtte legge til funksjonalitet for å lytte til tastatursnarveier.

```tsx
import { ChevronDownIcon } from "@navikt/aksel-icons";
import { ActionMenu, Button } from "@navikt/ds-react";

const Example = () => {
  return (
    <ActionMenu>
      <ActionMenu.Trigger>
        <Button
          data-color="neutral"
          variant="secondary"
          icon={<ChevronDownIcon aria-hidden />}
          iconPosition="right"
        >
          Meny
        </Button>
      </ActionMenu.Trigger>
      <ActionMenu.Content>
        <ActionMenu.Group label="Gosys">
          <ActionMenu.Item onSelect={console.info} shortcut="Ctrl+A">
            Personoversikt
          </ActionMenu.Item>
          <ActionMenu.Item onSelect={console.info} shortcut="Ctrl+K">
            Arbeidsgiveroversikt
          </ActionMenu.Item>
          <ActionMenu.Item onSelect={console.info} shortcut="Ctrl+S">
            Samhandlere
          </ActionMenu.Item>
          <ActionMenu.Item onSelect={console.info} shortcut="Ctrl+E">
            Oppgavestatistikk
          </ActionMenu.Item>
          <ActionMenu.Item onSelect={console.info} shortcut="Ctrl+L">
            Søk journalpost
          </ActionMenu.Item>
        </ActionMenu.Group>
        <ActionMenu.Divider />
        <ActionMenu.Group label="Systemer og oppslagsverk">
          <ActionMenu.Item onSelect={console.info}>A-inntekt</ActionMenu.Item>
          <ActionMenu.Item onSelect={console.info}>
            Aa-registeret
          </ActionMenu.Item>
          <ActionMenu.Item onSelect={console.info}>Modia</ActionMenu.Item>
        </ActionMenu.Group>
      </ActionMenu.Content>
    </ActionMenu>
  );
};
```

### Eksempel: Sub menu

Undermenyer lar deg forenkle komplekse grensesnitt og filter ved å flytte innholdet til en godt strukturert meny. Vi anbefaler maks to nivåer med undermenyer.

```tsx
import { MenuElipsisVerticalIcon } from "@navikt/aksel-icons";
import { ActionMenu, Button, Table } from "@navikt/ds-react";

const Example = () => {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell scope="col">ID</Table.HeaderCell>
          <Table.HeaderCell scope="col">Status</Table.HeaderCell>
          <Table.HeaderCell />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map(({ id, status }, i) => {
          return (
            <Table.Row key={i + status} shadeOnHover={false}>
              <Table.HeaderCell scope="row">{id}</Table.HeaderCell>
              <Table.DataCell>{status}</Table.DataCell>
              <Table.DataCell align="right">
                <ActionMenu>
                  <ActionMenu.Trigger>
                    <Button
                      data-color="neutral"
                      variant="tertiary"
                      icon={<MenuElipsisVerticalIcon title="Saksmeny" />}
                      size="small"
                    />
                  </ActionMenu.Trigger>
                  <ActionMenu.Content>
                    <ActionMenu.Group label={`Sak #${id}`}>
                      <ActionMenu.Item onSelect={console.info}>
                        Ta sak
                      </ActionMenu.Item>
                      <ActionMenu.Sub>
                        <ActionMenu.SubTrigger>
                          Endre status
                        </ActionMenu.SubTrigger>
                        <ActionMenu.SubContent>
                          <ActionMenu.Item onSelect={console.info}>
                            Avslått
                          </ActionMenu.Item>
                          <ActionMenu.Item onSelect={console.info}>
                            Godkjent
                          </ActionMenu.Item>
                          <ActionMenu.Sub>
                            <ActionMenu.SubTrigger>
                              Andre valg
                            </ActionMenu.SubTrigger>
                            <ActionMenu.SubContent>
                              <ActionMenu.Item onSelect={console.info}>
                                Til godkjenning
                              </ActionMenu.Item>
                              <ActionMenu.Item onSelect={console.info}>
                                Under behandling
                              </ActionMenu.Item>
                              <ActionMenu.Item onSelect={console.info}>
                                Under kontroll
                              </ActionMenu.Item>
                            </ActionMenu.SubContent>
                          </ActionMenu.Sub>
                        </ActionMenu.SubContent>
                      </ActionMenu.Sub>
                      <ActionMenu.Sub>
                        <ActionMenu.SubTrigger>
                          Tildel saksbehandler
                        </ActionMenu.SubTrigger>
                        <ActionMenu.SubContent>
                          <ActionMenu.Group label="Saksbehandlere">
                            <ActionMenu.Item onSelect={console.info}>
                              Ola Normann
                            </ActionMenu.Item>
                            <ActionMenu.Item onSelect={console.info}>
                              Bo Ramberg
                            </ActionMenu.Item>
                            <ActionMenu.Item onSelect={console.info} disabled>
                              Ole Olsen
                            </ActionMenu.Item>
                            <ActionMenu.Item onSelect={console.info} disabled>
                              Janne Nilssen
                            </ActionMenu.Item>
                            <ActionMenu.Item onSelect={console.info}>
                              Karin Jakobsen
                            </ActionMenu.Item>
                            <ActionMenu.Item onSelect={console.info}>
                              Kari Nordmann
                            </ActionMenu.Item>
                          </ActionMenu.Group>
                        </ActionMenu.SubContent>
                      </ActionMenu.Sub>

                      <ActionMenu.Divider />

                      <ActionMenu.Item variant="danger" onSelect={console.info}>
                        Slett sak
                      </ActionMenu.Item>
                    </ActionMenu.Group>
                  </ActionMenu.Content>
                </ActionMenu>
              </Table.DataCell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

const data = [
  {
    id: "03121",
    status: "Avslått",
  },
  {
    id: "16066",
    status: "Mottatt",
  },
  {
    id: "18124",
    status: "Godkjent",
  },
  {
    id: "24082",
    status: "Mottatt",
  },
];
```

### Eksempel: Filter

Med CheckboxItem og RadioItem i ActionMenu er det enkelt å lage et filter for tabeller eller andre komplekse grensesnitt.

```tsx
import React from "react";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import { ActionMenu, Button } from "@navikt/ds-react";

const Example = () => {
  const [views, setViews] = React.useState({
    started: true,
    fnr: false,
    tags: true,
  });
  const [rows, setRows] = React.useState<string>("5");

  const handleCheckboxChange = (checkboxId: string) => {
    setViews((prevState) => ({
      ...prevState,
      [checkboxId]: !prevState[checkboxId],
    }));
  };

  return (
    <ActionMenu>
      <ActionMenu.Trigger>
        <Button
          data-color="neutral"
          variant="secondary"
          icon={<ChevronDownIcon aria-hidden />}
          iconPosition="right"
        >
          Filter
        </Button>
      </ActionMenu.Trigger>
      <ActionMenu.Content>
        <ActionMenu.Group label="Kolonner">
          <ActionMenu.CheckboxItem
            checked={
              Object.values(views).every(Boolean)
                ? true
                : Object.values(views).some(Boolean)
                  ? "indeterminate"
                  : false
            }
            onCheckedChange={() => {
              const allChecked = Object.values(views).every(Boolean);
              setViews((prevState) =>
                Object.keys(prevState).reduce(
                  (acc, key) => {
                    acc[key] = !allChecked;
                    return acc;
                  },
                  {} as typeof views,
                ),
              );
            }}
          >
            Velg alle
          </ActionMenu.CheckboxItem>
          <ActionMenu.CheckboxItem
            checked={views.started}
            onCheckedChange={() => handleCheckboxChange("started")}
          >
            Oppfølging startet
          </ActionMenu.CheckboxItem>
          <ActionMenu.CheckboxItem
            checked={views.fnr}
            onCheckedChange={() => handleCheckboxChange("fnr")}
          >
            Fødselsnummer
          </ActionMenu.CheckboxItem>
          <ActionMenu.CheckboxItem
            checked={views.tags}
            onCheckedChange={() => handleCheckboxChange("tags")}
          >
            Tags
          </ActionMenu.CheckboxItem>
        </ActionMenu.Group>
        <ActionMenu.Divider />
        <ActionMenu.RadioGroup
          onValueChange={setRows}
          value={rows}
          label="Rader per side"
        >
          <ActionMenu.RadioItem value="5">5</ActionMenu.RadioItem>
          <ActionMenu.RadioItem value="10">10</ActionMenu.RadioItem>
          <ActionMenu.RadioItem value="25">25</ActionMenu.RadioItem>
          <ActionMenu.RadioItem value="50">50</ActionMenu.RadioItem>
        </ActionMenu.RadioGroup>
      </ActionMenu.Content>
    </ActionMenu>
  );
};
```

### Eksempel: Header

InternalHeader er implementert med 'dark mode' som standard. For at ActionMenu skal vises riktig kan Theme-komponenten med riktig globalt 'theme' brukes rundt ActionMenu.Content.

```tsx
import {
  BarChartIcon,
  HandshakeIcon,
  MagnifyingGlassIcon,
  MenuGridIcon,
  PersonGroupIcon,
  PersonIcon,
} from "@navikt/aksel-icons";
import { ActionMenu, InternalHeader, Spacer, Theme } from "@navikt/ds-react";

const Example = () => {
  return (
    <InternalHeader>
      <InternalHeader.Title as="h1">Sykepenger</InternalHeader.Title>
      <Spacer />
      <ActionMenu>
        <ActionMenu.Trigger>
          <InternalHeader.Button>
            <MenuGridIcon fontSize="1.5rem" title="Systemer og oppslagsverk" />
          </InternalHeader.Button>
        </ActionMenu.Trigger>
        <Theme theme="light">
          <ActionMenu.Content>
            <ActionMenu.Group label="Gosys">
              <ActionMenu.Item onSelect={console.info} icon={<PersonIcon />}>
                Personoversikt
              </ActionMenu.Item>
              <ActionMenu.Item
                onSelect={console.info}
                icon={<PersonGroupIcon />}
              >
                Arbeidsgiveroversikt
              </ActionMenu.Item>
              <ActionMenu.Item onSelect={console.info} icon={<HandshakeIcon />}>
                Samhandlere
              </ActionMenu.Item>
              <ActionMenu.Item
                onSelect={console.info}
                disabled
                icon={<BarChartIcon />}
              >
                Oppgavestatistikk
              </ActionMenu.Item>
              <ActionMenu.Item
                onSelect={console.info}
                icon={<MagnifyingGlassIcon />}
              >
                Søk journalpost
              </ActionMenu.Item>
            </ActionMenu.Group>
            <ActionMenu.Divider />
            <ActionMenu.Group label="Systemer og oppslagsverk">
              <ActionMenu.Item onSelect={console.info}>
                A-inntekt
              </ActionMenu.Item>
              <ActionMenu.Item onSelect={console.info}>
                Aa-registeret
              </ActionMenu.Item>
              <ActionMenu.Item onSelect={console.info}>Modia</ActionMenu.Item>
            </ActionMenu.Group>
          </ActionMenu.Content>
        </Theme>
      </ActionMenu>

      <InternalHeader.User name="Ola Normann" />
    </InternalHeader>
  );
};
```

### Eksempel: Links

```tsx
import { ChevronDownIcon } from "@navikt/aksel-icons";
import { ActionMenu, Button } from "@navikt/ds-react";
import { NextLink } from "@/app/_ui/next-link/NextLink";

const Example = () => {
  return (
    <ActionMenu>
      <ActionMenu.Trigger>
        <Button
          data-color="neutral"
          variant="secondary"
          icon={<ChevronDownIcon aria-hidden />}
          iconPosition="right"
        >
          Meny
        </Button>
      </ActionMenu.Trigger>
      <ActionMenu.Content>
        <ActionMenu.Group label="Se kode for implementasjon">
          <ActionMenu.Item as="a" href="/eksempel">
            Vanlig lenke
          </ActionMenu.Item>
          <NextLink href="/eksempel" passHref legacyBehavior>
            <ActionMenu.Item as="a">Next.js-lenke</ActionMenu.Item>
          </NextLink>
          <ActionMenu.Item>React router (se kommentert kode)</ActionMenu.Item>
          <ActionMenu.Item>Remix (se kommentert kode)</ActionMenu.Item>
        </ActionMenu.Group>
      </ActionMenu.Content>
    </ActionMenu>
  );
};

/*

import { Link as ReactRouterLink } from "react-router";
const ReactRouterExample = () => {
  const navigate = useNavigate();
  ...
  <ActionMenu.Item as={ReactRouterLink} to="#">
      React Router
  </ActionMenu.Item>
}

import { Link as RemixLink } from "@remix-run/react";
const RemixExample = () => (
  <ActionMenu.Item as={RemixLink} to="#">
      React Router
  </ActionMenu.Item>
);

*/
```

### Eksempel: Danger

```tsx
import {
  ChevronDownIcon,
  PersonPlusIcon,
  TasklistIcon,
  TrashIcon,
} from "@navikt/aksel-icons";
import { ActionMenu, Button } from "@navikt/ds-react";

const Example = () => {
  return (
    <ActionMenu>
      <ActionMenu.Trigger>
        <Button
          data-color="neutral"
          variant="secondary"
          icon={<ChevronDownIcon aria-hidden />}
          iconPosition="right"
        >
          Meny
        </Button>
      </ActionMenu.Trigger>
      <ActionMenu.Content>
        <ActionMenu.Group label="Sak #12345">
          <ActionMenu.Item onSelect={console.info} icon={<PersonPlusIcon />}>
            Tildel selv
          </ActionMenu.Item>
          <ActionMenu.Item onSelect={console.info} icon={<TasklistIcon />}>
            Godkjenn
          </ActionMenu.Item>
          <ActionMenu.Divider />
          <ActionMenu.Item
            variant="danger"
            onSelect={console.info}
            icon={<TrashIcon />}
          >
            Slett sak
          </ActionMenu.Item>
        </ActionMenu.Group>
      </ActionMenu.Content>
    </ActionMenu>
  );
};
```

### Eksempel: Modal interaction

```tsx
import { useRef } from "react";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import { ActionMenu, BodyLong, Button, Modal } from "@navikt/ds-react";

const Example = () => {
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <div>
      <ActionMenu>
        <ActionMenu.Trigger>
          <Button
            data-color="neutral"
            variant="secondary"
            icon={<ChevronDownIcon aria-hidden />}
            iconPosition="right"
          >
            Meny
          </Button>
        </ActionMenu.Trigger>
        <ActionMenu.Content>
          <ActionMenu.Item onSelect={() => ref.current?.showModal()}>
            Åpne modal
          </ActionMenu.Item>
        </ActionMenu.Content>
      </ActionMenu>
      <Modal ref={ref} header={{ heading: "Overskrift" }}>
        <Modal.Body>
          <BodyLong>
            Culpa aliquip ut cupidatat laborum minim quis ex in aliqua. Qui
            incididunt dolor do ad ut. Incididunt eiusmod nostrud deserunt duis
            laborum. Proident aute culpa qui nostrud velit adipisicing minim.
            Consequat aliqua aute dolor do sit Lorem nisi mollit velit. Aliqua
            exercitation non minim minim pariatur sunt laborum ipsum.
            Exercitation nostrud est laborum magna non non aliqua qui esse.
          </BodyLong>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" onClick={() => ref.current?.close()}>
            Lukk
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
```

### Eksempel: Left icon position

```tsx
import {
  CheckmarkCircleIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  PersonIcon,
  XMarkOctagonIcon,
} from "@navikt/aksel-icons";
import { ActionMenu, Button } from "@navikt/ds-react";

const Example = () => {
  return (
    <ActionMenu>
      <ActionMenu.Trigger>
        <Button
          data-color="neutral"
          variant="secondary"
          icon={<ChevronDownIcon aria-hidden />}
          iconPosition="right"
        >
          Meny
        </Button>
      </ActionMenu.Trigger>
      <ActionMenu.Content>
        <ActionMenu.Group label="Handlinger">
          <ActionMenu.Item
            onSelect={console.info}
            icon={<PersonIcon aria-hidden />}
          >
            Personoversikt
          </ActionMenu.Item>
          <ActionMenu.Item
            onSelect={console.info}
            icon={<MagnifyingGlassIcon aria-hidden />}
          >
            Søk journalpost
          </ActionMenu.Item>
        </ActionMenu.Group>
        <ActionMenu.Divider />
        <ActionMenu.Group label="Sak #12345">
          <ActionMenu.Sub>
            <ActionMenu.SubTrigger icon={<PencilIcon aria-hidden />}>
              Endre status
            </ActionMenu.SubTrigger>
            <ActionMenu.SubContent>
              <ActionMenu.Item
                onSelect={console.info}
                icon={<CheckmarkCircleIcon aria-hidden />}
              >
                Godkjent
              </ActionMenu.Item>
              <ActionMenu.Item
                onSelect={console.info}
                icon={<XMarkOctagonIcon aria-hidden />}
              >
                Avslått
              </ActionMenu.Item>
            </ActionMenu.SubContent>
          </ActionMenu.Sub>
        </ActionMenu.Group>
      </ActionMenu.Content>
    </ActionMenu>
  );
};
```

### Eksempel: Right icon position

```tsx
import {
  CheckmarkCircleIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  PersonIcon,
  XMarkOctagonIcon,
} from "@navikt/aksel-icons";
import { ActionMenu, Button } from "@navikt/ds-react";

const Example = () => {
  return (
    <ActionMenu>
      <ActionMenu.Trigger>
        <Button
          data-color="neutral"
          variant="secondary"
          icon={<ChevronDownIcon aria-hidden />}
          iconPosition="right"
        >
          Meny
        </Button>
      </ActionMenu.Trigger>
      <ActionMenu.Content>
        <ActionMenu.Group label="Handlinger">
          <ActionMenu.Item
            onSelect={console.info}
            icon={<PersonIcon aria-hidden />}
            iconPosition="right"
          >
            Personoversikt
          </ActionMenu.Item>
          <ActionMenu.Item
            onSelect={console.info}
            icon={<MagnifyingGlassIcon aria-hidden />}
            iconPosition="right"
          >
            Søk journalpost
          </ActionMenu.Item>
        </ActionMenu.Group>
        <ActionMenu.Divider />
        <ActionMenu.Group label="Sak #12345">
          <ActionMenu.Sub>
            <ActionMenu.SubTrigger
              icon={<PencilIcon aria-hidden />}
              iconPosition="right"
            >
              Endre status
            </ActionMenu.SubTrigger>
            <ActionMenu.SubContent>
              <ActionMenu.Item
                onSelect={console.info}
                icon={<CheckmarkCircleIcon aria-hidden />}
                iconPosition="right"
              >
                Godkjent
              </ActionMenu.Item>
              <ActionMenu.Item
                onSelect={console.info}
                icon={<XMarkOctagonIcon aria-hidden />}
                iconPosition="right"
              >
                Avslått
              </ActionMenu.Item>
            </ActionMenu.SubContent>
          </ActionMenu.Sub>
        </ActionMenu.Group>
      </ActionMenu.Content>
    </ActionMenu>
  );
};
```

## Retningslinjer

ActionMenu kan være en nyttig komponent for å gjemme sekundære handlinger som ikke nødvendigvis trenger å være tilgjengelige for brukeren til enhver tid. Men som en konsekvens vil dette kreve at brukeren er bedre kjent med systemet og hvilke funksjonaliteter som er gjemt bak hva. Vær forsiktig med bruk av komponenten på åpne brukerflater og vær klar over at innholdet i komponenten ikke nødvendigvis vil bli oppdaget av alle.

### ActionMenu.Trigger

Trigger skal alltid være koblet til en knapp. ActionMenu skal aldri være koblet til en primærhandling, som f.eks en primary button.

Knapp som åpner ActionMenu bør alltid ha ikon for å bedre indikere hvilken handling elementet utfører ved interaksjon. [ChevronDownIcon](https://aksel.nav.no/ikoner/ChevronDown) vil i de fleste tilfeller være go-to ikon.

### Gruppering

[Se eksempel for Gruppering](https://aksel.nav.no/komponenter/core/actionmenu?demo=actionmenudemo-groups)

Som hovedregel bør elementer grupperes med `ActionMenu.Group`.

- Hvis CheckboxItem eller RadioItem blir brukt, skal disse **alltid** grupperes.
- Du bestemmer selv om du vil bruke en visuell label med `label`-prop eller `aria-label`.
- Hvis menyen inneholder flere grupperinger, bør disse skilles ved bruk av `ActionMenu.Divider`.

Unntaket er tilfeller der alle elementer i menyen har samme kontekst, men da skal `ActionMenu.Trigger` (handlingen som åpner menyen) klart formidle konteksten til handlingene.

### Undermenyer

[Se eksempel for undermenyer](https://aksel.nav.no/komponenter/core/actionmenu?demo=actionmenudemo-sub-menu)

Undermenyer kan være en god metode for å gruppere relaterte handlinger under samme meny, men øker kompleksiteten.

- Bruk maks to nivå av undermenyer, men helst bare ett.
- `ActionMenu.Subtrigger` skal beskrive hva undermenyen gjør.

Hver undermeny TEST bør bare inneholde én kontekst. Dette gjør det lettere for hjelpemidler å navigere menyen effektivt.

### Ikoner

Være forsiktig med å bruke ikoner som ligner på innebygde elementer som `Submenu.Trigger`, `CheckboxItem` eller `RadioItem`. Dette gjelder f.eks. Checkmark og Chevron.

Hvis et element i en gruppe inneholder ikon, bør alle andre også gjøre det. [Eksempel for gruppering](https://aksel.nav.no/komponenter/core/actionmenu?demo=actionmenudemo-groups) demonstrerer dette konseptet.

### Shortcuts

Husk at nettlesere og OS ofte bruker en del snarveier allerede. Disse er dokumentert på sidene deres:

- [Windows](https://support.microsoft.com/en-us/windows/windows-keyboard-shortcuts-3d444b08-3a00-abd6-67da-ecfc07e86b98)
- [Chrome](https://support.google.com/chrome/answer/157179?hl=en&co=GENIE.Platform%3DDesktop#zippy=%2Cgoogle-chrome-feature-shortcuts)
- [Firefox](https://support.mozilla.org/en-US/kb/keyboard-shortcuts-perform-firefox-tasks-quickly)

Du må selv implementere håndtering av snarveier for løsningen din. Det finnes uendelig med metoder for å håndtere dette, men vi legger ved en enkel implementasjon for React.

```tsx
const shortcuts = {
  "ctrl+s": () => console.log("Save shortcut triggered"),
  "ctrl+z": () => console.log("Undo shortcut triggered"),
  "cmd+s": () => console.log("Save shortcut triggered on Mac"),
  "cmd+z": () => console.log("Undo shortcut triggered on Mac"),
  // Add more shortcuts
};

const handleKeyDown = (event: KeyboardEvent) => {
  const modifiers = [];
  if (event.ctrlKey) modifiers.push("Ctrl");
  if (event.metaKey) modifiers.push("Cmd");
  const key = [...modifiers, event.key].join("+").toLowerCase();

  if (shortcuts[key]) {
    event.preventDefault();
    shortcuts[key]();
  }
};

useEffect(() => {
  window.addEventListener("keydown", handleKeyDown);
  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, []);
```

## Tilgjengelighet

### Interaksjon med tastatur

Komponenten implementerer standard [Menu Button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) og [Menu](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) pattern.

### Interaksjon med mus

Klikk utenfor ActionMenu lukker meny og fokuserer ActionMenu.Trigger. Selve menyen er i "modal"-modus når åpen, som betyr at man ikke vil kunne interagere med noen elementer utenfor før den er lukket.

## Props

**ActionMenu**

Component: `ActionMenu`

| Prop           | Type                        | Default | Required | Description                                                                      |
| -------------- | --------------------------- | ------- | -------- | -------------------------------------------------------------------------------- |
| `open`         | `boolean`                   | -       | No       | Whether the menu is open or not. Only needed if you want manually control state. |
| `onOpenChange` | `((open: boolean) => void)` | -       | No       | Callback for when the menu is opened or closed.                                  |
| `rootElement`  | `HTMLElement \| null`       | -       | No       | An optional container where the portaled content should be appended.             |

**ActionMenu.Trigger**

Component: `ActionMenuTrigger` | Extends: `HTMLButtonElement`

| Prop        | Type                     | Default | Required | Description |
| ----------- | ------------------------ | ------- | -------- | ----------- |
| `className` | `string`                 | -       | No       |             |
| `ref`       | `Ref<HTMLButtonElement>` | -       | No       |             |

**ActionMenu.Content**

Component: `ActionMenuContent` | Extends: `HTMLDivElement`

| Prop        | Type                  | Default | Required | Description |
| ----------- | --------------------- | ------- | -------- | ----------- |
| `align`     | `"start" \| "end"`    | start   | No       |             |
| `className` | `string`              | -       | No       |             |
| `ref`       | `Ref<HTMLDivElement>` | -       | No       |             |

**ActionMenu.Group**

Component: `ActionMenuGroup` | Extends: `HTMLDivElement`

| Prop        | Type                  | Default | Required | Description                                      |
| ----------- | --------------------- | ------- | -------- | ------------------------------------------------ |
| `className` | `string`              | -       | No       |                                                  |
| `label`     | `string`              | -       | No       | Adds a visual and accessible label to the group. |
| `ref`       | `Ref<HTMLDivElement>` | -       | No       |                                                  |

**ActionMenu.Label**

Component: `ActionMenuLabel` | Extends: `HTMLDivElement`

| Prop        | Type                  | Default | Required | Description |
| ----------- | --------------------- | ------- | -------- | ----------- |
| `className` | `string`              | -       | No       |             |
| `ref`       | `Ref<HTMLDivElement>` | -       | No       |             |

**ActionMenu.Item**

Component: `ActionMenuItem` | Extends: `HTMLDivElement` | Supports `as` prop for polymorphism

| Prop           | Type                       | Default | Required | Description                                                                                                                                |
| -------------- | -------------------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `shortcut`     | `string`                   | -       | No       | Shows connected shortcut-keys for the item. This is only a visual representation, you will have to implement the actual shortcut yourself. |
| `variant`      | `"danger"`                 | -       | No       | Styles the item as a destructive action.                                                                                                   |
| `icon`         | `ReactNode`                | -       | No       | Adds an icon on the left side. For right side position use iconPosition. The icon will always have aria-hidden.                            |
| `iconPosition` | `"left" \| "right"`        | left    | No       | Position of icon.                                                                                                                          |
| `className`    | `string`                   | -       | No       |                                                                                                                                            |
| `onSelect`     | `((event: Event) => void)` | -       | No       |                                                                                                                                            |
| `disabled`     | `boolean`                  | -       | No       |                                                                                                                                            |
| `ref`          | `Ref<HTMLDivElement>`      | -       | No       |                                                                                                                                            |
| `as`           | `React.ElementType`        | -       | No       | OverridableComponent-api                                                                                                                   |

**ActionMenu.CheckboxItem**

Component: `ActionMenuCheckboxItem` | Extends: `HTMLDivElement`

| Prop              | Type                           | Default | Required | Description                                                                                                                                |
| ----------------- | ------------------------------ | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `shortcut`        | `string`                       | -       | No       | Shows connected shortcut-keys for the item. This is only a visual representation, you will have to implement the actual shortcut yourself. |
| `className`       | `string`                       | -       | No       |                                                                                                                                            |
| `onSelect`        | `((event: Event) => void)`     | -       | No       |                                                                                                                                            |
| `disabled`        | `boolean`                      | -       | No       |                                                                                                                                            |
| `checked`         | `CheckedState`                 | -       | No       |                                                                                                                                            |
| `onCheckedChange` | `((checked: boolean) => void)` | -       | No       |                                                                                                                                            |
| `ref`             | `Ref<HTMLDivElement>`          | -       | No       |                                                                                                                                            |

**ActionMenu.RadioGroup**

Component: `ActionMenuRadioGroup` | Extends: `HTMLDivElement`

| Prop            | Type                        | Default | Required | Description                                                                                                    |
| --------------- | --------------------------- | ------- | -------- | -------------------------------------------------------------------------------------------------------------- |
| `label`         | `string`                    | -       | No       | Adds a visual and accessible label to the group.                                                               |
| `aria-label`    | `string`                    | -       | No       | Adds an aria-label to the group. Defines a string value that labels the current element. @see aria-labelledby. |
| `className`     | `string`                    | -       | No       |                                                                                                                |
| `value`         | `string`                    | -       | No       |                                                                                                                |
| `onValueChange` | `((value: string) => void)` | -       | No       |                                                                                                                |
| `ref`           | `Ref<HTMLDivElement>`       | -       | No       |                                                                                                                |

**ActionMenu.RadioItem**

Component: `ActionMenuRadioItem` | Extends: `HTMLDivElement`

| Prop        | Type                       | Default | Required | Description |
| ----------- | -------------------------- | ------- | -------- | ----------- |
| `className` | `string`                   | -       | No       |             |
| `onSelect`  | `((event: Event) => void)` | -       | No       |             |
| `disabled`  | `boolean`                  | -       | No       |             |
| `value`     | `string`                   | -       | Yes      |             |
| `ref`       | `Ref<HTMLDivElement>`      | -       | No       |             |

**ActionMenu.Divider**

Component: `ActionMenuDivider` | Extends: `HTMLDivElement`

| Prop        | Type                  | Default | Required | Description |
| ----------- | --------------------- | ------- | -------- | ----------- |
| `className` | `string`              | -       | No       |             |
| `ref`       | `Ref<HTMLDivElement>` | -       | No       |             |

**ActionMenu.Sub**

Component: `ActionMenuSub`

| Prop           | Type                        | Default | Required | Description                                                                             |
| -------------- | --------------------------- | ------- | -------- | --------------------------------------------------------------------------------------- |
| `open`         | `boolean`                   | -       | No       | Whether the sub-menu is open or not. Only needed if you want to manually control state. |
| `onOpenChange` | `((open: boolean) => void)` | -       | No       | Callback for when the sub-menu is opened or closed.                                     |

**ActionMenu.SubTrigger**

Component: `ActionMenuSubTrigger` | Extends: `HTMLDivElement`

| Prop           | Type                  | Default | Required | Description       |
| -------------- | --------------------- | ------- | -------- | ----------------- |
| `icon`         | `ReactNode`           | -       | No       |                   |
| `iconPosition` | `"left" \| "right"`   | left    | No       | Position of icon. |
| `className`    | `string`              | -       | No       |                   |
| `disabled`     | `boolean`             | -       | No       |                   |
| `ref`          | `Ref<HTMLDivElement>` | -       | No       |                   |

**ActionMenu.SubContent**

Component: `ActionMenuSubContent` | Extends: `HTMLDivElement`

| Prop        | Type                  | Default | Required | Description |
| ----------- | --------------------- | ------- | -------- | ----------- |
| `className` | `string`              | -       | No       |             |
| `ref`       | `Ref<HTMLDivElement>` | -       | No       |             |

</component>
