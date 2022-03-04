import { Cup, Dishwasher, Freezer } from "@navikt/ds-icons";
import { Meta } from "@storybook/react/types-6-0";
import React from "react";
import { Tabs } from ".";

export default {
  title: "ds-react/tabs",
  component: Tabs,
} as Meta;

/* export const UUDemo = () => {
  const [activeValue, setActiveValue] = useState("ulest");
  return (
    <ToggleGroup value={activeValue} onChange={setActiveValue}>
      <ToggleGroup.Item value="ulest">Ulest</ToggleGroup.Item>
      <ToggleGroup.Item value="lest">Leste</ToggleGroup.Item>
      <ToggleGroup.Item value="sendt">Sendte</ToggleGroup.Item>
    </ToggleGroup>
  );
}; */

export const All = () => {
  /* const [activeValue, setActiveValue] = useState("first"); */

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
    </div>
  );
};
