import React from "react";
import { Box } from "../layout/box";
import { HStack } from "../layout/stack";

interface FormSummaryHeaderProps {
  children: React.ReactNode;
}

export default function FormSummaryHeader({
  children,
}: FormSummaryHeaderProps) {
  return (
    <Box
      as="header"
      background="surface-subtle"
      borderRadius="large large 0 0"
      borderWidth="0 0 1 0"
      borderColor="border-subtle"
      paddingBlock="4"
      paddingInline="6"
    >
      <HStack justify="space-between" gap="2" wrap={false}>
        {children}
      </HStack>
    </Box>
  );
}
