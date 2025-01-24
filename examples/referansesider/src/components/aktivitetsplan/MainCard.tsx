import { ReactNode } from "react";
import { Box, HStack } from "@navikt/ds-react";

const MainCard = ({ children }: { children: ReactNode }) => (
  <Box.New
    borderColor="border-subtle"
    borderWidth="1"
    borderRadius="medium"
    padding="space-16"
    marginBlock="space-32 space-4"
  >
    <HStack gap="space-24">{children}</HStack>
  </Box.New>
);

export { MainCard };
