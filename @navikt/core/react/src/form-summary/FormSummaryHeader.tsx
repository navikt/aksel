import React, { forwardRef } from "react";
import { Box } from "../layout/box";
import { HStack } from "../layout/stack";

export interface FormSummaryHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Must include:
   * - `<FormSummary.Heading>`
   * - `<FormSummary.Edit>`
   */
  children: React.ReactNode;
}

export const FormSummaryHeader = forwardRef<
  HTMLDivElement,
  FormSummaryHeaderProps
>(({ children, ...rest }, ref) => (
  <Box
    ref={ref}
    as="header"
    background="surface-subtle"
    borderRadius="large large 0 0"
    borderWidth="0 0 1 0"
    borderColor="border-subtle"
    paddingBlock="4"
    paddingInline="6"
    {...rest}
  >
    <HStack justify="space-between" gap="2" wrap={false}>
      {children}
    </HStack>
  </Box>
));

export default FormSummaryHeader;
