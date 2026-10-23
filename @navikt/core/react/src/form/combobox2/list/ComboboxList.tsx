import React, { useCallback, useMemo, useRef } from "react";
import { debounce } from "../../../utils-external";
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
import { useAnnounce } from "./useAnnounce";

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
    <Listbox.Options className="aksel-combobox2__list">
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
  const { setOpen, options, value, onToggleOption, multiple, triggerRef } =
    useComboboxRootContext();
  const memoizedOnToggleOption = useEventCallback(onToggleOption);
  const deferredFilterString = useDeferredValue(filterString);

  const shouldAnnounceRef = useRef(false);
  const announce = useAnnounce();
  const announceHits = useMemo(
    () => debounce((hits: number) => announce(`${hits} treff`), 2000),
    [announce],
  );

  const localOnToggleOption = useCallback(
    (option: ComboboxOptionData, isSelected: boolean) => {
      memoizedOnToggleOption(option, isSelected);
      if (!multiple) {
        setOpen(false);
        triggerRef.current?.focus();
      }
    },
    [memoizedOnToggleOption, multiple, triggerRef, setOpen],
  );

  if (children && typeof children !== "function") {
    return children;
  }

  const filteredOptions = deferredFilterString
    ? filterOptions(options, deferredFilterString)
    : options;

  if (deferredFilterString !== filterString) {
    shouldAnnounceRef.current = true;
  } else if (shouldAnnounceRef.current) {
    if (filteredOptions.length === 0) {
      announceHits.clear();
      announce("Ingen treff"); // Not debounced
    } else {
      const hits = getNumberOfOptions(filteredOptions);
      announceHits(hits);
    }
    shouldAnnounceRef.current = false;
  }

  if (filteredOptions.length === 0) {
    return <div className="aksel-combobox2__no-results">Ingen treff</div>;
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
            isSelected={value.includes(option.value)}
            hasVirtualFocus={virtuallyFocusedOptionValue === option.value}
            highlightText={deferredFilterString}
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
        isSelected={value.includes(optOrGroup.value)}
        hasVirtualFocus={virtuallyFocusedOptionValue === optOrGroup.value}
        highlightText={deferredFilterString} // TODO: Vurder å kunne slå av dette for bedre ytelse
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

function getNumberOfOptions<T extends ComboboxOptionData>(
  options: (T | ComboboxGroupData<T>)[],
) {
  return options.reduce((count, optOrGroup) => {
    if ("options" in optOrGroup) {
      return count + optOrGroup.options.length;
    }
    return count + 1;
  }, 0);
}

export type { ComboboxListProps };
export { ComboboxList };
