import { PersonIcon } from "@navikt/aksel-icons";
import React from "react";
import { Box } from "../box";
import { HStack } from "../stack";

export function AvatarPanel({ children }: { children: React.ReactNode }) {
  return (
    <Box
      background="bg-default"
      paddingInline="10"
      paddingBlock="12 10"
      className="avatar-card"
      borderRadius="medium"
    >
      <HStack justify="center">
        <Box
          borderRadius="full"
          background="surface-success-moderate"
          className="avatar"
        >
          <PersonIcon fontSize="2rem" />
        </Box>
      </HStack>
      {children}
    </Box>
  );
}
