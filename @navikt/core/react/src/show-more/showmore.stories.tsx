import { Meta, StoryFn } from "@storybook/react";
import React from "react";
import { ShowMore, ShowMoreProps } from ".";
import { BodyLong, HStack, Heading } from "..";
import { userEvent, within } from "@storybook/testing-library";

const meta: Meta<typeof ShowMore> = {
  title: "ds-react/ShowMore",
  component: ShowMore,
};
export default meta;

const variants = ["inline", "default", "subtle", "info"] as const;

const content = (
  <BodyLong style={{ maxWidth: 400 }}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nisl eros,
    vestibulum et dui non, malesuada egestas nisi. Suspendisse neque ante,
    volutpat a ante eu, blandit scelerisque ex. Integer sit amet sapien eget mi
    molestie ultricies sit amet dictum metus. Morbi consequat urna tristique
    consectetur rhoncus. Phasellus ac facilisis libero. Maecenas quis nisi
    elementum, tincidunt justo a, fermentum massa. Vestibulum tincidunt in dolor
    eget rhoncus. <a href="/">Link</a>. Aliquam vehicula, nisl id sollicitudin
    congue, tortor eros tempor odio, a eleifend est ex vitae libero.
  </BodyLong>
);

export const Default: StoryFn<ShowMoreProps> = (props: ShowMoreProps) => {
  return (
    <ShowMore heading="Heading" {...props}>
      {content}
    </ShowMore>
  );
};
Default.argTypes = {
  as: {
    control: "radio",
    options: ["aside", "section"],
  },
  size: {
    control: "radio",
    options: ["medium", "small"],
  },
  variant: {
    control: "radio",
    options: variants,
  },
  collapsedHeight: {
    control: { type: "text" },
  },
  headingSize: {
    control: "radio",
    options: ["xlarge", "large", "medium", "small", "xsmall"],
  },
  headingLevel: {
    control: "radio",
    options: ["1", "2", "3", "4", "5", "6"],
  },
};
Default.args = {
  heading: "Heading",
};

export const Small = () => (
  <ShowMore aria-label="Lorem ipsum" size="small">
    {content}
  </ShowMore>
);

export const CustomHeight = () => (
  <HStack gap="8">
    <ShowMore as="aside" aria-label="Tabellvisning" collapsedHeight="8rem">
      {content}
    </ShowMore>
    <ShowMore aria-label="Tabellvisning" collapsedHeight={90} size="small">
      {content}
    </ShowMore>
  </HStack>
);

export const Variants = () => (
  <HStack gap="4" style={{ padding: "1rem" }}>
    <HStack
      gap="4"
      align="start"
      style={{
        padding: "2rem",
        backgroundImage:
          "linear-gradient(45deg, #f5f50050 25%, transparent 25%), linear-gradient(-45deg, #f5f50050 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f5f50050 75%), linear-gradient(-45deg, transparent 75%, #f5f50050 75%)",
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
      }}
    >
      <div style={{ border: "1px dashed #FF000050", maxWidth: "400px" }}>
        <ShowMore heading="inline" variant="inline">
          <BodyLong spacing>
            This is the default variant. It does not have padding. The dashed
            border is not part of the component, but is added to the story to
            make it easier to see that there is no padding.
          </BodyLong>
          {content}
        </ShowMore>
      </div>
      <ShowMore heading="default" variant="default">
        {content}
      </ShowMore>
    </HStack>
    {variants
      .filter((v) => !["inline", "default"].includes(v))
      .map((variant) => (
        <ShowMore heading={variant} key={variant} variant={variant}>
          {content}
        </ShowMore>
      ))}
  </HStack>
);

export const Open: StoryFn = () => (
  <ShowMore aria-label="Lorem ipsum">{content}</ShowMore>
);
Open.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole("button"));
};

export const AccessibilityTest = () => (
  <div style={{ maxWidth: 500 }}>
    <Heading size="large">Test av tilgjengelighet.</Heading>
    <p>
      Dette er en story for å teste hvordan komponenten fungerer med
      skjermleser.
    </p>
    <p>Her kommer første eksempel:</p>
    <ShowMore
      heading="Første ShowMore"
      headingLevel="2"
      size="small"
      variant="info"
    >
      <BodyLong>Test av ShowMore med overskrift.</BodyLong>
      <BodyLong>
        <a href="/">Link</a>. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Cras nisl eros, vestibulum et dui non, malesuada egestas nisi.
        Suspendisse neque ante, volutpat a ante eu, blandit scelerisque ex.
        Integer sit amet sapien eget mi molestie ultricies sit amet dictum
        metus. Morbi consequat urna tristique consectetur rhoncus.
      </BodyLong>
      <BodyLong>
        Phasellus ac facilisis libero. Maecenas quis nisi elementum, tincidunt
        justo a, fermentum massa.
      </BodyLong>
    </ShowMore>
    <p>Det var det første eksempelet. Under er det andre eksempelet:</p>
    <ShowMore
      aria-label="Andre ShowMore"
      size="small"
      variant="info"
      collapsedHeight="4rem"
    >
      <BodyLong>Test av ShowMore uten overskrift.</BodyLong>
      <BodyLong>
        <a href="/">Link</a>. Vestibulum tincidunt in dolor eget rhoncus.
        Aliquam vehicula, nisl id sollicitudin congue, tortor eros tempor odio,
        a eleifend est ex vitae libero.
      </BodyLong>
    </ShowMore>
    <p>
      Nå har du sett to eksempler på ShowMore. Det første hadde en overskrift,
      mens det andre hadde label i stedet.
    </p>
  </div>
);
