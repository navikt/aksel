import { PlantIcon } from "@navikt/aksel-icons";
import React, { useState } from "react";
import { ExpansionCard } from ".";
import { BodyLong } from "../typography";
import ExpansionCardContent from "./ExpansionCardContent";
import ExpansionCardHeader from "./ExpansionCardHeader";

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
      <ExpansionCard
        {...props}
        open={props?.open || undefined}
        size={props.size}
        aria-label="default-demo"
      >
        <ExpansionCard.Header>
          <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
          {props.description && (
            <ExpansionCard.Description>
              For at yrkesskadedekningen skal gjelde, er det som hovedregel krav
              til tid, sted og arbeidsoppgaver
            </ExpansionCard.Description>
          )}
        </ExpansionCard.Header>
        <Content />
      </ExpansionCard>
    );
  },
  args: {
    open: false,
    size: "medium",
    description: false,
    variant: "neutral",
  },
  argTypes: {
    size: { control: "select", options: ["medium", "small"] },
  },
};

export const Description = {
  render: () => (
    <ExpansionCard aria-label="bare description">
      <ExpansionCard.Header>
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

export const Sizes = {
  render: () => (
    <>
      <h2>Medium</h2>
      <ExpansionCard aria-label="Demo med description">
        <ExpansionCard.Header>
          <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
          <ExpansionCard.Description>
            For at yrkesskadedekningen skal gjelde, er det som hovedregel krav
            til tid, sted og arbeidsoppgaver
          </ExpansionCard.Description>
        </ExpansionCard.Header>
        <Content />
      </ExpansionCard>
      <ExpansionCard aria-label="Demo">
        <ExpansionCard.Header>
          <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
        </ExpansionCard.Header>
        <Content />
      </ExpansionCard>
      <h2>Small</h2>
      <ExpansionCard size="small" aria-label="small-demo">
        <ExpansionCard.Header>
          <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
          <ExpansionCard.Description>
            For at yrkesskadedekningen skal gjelde, er det som hovedregel krav
            til tid, sted og arbeidsoppgaver
          </ExpansionCard.Description>
        </ExpansionCard.Header>
        <Content />
      </ExpansionCard>
      <ExpansionCard
        size="small"
        aria-label="small-demo med avatar uten description"
      >
        <ExpansionCard.Header>
          <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
        </ExpansionCard.Header>
        <Content />
      </ExpansionCard>
    </>
  ),
};

export const HeadingSizing = {
  render: () => (
    <>
      {(["large", "medium", "small"] as const).map((x) => (
        <ExpansionCard aria-label={`demo-${x}`}>
          <ExpansionCard.Header key={x}>
            <ExpansionCard.Title size={x}>{x}</ExpansionCard.Title>
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
    <ExpansionCard defaultOpen aria-label="defaultOpen demo">
      <ExpansionCard.Header>
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
      <ExpansionCard
        open={open}
        onToggle={setOpen}
        aria-label="Controlled-state demo"
      >
        <ExpansionCard.Header>
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

export const Customization = {
  render: () => (
    <div className="subtle-card">
      <ExpansionCard aria-label="custom-styling demo">
        <ExpansionCard.Header>
          <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
          <ExpansionCard.Description>
            For at yrkesskadedekningen skal gjelde, er det som hovedregel krav
            til tid, sted og arbeidsoppgaver
          </ExpansionCard.Description>
        </ExpansionCard.Header>
        <Content />
      </ExpansionCard>

      <style>{`
        .subtle-card {
          --ac-expansioncard-bg: var(--a-surface-subtle);
          --ac-expansioncard-border-open-color: var(--a-border-alt-3);
        }`}</style>
    </div>
  ),
};

export const Icon = {
  render: () => (
    <div>
      <ExpansionCard aria-label="custom-styling demo">
        <ExpansionCard.Header>
          <div className="with-icon">
            <div className="icon">
              <PlantIcon aria-hidden />
            </div>
            <div>
              <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
              <ExpansionCard.Description>
                For at yrkesskadedekningen skal gjelde, er det som hovedregel
                krav til tid, sted og arbeidsoppgaver
              </ExpansionCard.Description>
            </div>
          </div>
        </ExpansionCard.Header>
        <Content />
      </ExpansionCard>

      <style>{`
        .with-icon {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .icon {
          font-size: 3rem;
          flex-shrink: 0;
          display: grid;
          place-content: center;
        }`}</style>
    </div>
  ),
};
