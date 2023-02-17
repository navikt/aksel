import React from "react";
import { ExpansionCard } from ".";
import ExpansionCardContent from "./ExpansionCardContent";
import ExpansionCardHeader from "./ExpansionCardHeader";
import { Star } from "@navikt/ds-icons";
import { BodyLong } from "../typography";

export default {
  title: "ds-react/ExpansionCard",
  component: ExpansionCard,
  subcomponents: [ExpansionCardHeader, ExpansionCardContent],
};

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
  render: () => {
    return (
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
          <ExpansionCard.Header>
            <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
          </ExpansionCard.Header>
          <Content />
        </ExpansionCard>
        <ExpansionCard>
          <ExpansionCard.Header avatar={<Star aria-hidden />}>
            <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
            <ExpansionCard.Description>
              For at yrkesskadedekningen skal gjelde, er det som hovedregel krav
              til tid, sted og arbeidsoppgaver
            </ExpansionCard.Description>
          </ExpansionCard.Header>
          <Content />
        </ExpansionCard>
        <ExpansionCard>
          <ExpansionCard.Header avatar={<Star aria-hidden />}>
            <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
          </ExpansionCard.Header>
          <Content />
        </ExpansionCard>
        <ExpansionCard>
          <ExpansionCard.Header
            avatarVariant="info"
            avatar={<Star aria-hidden />}
          >
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
            avatarVariant="success"
          >
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
            avatarVariant="warning"
          >
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
            avatarVariant="danger"
          >
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
            avatarVariant="alt1"
          >
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
            avatarVariant="alt2"
          >
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
      </div>
    );
  },
};
