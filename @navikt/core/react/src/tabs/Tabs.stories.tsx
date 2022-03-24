import { Cup, Dishwasher, Freezer } from "@navikt/ds-icons";
import { Meta } from "@storybook/react/types-6-0";
import React, { useState } from "react";
import { Tabs } from ".";
import { Link } from "../link";

export default {
  title: "ds-react/tabs",
  component: Tabs,
} as Meta;

export const UUDemoTabIndex = () => {
  const [active, setActive] = useState("skap");
  return (
    <Tabs value={active} onChange={setActive} lang="no">
      <Tabs.List>
        <Tabs.Tab value="skap" label="Skap" icon={<Cup aria-hidden />} />
        <Tabs.Tab
          value="oppvaskmaskin"
          label="Oppvaskmaskin"
          icon={<Dishwasher aria-hidden />}
        />
        <Tabs.Tab
          value="fryser"
          icon={<Freezer aria-hidden />}
          label="Fryser"
        />
      </Tabs.List>
      <Tabs.Panel
        value="skap"
        tabIndex={active === "skap" ? 0 : -1}
        style={{ background: "var(--navds-global-color-gray-50)", height: 300 }}
      >
        Innholdspanel for skap med lenke <Link href="#">Dette er en lenke</Link>
      </Tabs.Panel>
      <Tabs.Panel
        tabIndex={active === "oppvaskmaskin" ? 0 : -1}
        value="oppvaskmaskin"
        style={{
          background: "var(--navds-global-color-green-50)",
          height: 300,
        }}
      >
        Innholdspanel for oppvaskmaskin med lenke{" "}
        <Link href="#">Dette er en lenke</Link>
      </Tabs.Panel>
      <Tabs.Panel
        tabIndex={active === "fryser" ? 0 : -1}
        value="fryser"
        style={{ background: "var(--navds-global-color-red-50)", height: 300 }}
      >
        Innholdspanel for fryser med lenke{" "}
        <Link href="#">Dette er en lenke</Link>
      </Tabs.Panel>
    </Tabs>
  );
};

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
      Innholdspanel for skap med lenke <Link href="#">Dette er en lenke</Link>
    </Tabs.Panel>
    <Tabs.Panel
      value="oppvaskmaskin"
      style={{ background: "var(--navds-global-color-green-50)", height: 300 }}
    >
      Innholdspanel for oppvaskmaskin med lenke{" "}
      <Link href="#">Dette er en lenke</Link>
    </Tabs.Panel>
    <Tabs.Panel
      value="fryser"
      style={{ background: "var(--navds-global-color-red-50)", height: 300 }}
    >
      Innholdspanel for fryser med lenke <Link href="#">Dette er en lenke</Link>
    </Tabs.Panel>
  </Tabs>
);

const Panel = () => {
  return (
    <>
      <Tabs.Panel
        value="test1"
        style={{ background: "var(--navds-global-color-gray-50)", height: 100 }}
      >
        Innholdspanel for Skap-tab
      </Tabs.Panel>
      <Tabs.Panel
        value="test2"
        style={{
          background: "var(--navds-global-color-green-50)",
          height: 100,
        }}
      >
        Innholdspanel for Oppvaskmaskin-tab
      </Tabs.Panel>
      <Tabs.Panel
        value="test3"
        style={{ background: "var(--navds-global-color-red-50)", height: 100 }}
      >
        Innholdspanel for Fryser-tab
      </Tabs.Panel>
    </>
  );
};

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
        <Panel />
      </Tabs>

      <h2>Controlled</h2>
      <Tabs value={activeValue} onChange={setActiveValue}>
        <Tabs.List>
          <Tabs.Tab value="test1" icon={<Cup />} label="Skap" />
          <Tabs.Tab value="test2" label="Oppvaskmaskin" icon={<Dishwasher />} />
          <Tabs.Tab value="test3" icon={<Freezer />} label="Fryser" />
        </Tabs.List>
        <Panel />
      </Tabs>

      <h2>selectionFollowsFocus</h2>
      <Tabs defaultValue="test2" selectionFollowsFocus>
        <Tabs.List>
          <Tabs.Tab value="test1" icon={<Cup />} label="Skap" />
          <Tabs.Tab value="test2" label="Oppvaskmaskin" icon={<Dishwasher />} />
          <Tabs.Tab value="test3" icon={<Freezer />} label="Fryser" />
        </Tabs.List>
        <Panel />
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
        <Panel />
      </Tabs>

      <h2>Tabs small</h2>
      <Tabs defaultValue="test2" size="small">
        <Tabs.List>
          <Tabs.Tab value="test1" icon={<Cup />} label="Skap" />
          <Tabs.Tab value="test2" label="Oppvaskmaskin" icon={<Dishwasher />} />
          <Tabs.Tab value="test3" icon={<Freezer />} label="Fryser" />
        </Tabs.List>
        <Panel />
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
        <Panel />
      </Tabs>

      <h2>Tabs Icon-only</h2>
      <Tabs defaultValue="test2">
        <Tabs.List>
          <Tabs.Tab value="test1" icon={<Cup />} />
          <Tabs.Tab value="test2" icon={<Dishwasher />} />
          <Tabs.Tab value="test3" icon={<Freezer />} />
        </Tabs.List>
        <Panel />
      </Tabs>
      <br />
      <Tabs defaultValue="test2" size="small">
        <Tabs.List>
          <Tabs.Tab value="test1" icon={<Cup />} />
          <Tabs.Tab value="test2" icon={<Dishwasher />} />
          <Tabs.Tab value="test3" icon={<Freezer />} />
        </Tabs.List>
        <Panel />
      </Tabs>
    </div>
  );
};
