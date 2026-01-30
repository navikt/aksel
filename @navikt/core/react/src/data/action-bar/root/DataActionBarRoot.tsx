import React from "react";
import { Button } from "../../../button";
import { Box } from "../../../layout/box";
import { HStack, Spacer } from "../../../layout/stack";
import { BodyShort } from "../../../typography";

interface DataActionBarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * Number of selected rows
   */
  numOfSelectedRows: number;
  /**
   * Callback for the clear button
   */
  onClear: () => void;
}

/**
 * TODO
 *
 * @see 🏷️ {@link DataActionBarProps}
 * @example
 * ```tsx
 * <DataActionBar numOfSelectedRows={selectedRows.length} onClear={handleClear}>
 *   TODO
 * </DataActionBar>
 * ```
 */
const DataActionBar = React.forwardRef<HTMLDivElement, DataActionBarProps>(
  ({ children, numOfSelectedRows, onClear, ...rest }, forwardRef) => {
    return (
      <Box
        asChild
        borderWidth="1"
        borderRadius="16"
        borderColor="neutral"
        background="raised"
        padding="space-16"
        data-color="neutral"
      >
        <HStack gap="space-16" align="center" ref={forwardRef} {...rest}>
          <BodyShort textColor="subtle">
            {numOfSelectedRows} rad{numOfSelectedRows > 1 ? "er" : ""} valgt
          </BodyShort>
          <Button variant="secondary" size="small" onClick={onClear}>
            Nullstill valg
          </Button>
          <Spacer />
          {children}
        </HStack>
      </Box>
    );
  },
);

export default DataActionBar;
export { DataActionBar };
export type { DataActionBarProps };
