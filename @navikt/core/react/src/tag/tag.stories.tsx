import React from "react";
import type { Meta } from "@storybook/react";
import { CounterTag, Tag, TagProps, NotificationTag } from ".";
import { Button } from "../button";
import { BellIcon } from "@navikt/aksel-icons";

const variants: TagProps["variant"][] = [
  "warning",
  "error",
  "info",
  "success",
  "neutral",
  "alt1",
  "alt2",
  "alt3",
  "warning-filled",
  "error-filled",
  "info-filled",
  "success-filled",
  "neutral-filled",
  "alt1-filled",
  "alt2-filled",
  "alt3-filled",
  "warning-moderate",
  "error-moderate",
  "info-moderate",
  "success-moderate",
  "neutral-moderate",
  "alt1-moderate",
  "alt2-moderate",
  "alt3-moderate",
];

export default {
  title: "ds-react/Tag",
  component: Tag,
  argTypes: {
    variant: {
      defaultValue: "info",
      control: {
        type: "radio",
      },
      options: variants,
    },
    size: {
      defaultValue: "medium",
      control: {
        type: "radio",
      },
      options: ["xsmall", "small", "medium"],
    },
  },
} satisfies Meta<typeof Tag>;

export const Default = {
  render: (props) => (
    <Tag variant={props.variant} size={props.size}>
      {props.children}
    </Tag>
  ),

  args: {
    children: "Id elit esse",
    variant: "info",
  },
};

export const Small = () => {
  return (
    <div className="rowgap rowgap-wrap">
      {variants.map((variant, i) => (
        <Tag key={variant} variant={variant} size="small">
          {variant}
        </Tag>
      ))}
    </div>
  );
};

export const xSmall = () => {
  return (
    <div className="rowgap rowgap-wrap">
      {variants.map((variant, i) => (
        <Tag key={variant} variant={variant} size="xsmall">
          {variant}
        </Tag>
      ))}
    </div>
  );
};

export const Variants = () => {
  return (
    <div className="rowgap rowgap-wrap">
      {variants.map((variant, i) => (
        <Tag key={variant} variant={variant}>
          {variant}
        </Tag>
      ))}
    </div>
  );
};

export const CounterTags = () => {
  return (
    <div className="colgap">
      <div className="rowgap rowgap-wrap">
        {variants.map((variant, i) => (
          <CounterTag key={variant} variant={variant} count={10 * i} />
        ))}
      </div>
      <div className="rowgap rowgap-wrap">
        {variants.map((variant, i) => (
          <CounterTag
            key={variant}
            variant={variant}
            count={10 * i}
            shape="circle"
          />
        ))}
      </div>
    </div>
  );
};

export const NotificationTagDemo = {
  render: () => {
    return (
      <div className="colgap" style={{ gap: "2rem" }}>
        <Box>
          <NotificationTag count={42} />
        </Box>
        <Box label="marker">
          <NotificationTag />
        </Box>
        <Box label="pulse">
          <NotificationTag pulse count={42} />
        </Box>
        <div
          style={{
            position: "relative",
            width: "fit-content",
            display: "flex",
            gap: "8px",
          }}
        >
          <Button
            variant="tertiary"
            size="small"
            icon={
              <>
                <BellIcon />
                <NotificationTag pulse count={299999} />
              </>
            }
          >
            Meldinger
          </Button>
          <Button
            variant="tertiary"
            size="small"
            icon={
              <>
                <BellIcon />
                <NotificationTag pulse />
              </>
            }
          />
        </div>
      </div>
    );
  },
};

const Box = ({ ...props }) => (
  <div
    style={{
      position: "relative",
      width: "6rem",
      borderRadius: 4,
      height: "2rem",
      background: "var(--a-surface-alt-1-moderate)",
      color: "white",
      fontSize: 14,
      display: "grid",
      placeContent: "center",
    }}
  >
    {props?.label}
    {props?.children}
  </div>
);
