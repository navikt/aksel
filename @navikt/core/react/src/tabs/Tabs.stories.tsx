import { Cup, Dishwasher, Freezer } from "@navikt/ds-icons";
import { Meta } from "@storybook/react/types-6-0";
import React, { useState } from "react";
import { Tabs } from ".";

export default {
  title: "ds-react/tabs",
  component: Tabs,
} as Meta;

export const UUDemo = () => (
  <Tabs defaultValue="skap" lang="no">
    <Tabs.List>
      <Tabs.Tab value="skap">
        <Cup aria-hidden />
        Skap
      </Tabs.Tab>
      <Tabs.Tab value="oppvaskmaskin">
        <Dishwasher aria-hidden />
        Oppvaskmaskin
      </Tabs.Tab>
      <Tabs.Tab value="fryser">
        <Freezer aria-hidden />
        Fryser
      </Tabs.Tab>
    </Tabs.List>
    <Tabs.Panel
      value="skap"
      style={{ background: "var(--navds-global-color-gray-50)", height: 300 }}
    >
      Innholdspanel for Skap-tab
    </Tabs.Panel>
    <Tabs.Panel
      value="oppvaskmaskin"
      style={{ background: "var(--navds-global-color-green-50)", height: 300 }}
    >
      Innholdspanel for Oppvaskmaskin-tab
    </Tabs.Panel>
    <Tabs.Panel
      value="fryser"
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
          <Tabs.Tab value="test1">
            <Cup />
            Skap
          </Tabs.Tab>
          <Tabs.Tab value="test2">
            <Dishwasher />
            Oppvaskmaskin
          </Tabs.Tab>
          <Tabs.Tab value="test3">
            <Freezer />
            Fryser
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <h2>selectionFollowsFocus</h2>
      <Tabs defaultValue="test2" selectionFollowsFocus>
        <Tabs.List>
          <Tabs.Tab value="test1">
            <Cup />
            Skap
          </Tabs.Tab>
          <Tabs.Tab value="test2">
            <Dishwasher />
            Oppvaskmaskin
          </Tabs.Tab>
          <Tabs.Tab value="test3">
            <Freezer />
            Fryser
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <h2>Controlled</h2>

      <Tabs value={activeValue} onChange={setActiveValue}>
        <Tabs.List>
          <Tabs.Tab value="test1">
            <Cup />
            Skap
          </Tabs.Tab>
          <Tabs.Tab value="test2">
            <Dishwasher />
            Oppvaskmaskin
          </Tabs.Tab>
          <Tabs.Tab value="test3">
            <Freezer />
            Fryser
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>

      <h2>Tabs vertical</h2>
      <Tabs defaultValue="test2">
        <Tabs.List>
          <Tabs.Tab value="test1" vertical>
            <Cup />
            Skap
          </Tabs.Tab>
          <Tabs.Tab value="test2" vertical>
            <Dishwasher />
            Oppvaskmaskin
          </Tabs.Tab>
          <Tabs.Tab value="test3" vertical>
            <Freezer />
            Fryser
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <h2>Tabs small</h2>
      <Tabs defaultValue="test2" size="small">
        <Tabs.List>
          <Tabs.Tab value="test1">
            <Cup />
            Skap
          </Tabs.Tab>
          <Tabs.Tab value="test2">
            <Dishwasher />
            Oppvaskmaskin
          </Tabs.Tab>
          <Tabs.Tab value="test3">
            <Freezer />
            Fryser
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <br />
      <Tabs defaultValue="test2" size="small">
        <Tabs.List>
          <Tabs.Tab value="test1" vertical>
            <Cup />
            Skap
          </Tabs.Tab>
          <Tabs.Tab value="test2" vertical>
            <Dishwasher />
            Oppvaskmaskin
          </Tabs.Tab>
          <Tabs.Tab value="test3" vertical>
            <Freezer />
            Fryser
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <h2>Tabs Ikon-only</h2>
      <Tabs defaultValue="test2" iconOnly>
        <Tabs.List>
          <Tabs.Tab value="test1">
            <Cup />
          </Tabs.Tab>
          <Tabs.Tab value="test2">
            <Dishwasher />
          </Tabs.Tab>
          <Tabs.Tab value="test3">
            <Freezer />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <br />
      <Tabs defaultValue="test2" size="small" iconOnly>
        <Tabs.List>
          <Tabs.Tab value="test1">
            <Cup />
          </Tabs.Tab>
          <Tabs.Tab value="test2">
            <Dishwasher />
          </Tabs.Tab>
          <Tabs.Tab value="test3">
            <Freezer />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <h2>Regular font (BodyShort)</h2>
      <Tabs defaultValue="test2" fontWeight="regular">
        <Tabs.List>
          <Tabs.Tab value="test1">
            <Cup />
            Skap
          </Tabs.Tab>
          <Tabs.Tab value="test2">
            <Dishwasher />
            Oppvaskmaskin
          </Tabs.Tab>
          <Tabs.Tab value="test3">
            <Freezer />
            Fryser
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </div>
  );
};
