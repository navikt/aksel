import { ReactNode } from "react";
import { Box, VStack } from "@navikt/ds-react";

const ActivityColumn = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  return (
    <Box.New background="brand-beige" borderRadius="medium" padding="space-16">
      <VStack gap="space-8">
        <h2>{title}</h2>
        {children}
      </VStack>
    </Box.New>
  );
};

export { ActivityColumn };
