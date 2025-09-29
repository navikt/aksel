import { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { DishwasherIcon, FreezerIcon, MugIcon } from "@navikt/aksel-icons";
import { Tabs } from ".";
import { VStack } from "../layout/stack";

export default {
  title: "ds-react/Tabs",
  component: Tabs,
  argTypes: {
    size: {
      options: ["medium", "small"],
      control: {
        type: "radio",
      },
    },
    iconPosition: {
      options: ["top", "left"],
      control: {
        type: "radio",
      },
    },
  },
  parameters: {
    chromatic: { disable: true },
  },
} satisfies Meta<typeof Tabs>;

type Story = StoryObj<typeof Tabs>;

const Panel = () => (
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

export const Default: Story = {
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
          <Tabs.Tab value="test1" icon={<MugIcon aria-hidden />} label="Skap" />
          <Tabs.Tab
            value="test2"
            label="Oppvaskmaskin"
            icon={<DishwasherIcon aria-hidden />}
          />
          <Tabs.Tab
            value="test3"
            icon={<FreezerIcon aria-hidden />}
            label="Fryser"
          />
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

export const Small = () => (
  <Tabs defaultValue="test2" size="small">
    <Tabs.List>
      <Tabs.Tab value="test1" icon={<MugIcon aria-hidden />} label="Skap" />
      <Tabs.Tab
        value="test2"
        label="Oppvaskmaskin"
        icon={<DishwasherIcon aria-hidden />}
      />
      <Tabs.Tab
        value="test3"
        icon={<FreezerIcon aria-hidden />}
        label="Fryser"
      />
    </Tabs.List>
    <Panel />
  </Tabs>
);

export const Controlled = () => {
  const [activeValue, setActiveValue] = useState("test1");
  return (
    <Tabs value={activeValue} onChange={setActiveValue}>
      <Tabs.List>
        <Tabs.Tab value="test1" icon={<MugIcon aria-hidden />} label="Skap" />
        <Tabs.Tab
          value="test2"
          label="Oppvaskmaskin"
          icon={<DishwasherIcon aria-hidden />}
        />
        <Tabs.Tab
          value="test3"
          icon={<FreezerIcon aria-hidden />}
          label="Fryser"
        />
      </Tabs.List>
      <Panel />
    </Tabs>
  );
};

export const IconPosition = () => (
  <VStack gap="4">
    <Tabs defaultValue="test2" size="small">
      <Tabs.List>
        <Tabs.Tab value="test1" icon={<MugIcon aria-hidden />} label="Skap" />
        <Tabs.Tab
          value="test2"
          label="Oppvaskmaskin"
          icon={<DishwasherIcon aria-hidden />}
        />
        <Tabs.Tab
          value="test3"
          icon={<FreezerIcon aria-hidden />}
          label="Fryser"
        />
      </Tabs.List>
      <Panel />
    </Tabs>
    <Tabs defaultValue="test2" size="small" iconPosition="top">
      <Tabs.List style={{ margin: "0 auto" }}>
        <Tabs.Tab value="test1" icon={<MugIcon aria-hidden />} label="Skap" />
        <Tabs.Tab
          value="test2"
          label="Oppvaskmaskin"
          icon={<DishwasherIcon aria-hidden />}
        />
        <Tabs.Tab
          value="test3"
          icon={<FreezerIcon aria-hidden />}
          label="Fryser"
        />
      </Tabs.List>
      <Panel />
    </Tabs>
  </VStack>
);

export const Icon = () => (
  <VStack gap="4">
    <Tabs defaultValue="test2">
      <Tabs.List style={{ margin: "0 auto" }}>
        <Tabs.Tab value="test1" icon={<MugIcon title="Skap" />} />
        <Tabs.Tab
          value="test2"
          icon={<DishwasherIcon title="Oppvaskmaskin" />}
        />
        <Tabs.Tab value="test3" icon={<FreezerIcon title="Fryser" />} />
      </Tabs.List>
      <Panel />
    </Tabs>
    <Tabs defaultValue="test2" size="small" iconPosition="top">
      <Tabs.List style={{ margin: "0 auto" }}>
        <Tabs.Tab value="test1" icon={<MugIcon title="Skap" />} />
        <Tabs.Tab
          value="test2"
          icon={<DishwasherIcon title="Oppvaskmaskin" />}
        />
        <Tabs.Tab value="test3" icon={<FreezerIcon title="Fryser" />} />
      </Tabs.List>
      <Panel />
    </Tabs>
  </VStack>
);

export const Overflow = () => (
  <Tabs defaultValue="test2" style={{ maxWidth: 300 }}>
    <Tabs.List>
      <Tabs.Tab value="test1" icon={<MugIcon aria-hidden />} label="Skap" />
      <Tabs.Tab
        value="test2"
        label="Oppvaskmaskin"
        icon={<DishwasherIcon aria-hidden />}
      />
      <Tabs.Tab
        value="test3"
        icon={<FreezerIcon aria-hidden />}
        label="Fryser"
      />
    </Tabs.List>
    <Panel />
  </Tabs>
);

export const Fill = () => (
  <Tabs defaultValue="test2" fill>
    <Tabs.List>
      <Tabs.Tab value="test1" icon={<MugIcon aria-hidden />} label="Skap" />
      <Tabs.Tab
        value="test2"
        icon={<DishwasherIcon aria-hidden />}
        label="Oppvaskmaskin"
      />
      <Tabs.Tab
        value="test3"
        icon={<FreezerIcon aria-hidden />}
        label="Fryser"
      />
    </Tabs.List>
    <Panel />
  </Tabs>
);

Fill.parameters = {
  layout: "fullscreen",
};

export const CustomIds = () => (
  <Tabs defaultValue="test2">
    <Tabs.List>
      <Tabs.Tab
        value="test1"
        label="Skap"
        id="custom-tabid-1"
        aria-controls="custom-tabpanelid-1"
      />
      <Tabs.Tab
        value="test2"
        label="Oppvaskmaskin"
        id="custom-tabid-2"
        aria-controls="custom-tabpanelid-2"
      />
    </Tabs.List>
    <Tabs.Panel
      value="test1"
      className="panel"
      id="custom-tabpanelid-1"
      aria-labelledby="custom-tabid-1"
    >
      Innholdspanel for Skap-tab
    </Tabs.Panel>
    <Tabs.Panel
      value="test2"
      className="panel"
      id="custom-tabpanelid-2"
      aria-labelledby="custom-tabid-2"
    >
      Innholdspanel for Oppvaskmaskin-tab
    </Tabs.Panel>
  </Tabs>
);

export const ColorRole = () => (
  <div data-color="brand-magenta">
    <Controlled />
  </div>
);

export const Chromatic = {
  render: () => (
    <VStack gap="6" align="center">
      <div>
        <h2>Small</h2>
        <Small />
      </div>
      <div>
        <h2>Controlled</h2>
        <Controlled />
      </div>
      <div>
        <h2>IconPosition</h2>
        <IconPosition />
      </div>
      <div>
        <h2>Icon</h2>
        <Icon />
      </div>
      <div>
        <h2>Overflow</h2>
        <Overflow />
      </div>
      <div>
        <h2>Fill</h2>
        <div style={{ minWidth: 600 }}>
          <Fill />
        </div>
      </div>
      <div>
        <h2>ColorRole</h2>
        <ColorRole />
      </div>
    </VStack>
  ),
  parameters: {
    chromatic: { disable: false, delay: 300 },
  },
};
