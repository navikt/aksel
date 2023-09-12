import { PersonIcon } from "@navikt/aksel-icons";
import React from "react";
import { Box } from "../box";
import { HStack } from "../stack";

export function AvatarPanel({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>
        {`

        .guide-panel-box {

          position: relative;

        }

        .avatar-circle {

          width: 4rem;

          height: 4rem;

          position: absolute;

          top: -2rem;

        }

      `}
      </style>

      <Box
        background="bg-default"
        padding="5"
        paddingBlock="10 3"
        className="guide-panel-box"
      >
        <HStack justify="center">
          <Box
            className="avatar-circle"
            borderRadius="full"
            padding="3"
            background="surface-success-subtle"
          >
            <PersonIcon fontSize={40} />
          </Box>
        </HStack>

        {children}
      </Box>
    </>
  );
}
