import type { Meta, StoryFn } from "@storybook/react-vite";
import React, { useState } from "react";
import { PlantIcon } from "@navikt/aksel-icons";
import { ExpansionCard, type ExpansionCardProps } from ".";
import { Checkbox } from "../form/checkbox";
import { Link } from "../link";
import { VStack } from "../primitives/stack";
import { BodyLong } from "../typography";
import { renderStoriesForChromatic } from "../utils/renderStoriesForChromatic";

const meta: Meta<typeof ExpansionCard> = {
  title: "ds-react/ExpansionCard/preview",
  component: ExpansionCard,
  decorators: [
    (Story) => (
      <div
        style={{
          width: "600px",
          minHeight: "100vh",
          padding: "5rem 0",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "flex-start",
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

const Content = () => (
  <ExpansionCard.Content>
    <BodyLong spacing id="test">
      På ditt faste arbeidssted vil du ha yrkesskadedekning også i hvilepauser,
      lunsjpauser, trimaktiviteter og lignende i arbeidstiden.
    </BodyLong>
    <Link href="#">LENKE</Link>
    <Checkbox checked>Label</Checkbox>
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
    <ExpansionCard>
      <ExpansionCard.Header>
        <ExpansionCard.Title>Nested</ExpansionCard.Title>
      </ExpansionCard.Header>
      <ExpansionCard.Content>
        <BodyLong>
          På ditt faste arbeidssted vil du ha yrkesskadedekning også i
          hvilepauser, lunsjpauser, trimaktiviteter og lignende i arbeidstiden.
        </BodyLong>
      </ExpansionCard.Content>
    </ExpansionCard>
    <BodyLong>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga suscipit
      voluptatum expedita earum id, aperiam deleniti molestiae eveniet
      doloremque explicabo perspiciatis quasi repellendus!
    </BodyLong>
  </ExpansionCard.Content>
);

const SmallContent = () => (
  <ExpansionCard.Content>
    På ditt faste arbeidssted vil du ha yrkesskadedekning også i hvilepauser,
    lunsjpauser, trimaktiviteter og lignende i arbeidstiden.{" "}
    <Link href="#">LENKE</Link>
    <Checkbox checked>Label</Checkbox>
  </ExpansionCard.Content>
);

type DefaultStoryProps = ExpansionCardProps & { description: boolean };
type DefaultStory = StoryFn<DefaultStoryProps>;
export const Default: DefaultStory = ({
  description,
  ...rest
}: DefaultStoryProps) => (
  <>
    <ExpansionCard {...rest}>
      <ExpansionCard.Header>
        <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
        {description && (
          <ExpansionCard.Description>
            For at yrkesskadedekningen skal gjelde, er det som hovedregel krav
            til tid, sted og arbeidsoppgaver
          </ExpansionCard.Description>
        )}
      </ExpansionCard.Header>
      <Content />
    </ExpansionCard>
    etter
  </>
);
Default.args = {
  description: false,
};
Default.argTypes = {
  size: { control: "radio", options: ["medium", "small"] },
  open: { control: "boolean" },
};

export const Description = () => (
  <ExpansionCard>
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

    <ExpansionCard>
      <ExpansionCard.Header>
        <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
        <ExpansionCard.Description>
          For at yrkesskadedekningen skal gjelde, er det som hovedregel krav til
          tid, sted og arbeidsoppgaver
        </ExpansionCard.Description>
      </ExpansionCard.Header>
      <SmallContent />
    </ExpansionCard>

    <ExpansionCard>
      <ExpansionCard.Header>
        <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
      </ExpansionCard.Header>
      <SmallContent />
    </ExpansionCard>

    <h2>Small</h2>

    <ExpansionCard size="small">
      <ExpansionCard.Header>
        <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
        <ExpansionCard.Description>
          For at yrkesskadedekningen skal gjelde, er det som hovedregel krav til
          tid, sted og arbeidsoppgaver
        </ExpansionCard.Description>
      </ExpansionCard.Header>
      <SmallContent />
    </ExpansionCard>

    <ExpansionCard size="small" defaultOpen>
      <ExpansionCard.Header>
        <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
      </ExpansionCard.Header>
      <SmallContent />
    </ExpansionCard>
  </>
);

export const HeadingSizing = () => (
  <>
    {(["large", "medium", "small"] as const).map((size) => (
      <ExpansionCard key={size}>
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
  <ExpansionCard defaultOpen>
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
    <>
      <a href="#test">Link to content</a>
      <button onClick={() => setOpen(!open)}>Toggle local state</button>
      <ExpansionCard
        open={open}
        onOpenChange={(newOpen) => {
          console.log("onOpenChange", newOpen);
          setOpen(newOpen);
        }}
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
    </>
  );
};

export const Icon = () => (
  <div>
    <ExpansionCard>
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
  <VStack gap="space-36">
    <div>
      <ExpansionCard defaultOpen>
        <ExpansionCard.Header>
          <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
          <ExpansionCard.Description>
            For at yrkesskadedekningen skal gjelde, er det som hovedregel krav
            til tid, sted og arbeidsoppgaver
          </ExpansionCard.Description>
        </ExpansionCard.Header>
        <SmallContent />
      </ExpansionCard>
    </div>
    <div data-color="brand-magenta">
      <ExpansionCard defaultOpen>
        <ExpansionCard.Header>
          <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
          <ExpansionCard.Description>
            For at yrkesskadedekningen skal gjelde, er det som hovedregel krav
            til tid, sted og arbeidsoppgaver
          </ExpansionCard.Description>
        </ExpansionCard.Header>
        <SmallContent />
      </ExpansionCard>
    </div>

    <div>
      <ExpansionCard data-color="brand-magenta" defaultOpen>
        <ExpansionCard.Header>
          <ExpansionCard.Title>Arbeidstakere</ExpansionCard.Title>
          <ExpansionCard.Description>
            For at yrkesskadedekningen skal gjelde, er det som hovedregel krav
            til tid, sted og arbeidsoppgaver
          </ExpansionCard.Description>
        </ExpansionCard.Header>
        <SmallContent />
      </ExpansionCard>
    </div>
  </VStack>
);

export const Chromatic = renderStoriesForChromatic({
  Description,
  Sizes,
  HeadingSizing,
  DefaultOpen,
  Icon,
  ColorRole,
});
