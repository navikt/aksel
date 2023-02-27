import React, { useState } from "react";
import { ExpansionCard } from ".";
import ExpansionCardContent from "./ExpansionCardContent";
import ExpansionCardHeader from "./ExpansionCardHeader";
import { Money, Star } from "@navikt/ds-icons";
import { BodyLong, BodyShort } from "../typography";

export default {
  title: "ds-react/ExpansionCard",
  component: ExpansionCard,
  subcomponents: [ExpansionCardHeader, ExpansionCardContent],
  decorators: [
    (Story) => (
      <div
        style={{
          width: "600px",
          minHeight: "100vh",
          padding: "10rem 0",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

const variants = [
  "warning",
  "success",
  "danger",
  "info",
  "neutral",
  "alt1",
  "alt2",
  "alt3",
] as const;

const Content = () => (
  <ExpansionCard.Content>
    <BodyLong spacing>
      På ditt faste arbeidssted vil du ha yrkesskadedekning også i hvilepauser,
      lunsjpauser, trimaktiviteter og lignende i arbeidstiden.
    </BodyLong>
    <BodyLong spacing>
      Som hovedregel er du som arbeidstaker ikke yrkesskadedekket på veien til
      og fra arbeid eller første og siste oppdragssted. Du er heller ikke
      yrkesskadedekket på fritiden eller under private gjøremål i arbeidstiden.
    </BodyLong>
    <BodyLong spacing>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga suscipit
      voluptatum expedita earum id, aperiam deleniti molestiae eveniet
      doloremque explicabo perspiciatis quasi repellendus! Est dolore a nemo
      aspernatur obcaecati dicta.
    </BodyLong>
    <BodyLong spacing>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga suscipit
      voluptatum expedita earum id, aperiam deleniti molestiae eveniet
      doloremque explicabo perspiciatis quasi repellendus! Est dolore a nemo
      aspernatur obcaecati dicta.
    </BodyLong>
    <BodyLong>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga suscipit
      voluptatum expedita earum id, aperiam deleniti molestiae eveniet
      doloremque explicabo perspiciatis quasi repellendus! Est dolore a nemo
      aspernatur obcaecati dicta.
    </BodyLong>
  </ExpansionCard.Content>
);

export const Default = {
  render: (props) => {
    return (
      <ExpansionCard open={props?.open || undefined}>
        <ExpansionCard.Header
          {...props}
          avatar={props?.avatar ? <Star aria-hidden /> : undefined}
        >
          <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
          <ExpansionCard.Description>
            For at yrkesskadedekningen skal gjelde, er det som hovedregel krav
            til tid, sted og arbeidsoppgaver
          </ExpansionCard.Description>
        </ExpansionCard.Header>
        <Content />
      </ExpansionCard>
    );
  },
  args: { avatar: false, open: false },
  argTypes: {
    avatarVariant: { control: "select", options: variants },
  },
};

export const Description = {
  render: () => (
    <>
      <ExpansionCard>
        <ExpansionCard.Header>
          <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
          <ExpansionCard.Description>
            For at yrkesskadedekningen skal gjelde, er det som hovedregel krav
            til tid, sted og arbeidsoppgaver
          </ExpansionCard.Description>
        </ExpansionCard.Header>
        <Content />
      </ExpansionCard>
      <ExpansionCard>
        <ExpansionCard.Header
          avatar={<Star aria-hidden />}
          avatarVariant="alt3"
        >
          <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
          <ExpansionCard.Description>
            For at yrkesskadedekningen skal gjelde, er det som hovedregel krav
            til tid, sted og arbeidsoppgaver
          </ExpansionCard.Description>
        </ExpansionCard.Header>
        <Content />
      </ExpansionCard>
    </>
  ),
};

export const Avatar = {
  render: () => (
    <>
      <ExpansionCard>
        <ExpansionCard.Header
          avatar={<Star aria-hidden />}
          avatarVariant="alt3"
        >
          <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
        </ExpansionCard.Header>
        <Content />
      </ExpansionCard>
      <ExpansionCard>
        <ExpansionCard.Header
          avatar={<Star aria-hidden />}
          avatarVariant="alt3"
        >
          <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
          <ExpansionCard.Description>
            For at yrkesskadedekningen skal gjelde, er det som hovedregel krav
            til tid, sted og arbeidsoppgaver
          </ExpansionCard.Description>
        </ExpansionCard.Header>
        <Content />
      </ExpansionCard>
    </>
  ),
};

export const AvatarVariants = {
  render: () => (
    <>
      {variants.map((x) => (
        <ExpansionCard>
          <ExpansionCard.Header
            avatar={<Star aria-hidden />}
            avatarVariant={x}
            key={x}
          >
            <ExpansionCard.Title>{x}</ExpansionCard.Title>
            <ExpansionCard.Description>
              For at yrkesskadedekningen skal gjelde, er det som hovedregel krav
              til tid, sted og arbeidsoppgaver
            </ExpansionCard.Description>
          </ExpansionCard.Header>
          <Content />
        </ExpansionCard>
      ))}
    </>
  ),
};

export const DefaultOpen = {
  render: () => (
    <ExpansionCard defaultOpen>
      <ExpansionCard.Header avatar={<Star aria-hidden />} avatarVariant="alt3">
        <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
        <ExpansionCard.Description>
          For at yrkesskadedekningen skal gjelde, er det som hovedregel krav til
          tid, sted og arbeidsoppgaver
        </ExpansionCard.Description>
      </ExpansionCard.Header>
      <Content />
    </ExpansionCard>
  ),
};

export const ControlledState = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);
    return (
      <ExpansionCard open={open} onToggle={setOpen}>
        <ExpansionCard.Header
          avatar={<Star aria-hidden />}
          avatarVariant="alt3"
        >
          <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
          <ExpansionCard.Description>
            For at yrkesskadedekningen skal gjelde, er det som hovedregel krav
            til tid, sted og arbeidsoppgaver
          </ExpansionCard.Description>
        </ExpansionCard.Header>
        <Content />
      </ExpansionCard>
    );
  },
};

export const UUDemo = {
  render: () => (
    <ExpansionCard>
      <ExpansionCard.Header
        avatar={<Money aria-hidden />}
        avatarVariant="success"
      >
        <ExpansionCard.Title>3000 kr</ExpansionCard.Title>
        <ExpansionCard.Description>
          <BodyShort spacing>Utbetales til Posten Norge AS, Bærum</BodyShort>
          <BodyShort>Gjelder sykefravær fra Posten Norge AS, Bærum</BodyShort>
          <BodyShort>Periode: 4. – 23. oktober 2021</BodyShort>
        </ExpansionCard.Description>
      </ExpansionCard.Header>
      <Content />
    </ExpansionCard>
  ),
};
