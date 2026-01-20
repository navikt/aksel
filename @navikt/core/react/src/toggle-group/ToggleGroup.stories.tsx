import { Meta, StoryFn } from "@storybook/react-vite";
import React, { useState } from "react";
import {
  EnvelopeClosedIcon,
  EnvelopeOpenIcon,
  InboxUpIcon,
  SparklesIcon,
} from "@navikt/aksel-icons";
import { VStack } from "../layout/stack";
import { renderStoriesForChromatic } from "../utils/renderStoriesForChromatic";
import ToggleGroup from "./ToggleGroup";
import { ToggleGroupProps } from "./ToggleGroup.types";

const meta: Meta<typeof ToggleGroup> = {
  title: "ds-react/ToggleGroup",
  component: ToggleGroup,
  parameters: {
    chromatic: { disable: true },
  },
};

export default meta;

const Items = (icon?: boolean, both?: boolean) => {
  const hasLabel = both || !icon;

  const iconProps = hasLabel
    ? { "aria-hidden": true }
    : { title: "Ikontittel" };

  return (
    <>
      <ToggleGroup.Item
        value="ulest"
        icon={(both ?? icon) && <EnvelopeClosedIcon {...iconProps} />}
        label={hasLabel && "Uleste"}
      />
      <ToggleGroup.Item
        value="ny"
        icon={(both ?? icon) && <SparklesIcon {...iconProps} />}
        label={hasLabel && "Ny"}
      />
      <ToggleGroup.Item
        value="lest"
        icon={(both ?? icon) && <EnvelopeOpenIcon {...iconProps} />}
        label={hasLabel && "Leste"}
      />
      <ToggleGroup.Item
        value="sendt"
        icon={(both ?? icon) && <InboxUpIcon {...iconProps} />}
        label={hasLabel && "Sendt"}
      />
    </>
  );
};

interface Props extends Pick<ToggleGroupProps, "size"> {
  icon: boolean;
  text: boolean;
  label: boolean;
}
export const Default: StoryFn<Props> = (props) => {
  const [activeValue, setActiveValue] = useState("ulest");
  return (
    <ToggleGroup
      size={props.size}
      value={activeValue}
      onChange={(value) => {
        setActiveValue(value);
        console.log(value);
      }}
      label={props.label ? "Proident minim dolor pariatur." : undefined}
    >
      {Items(props.icon, props.text && props.icon)}
    </ToggleGroup>
  );
};
Default.argTypes = {
  size: {
    options: ["medium", "small"],
    control: {
      type: "radio",
    },
  },
};
Default.args = {
  icon: true,
  text: true,
  label: false,
};

export const Label = () => {
  return (
    <ToggleGroup label="Innboks" value="ulest" onChange={() => {}}>
      {Items()}
    </ToggleGroup>
  );
};

export const Compositions = () => {
  const [activeValue, setActiveValue] = useState("ulest");

  return (
    <VStack gap="space-24">
      <ToggleGroup value={activeValue} onChange={setActiveValue}>
        {Items()}
      </ToggleGroup>
      <ToggleGroup value={activeValue} onChange={setActiveValue}>
        {Items(true, true)}
      </ToggleGroup>
      <ToggleGroup value={activeValue} onChange={setActiveValue}>
        {Items(true)}
      </ToggleGroup>
      <ToggleGroup fill value={activeValue} onChange={setActiveValue}>
        {Items(true)}
      </ToggleGroup>
    </VStack>
  );
};

export const Small = () => {
  const [activeValue, setActiveValue] = useState("ulest");

  return (
    <VStack gap="space-24">
      <ToggleGroup size="small" value={activeValue} onChange={setActiveValue}>
        {Items()}
      </ToggleGroup>
      <ToggleGroup size="small" value={activeValue} onChange={setActiveValue}>
        {Items(true, true)}
      </ToggleGroup>
      <ToggleGroup size="small" value={activeValue} onChange={setActiveValue}>
        {Items(true)}
      </ToggleGroup>
      <ToggleGroup
        size="small"
        fill
        value={activeValue}
        onChange={setActiveValue}
      >
        {Items(true)}
      </ToggleGroup>
    </VStack>
  );
};

export const Chromatic = renderStoriesForChromatic({
  Label,
  Compositions,
  Small,
});
