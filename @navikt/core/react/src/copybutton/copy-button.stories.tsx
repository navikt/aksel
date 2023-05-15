import { LinkIcon, ThumbUpIcon } from "@navikt/aksel-icons";
import { userEvent, within } from "@storybook/testing-library";
import React from "react";
import { CopyButton } from ".";
import { Tooltip } from "../tooltip";

export default {
  title: "ds-react/CopyButton",
  component: CopyButton,
  argTypes: {
    size: {
      defaultValue: "medium",
      control: { type: "radio" },
      options: ["small", "medium"],
    },
    variant: {
      defaultValue: undefined,
      control: { type: "radio" },
      options: ["neutral", "action"],
    },
  },
};

export const Default = {
  render: (args) => <CopyButton {...args} />,
  args: {
    size: "medium",
    duration: 2000,
    copyText: "3.14",
    text: "",
    activeText: "",
  },
};

export const Interaction = {
  render: () => (
    <CopyButton
      copyText="3.14"
      variant="action"
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

export const Variants = {
  render: () => (
    <div className="colgap">
      <CopyButton copyText="3.14" variant="action" text="Kopier" />
      <CopyButton copyText="3.14" variant="neutral" text="Kopier" />
    </div>
  ),
};

export const Sizes = {
  render: () => (
    <div className="colgap">
      <div className="rowgap">
        <CopyButton copyText="3.14" variant="action" />
        <CopyButton copyText="3.14" variant="neutral" />
        <CopyButton copyText="3.14" variant="action" text="Kopier" />
        <CopyButton copyText="3.14" variant="neutral" text="Kopier" />
      </div>
      <div className="rowgap">
        <CopyButton size="small" copyText="3.14" variant="action" />
        <CopyButton size="small" copyText="3.14" variant="neutral" />
        <CopyButton
          size="small"
          copyText="3.14"
          variant="action"
          text="Kopier"
        />
        <CopyButton
          size="small"
          copyText="3.14"
          variant="neutral"
          text="Kopier"
        />
      </div>
    </div>
  ),
};

export const Texts = {
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
    </div>
  ),
};

export const Icons = {
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
    </div>
  ),
};

export const InlineDemo = {
  render: () => (
    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
      <CopyButton size="small" copyText="3.14" /> Kopier dette feltet
    </div>
  ),
};

export const WithTooltip = {
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

export const Duration = {
  render: () => <CopyButton copyText="3.14" activeDuration={300} />,
};

export const Disabled = {
  render: () => (
    <div className="colgap">
      <CopyButton copyText="3.14" disabled />
      <CopyButton copyText="3.14" size="small" disabled />
    </div>
  ),
};
