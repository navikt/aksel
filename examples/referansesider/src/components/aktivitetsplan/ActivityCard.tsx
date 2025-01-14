import { ReactNode } from "react";
import { Box, VStack } from "@navikt/ds-react";

const ActivityCard = ({ children }: { children: ReactNode }) => {
  return (
    <Box.New
      background="default"
      borderRadius="large"
      borderWidth="1"
      padding="space-12"
    >
      <VStack gap="space-8" align="start">
        {children}
      </VStack>
    </Box.New>
  );
};

export { ActivityCard };
