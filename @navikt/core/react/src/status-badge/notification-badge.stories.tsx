import React from "react";
import { NotificationBadge } from "./NotificationBadge";
import { BellIcon } from "@navikt/aksel-icons";
import { Button } from "../button";

export default {
  title: "ds-react/NotificationBadge",
  component: NotificationBadge,
};

export const Default = {
  render: () => {
    return (
      <div className="colgap" style={{ gap: "2rem" }}>
        <Box>
          <NotificationBadge>42</NotificationBadge>
        </Box>
        <Box label="marker">
          <NotificationBadge />
        </Box>
        <Box label="pulse">
          <NotificationBadge pulse>42</NotificationBadge>
        </Box>
        <div style={{ position: "relative", width: "fit-content" }}>
          <Button
            variant="tertiary"
            size="small"
            icon={
              <>
                <BellIcon />
                <NotificationBadge pulse />
              </>
            }
          ></Button>
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
