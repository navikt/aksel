import { Cup, Dishwasher, Freezer } from "@navikt/ds-icons";
import { Meta } from "@storybook/react";
import React, { useState } from "react";
import { Tabs } from ".";

export default {
  title: "ds-react/Tabs",
  component: Tabs,
  argTypes: {
    size: {
      control: {
        type: "radio",
        options: ["medium", "small"],
      },
    },
    iconPosition: {
      control: {
        type: "radio",
        options: ["top", "left"],
      },
    },
  },
} as Meta;

const Panel = () => {
  return (
    <>
      <Tabs.Panel
        value="test1"
        className="panel"
        style={{ background: "var(--a-gray-50)", height: 100 }}
      >
        Innholdspanel for Skap-tab
      </Tabs.Panel>
      <Tabs.Panel
        value="test2"
        className="panel"
        style={{
          background: "var(--a-green-50)",
          height: 100,
        }}
      >
        Innholdspanel for Oppvaskmaskin-tab
      </Tabs.Panel>
      <Tabs.Panel
        value="test3"
        className="panel"
        style={{ background: "var(--a-red-50)", height: 100 }}
      >
        Innholdspanel for Fryser-tab
      </Tabs.Panel>
      <style>{`.panel[data-state="active"] { display:grid; place-content: center;}`}</style>
    </>
  );
};

export const Default = {
  render: (props) => {
    return (
      <Tabs
        defaultValue="test2"
        size={props?.size}
        selectionFollowsFocus={props?.selectionFollowsFocus}
        loop={props?.loop}
        iconPosition={props?.iconPosition}
      >
        <Tabs.List>
          <Tabs.Tab value="test1" icon={<Cup />} label="Skap" />
          <Tabs.Tab value="test2" label="Oppvaskmaskin" icon={<Dishwasher />} />
          <Tabs.Tab value="test3" icon={<Freezer />} label="Fryser" />
        </Tabs.List>
        <Panel />
      </Tabs>
    );
  },

  args: {
    selectionFollowsFocus: false,
    loop: false,
  },
};

export const Small = () => {
  return (
    <Tabs defaultValue="test2" size="small">
      <Tabs.List>
        <Tabs.Tab value="test1" icon={<Cup />} label="Skap" />
        <Tabs.Tab value="test2" label="Oppvaskmaskin" icon={<Dishwasher />} />
        <Tabs.Tab value="test3" icon={<Freezer />} label="Fryser" />
      </Tabs.List>
      <Panel />
    </Tabs>
  );
};

export const Controlled = () => {
  const [activeValue, setActiveValue] = useState("test1");
  return (
    <Tabs value={activeValue} onChange={setActiveValue}>
      <Tabs.List>
        <Tabs.Tab value="test1" icon={<Cup />} label="Skap" />
        <Tabs.Tab value="test2" label="Oppvaskmaskin" icon={<Dishwasher />} />
        <Tabs.Tab value="test3" icon={<Freezer />} label="Fryser" />
      </Tabs.List>
      <Panel />
    </Tabs>
  );
};

export const IconPosition = () => {
  return (
    <div className="colgap">
      <Tabs defaultValue="test2" size="small">
        <Tabs.List>
          <Tabs.Tab value="test1" icon={<Cup />} label="Skap" />
          <Tabs.Tab value="test2" label="Oppvaskmaskin" icon={<Dishwasher />} />
          <Tabs.Tab value="test3" icon={<Freezer />} label="Fryser" />
        </Tabs.List>
        <Panel />
      </Tabs>
      <Tabs defaultValue="test2" size="small" iconPosition="top">
        <Tabs.List style={{ margin: "0 auto" }}>
          <Tabs.Tab value="test1" icon={<Cup />} label="Skap" />
          <Tabs.Tab value="test2" label="Oppvaskmaskin" icon={<Dishwasher />} />
          <Tabs.Tab value="test3" icon={<Freezer />} label="Fryser" />
        </Tabs.List>
        <Panel />
      </Tabs>
    </div>
  );
};

export const Icon = () => {
  return (
    <div className="colgap">
      <Tabs defaultValue="test2">
        <Tabs.List style={{ margin: "0 auto" }}>
          <Tabs.Tab value="test1" icon={<Cup />} />
          <Tabs.Tab value="test2" icon={<Dishwasher />} />
          <Tabs.Tab value="test3" icon={<Freezer />} />
        </Tabs.List>
        <Panel />
      </Tabs>
      <Tabs defaultValue="test2" size="small" iconPosition="top">
        <Tabs.List style={{ margin: "0 auto" }}>
          <Tabs.Tab value="test1" icon={<Cup />} />
          <Tabs.Tab value="test2" icon={<Dishwasher />} />
          <Tabs.Tab value="test3" icon={<Freezer />} />
        </Tabs.List>
        <Panel />
      </Tabs>
    </div>
  );
};

export const Overflow = () => {
  return (
    <Tabs defaultValue="test2" style={{ maxWidth: 300 }}>
      <Tabs.List>
        <Tabs.Tab value="test1" icon={<Cup />} label="Skap" />
        <Tabs.Tab value="test2" label="Oppvaskmaskin" icon={<Dishwasher />} />
        <Tabs.Tab value="test3" icon={<Freezer />} label="Fryser" />
      </Tabs.List>
      <Panel />
    </Tabs>
  );
};
