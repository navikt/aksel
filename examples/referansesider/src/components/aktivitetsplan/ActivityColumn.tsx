import { ReactNode } from "react";
import { Box, HStack, Heading, HelpText, VStack } from "@navikt/ds-react";

const ActivityColumn = ({
  children,
  helpText,
  title,
}: {
  children: ReactNode;
  helpText?: string;
  title: string;
}) => {
  return (
    <Box.New
      background="sunken"
      borderColor="neutral-subtleA"
      borderWidth="1"
      borderRadius="xlarge"
      padding="space-12"
    >
      <VStack gap="space-12">
        <HStack align="center" justify="space-between">
          <Heading as="h2" size="small" textColor="subtle">
            {title}
          </Heading>
          {helpText && <HelpText placement="bottom-end">{helpText}</HelpText>}
        </HStack>
        {children}
      </VStack>
    </Box.New>
  );
};

export { ActivityColumn };
