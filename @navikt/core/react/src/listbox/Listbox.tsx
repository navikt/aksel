import React, { forwardRef, useMemo } from "react";
import {
  ListboxContextProvider,
  ListboxDescendantsProvider,
  useListboxDescendants,
} from "./Listbox.context";
import { ListboxProps } from "./Listbox.types";

export const Listbox = forwardRef<HTMLDivElement, ListboxProps>(
  ({ children, virtual }, forwardedRef) => {
    const descendants = useListboxDescendants();

    const memoizedProps = useMemo(
      () => ({
        virtual,
      }),
      [virtual],
    );

    return (
      <ListboxDescendantsProvider value={descendants}>
        <ListboxContextProvider {...memoizedProps}>
          <ListboxImlp ref={forwardedRef}>{children}</ListboxImlp>
        </ListboxContextProvider>
      </ListboxDescendantsProvider>
    );
  },
);

interface ListboxImlpProps {
  children?: React.ReactNode;
}

export const ListboxImlp = forwardRef<HTMLDivElement, ListboxImlpProps>(
  ({ children }, ref) => {
    return <div ref={ref}>{children}</div>;
  },
);
