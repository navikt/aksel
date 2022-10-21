import React, { useState } from "react";
import AccordionContent from "./AccordionContent";
import AccordionHeader from "./AccordionHeader";
import AccordionItem from "./AccordionItem";
import { Accordion } from ".";
import { BodyLong, Heading } from "..";

export default {
  title: "ds-react/Accordion",
  component: Accordion,
  subcomponents: {
    AccordionItem,
    AccordionContent,
    AccordionHeader,
  },
};

const Content = () => (
  <Accordion.Content>
    <Heading spacing size="small" level="2">
      Vanligvis starter sykmeldingen fra og med den dagen du er hos legen. Men
      det finnes unntak fra denne regeler.
    </Heading>
    <BodyLong spacing>
      En sykmelding er aktuell når det er medisinske grunner som hindrer deg i å
      være på jobb. Den som sykmelder deg, skal alltid vurdere om det er
      tungtveiende medisinske grunner til at du må være borte fra arbeidet, både
      første gang du blir sykmeldt og senere.
    </BodyLong>
    <BodyLong spacing>
      Tannleger, manuellterapeuter og kiropraktorer har rett til å skrive
      sykmeldinger ved enkelte diagnoser.
    </BodyLong>
  </Accordion.Content>
);

const Item = (props) => {
  const [open, setOpen] = useState(false);

  return props.controlled ? (
    <Accordion.Item open={open}>
      <Accordion.Header onClick={() => setOpen(!open)}>
        Accordion header text
      </Accordion.Header>
      <Content />
    </Accordion.Item>
  ) : (
    <Accordion.Item>
      <Accordion.Header>Accordion header text</Accordion.Header>
      <Content />
    </Accordion.Item>
  );
};

export const Default = (props) => {
  return (
    <div style={{ width: 500, height: "100rem", paddingTop: "10rem" }}>
      <Accordion>
        {[...Array(props.nItems ? props.nItems : 2)].map((_, y) => (
          <Item key={y} {...props} />
        ))}
      </Accordion>
    </div>
  );
};

Default.args = {
  controlled: false,
  nItems: 2,
};

export const Controlled = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  return (
    <div style={{ width: 500 }}>
      <Accordion>
        <Accordion.Item open={open}>
          <Accordion.Header onClick={() => setOpen(!open)}>
            Accordion header text
          </Accordion.Header>
          <Content />
        </Accordion.Item>
        <Accordion.Item open={open2}>
          <Accordion.Header onClick={() => setOpen2(!open2)}>
            Accordion header text
          </Accordion.Header>
          <Content />
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export const Uncontrolled = () => (
  <div style={{ width: 500 }}>
    <Accordion>
      <Accordion.Item>
        <Accordion.Header>Accordion header text</Accordion.Header>
        <Content />
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Header>Accordion header text</Accordion.Header>
        <Content />
      </Accordion.Item>
    </Accordion>
  </div>
);

export const Demo = (props) => {
  return (
    <div
      style={{
        width: "100vw",
        display: "flex",

        minHeight: "100rem",
        height: "100%",
        background: "#f1f1f1",
      }}
    >
      <div
        style={{
          width: "650px",
          margin: "200px auto",
          minHeight: "600px",
          height: "100%",
          background: "#fff",
          padding: "3rem 2rem",
        }}
      >
        <BodyLong spacing>
          En sykmelding er aktuell når det er medisinske grunner som hindrer deg
          i å være på jobb. Den som sykmelder deg, skal alltid vurdere om det er
          tungtveiende medisinske grunner til at du må være borte fra arbeidet,
          både første gang du blir sykmeldt og senere.
        </BodyLong>
        <BodyLong spacing>
          Tannleger, manuellterapeuter og kiropraktorer har rett til å skrive
          sykmeldinger ved enkelte diagnoser.
        </BodyLong>
        <Heading spacing size="small" level="2">
          Vanligvis starter sykmeldingen fra og med den dagen du er hos legen.
          Men det finnes unntak fra denne regelen, for eksempel hvis det ikke
          var mulig å få time hos legen tidligere.
        </Heading>
        <BodyLong spacing>
          En sykmelding er aktuell når det er medisinske grunner som hindrer deg
          i å være på jobb. Den som sykmelder deg, skal alltid vurdere om det er
          tungtveiende medisinske grunner til at du må være borte fra arbeidet,
          både første gang du blir sykmeldt og senere.
        </BodyLong>
        <BodyLong spacing>
          Tannleger, manuellterapeuter og kiropraktorer har rett til å skrive
          sykmeldinger ved enkelte diagnoser.
        </BodyLong>

        <div style={{ margin: "2rem 0" }}>
          <Accordion>
            <Accordion.Item>
              <Accordion.Header>
                Yrkesgrupper med særaldersgrense
              </Accordion.Header>
              <Accordion.Content>
                <Heading spacing size="small" level="2">
                  Sosialhjelp og bostøtte
                </Heading>
                <BodyLong spacing>
                  Hvis du mottar økonomisk sosialhjelp eller bostøtte når du
                  nærmer deg pensjonsalder, bør du snakke med ditt lokale
                  NAV-kontor.
                </BodyLong>
                <BodyLong spacing>
                  Sosialhjelp og bostøtte gir ikke pensjonsopptjening.
                </BodyLong>
                <Heading spacing size="small" level="2">
                  Forsørger du en annen person?
                </Heading>
                <BodyLong spacing>
                  Forsørgingstilleggene til alderspensjon og AFP i offentlig
                  sektor fases ut i løpet av 2023 og 2024. Fra 2025 vil ingen
                  lenger motta forsørgingstillegg.
                </BodyLong>
                <BodyLong spacing>
                  Det er ikke lenger mulig å søke forsørgingstillegg til
                  alderspensjon og AFP i offentlig sektor.
                </BodyLong>
                <BodyLong>
                  Hvis du forsørger ektefelle over 60 år og fyller vilkårene for
                  rett til ektefelletillegg, har du rett til minste pensjonsnivå
                  etter særskilt sats.
                </BodyLong>
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item>
              <Accordion.Header>
                Er du født i 1963 eller senere?
              </Accordion.Header>
              <Accordion.Content>
                <Heading spacing size="small" level="2">
                  Du kan ha rett til omsorgsopptjening hvis du har hatt
                  omsorgsansvar for
                </Heading>
                <BodyLong spacing as="ul">
                  <li>barn under seks år og/eller</li>
                  <li>syke, eldre eller personer med funksjonsnedsettelser</li>
                </BodyLong>
                <BodyLong spacing>
                  Du kan søke om ekstra pensjonsopptjening for omsorgsarbeidet
                  du har utført.
                </BodyLong>
                <BodyLong>
                  Merk! Søknaden må sendes inn senest to år etter at du hadde
                  omsorgen. Tidsfristen gjelder ikke omsorg for barn under seks
                  år.
                </BodyLong>
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item>
              <Accordion.Header>
                Har du bodd i Norge i mindre enn 40 år?
              </Accordion.Header>
              <Accordion.Content>
                <BodyLong spacing>
                  Hvis du har bodd i Norge mindre enn 40 år, og derfor får lav
                  pensjon når du fyller 67 år, kan du ha rett til supplerende
                  stønad i tillegg til alderspensjonen.
                </BodyLong>
                <BodyLong spacing>
                  Supplerende stønad er et tillegg du kan søke om slik at du er
                  sikret et minstenivå på din samlede inntekt. Hvor mye du kan
                  få er blant annet avhengig av om du har annen inntekt, pensjon
                  fra utlandet, formue og om du bor alene eller sammen med andre
                  voksne.
                </BodyLong>
                <BodyLong>
                  Ta kontakt med NAV for å avklare om du bør søke om supplerende
                  stønad.
                </BodyLong>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>
        </div>
        <BodyLong spacing>
          En sykmelding er aktuell når det er medisinske grunner som hindrer deg
          i å være på jobb. Den som sykmelder deg, skal alltid vurdere om det er
          tungtveiende medisinske grunner til at du må være borte fra arbeidet,
          både første gang du blir sykmeldt og senere.
        </BodyLong>
        <BodyLong spacing>
          Tannleger, manuellterapeuter og kiropraktorer har rett til å skrive
          sykmeldinger ved enkelte diagnoser.
        </BodyLong>
        <Heading spacing size="small" level="2">
          Vanligvis starter sykmeldingen fra og med den dagen du er hos legen.
          Men det finnes unntak fra denne regelen, for eksempel hvis det ikke
          var mulig å få time hos legen tidligere.
        </Heading>
        <BodyLong spacing>
          En sykmelding er aktuell når det er medisinske grunner som hindrer deg
          i å være på jobb. Den som sykmelder deg, skal alltid vurdere om det er
          tungtveiende medisinske grunner til at du må være borte fra arbeidet,
          både første gang du blir sykmeldt og senere.
        </BodyLong>
        <BodyLong spacing>
          Tannleger, manuellterapeuter og kiropraktorer har rett til å skrive
          sykmeldinger ved enkelte diagnoser.
        </BodyLong>
        <Heading spacing size="small" level="2">
          Vanligvis starter sykmeldingen fra og med den dagen du er hos legen.
          Men det finnes unntak fra denne regelen, for eksempel hvis det ikke
          var mulig å få time hos legen tidligere.
        </Heading>
      </div>
    </div>
  );
};
