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
    <Box.New background="sunken" borderRadius="medium" padding="space-8">
      <VStack gap="space-8">
        <Heading as="h2" size="small">
          {title}
        </Heading>
        {children}
      </VStack>
    </Box.New>
  );
};

export { ActivityColumn };
