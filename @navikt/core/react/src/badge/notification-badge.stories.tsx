import { BellIcon } from "@navikt/aksel-icons";
import React from "react";
import { Button } from "../button";
import { NotificationBadge } from "./NotificationBadge";

export default {
  title: "ds-react/NotificationBadge",
  component: NotificationBadge,
};

export const Default = {
  render: () => {
    return (
      <div className="colgap" style={{ gap: "2rem" }}>
        <Box>
          <NotificationBadge count={42} />
        </Box>
        <Box label="marker">
          <NotificationBadge />
        </Box>
        <Box label="pulse">
          <NotificationBadge pulse count={42} />
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
                <NotificationBadge pulse count={299999} />
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
                <NotificationBadge pulse />
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
