import React, { useRef } from "react";
import { Listbox } from "../../../utils/components/Listbox/root/ListboxRoot";
import { useDeferredValue } from "../../../utils/hooks";
import { useI18n } from "../../../utils/i18n/i18n.hooks";
import { ComboboxGroup } from "../group/ComboboxGroup";
import { ComboboxOption } from "../option/ComboboxOption";
import { useComboboxPopupContext } from "../popup/ComboboxPopup";
import {
  type ComboboxGroupData,
  type ComboboxOptionData,
  type ResolveOption,
  useComboboxRootContext,
} from "../root/ComboboxRoot";
import { useHitsAnnouncer } from "./useHitsAnnouncer";

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

  const liveRegionRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Listbox.Options className="aksel-combobox2__list">
        {/*isPending && (
        <div className="aksel-combobox2__loading" role="status">
          Laster...
        </div>
      )*/}
        <ComboboxListContent<T> liveRegionRef={liveRegionRef}>
          {children}
        </ComboboxListContent>
      </Listbox.Options>
      <div ref={liveRegionRef} className="aksel-sr-only" role="status" />
    </>
  );
}

interface ComboboxListContentProps<
  T extends ComboboxOptionData | ComboboxGroupData<ComboboxOptionData>,
> extends ComboboxListProps<T> {
  liveRegionRef: React.RefObject<HTMLDivElement | null>;
}

function ComboboxListContent<
  T extends ComboboxOptionData | ComboboxGroupData<ComboboxOptionData>,
>({ children, liveRegionRef }: ComboboxListContentProps<T>) {
  const { virtuallyFocusedOptionValue, filterString } =
    useComboboxPopupContext();
  const {
    options,
    value, // Selected options
    onToggleOption,
  } = useComboboxRootContext();
  const deferredFilterString = useDeferredValue(filterString);
  const maybeAnnouceHits = useHitsAnnouncer(
    deferredFilterString,
    liveRegionRef,
  );
  const translate = useI18n("Combobox2");

  if (children && typeof children !== "function") {
    return children;
  }

  const filteredOptions = deferredFilterString
    ? filterOptions(options, deferredFilterString)
    : options;

  maybeAnnouceHits(filteredOptions);

  if (filteredOptions.length === 0) {
    // TODO: Consider moving outside of role=listbox
    return (
      <div className="aksel-combobox2__no-results">{translate("noHits")}</div>
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
            onToggleOption={onToggleOption}
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
        onToggleOption={onToggleOption}
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
  const results: (T | ComboboxGroupData<T>)[] = [];

  for (const optOrGroup of options) {
    if ("options" in optOrGroup) {
      const matchingOptions: T[] = [];
      for (const option of optOrGroup.options) {
        if (option.label.toLocaleLowerCase().includes(filterStringLowerCase)) {
          matchingOptions.push(option);
        }
      }
      if (matchingOptions.length > 0) {
        results.push({ ...optOrGroup, options: matchingOptions });
      }
    } else if (
      optOrGroup.label.toLocaleLowerCase().includes(filterStringLowerCase)
    ) {
      results.push(optOrGroup);
    }
  }

  return results;
}

export type { ComboboxListProps };
export { ComboboxList };
