/* eslint-disable jsx-a11y/interactive-supports-focus */

/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { forwardRef, useMemo, useState } from "react";
import { useId, useMergeRefs } from "../util/hooks";
import {
  ListboxContextProvider,
  ListboxDescendantsProvider,
  ListboxImlpContextProvider,
  useCreateListboxDescendants,
  useDescendantsContext,
  useListboxContext,
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
  ({ children, virtual, onSelectionChange }, forwardedRef) => {
    const descendants = useCreateListboxDescendants();

    const memoizedProps = useMemo(
      () => ({
        virtual,
        onSelectionChange,
      }),
      [virtual, onSelectionChange],
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
    const ctx = useListboxContext();
    const [focusedId, setFocusedId] = useState<string | null>(null);
    const { nextEnabled, prevEnabled, firstEnabled, lastEnabled, values } =
      useDescendantsContext();

    const handleFocusChange = (value: string | null) => {
      setFocusedId(value);
    };

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
                if (
                  (ctx.focusFirstOnKeydown && currentIndex === -1) ||
                  focusedId === null
                ) {
                  const first = firstEnabled();
                  first && handleFocusChange(first.id);
                }
                const next = nextEnabled(currentIndex, false);
                next && handleFocusChange(next.id);

                break;
              }
              case "ArrowUp": {
                const prev = prevEnabled(currentIndex, false);
                if (prev) {
                  handleFocusChange(prev.id);
                } else {
                  handleFocusChange(null);
                }
                break;
              }
              case "Home": {
                e.preventDefault();
                const first = firstEnabled();
                first && handleFocusChange(first.id);
                break;
              }
              case "End": {
                e.preventDefault();
                const last = lastEnabled();
                last && handleFocusChange(last.id);
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
  id?: string;
}

const ListboxOption = forwardRef<HTMLDivElement, ListboxOptionProps>(
  ({ children, disabled = false, id }, forwardedRef) => {
    const listCtx = useListboxContext();
    const ctx = useListboxImplContext();
    const _id = useId();

    const itemId = id ?? _id;
    const { register } = useListboxDescendant({
      disabled,
      id: itemId,
    });

    const mergedRefs = useMergeRefs(register, forwardedRef);

    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      <div
        ref={mergedRefs}
        data-id={itemId}
        role="option"
        aria-selected={ctx.focusedId === itemId}
        onPointerMove={() => ctx.selectOption(itemId)}
        onClick={() => listCtx.onSelectionChange?.(itemId)}
      >
        {children}
      </div>
    );
  },
);

Listbox.Option = ListboxOption;

export default Listbox;
