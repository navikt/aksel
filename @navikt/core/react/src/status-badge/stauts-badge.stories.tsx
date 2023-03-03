import React from "react";
import { StatusBadge } from "./StatusBadge";

export default {
  title: "ds-react/StatusBadge",
  component: StatusBadge,
};

export const Default = {
  render: () => {
    return (
      <div className="colgap" style={{ gap: "2rem" }}>
        <Box label="positions">
          <StatusBadge shape="count" position="bottom-left">
            99
          </StatusBadge>
          <StatusBadge shape="count" position="top-left">
            99
          </StatusBadge>
          <StatusBadge shape="count" position="bottom-right">
            99
          </StatusBadge>
          <StatusBadge shape="count" position="top-right">
            99
          </StatusBadge>
        </Box>
        <Box label="marker">
          <StatusBadge shape="marker" position="bottom-left" />
          <StatusBadge shape="marker" position="top-left" />
          <StatusBadge shape="marker" position="bottom-right" />
          <StatusBadge shape="marker" position="top-right" />
        </Box>
        <Box label="variants">
          <StatusBadge variant="info" position="top-right" />
          <StatusBadge variant="success" position="top-left" />
          <StatusBadge variant="error" position="bottom-right" />
          <StatusBadge variant="warning" position="bottom-left" />
        </Box>
        <Box label="variants">
          <StatusBadge variant="alt1" position="top-left" />
          <StatusBadge variant="alt2" position="bottom-right" />
          <StatusBadge variant="alt3" position="top-right" />
        </Box>
        <Box label="count+variant">
          <StatusBadge shape="count" variant="info" position="top-right">
            99
          </StatusBadge>
          <StatusBadge shape="count" variant="success" position="top-left">
            99
          </StatusBadge>
          <StatusBadge shape="count" variant="error" position="bottom-right">
            99
          </StatusBadge>
          <StatusBadge shape="count" variant="warning" position="bottom-left">
            99
          </StatusBadge>
        </Box>
        <Box label="pulse">
          <StatusBadge pulse shape="count" variant="info" position="top-right">
            99
          </StatusBadge>
          <StatusBadge
            pulse
            shape="count"
            variant="success"
            position="top-left"
          >
            99
          </StatusBadge>
          <StatusBadge
            pulse
            shape="count"
            variant="error"
            position="bottom-right"
          >
            99
          </StatusBadge>
          <StatusBadge
            pulse
            shape="count"
            variant="warning"
            position="bottom-left"
          >
            99
          </StatusBadge>
        </Box>
        <Box>
          <StatusBadge pulse shape="count" variant="alt3" position="top-left">
            99
          </StatusBadge>
          <StatusBadge pulse shape="count" variant="alt1" position="top-right">
            99
          </StatusBadge>
          <StatusBadge
            pulse
            shape="count"
            variant="alt2"
            position="bottom-left"
          >
            99
          </StatusBadge>
        </Box>
        <Box label="pulse">
          <StatusBadge pulse variant="info" position="top-right" />
          <StatusBadge pulse variant="success" position="top-left" />
          <StatusBadge pulse variant="error" position="bottom-right" />
          <StatusBadge pulse variant="warning" position="bottom-left" />
        </Box>
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
      height: "6rem",
      background: "var(--a-gray-900)",
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
