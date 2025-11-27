import { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { userEvent, within } from "storybook/test";
import { LinkIcon, ThumbUpIcon } from "@navikt/aksel-icons";
import { CopyButton } from ".";
import { Tooltip } from "../tooltip";

const meta: Meta<typeof CopyButton> = {
  title: "ds-react/CopyButton",
  component: CopyButton,
  parameters: {
    chromatic: { disable: true },
  },
};
export default meta;

type Story = StoryObj<typeof CopyButton>;

export const Default: Story = {
  render: (props) => <CopyButton {...props} />,
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["medium", "small", "xsmall"],
    },
    iconPosition: {
      control: { type: "radio" },
      options: ["left", "right"],
    },
  },
  args: {
    size: "medium",
    activeDuration: 2000,
    copyText: "3.14",
    text: "",
    activeText: "",
    title: "",
  },
};

export const Interaction: Story = {
  render: () => (
    <CopyButton
      copyText="3.14"
      data-color="accent"
      text="Kopier"
      data-testid="copy-button"
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByTestId("copy-button");

    userEvent.click(button);
  },
};

export const IconPosition: Story = {
  render: () => (
    <div className="colgap">
      <CopyButton copyText="3.14" iconPosition="left" text="Kopier" />

      <CopyButton copyText="3.14" iconPosition="right" text="Kopier" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="colgap">
      <div className="rowgap">
        <CopyButton copyText="3.14" />
        <CopyButton copyText="3.14" text="Kopier" />
      </div>
      <div className="rowgap">
        <CopyButton size="small" copyText="3.14" />
        <CopyButton size="small" copyText="3.14" text="Kopier" />
      </div>
      <div className="rowgap">
        <CopyButton size="xsmall" copyText="3.14" />
        <CopyButton size="xsmall" copyText="3.14" text="Kopier" />
      </div>
    </div>
  ),
};

export const Texts: Story = {
  render: () => (
    <div className="colgap">
      <div>
        <CopyButton
          copyText="3.14"
          text="Kopier XYZ"
          activeText="Kopierte XYZ"
        />
      </div>
      <div>
        <CopyButton
          copyText="3.14"
          size="small"
          text="Kopier XYZ"
          activeText="Kopierte XYZ"
        />
      </div>
      <div>
        <CopyButton
          copyText="3.14"
          size="xsmall"
          text="Kopier XYZ"
          activeText="Kopierte XYZ"
        />
      </div>
    </div>
  ),
};

export const Icons: Story = {
  render: () => (
    <div className="rowgap">
      <div>
        <CopyButton
          copyText="3.14"
          icon={<LinkIcon title="Kopier" />}
          activeIcon={<ThumbUpIcon title="Kopiert" />}
        />
      </div>
      <div>
        <CopyButton
          copyText="3.14"
          size="small"
          icon={<LinkIcon title="Kopier" />}
          activeIcon={<ThumbUpIcon title="Kopiert" />}
        />
      </div>
      <div>
        <CopyButton
          copyText="3.14"
          size="xsmall"
          icon={<LinkIcon title="Kopier" />}
          activeIcon={<ThumbUpIcon title="Kopiert" />}
        />
      </div>
    </div>
  ),
};

export const InlineDemo: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <CopyButton size="small" copyText="3.14" /> Kopier dette feltet
    </div>
  ),
};

export const WithTooltip: Story = {
  render: () => {
    return (
      <div>
        <Tooltip content="Kopier fødselsnummer">
          <CopyButton copyText="3.14" />
        </Tooltip>
      </div>
    );
  },
};

export const Duration: Story = {
  render: () => <CopyButton copyText="3.14" activeDuration={300} />,
};

export const Disabled: Story = {
  render: () => (
    <div className="colgap">
      <CopyButton copyText="3.14" disabled />
      <CopyButton copyText="3.14" size="small" disabled />
    </div>
  ),
};

export const Chromatic: Story = {
  render: (...props) => (
    <div>
      <div>
        <h2>IconPosition</h2>
        {IconPosition.render?.(...props)}
      </div>
      <div>
        <h2>Sizes</h2>
        {Sizes.render?.(...props)}
      </div>
      <div>
        <h2>Texts</h2>
        {Texts.render?.(...props)}
      </div>
      <div>
        <h2>Icons</h2>
        {Icons.render?.(...props)}
      </div>
      <div>
        <h2>InlineDemo</h2>
        {InlineDemo.render?.(...props)}
      </div>
      <div>
        <h2>WithTooltip</h2>
        {WithTooltip.render?.(...props)}
      </div>
      <div>
        <h2>Duration</h2>
        {Duration.render?.(...props)}
      </div>
      <div>
        <h2>Disabled</h2>
        {Disabled.render?.(...props)}
      </div>
    </div>
  ),
  parameters: {
    chromatic: { disable: false },
  },
};
