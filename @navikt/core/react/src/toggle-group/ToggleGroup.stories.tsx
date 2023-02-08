/* eslint-disable react-hooks/rules-of-hooks */
import { Email, EmailOpened, Send } from "@navikt/ds-icons";
import { Meta } from "@storybook/react";
import React, { useState } from "react";
import { ToggleGroup } from "../index";
export default {
  title: "ds-react/ToggleGroup",
  component: ToggleGroup,
  argTypes: {
    size: {
      control: {
        type: "radio",
        options: ["medium", "small"],
      },
    },
  },
} as Meta;

const Items = (icon?: boolean, both?: boolean) => (
  <>
    <ToggleGroup.Item value="ulest">
      {both ? (
        <>
          <Email /> Uleste
        </>
      ) : (
        <>{icon ? <Email /> : "Uleste"}</>
      )}
    </ToggleGroup.Item>
    <ToggleGroup.Item value="lest">
      {both ? (
        <>
          <EmailOpened /> Leste
        </>
      ) : (
        <>{icon ? <EmailOpened /> : "Leste"}</>
      )}
    </ToggleGroup.Item>
    <ToggleGroup.Item value="sendt">
      {both ? (
        <>
          <Send /> Sendte
        </>
      ) : (
        <>{icon ? <Send /> : "Sendte"}</>
      )}
    </ToggleGroup.Item>
  </>
);

export const Default = {
  render: (props) => {
    const [activeValue, setActiveValue] = useState("ulest");
    return (
      <ToggleGroup
        size={props?.size}
        value={activeValue}
        onChange={setActiveValue}
        label={props.label ? "Proident minim dolor pariatur." : undefined}
      >
        {Items(!!props?.icon, !!props?.text && props.icon)}
      </ToggleGroup>
    );
  },

  args: {
    icon: true,
    text: true,
    label: false,
  },
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
