import { ReactNode } from "react";
import { Box, Heading, VStack } from "@navikt/ds-react";

const ActivityColumn = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  return (
    <Box.New
      background="sunken"
      borderColor="subtleA"
      borderWidth="1"
      borderRadius="xlarge"
      padding="space-12"
    >
      <VStack gap="space-12">
        <Heading as="h2" size="small">
          {title}
        </Heading>
        {children}
      </VStack>
    </Box.New>
  );
};

export { ActivityColumn };
