import { ReactNode } from "react";
import { Box, VStack } from "@navikt/ds-react";

const ActivityCard = ({ children }: { children: ReactNode }) => {
  return (
    <Box.New
      background="default"
      borderRadius="medium"
      borderWidth="1"
      // paddingBlock="space-12"
      // paddingInline="space-12"
      padding="space-12"
    >
      <VStack gap="4">{children}</VStack>
    </Box.New>
  );
};

export { ActivityCard };
