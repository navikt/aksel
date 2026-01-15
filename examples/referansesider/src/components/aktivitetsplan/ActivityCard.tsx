import { ReactNode } from "react";
import { Box, VStack } from "@navikt/ds-react";

const ActivityCard = ({ children }: { children: ReactNode }) => {
  return (
    <Box.New
      className="activity-card"
      background="raised"
      borderColor="neutral-subtleA"
      borderRadius="12"
      borderWidth="1"
      paddingInline="space-16"
      paddingBlock="space-12"
      style={{ position: "relative" }}
    >
      <VStack gap="space-8" align="start">
        {children}
      </VStack>
    </Box.New>
  );
};

export { ActivityCard };
