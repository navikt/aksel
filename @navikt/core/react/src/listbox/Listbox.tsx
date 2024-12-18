/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { forwardRef, useRef, useState } from "react";
import { createContext } from "../util/create-context";
import { useId, useMergeRefs } from "../util/hooks";
import { createDescendantContext } from "../util/hooks/descendants/useDescendant";

type ListboxContextProps = {
  mode: "single" | "multiple";
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
};

export const Listbox = forwardRef<HTMLDivElement, ListboxProps>(
  (userprops, forwardedRef) => {
    const { children, mode = "single" } = userprops;
    return (
      <div ref={forwardedRef}>
        <ListboxProvider mode={mode}>{children}</ListboxProvider>
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

    return <div ref={forwardedRef}>{children}</div>;
  },
);

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

type ListboxOptionsContextProps = {
  selectedValues: string[];
  updateSelectedValues: (value: string) => void;
  focusedOption: string | null;
  updateFocusedOption: (value: string) => void;
};

const [ListboxOptionsProvider, useListboxOptions] =
  createContext<ListboxOptionsContextProps>({
    hookName: "useListboxOptions",
    providerName: "ListboxOptionsProvider",
  });

type ListboxOptionsProps = {
  children: React.ReactNode;
};

export const ListboxOptions = forwardRef<HTMLDivElement, ListboxOptionsProps>(
  (userprops, forwardedRef) => {
    const { children } = userprops;

    const collection = useListboxInitializeCollection();

    return (
      <ListboxCollectionProvider value={collection}>
        <ListboxOptionsInternal ref={forwardedRef} {...userprops}>
          {children}
        </ListboxOptionsInternal>
      </ListboxCollectionProvider>
    );
  },
);

export const ListboxOptionsInternal = forwardRef<
  HTMLDivElement,
  ListboxOptionsProps
>((userprops, forwardedRef) => {
  const { children } = userprops;
  const listboxCtx = useListbox();
  const listboxCollectionCtx = useListboxCollectionCtx();

  const isPointerDown = useRef<boolean>(false);

  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [focusedOption, setFocusedOption] = useState<string | null>(null);

  const handleSelectedValuesUpdate = (value: string) => {
    const allreadyExists = selectedValues.includes(value);
    if (listboxCtx.mode === "single") {
      allreadyExists ? setSelectedValues([]) : setSelectedValues([value]);
      return;
    }

    allreadyExists
      ? setSelectedValues((options) => options.filter((opt) => opt !== value))
      : setSelectedValues((options) => [...options, value]);
  };

  const handleFocusedOptionUpdate = (value: string) => {
    setFocusedOption(value);
  };

  const handleOnFocus = () => {
    /* Cancel autofocus on first item if use ris currently pressing option */
    if (isPointerDown.current) {
      return;
    }

    /* Listbos spec expects first selected value to be focused if possible  */
    if (selectedValues.length > 0) {
      setFocusedOption(selectedValues[0]);
      return;
    }
    const firstOption = listboxCollectionCtx.firstEnabled()?.value;

    firstOption && setFocusedOption(firstOption);
  };

  const handleOnBlur = () => {
    setFocusedOption(null);
  };

  const handleKeydown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const currentFocusedNode = listboxCollectionCtx
      .values()
      .find((option) => option.value === focusedOption);

    /*
     * This can happend if handleFocus is canceled when isPointerDown === true
     */
    if (!currentFocusedNode) {
      setFocusedOption(listboxCollectionCtx.firstEnabled()?.value ?? null);
      return;
    }
    const index = currentFocusedNode.index;
    switch (event.key) {
      case "ArrowDown": {
        const nextOption = listboxCollectionCtx.nextEnabled(index, false);
        nextOption && setFocusedOption(nextOption.value);
        break;
      }
      case "ArrowUp": {
        const prevOption = listboxCollectionCtx.prevEnabled(index, false);
        prevOption && setFocusedOption(prevOption.value);
        break;
      }
      case "Home": {
        const firstOption = listboxCollectionCtx.firstEnabled();
        firstOption && setFocusedOption(firstOption.value);
        break;
      }
      case "End": {
        const lastOption = listboxCollectionCtx.lastEnabled();
        lastOption && setFocusedOption(lastOption.value);
        break;
      }
      case "Enter": {
        focusedOption && handleSelectedValuesUpdate(focusedOption);
        break;
      }

      default:
        return;
    }
  };

  const handleKeyup = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case " ": {
        focusedOption && handleSelectedValuesUpdate(focusedOption);
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
    .find((option) => option.value === focusedOption);

  /**
   * TODO:
   * - ComposeEventhandlers
   */
  return (
    <div
      ref={forwardedRef}
      tabIndex={0}
      role="listbox"
      aria-multiselectable={listboxCtx.mode === "multiple"}
      aria-activedescendant={activeDescendant ? activeDescendant.id : ""}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      onKeyDown={handleKeydown}
      onKeyUp={handleKeyup}
      onPointerDown={() => {
        isPointerDown.current = true;
      }}
      onPointerUp={() => {
        isPointerDown.current = false;
      }}
    >
      <ListboxOptionsProvider
        selectedValues={selectedValues}
        updateSelectedValues={handleSelectedValuesUpdate}
        focusedOption={focusedOption}
        updateFocusedOption={handleFocusedOptionUpdate}
      >
        {children}
      </ListboxOptionsProvider>
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

    const listboxOptionsCtx = useListboxOptions();

    const { children, value, className } = userprops;

    const isSelected = listboxOptionsCtx.selectedValues.includes(value);
    const isFocused = listboxOptionsCtx.focusedOption === value;

    return (
      <div
        ref={composedRefs}
        className={className}
        aria-selected={isSelected}
        data-selected={isSelected}
        data-focused={isFocused}
        onClick={() => {
          listboxOptionsCtx.updateSelectedValues(value);
          listboxOptionsCtx.updateFocusedOption(value);
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
