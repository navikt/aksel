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
    clipboardText: "3.14",
    text: "",
    activeText: "",
  },
};

export const Interaction = {
  render: () => (
    <CopyButton
      clipboardText="3.14"
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
      <CopyButton clipboardText="3.14" variant="action" text="Kopier" />
      <CopyButton clipboardText="3.14" variant="neutral" text="Kopier" />
    </div>
  ),
};

export const Sizes = {
  render: () => (
    <div className="colgap">
      <div className="rowgap">
        <CopyButton clipboardText="3.14" variant="action" />
        <CopyButton clipboardText="3.14" variant="neutral" />
        <CopyButton clipboardText="3.14" variant="action" text="Kopier" />
        <CopyButton clipboardText="3.14" variant="neutral" text="Kopier" />
      </div>
      <div className="rowgap">
        <CopyButton size="small" clipboardText="3.14" variant="action" />
        <CopyButton size="small" clipboardText="3.14" variant="neutral" />
        <CopyButton
          size="small"
          clipboardText="3.14"
          variant="action"
          text="Kopier"
        />
        <CopyButton
          size="small"
          clipboardText="3.14"
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
    return (
      <div>
        <Tooltip content="Kopier fødselsnummer">
          <CopyButton clipboardText="3.14" />
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

const Hr = () => (
  <span
    style={{
      width: "100%",
      borderTop: "1px solid var(--a-border-divider)",
      marginBlock: "0.25rem",
    }}
  />
);

const Row = ({ children, txt }: any) => (
  <>
    <div
      style={{
        display: "grid",
        justifyContent: "space-between",
        alignItems: "center",
        gridTemplateColumns: "1fr 4fr auto",
      }}
    >
      <span>{txt}</span>
      <span>{children}</span>
      <CopyButton size="small" clipboardText="txt" />
    </div>
    <Hr />
  </>
);

export const Examples = {
  render: () => (
    <div className="colgap">
      <div style={{ display: "flex", gap: "0.25rem", alignItems: "center" }}>
        <span>Flere statsborgerskap: Norge, Danmark, Finland</span>
        <span>/</span>
        <span>Gift</span>
        <span>/</span>
        <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          17029645183 <CopyButton size="small" clipboardText="17029645183" />
        </span>
      </div>
      <div
        style={{
          display: "grid",
          alignItems: "center",
        }}
      >
        <Hr />
        <Row txt="Addresse 1:"> Osloveien 99, 0111 Oslo</Row>
        <Row txt="Addresse 2:"> Bergenveien 99, 2233 Bergen</Row>
        <Row txt="Telefon:">4040404040</Row>
        <Row txt="E-mail:">nav@naversen.no</Row>
      </div>
    </div>
  ),
};

export const BreadCrumbs = {
  render: () => (
    <div style={{ display: "flex", gap: "0.25rem", alignItems: "center" }}>
      <span>Flere statsborgerskap: Norge, Danmark, Finland</span>
      <span>/</span>
      <span>Gift</span>
      <span>/</span>
      <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
        17029645183 <CopyButton size="small" clipboardText="17029645183" />
      </span>
    </div>
  ),
};
