import { Cup, Dishwasher, Freezer } from "@navikt/ds-icons";
import { Meta } from "@storybook/react/types-6-0";
import React, { useState } from "react";
import { Tabs } from ".";

export default {
  title: "ds-react/tabs",
  component: Tabs,
} as Meta;

export const UUDemo = () => (
  <Tabs defaultValue="skap">
    <Tabs.List>
      <Tabs.Trigger value="skap">
        <Cup aria-hidden />
        Skap
      </Tabs.Trigger>
      <Tabs.Trigger value="oppvaskmaskin">
        <Dishwasher aria-hidden />
        Oppvaskmaskin
      </Tabs.Trigger>
      <Tabs.Trigger value="fryser">
        <Freezer aria-hidden />
        Fryser
      </Tabs.Trigger>
    </Tabs.List>
    <Tabs.Panel
      value="test1"
      style={{ background: "var(--navds-global-color-gray-50)", height: 300 }}
    >
      Innholdspanel for Skap-tab
    </Tabs.Panel>
    <Tabs.Panel
      value="test2"
      style={{ background: "var(--navds-global-color-green-50)", height: 300 }}
    >
      Innholdspanel for Oppvaskmaskin-tab
    </Tabs.Panel>
    <Tabs.Panel
      value="test3"
      style={{ background: "var(--navds-global-color-red-50)", height: 300 }}
    >
      Innholdspanel for Fryser-tab
    </Tabs.Panel>
  </Tabs>
);

export const All = () => {
  const [activeValue, setActiveValue] = useState("test1");

  return (
    <div>
      <h2>Tabs</h2>
      <Tabs defaultValue="test2">
        <Tabs.List>
          <Tabs.Trigger value="test1">
            <Cup />
            Skap
          </Tabs.Trigger>
          <Tabs.Trigger value="test2">
            <Dishwasher />
            Oppvaskmaskin
          </Tabs.Trigger>
          <Tabs.Trigger value="test3">
            <Freezer />
            Fryser
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs>
      <h2>AutoSwitch</h2>
      <Tabs defaultValue="test2" autoSwitch>
        <Tabs.List>
          <Tabs.Trigger value="test1">
            <Cup />
            Skap
          </Tabs.Trigger>
          <Tabs.Trigger value="test2">
            <Dishwasher />
            Oppvaskmaskin
          </Tabs.Trigger>
          <Tabs.Trigger value="test3">
            <Freezer />
            Fryser
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs>
      <h2>Controlled</h2>

      <Tabs value={activeValue} onChange={setActiveValue}>
        <Tabs.List>
          <Tabs.Trigger value="test1">
            <Cup />
            Skap
          </Tabs.Trigger>
          <Tabs.Trigger value="test2">
            <Dishwasher />
            Oppvaskmaskin
          </Tabs.Trigger>
          <Tabs.Trigger value="test3">
            <Freezer />
            Fryser
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs>

      <h2>Tabs vertical</h2>
      <Tabs defaultValue="test2">
        <Tabs.List>
          <Tabs.Trigger value="test1" vertical>
            <Cup />
            Skap
          </Tabs.Trigger>
          <Tabs.Trigger value="test2" vertical>
            <Dishwasher />
            Oppvaskmaskin
          </Tabs.Trigger>
          <Tabs.Trigger value="test3" vertical>
            <Freezer />
            Fryser
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs>
      <h2>Tabs small</h2>
      <Tabs defaultValue="test2" size="small">
        <Tabs.List>
          <Tabs.Trigger value="test1">
            <Cup />
            Skap
          </Tabs.Trigger>
          <Tabs.Trigger value="test2">
            <Dishwasher />
            Oppvaskmaskin
          </Tabs.Trigger>
          <Tabs.Trigger value="test3">
            <Freezer />
            Fryser
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs>
      <br />
      <Tabs defaultValue="test2" size="small">
        <Tabs.List>
          <Tabs.Trigger value="test1" vertical>
            <Cup />
            Skap
          </Tabs.Trigger>
          <Tabs.Trigger value="test2" vertical>
            <Dishwasher />
            Oppvaskmaskin
          </Tabs.Trigger>
          <Tabs.Trigger value="test3" vertical>
            <Freezer />
            Fryser
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs>
      <h2>Tabs Ikon-only</h2>
      <Tabs defaultValue="test2" iconOnly>
        <Tabs.List>
          <Tabs.Trigger value="test1">
            <Cup />
          </Tabs.Trigger>
          <Tabs.Trigger value="test2">
            <Dishwasher />
          </Tabs.Trigger>
          <Tabs.Trigger value="test3">
            <Freezer />
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs>
      <br />
      <Tabs defaultValue="test2" size="small" iconOnly>
        <Tabs.List>
          <Tabs.Trigger value="test1">
            <Cup />
          </Tabs.Trigger>
          <Tabs.Trigger value="test2">
            <Dishwasher />
          </Tabs.Trigger>
          <Tabs.Trigger value="test3">
            <Freezer />
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs>
      <h2>Regular font (BodyShort)</h2>
      <Tabs defaultValue="test2" fontWeight="regular">
        <Tabs.List>
          <Tabs.Trigger value="test1">
            <Cup />
            Skap
          </Tabs.Trigger>
          <Tabs.Trigger value="test2">
            <Dishwasher />
            Oppvaskmaskin
          </Tabs.Trigger>
          <Tabs.Trigger value="test3">
            <Freezer />
            Fryser
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs>
    </div>
  );
};
