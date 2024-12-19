/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { forwardRef, useState } from "react";
import { Slot } from "../slot/Slot";
import { createContext } from "../util/create-context";
import { useId, useMergeRefs } from "../util/hooks";
import { createDescendantContext } from "../util/hooks/descendants/useDescendant";

const [
  ListboxCollectionProvider,
  useListboxCollectionCtx,
  useListboxInitializeCollection,
  useListboxCollectionItem,
] = createDescendantContext<
  HTMLDivElement,
  {
    value: string;
    id: string;
  }
>();

type ListboxContextProps = {
  mode: "single" | "multiple";
  selectedValues: string[];
  updateSelectedValues: (value: string) => void;
  focusedOption: string | null;
  updateFocusedOption: (value: string | null) => void;
  role: "listbox" | "combobox";
};

const [ListboxProvider, useListbox] = createContext<ListboxContextProps>({
  hookName: "useListbox",
  providerName: "ListboxProvider",
});

type ListboxProps = {
  children: React.ReactNode;
  /**
   * @default "single"
   */
  mode?: ListboxContextProps["mode"];

  role: "listbox" | "combobox";
};

export const Listbox = forwardRef<HTMLDivElement, ListboxProps>(
  (userprops, forwardedRef) => {
    const { children, mode = "single", role = "listbox" } = userprops;

    const collection = useListboxInitializeCollection();
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const [focusedOption, setFocusedOption] = useState<string | null>(null);

    const handleSelectedValuesUpdate = (value: string) => {
      const allreadyExists = selectedValues.includes(value);
      if (mode === "single") {
        allreadyExists ? setSelectedValues([]) : setSelectedValues([value]);
        return;
      }

      allreadyExists
        ? setSelectedValues((options) => options.filter((opt) => opt !== value))
        : setSelectedValues((options) => [...options, value]);
    };

    const handleFocusedOptionUpdate = (value: string | null) => {
      value && setFocusedOption(value);
    };

    return (
      <div ref={forwardedRef}>
        <ListboxCollectionProvider value={collection}>
          <ListboxProvider
            mode={mode}
            selectedValues={selectedValues}
            updateSelectedValues={handleSelectedValuesUpdate}
            focusedOption={focusedOption}
            updateFocusedOption={handleFocusedOptionUpdate}
            role={role}
          >
            {children}
          </ListboxProvider>
        </ListboxCollectionProvider>
      </div>
    );
  },
);

type ListboxInternalProps = {
  children: React.ReactNode;
};

export const ListboxInternal = forwardRef<HTMLDivElement, ListboxInternalProps>(
  (userprops, forwardedRef) => {
    const { children } = userprops;
    return <div ref={forwardedRef}>{children}</div>;
  },
);

type ListboxAnchorProps = {
  children: React.ReactNode;
};

export const ListboxAnchor = forwardRef<HTMLDivElement, ListboxAnchorProps>(
  (userprops, forwardedRef) => {
    const { children } = userprops;

    const listboxCtx = useListbox();
    const listboxCollectionCtx = useListboxCollectionCtx();

    const handleOnFocus = () => {
      /* Listbos spec expects first selected value to be focused if possible  */
      if (listboxCtx.selectedValues.length > 0) {
        listboxCtx.updateFocusedOption(listboxCtx.selectedValues[0]);
        return;
      }
      const firstOption = listboxCollectionCtx.firstEnabled()?.value;

      firstOption && listboxCtx.updateFocusedOption(firstOption);
    };

    const handleOnBlur = () => {
      listboxCtx.updateFocusedOption(null);
    };

    const handleKeydown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      const currentFocusedNode = listboxCollectionCtx
        .values()
        .find((option) => option.value === listboxCtx.focusedOption);

      /*
       * This can happend if handleFocus is canceled when isPointerDown === true
       */
      if (!currentFocusedNode) {
        listboxCtx.updateFocusedOption(
          listboxCollectionCtx.firstEnabled()?.value ?? null,
        );
        return;
      }
      const index = currentFocusedNode.index;
      switch (event.key) {
        case "ArrowDown": {
          const nextOption = listboxCollectionCtx.nextEnabled(index, false);
          nextOption && listboxCtx.updateFocusedOption(nextOption.value);
          break;
        }
        case "ArrowUp": {
          const prevOption = listboxCollectionCtx.prevEnabled(index, false);
          prevOption && listboxCtx.updateFocusedOption(prevOption.value);
          break;
        }
        case "Home": {
          const firstOption = listboxCollectionCtx.firstEnabled();
          firstOption && listboxCtx.updateFocusedOption(firstOption.value);
          break;
        }
        case "End": {
          const lastOption = listboxCollectionCtx.lastEnabled();
          lastOption && listboxCtx.updateFocusedOption(lastOption.value);
          break;
        }
        case "Enter": {
          listboxCtx.focusedOption &&
            listboxCtx.updateSelectedValues(listboxCtx.focusedOption);
          break;
        }

        default:
          return;
      }
    };

    const handleKeyup = (event: React.KeyboardEvent<HTMLDivElement>) => {
      switch (event.key) {
        case " ": {
          listboxCtx.focusedOption &&
            listboxCtx.updateSelectedValues(listboxCtx.focusedOption);
          break;
        }

        default:
          return;
      }
    };

    /**
     * Look to optimize this by setting if in updateFocus
     */
    const activeDescendant = listboxCollectionCtx
      .values()
      .find((option) => option.value === listboxCtx.focusedOption);

    return (
      <Slot
        ref={forwardedRef}
        role={listboxCtx.role}
        tabIndex={0}
        aria-multiselectable={listboxCtx.mode === "multiple"}
        aria-activedescendant={activeDescendant ? activeDescendant.id : ""}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onKeyDown={handleKeydown}
        onKeyUp={handleKeyup}
      >
        {children}
      </Slot>
    );
  },
);

type ListboxOptionsProps = {
  children: React.ReactNode;
};

export const ListboxOptions = forwardRef<HTMLDivElement, ListboxOptionsProps>(
  (userprops, forwardedRef) => {
    const { children } = userprops;

    return (
      <ListboxOptionsInternal ref={forwardedRef} {...userprops}>
        {children}
      </ListboxOptionsInternal>
    );
  },
);

export const ListboxOptionsInternal = forwardRef<
  HTMLDivElement,
  ListboxOptionsProps
>((userprops, forwardedRef) => {
  const { children } = userprops;

  /**
   * TODO:
   * - ComposeEventhandlers
   */
  return (
    <div ref={forwardedRef} {...userprops}>
      {children}
    </div>
  );
});

type ListboxOptionProps = {
  children: React.ReactNode;
  className?: string;
  value: string;
  id?: string;
};

export const ListboxOption = forwardRef<HTMLDivElement, ListboxOptionProps>(
  (userprops, forwardedRef) => {
    const localId = useId();

    const { register } = useListboxCollectionItem({
      value: userprops.value,
      id: userprops.id ?? localId,
    });
    const composedRefs = useMergeRefs(forwardedRef, register);

    const listboxCtx = useListbox();

    const { children, value, className } = userprops;

    const isSelected = listboxCtx.selectedValues.includes(value);
    const isFocused = listboxCtx.focusedOption === value;

    return (
      <div
        ref={composedRefs}
        className={className}
        aria-selected={isSelected}
        data-selected={isSelected}
        data-focused={isFocused}
        onClick={() => {
          listboxCtx.updateSelectedValues(value);
          listboxCtx.updateFocusedOption(value);
        }}
      >
        {children}
      </div>
    );
  },
);

/*

<Listbox value={selectedPerson} onChange={setSelectedPerson}>
  <ListboxButton>{selectedPerson.name}</ListboxButton>
  <ListboxOptions anchor="bottom">
    {people.map((person) => (
      <ListboxOption key={person.id} value={person} className="data-[focus]:bg-blue-100">
        {person.name}
      </ListboxOption>
    ))}
  </ListboxOptions>
</Listbox>

*/
/*
<ListBox aria-label="Favorite animal" selectionMode="single">
  <ListBoxItem>Aardvark</ListBoxItem>
  <ListBoxItem>Cat</ListBoxItem>
  <ListBoxItem>Dog</ListBoxItem>
  <ListBoxItem>Kangaroo</ListBoxItem>
  <ListBoxItem>Panda</ListBoxItem>
  <ListBoxItem>Snake</ListBoxItem>
</ListBox>

*/

/*
<ComboBox>
  <Label>Favorite Animal</Label>
  <div>
    <Input />
    <Button>▼</Button>
  </div>
  <Popover>
    <ListBox>
      <ListBoxItem>Aardvark</ListBoxItem>
      <ListBoxItem>Cat</ListBoxItem>
      <ListBoxItem>Dog</ListBoxItem>
      <ListBoxItem>Kangaroo</ListBoxItem>
      <ListBoxItem>Panda</ListBoxItem>
      <ListBoxItem>Snake</ListBoxItem>
    </ListBox>
  </Popover>
</ComboBox>
*/

/*
<Select>
  <Label>Favorite Animal</Label>
  <Button>
    <SelectValue />
    <span aria-hidden="true">▼</span>
  </Button>
  <Popover>
    <ListBox>
      <ListBoxItem>Aardvark</ListBoxItem>
      <ListBoxItem>Cat</ListBoxItem>
      <ListBoxItem>Dog</ListBoxItem>
      <ListBoxItem>Kangaroo</ListBoxItem>
      <ListBoxItem>Panda</ListBoxItem>
      <ListBoxItem>Snake</ListBoxItem>
    </ListBox>
  </Popover>
</Select>
*/
