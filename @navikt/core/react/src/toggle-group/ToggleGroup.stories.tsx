import {
  EnvelopeClosedIcon,
  EnvelopeOpenIcon,
  InboxUpIcon,
} from "@navikt/aksel-icons";
import { Meta } from "@storybook/react";
import React, { useState } from "react";
import { ToggleGroup } from "../index";

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
};
export default meta;

const Items = (icon?: boolean, both?: boolean) => (
  <>
    <ToggleGroup.Item value="ulest">
      {both ? (
        <>
          <EnvelopeClosedIcon /> Uleste
        </>
      ) : (
        <>{icon ? <EnvelopeClosedIcon /> : "Uleste"}</>
      )}
    </ToggleGroup.Item>
    <ToggleGroup.Item value="lest">
      {both ? (
        <>
          <EnvelopeOpenIcon /> Leste
        </>
      ) : (
        <>{icon ? <EnvelopeOpenIcon /> : "Leste"}</>
      )}
    </ToggleGroup.Item>
    <ToggleGroup.Item value="sendt">
      {both ? (
        <>
          <InboxUpIcon /> Sendt
        </>
      ) : (
        <>{icon ? <InboxUpIcon /> : "Sendt"}</>
      )}
    </ToggleGroup.Item>
  </>
);

export const Default = (props) => {
  const [activeValue, setActiveValue] = useState("ulest");
  return (
    <ToggleGroup
      size={props.size}
      variant={props.variant}
      value={activeValue}
      onChange={setActiveValue}
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
    <div className="colgap">
      <ToggleGroup value={activeValue} onChange={setActiveValue}>
        {Items()}
      </ToggleGroup>
      <ToggleGroup value={activeValue} onChange={setActiveValue}>
        {Items(true, true)}
      </ToggleGroup>
      <ToggleGroup value={activeValue} onChange={setActiveValue}>
        {Items(true)}
      </ToggleGroup>
    </div>
  );
};

export const Variants = () => {
  const [activeValue, setActiveValue] = useState("ulest");

  return (
    <div className="colgap">
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
    </div>
  );
};

export const Small = () => {
  const [activeValue, setActiveValue] = useState("ulest");

  return (
    <div className="colgap">
      <ToggleGroup size="small" value={activeValue} onChange={setActiveValue}>
        {Items()}
      </ToggleGroup>
      <ToggleGroup size="small" value={activeValue} onChange={setActiveValue}>
        {Items(true, true)}
      </ToggleGroup>
      <ToggleGroup size="small" value={activeValue} onChange={setActiveValue}>
        {Items(true)}
      </ToggleGroup>
    </div>
  );
};
