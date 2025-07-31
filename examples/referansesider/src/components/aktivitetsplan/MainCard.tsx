import { ReactNode } from "react";
import { Box, HStack } from "@navikt/ds-react";

const MainCard = ({ children }: { children: ReactNode }) => (
  <Box.New
    background="raised"
    borderColor="neutral-subtleA"
    borderWidth="1"
    borderRadius="xlarge"
    padding="space-16"
  >
    <HStack gap="space-24">{children}</HStack>
  </Box.New>
);

export { MainCard };
