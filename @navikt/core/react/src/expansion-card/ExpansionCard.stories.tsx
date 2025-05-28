import { Meta, StoryFn, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { PlantIcon } from "@navikt/aksel-icons";
import { ExpansionCard, ExpansionCardProps } from ".";
import { VStack } from "../layout/stack";
import { BodyLong } from "../typography";

const meta: Meta<typeof ExpansionCard> = {
  title: "ds-react/ExpansionCard",
  component: ExpansionCard,
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
  parameters: {
    chromatic: { disable: true },
  },
};
export default meta;

type Story = StoryObj<typeof ExpansionCard>;

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

type DefaultStoryProps = ExpansionCardProps & { description: boolean };
type DefaultStory = StoryFn<DefaultStoryProps>;
export const Default: DefaultStory = ({
  description,
  ...rest
}: DefaultStoryProps) => (
  <ExpansionCard {...rest} aria-label="default-demo">
    <ExpansionCard.Header>
      <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
      {description && (
        <ExpansionCard.Description>
          For at yrkesskadedekningen skal gjelde, er det som hovedregel krav til
          tid, sted og arbeidsoppgaver
        </ExpansionCard.Description>
      )}
    </ExpansionCard.Header>
    <Content />
  </ExpansionCard>
);
Default.args = {
  description: false,
};
Default.argTypes = {
  size: { control: "radio", options: ["medium", "small"] },
  open: { control: "boolean" },
};

export const Description = () => (
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
);

export const Sizes = () => (
  <>
    <h2>Medium</h2>
    <ExpansionCard aria-label="Demo med description">
      <ExpansionCard.Header>
        <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
        <ExpansionCard.Description>
          For at yrkesskadedekningen skal gjelde, er det som hovedregel krav til
          tid, sted og arbeidsoppgaver
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
          For at yrkesskadedekningen skal gjelde, er det som hovedregel krav til
          tid, sted og arbeidsoppgaver
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
);

export const HeadingSizing = () => (
  <>
    {(["large", "medium", "small"] as const).map((size) => (
      <ExpansionCard key={size} aria-label={`demo-${size}`}>
        <ExpansionCard.Header>
          <ExpansionCard.Title size={size}>{size}</ExpansionCard.Title>
          <ExpansionCard.Description>
            For at yrkesskadedekningen skal gjelde, er det som hovedregel krav
            til tid, sted og arbeidsoppgaver
          </ExpansionCard.Description>
        </ExpansionCard.Header>
        <Content />
      </ExpansionCard>
    ))}
  </>
);

export const DefaultOpen = () => (
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
);

export const ControlledState = () => {
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
          For at yrkesskadedekningen skal gjelde, er det som hovedregel krav til
          tid, sted og arbeidsoppgaver
        </ExpansionCard.Description>
      </ExpansionCard.Header>
      <Content />
    </ExpansionCard>
  );
};

export const Customization = () => (
  <div className="subtle-card">
    <ExpansionCard aria-label="custom-styling demo">
      <ExpansionCard.Header>
        <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
        <ExpansionCard.Description>
          For at yrkesskadedekningen skal gjelde, er det som hovedregel krav til
          tid, sted og arbeidsoppgaver
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
);

export const Icon = () => (
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
              For at yrkesskadedekningen skal gjelde, er det som hovedregel krav
              til tid, sted og arbeidsoppgaver
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
);

export const ColorRole = () => (
  <VStack gap="space-40">
    <div>
      <ExpansionCard aria-label="bare description">
        <ExpansionCard.Header>
          <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
          <ExpansionCard.Description>
            For at yrkesskadedekningen skal gjelde, er det som hovedregel krav
            til tid, sted og arbeidsoppgaver
          </ExpansionCard.Description>
        </ExpansionCard.Header>
        <Content />
      </ExpansionCard>
    </div>
    <div data-color="brand-magenta">
      <ExpansionCard aria-label="bare description">
        <ExpansionCard.Header>
          <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
          <ExpansionCard.Description>
            For at yrkesskadedekningen skal gjelde, er det som hovedregel krav
            til tid, sted og arbeidsoppgaver
          </ExpansionCard.Description>
        </ExpansionCard.Header>
        <Content />
      </ExpansionCard>
    </div>

    <div>
      <ExpansionCard aria-label="bare description" data-color="brand-magenta">
        <ExpansionCard.Header>
          <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
          <ExpansionCard.Description>
            For at yrkesskadedekningen skal gjelde, er det som hovedregel krav
            til tid, sted og arbeidsoppgaver
          </ExpansionCard.Description>
        </ExpansionCard.Header>
        <Content />
      </ExpansionCard>
    </div>
  </VStack>
);

export const Chromatic: Story = {
  render: () => {
    return (
      <div>
        <h2>Description</h2>
        <Description />
        <h2>Sizes</h2>
        <Sizes />
        <h2>Heading sizing</h2>
        <HeadingSizing />
        <h2>Default open</h2>
        <DefaultOpen />
        <h2>Controlled state</h2>
        <ControlledState />
        <h2>Customization</h2>
        <Customization />
        <h2>Icon</h2>
        <Icon />
        <h2>ColorRole</h2>
        <ColorRole />
      </div>
    );
  },
  parameters: {
    chromatic: { disable: false },
  },
};
