import React from "react";
import {
  DataFilterItem,
  type DataFilterItemProps,
} from "../item/DataFilterItem";

interface DataFilterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface DataFilterRootComponent extends React.ForwardRefExoticComponent<
  DataFilterProps & React.RefAttributes<HTMLDivElement>
> {
  /**
   * @see 🏷️ {@link DataFilterItemProps}
   * @example
   * ```tsx
   * <DataFilter>
   *   <DataFilter.Item />
   *   <DataFilter.Item />
   *   <DataFilter.Item />
   * </DataFilter>
   * ```
   */
  Item: typeof DataFilterItem;
}

const DataFilter = React.forwardRef<HTMLDivElement, DataFilterProps>(
  ({ children, ...rest }, forwardRef) => {
    return (
      <div ref={forwardRef} {...rest}>
        {children}
      </div>
    );
  },
) as DataFilterRootComponent;

DataFilter.Item = DataFilterItem;

export default DataFilter;
export { DataFilter, DataFilterItem };
export type { DataFilterProps, DataFilterItemProps };
