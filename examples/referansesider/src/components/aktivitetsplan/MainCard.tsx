import { ReactNode } from "react";
import { Box, HStack } from "@navikt/ds-react";

const MainCard = ({ children }: { children: ReactNode }) => (
  <Box
    borderColor="border-subtle"
    borderWidth="1"
    borderRadius="medium"
    padding="space-16"
    marginBlock="space-32 space-4"
  >
    <HStack gap="space-24">{children}</HStack>
  </Box>
);

export { MainCard };
