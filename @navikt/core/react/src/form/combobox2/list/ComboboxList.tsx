import React, { useCallback } from "react";
import { Listbox } from "../../../utils/components/Listbox/root/ListboxRoot";
import { useDeferredValue, useEventCallback } from "../../../utils/hooks";
import { ComboboxGroup } from "../group/ComboboxGroup";
import { ComboboxOption } from "../option/ComboboxOption";
import { useComboboxPopupContext } from "../popup/ComboboxPopup";
import {
  type ComboboxGroupData,
  type ComboboxOptionData,
  type ResolveOption,
  useComboboxRootContext,
} from "../root/ComboboxRoot";

interface ComboboxListProps<
  T extends ComboboxOptionData | ComboboxGroupData<ComboboxOptionData>,
> {
  children?:
    React.ReactNode | ((optOrGroup: ResolveOption<T> | T) => React.ReactNode); // TODO: Blir litt rart at children-funksjonen må håndtere både options og grupper. (Usikker på om typen for optOrGroup er riktig også.)
}

function ComboboxList<
  T extends ComboboxOptionData | ComboboxGroupData<ComboboxOptionData>,
>({ children }: ComboboxListProps<T>) {
  /*const [isPending, startTransition] = useTransition();
  const [renderOptions, setRenderOptions] = useState(true); // TODO: Prop for å aktivere "async rendering", ev. basert på antall options.
  useEffect(() => {
    if (renderOptions) {
      return;
    }
    startTransition(() => {
      setRenderOptions(true);
    });
  }, []);*/

  return (
    <Listbox.Options>
      {/*isPending && (
        <div className="aksel-combobox2__loading" role="status">
          Laster...
        </div>
      )*/}
      <ComboboxListContent<T>>{children}</ComboboxListContent>
    </Listbox.Options>
  );
}

function ComboboxListContent<
  T extends ComboboxOptionData | ComboboxGroupData<ComboboxOptionData>,
>({ children }: ComboboxListProps<T>) {
  const { virtuallyFocusedOptionValue, filterString } =
    useComboboxPopupContext();
  const {
    setOpen,
    options,
    selectedOptions,
    onToggleOption,
    multiselect,
    triggerRef,
  } = useComboboxRootContext();
  const memoizedOnToggleOption = useEventCallback(onToggleOption);
  const deferredFilterString = useDeferredValue(filterString);

  const localOnToggleOption = useCallback(
    (option: ComboboxOptionData, isSelected: boolean) => {
      memoizedOnToggleOption(option, isSelected);
      if (!multiselect) {
        setOpen(false);
        triggerRef.current?.focus();
      }
    },
    [memoizedOnToggleOption, multiselect, triggerRef, setOpen],
  );

  if (children && typeof children !== "function") {
    return children;
  }

  const filteredOptions = deferredFilterString
    ? filterOptions(options, deferredFilterString)
    : options;

  if (filteredOptions.length === 0) {
    return (
      <div className="aksel-combobox2__no-results" role="status">
        Ingen treff
      </div>
    );
  }

  return filteredOptions.map((optOrGroup) =>
    "options" in optOrGroup ? (
      <ComboboxGroup
        key={optOrGroup.id}
        group={optOrGroup}
        childrenProp={children}
      >
        {optOrGroup.options.map((option) => (
          <ComboboxOption
            key={option.value}
            option={option}
            onToggleOption={localOnToggleOption}
            isSelected={selectedOptions.includes(option.value)}
            hasVirtualFocus={virtuallyFocusedOptionValue === option.value}
            filterString={deferredFilterString}
          >
            {children as ComboboxListProps<typeof option>["children"]}
          </ComboboxOption>
        ))}
      </ComboboxGroup>
    ) : (
      <ComboboxOption
        key={optOrGroup.value}
        option={optOrGroup}
        onToggleOption={localOnToggleOption}
        isSelected={selectedOptions.includes(optOrGroup.value)}
        hasVirtualFocus={virtuallyFocusedOptionValue === optOrGroup.value}
        filterString={deferredFilterString} // TODO: Vurder å kunne slå av dette for bedre ytelse
      >
        {children as ComboboxListProps<typeof optOrGroup>["children"]}
      </ComboboxOption>
    ),
  );
}

function filterOptions<T extends ComboboxOptionData>(
  options: (T | ComboboxGroupData<T>)[],
  filterString: string,
): (T | ComboboxGroupData<T>)[] {
  const filterStringLowerCase = filterString.toLocaleLowerCase();

  return options
    .map((optOrGroup) => {
      if ("options" in optOrGroup) {
        const matchingOptions = optOrGroup.options.filter((option) =>
          option.label.toLocaleLowerCase().includes(filterStringLowerCase),
        );
        if (matchingOptions.length > 0) {
          return { ...optOrGroup, options: matchingOptions };
        }
        return null;
      }
      if (
        optOrGroup.label.toLocaleLowerCase().includes(filterStringLowerCase)
      ) {
        return optOrGroup;
      }
      return null;
    })
    .filter((option): option is T | ComboboxGroupData<T> => option !== null);
}

export type { ComboboxListProps };
export { ComboboxList };
