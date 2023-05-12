import { LinkIcon, ThumbUpIcon } from "@navikt/aksel-icons";
import React, { useState } from "react";
import { CopyButton } from ".";
import { Tooltip } from "../tooltip";
import { userEvent, within } from "@storybook/testing-library";

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
      options: ["tertiary", "tertiary-neutral"],
    },
  },
};

export const Default = {
  render: (args) => <CopyButton {...args} />,
  args: {
    size: "medium",
    duration: 2000,
    clipboardText: "3.14",
    text: "",
    activeText: "",
  },
};

export const Interaction = {
  render: () => (
    <CopyButton
      clipboardText="3.14"
      variant="tertiary"
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
      <CopyButton clipboardText="3.14" variant="tertiary" text="Kopier" />
      <CopyButton
        clipboardText="3.14"
        variant="tertiary-neutral"
        text="Kopier"
      />
    </div>
  ),
};

export const Sizes = {
  render: () => (
    <div className="colgap">
      <div className="rowgap">
        <CopyButton clipboardText="3.14" variant="tertiary" />
        <CopyButton clipboardText="3.14" variant="tertiary-neutral" />
        <CopyButton clipboardText="3.14" variant="tertiary" text="Kopier" />
        <CopyButton
          clipboardText="3.14"
          variant="tertiary-neutral"
          text="Kopier"
        />
      </div>
      <div className="rowgap">
        <CopyButton size="small" clipboardText="3.14" variant="tertiary" />
        <CopyButton
          size="small"
          clipboardText="3.14"
          variant="tertiary-neutral"
        />
        <CopyButton
          size="small"
          clipboardText="3.14"
          variant="tertiary"
          text="Kopier"
        />
        <CopyButton
          size="small"
          clipboardText="3.14"
          variant="tertiary-neutral"
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
          clipboardText="3.14"
          text="Kopier XYZ"
          activeText="Kopierte XYZ"
        />
      </div>
      <div>
        <CopyButton
          clipboardText="3.14"
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
          clipboardText="3.14"
          icon={<LinkIcon title="Kopier" />}
          activeIcon={<ThumbUpIcon title="Kopiert" />}
        />
      </div>
      <div>
        <CopyButton
          clipboardText="3.14"
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
      <CopyButton size="small" clipboardText="3.14" /> Kopier dette feltet
    </div>
  ),
};

export const WithTooltip = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [active, setActive] = useState(false);
    return (
      <div>
        <Tooltip
          content={active ? "Kopierte fødselsnummer" : "Kopier fødselsnummer"}
        >
          <CopyButton
            clipboardText="3.14"
            onActiveChange={(v) => setActive(v)}
          />
        </Tooltip>
      </div>
    );
  },
};

export const Duration = {
  render: () => <CopyButton clipboardText="3.14" activeDuration={300} />,
};

export const Disabled = {
  render: () => (
    <div className="colgap">
      <CopyButton clipboardText="3.14" disabled />
      <CopyButton clipboardText="3.14" size="small" disabled />
    </div>
  ),
};
