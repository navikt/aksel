import React, { forwardRef, useMemo, useState } from "react";
import { useId, useMergeRefs } from "../util/hooks";
import {
  ListboxContextProvider,
  ListboxDescendantsProvider,
  ListboxImlpContextProvider,
  useListboxDescendant,
  useListboxDescendants,
  useListboxImplContext,
} from "./Listbox.context";
import { ListboxProps } from "./Listbox.types";

interface ListboxComponent
  extends React.ForwardRefExoticComponent<
    ListboxProps & React.RefAttributes<HTMLDivElement>
  > {
  Option: typeof ListboxOption;
}

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
) as ListboxComponent;

interface ListboxImlpProps {
  children?: React.ReactNode;
}

const ListboxImlp = forwardRef<HTMLDivElement, ListboxImlpProps>(
  ({ children }, ref) => {
    const [focusedId, setFocusedId] = useState<string | null>(null);

    return (
      <ListboxImlpContextProvider
        focusedId={focusedId}
        selectOption={setFocusedId}
      >
        <div ref={ref}>{children}</div>
      </ListboxImlpContextProvider>
    );
  },
);

interface ListboxOptionProps {
  children?: React.ReactNode;
  disabled?: boolean;
}

const ListboxOption = forwardRef<HTMLDivElement, ListboxOptionProps>(
  ({ children, disabled }, forwardedRef) => {
    const ctx = useListboxImplContext();
    const { register } = useListboxDescendant({
      disabled,
    });

    const id = useId();

    const mergedRefs = useMergeRefs(register, forwardedRef);

    return (
      <div
        ref={mergedRefs}
        data-id={id}
        role="option"
        aria-selected={ctx.focusedId === id}
        onPointerMove={() => ctx.selectOption(id)}
      >
        <style>
          {`
            [aria-selected="true"] {
              color: red;
            }
          `}
        </style>
        {children}
      </div>
    );
  },
);

Listbox.Option = ListboxOption;

export default Listbox;
