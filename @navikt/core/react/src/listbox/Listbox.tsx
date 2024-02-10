/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { forwardRef, useMemo, useState } from "react";
import { useId, useMergeRefs } from "../util/hooks";
import {
  ListboxContextProvider,
  ListboxDescendantsProvider,
  ListboxImlpContextProvider,
  useCreateListboxDescendants,
  useDescendantsContext,
  useListboxDescendant,
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
    const descendants = useCreateListboxDescendants();

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
    const { nextEnabled, prevEnabled, firstEnabled, lastEnabled, values } =
      useDescendantsContext();

    return (
      <ListboxImlpContextProvider
        focusedId={focusedId}
        selectOption={setFocusedId}
      >
        <div
          ref={ref}
          tabIndex={-1}
          onKeyDown={(e) => {
            const currentIndex = values().findIndex((d) => d.id === focusedId);
            switch (e.key) {
              case "ArrowDown": {
                const next = nextEnabled(currentIndex, false);
                next && setFocusedId(next.id);
                console.log(next);
                break;
              }
              case "ArrowUp": {
                const prev = prevEnabled(currentIndex, false);
                prev && setFocusedId(prev.id);
                break;
              }
              case "Home": {
                e.preventDefault();
                const first = firstEnabled();
                first && setFocusedId(first.id);
                break;
              }
              case "End": {
                e.preventDefault();
                const last = lastEnabled();
                last && setFocusedId(last.id);
                break;
              }
              case "Enter": {
                /* e.preventDefault();
                const item = getSelectedItem();
                if (item) {
                  const event = new Event(SELECT_EVENT);
                  item.dispatchEvent(event);
                } */
              }
            }
          }}
        >
          {children}
        </div>
      </ListboxImlpContextProvider>
    );
  },
);

interface ListboxOptionProps {
  children?: React.ReactNode;
  disabled?: boolean;
}

const ListboxOption = forwardRef<HTMLDivElement, ListboxOptionProps>(
  ({ children, disabled = false }, forwardedRef) => {
    const ctx = useListboxImplContext();
    const id = useId();

    const { register } = useListboxDescendant({
      disabled,
      id,
    });

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
