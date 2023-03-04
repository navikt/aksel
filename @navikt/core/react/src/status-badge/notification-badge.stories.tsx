import React from "react";
import { NotificationBadge } from "./NotificationBadge";

export default {
  title: "ds-react/NotificationBadge",
  component: NotificationBadge,
};

export const Default = {
  render: () => {
    return (
      <div className="colgap" style={{ gap: "2rem" }}>
        <Box label="positions">
          <NotificationBadge shape="count" position="bottom-left">
            99
          </NotificationBadge>
          <NotificationBadge shape="count" position="top-left">
            99
          </NotificationBadge>
          <NotificationBadge shape="count" position="bottom-right">
            99
          </NotificationBadge>
          <NotificationBadge shape="count" position="top-right">
            99
          </NotificationBadge>
        </Box>
        <Box label="marker">
          <NotificationBadge shape="marker" position="bottom-left" />
          <NotificationBadge shape="marker" position="top-left" />
          <NotificationBadge shape="marker" position="bottom-right" />
          <NotificationBadge shape="marker" position="top-right" />
        </Box>
        <Box label="variants">
          <NotificationBadge variant="info" position="top-right" />
          <NotificationBadge variant="success" position="top-left" />
          <NotificationBadge variant="error" position="bottom-right" />
          <NotificationBadge variant="warning" position="bottom-left" />
        </Box>
        <Box label="variants">
          <NotificationBadge variant="alt1" position="top-left" />
          <NotificationBadge variant="alt2" position="bottom-right" />
          <NotificationBadge variant="alt3" position="top-right" />
        </Box>
        <Box label="count+variant">
          <NotificationBadge shape="count" variant="info" position="top-right">
            99
          </NotificationBadge>
          <NotificationBadge
            shape="count"
            variant="success"
            position="top-left"
          >
            99
          </NotificationBadge>
          <NotificationBadge
            shape="count"
            variant="error"
            position="bottom-right"
          >
            99
          </NotificationBadge>
          <NotificationBadge
            shape="count"
            variant="warning"
            position="bottom-left"
          >
            99
          </NotificationBadge>
        </Box>
        <Box label="pulse">
          <NotificationBadge
            pulse
            shape="count"
            variant="info"
            position="top-right"
          >
            99
          </NotificationBadge>
          <NotificationBadge
            pulse
            shape="count"
            variant="success"
            position="top-left"
          >
            99
          </NotificationBadge>
          <NotificationBadge
            pulse
            shape="count"
            variant="error"
            position="bottom-right"
          >
            99
          </NotificationBadge>
          <NotificationBadge
            pulse
            shape="count"
            variant="warning"
            position="bottom-left"
          >
            99
          </NotificationBadge>
        </Box>
        <Box>
          <NotificationBadge
            pulse
            shape="count"
            variant="alt3"
            position="top-left"
          >
            99
          </NotificationBadge>
          <NotificationBadge
            pulse
            shape="count"
            variant="alt1"
            position="top-right"
          >
            99
          </NotificationBadge>
          <NotificationBadge
            pulse
            shape="count"
            variant="alt2"
            position="bottom-left"
          >
            99
          </NotificationBadge>
        </Box>
        <Box label="pulse">
          <NotificationBadge pulse variant="info" position="top-right" />
          <NotificationBadge pulse variant="success" position="top-left" />
          <NotificationBadge pulse variant="error" position="bottom-right" />
          <NotificationBadge pulse variant="warning" position="bottom-left" />
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
