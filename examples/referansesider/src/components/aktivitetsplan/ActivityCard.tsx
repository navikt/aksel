import { ReactNode } from "react";
import { Box, VStack } from "@navikt/ds-react";

const ActivityCard = ({ children }: { children: ReactNode }) => {
  return (
    <Box.New
      className="activity-card"
      background="raised"
      borderColor="subtleA"
      borderRadius="xlarge"
      borderWidth="1"
      padding="space-16 space-12 space-12"
      style={{ position: "relative" }}
    >
      <VStack gap="space-8" align="start">
        {children}
      </VStack>
    </Box.New>
  );
};

export { ActivityCard };
