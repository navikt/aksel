import { Meta } from "@storybook/react";
import React, { useState } from "react";
import {
  EnvelopeClosedIcon,
  EnvelopeOpenIcon,
  InboxUpIcon,
  SparklesIcon,
} from "@navikt/aksel-icons";
import { VStack } from "../layout/stack";
import ToggleGroup from "./ToggleGroup";

const meta: Meta<typeof ToggleGroup> = {
  title: "ds-react/ToggleGroup",
  component: ToggleGroup,
  argTypes: {
    size: {
      options: ["medium", "small"],
      control: {
        type: "radio",
      },
    },
    variant: {
      options: ["action", "neutral"],
      control: { type: "radio" },
    },
  },
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

export const Default = (props) => {
  const [activeValue, setActiveValue] = useState("ulest");
  return (
    <ToggleGroup
      size={props.size}
      variant={props.variant}
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

Default.args = {
  icon: true,
  text: true,
  label: false,
};

export const Compositions = () => {
  const [activeValue, setActiveValue] = useState("ulest");

  return (
    <VStack gap="6">
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

export const Variants = () => {
  const [activeValue, setActiveValue] = useState("ulest");

  return (
    <VStack gap="6">
      <ToggleGroup
        variant="action"
        value={activeValue}
        onChange={setActiveValue}
      >
        {Items(true, true)}
      </ToggleGroup>
      <ToggleGroup
        variant="neutral"
        value={activeValue}
        onChange={setActiveValue}
      >
        {Items(true, true)}
      </ToggleGroup>
    </VStack>
  );
};

export const Small = () => {
  const [activeValue, setActiveValue] = useState("ulest");

  return (
    <VStack gap="6">
      <ToggleGroup size="small" value={activeValue} onChange={setActiveValue}>
        {Items()}
      </ToggleGroup>
      <ToggleGroup size="small" value={activeValue} onChange={setActiveValue}>
        {Items(true, true)}
      </ToggleGroup>
      <ToggleGroup size="small" value={activeValue} onChange={setActiveValue}>
        {Items(true)}
      </ToggleGroup>
    </VStack>
  );
};

export const ColorRoles = () => {
  const [activeValue, setActiveValue] = useState("ulest");
  return (
    <VStack gap="space-12" data-color="brand-magenta">
      <ToggleGroup value={activeValue} onChange={setActiveValue}>
        {Items()}
      </ToggleGroup>
      <ToggleGroup
        value={activeValue}
        onChange={setActiveValue}
        variant="action"
      >
        {Items()}
      </ToggleGroup>
      <ToggleGroup
        value={activeValue}
        onChange={setActiveValue}
        variant="neutral"
      >
        {Items()}
      </ToggleGroup>
    </VStack>
  );
};

export const Chromatic = {
  render: () => (
    <VStack gap="6">
      <div>
        <h2>Text</h2>
        <ToggleGroup value="ulest" onChange={console.log}>
          {Items()}
        </ToggleGroup>
      </div>
      <div>
        <h2>Icon</h2>
        <ToggleGroup value="ulest" onChange={console.log}>
          {Items(true)}
        </ToggleGroup>
      </div>
      <div>
        <h2>Text + icon</h2>
        <ToggleGroup value="ulest" onChange={console.log}>
          {Items(true, true)}
        </ToggleGroup>
      </div>
      <div style={{ minWidth: 600 }}>
        <h2>Fill</h2>
        <ToggleGroup value="ulest" onChange={console.log} fill>
          {Items(true, true)}
        </ToggleGroup>
      </div>
      <div>
        <h2>Small</h2>
        <ToggleGroup value="ulest" onChange={console.log} size="small">
          {Items(true, true)}
        </ToggleGroup>
      </div>
      <div>
        <h2>Small + fill</h2>
        <ToggleGroup value="ulest" onChange={console.log} size="small" fill>
          {Items(true, true)}
        </ToggleGroup>
      </div>
      <div>
        <h2>Neutral</h2>
        <ToggleGroup value="ulest" onChange={console.log} variant="neutral">
          {Items(true, true)}
        </ToggleGroup>
      </div>
      <div>
        <h2>ColorRoles</h2>
        <ColorRoles />
      </div>
    </VStack>
  ),
  parameters: {
    chromatic: { disable: false },
  },
};
