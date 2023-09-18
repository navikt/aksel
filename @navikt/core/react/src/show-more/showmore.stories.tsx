import { Meta, StoryFn } from "@storybook/react";
import React, { useState } from "react";
import { ShowMore, ShowMoreProps } from ".";
import { BodyLong, HStack, Heading } from "..";

const meta: Meta<typeof ShowMore> = {
  title: "ds-react/ShowMore",
  component: ShowMore,
};
export default meta;

const variants = ["transparent", "default", "subtle", "info"] as const;

const content = (
  <BodyLong style={{ maxWidth: 400 }}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nisl eros,
    vestibulum et dui non, malesuada egestas nisi. Suspendisse neque ante,
    volutpat a ante eu, blandit scelerisque ex. Integer sit amet sapien eget mi
    molestie ultricies sit amet dictum metus. Morbi consequat urna tristique
    consectetur rhoncus. Phasellus ac facilisis libero. Maecenas quis nisi
    elementum, tincidunt justo a, fermentum massa. Vestibulum tincidunt in dolor
    eget rhoncus. Aliquam vehicula, nisl id sollicitudin congue, tortor eros
    tempor odio, a eleifend est ex vitae libero.
  </BodyLong>
);

export const Default: StoryFn<{
  controlled: boolean;
  size: "medium" | "small";
  variant: ShowMoreProps["variant"];
}> = ({ controlled, ...rest }) => {
  const [state, setState] = useState(false);

  return (
    <ShowMore
      open={controlled ? state : undefined}
      onClick={() => setState((x) => !x)}
      aria-label="Lorem ipsum"
      {...rest}
    >
      {content}
    </ShowMore>
  );
};
Default.args = {
  controlled: false,
};
Default.argTypes = {
  size: {
    options: ["medium", "small"],
    control: { type: "radio" },
  },
  variant: {
    options: variants,
    control: { type: "radio" },
  },
};

export const Small = () => (
  <ShowMore aria-label="Lorem ipsum" size="small">
    {content}
  </ShowMore>
);

export const CustomHeight = () => (
  <HStack gap="8">
    <ShowMore aria-label="Tabellvisning" collapsedHeight="8rem">
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
        <ShowMore aria-label="Lorem ipsum" variant="transparent">
          <Heading size="small">transparent</Heading>
          <BodyLong spacing>
            This is the default variant. It does not have padding. The dashed
            border is not part of the component, but is added to the story to
            make it easier to see that there is no padding.
          </BodyLong>
          {content}
        </ShowMore>
      </div>
      <ShowMore aria-label="Lorem ipsum" variant="default">
        <Heading size="small">default</Heading>
        {content}
      </ShowMore>
    </HStack>
    {variants
      .filter((v) => !["transparent", "default"].includes(v))
      .map((variant) => (
        <ShowMore aria-label="Lorem ipsum" key={variant} variant={variant}>
          <Heading size="small">{variant}</Heading>
          {content}
        </ShowMore>
      ))}
  </HStack>
);

export const Open = () => (
  <ShowMore aria-label="Lorem ipsum" open>
    {content}
  </ShowMore>
);
