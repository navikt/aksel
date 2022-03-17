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
      <Tabs.Tab value="skap" label="Skap" icon={<Cup aria-hidden />} />
      <Tabs.Tab
        value="oppvaskmaskin"
        label="Oppvaskmaskin"
        icon={<Dishwasher aria-hidden />}
      />
      <Tabs.Tab value="fryser" icon={<Freezer aria-hidden />} label="Fryser" />
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
          <Tabs.Tab value="test1" icon={<Cup />} label="Skap" />
          <Tabs.Tab value="test2" label="Oppvaskmaskin" icon={<Dishwasher />} />
          <Tabs.Tab value="test3" icon={<Freezer />} label="Fryser" />
        </Tabs.List>
      </Tabs>

      <h2>selectionFollowsFocus</h2>
      <Tabs defaultValue="test2" selectionFollowsFocus>
        <Tabs.List>
          <Tabs.Tab value="test1" icon={<Cup />} label="Skap" />
          <Tabs.Tab value="test2" label="Oppvaskmaskin" icon={<Dishwasher />} />
          <Tabs.Tab value="test3" icon={<Freezer />} label="Fryser" />
        </Tabs.List>
      </Tabs>

      <h2>Controlled</h2>
      <Tabs value={activeValue} onChange={setActiveValue}>
        <Tabs.List>
          <Tabs.List>
            <Tabs.Tab value="test1" icon={<Cup />} label="Skap" />
            <Tabs.Tab
              value="test2"
              label="Oppvaskmaskin"
              icon={<Dishwasher />}
            />
            <Tabs.Tab value="test3" icon={<Freezer />} label="Fryser" />
          </Tabs.List>
        </Tabs.List>
      </Tabs>

      <h2>Tabs iconPosition="top"</h2>
      <Tabs defaultValue="test2">
        <Tabs.List>
          <Tabs.Tab
            value="test1"
            icon={<Cup />}
            label="Skap"
            iconPosition="top"
          />
          <Tabs.Tab
            value="test2"
            label="Oppvaskmaskin"
            icon={<Dishwasher />}
            iconPosition="top"
          />
          <Tabs.Tab
            value="test3"
            icon={<Freezer />}
            label="Fryser"
            iconPosition="top"
          />
        </Tabs.List>
      </Tabs>

      <h2>Tabs small</h2>
      <Tabs defaultValue="test2" size="small">
        <Tabs.List>
          <Tabs.Tab value="test1" icon={<Cup />} label="Skap" />
          <Tabs.Tab value="test2" label="Oppvaskmaskin" icon={<Dishwasher />} />
          <Tabs.Tab value="test3" icon={<Freezer />} label="Fryser" />
        </Tabs.List>
      </Tabs>
      <br />
      <Tabs defaultValue="test2" size="small">
        <Tabs.List>
          <Tabs.Tab
            value="test1"
            icon={<Cup />}
            label="Skap"
            iconPosition="top"
          />

          <Tabs.Tab
            value="test2"
            label="Oppvaskmaskin"
            icon={<Dishwasher />}
            iconPosition="top"
          />
          <Tabs.Tab
            value="test3"
            icon={<Freezer />}
            label="Fryser"
            iconPosition="top"
          />
        </Tabs.List>
      </Tabs>

      <h2>Tabs Ikon-only</h2>
      <Tabs defaultValue="test2">
        <Tabs.List>
          <Tabs.Tab value="test1" icon={<Cup />} />
          <Tabs.Tab value="test2" icon={<Dishwasher />} />
          <Tabs.Tab value="test3" icon={<Freezer />} />
        </Tabs.List>
      </Tabs>
      <br />
      <Tabs defaultValue="test2" size="small">
        <Tabs.List>
          <Tabs.Tab value="test1" icon={<Cup />} />
          <Tabs.Tab value="test2" icon={<Dishwasher />} />
          <Tabs.Tab value="test3" icon={<Freezer />} />
        </Tabs.List>
      </Tabs>
      {/* <h2>Regular font (BodyShort)</h2>
      <Tabs defaultValue="test2" >
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
      </Tabs> */}
    </div>
  );
};
