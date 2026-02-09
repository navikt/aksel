import React, { useRef, useState } from "react";
import { useClientLayoutEffect } from "../../../utils-external";
import { DismissableLayer } from "../../../utils/components/dismissablelayer/DismissableLayer";
import { Floating } from "../../../utils/components/floating/Floating";
import { cl } from "../../../utils/helpers";
import { useInputContext } from "../Input/Input.context";
import { useSelectedOptionsContext } from "../SelectedOptions/selectedOptionsContext";
import AddNewOption from "./AddNewOption";
import FilteredOptionsItem from "./FilteredOptionsItem";
import LoadingMessage from "./LoadingMessage";
import MaxSelectedMessage from "./MaxSelectedMessage";
import NoSearchHitsMessage from "./NoSearchHitsMessage";
import filteredOptionsUtil from "./filtered-options-util";
import { useFilteredOptionsContext } from "./filteredOptionsContext";

const FilteredOptions = () => {
  const {
    inputProps: { id },
    anchorRef,
  } = useInputContext();

  const {
    allowNewValues,
    isLoading,
    isListOpen,
    filteredOptions,
    setFilteredOptionsRef,
    isMouseLastUsedInputDevice,
    isValueNew,
    toggleIsListOpen,
  } = useFilteredOptionsContext();
  const [localOpen, setLocalOpen] = useState(isListOpen);

  const floatingRef = useRef<HTMLDivElement | null>(null);

  /**
   * This is a dirty hack to make the positioning-logic in Floating base the "flip" on the static 290px max-height,
   * instead of the dynamic one based on available space. Without this, the list won't flip to top when there's
   * not enough space below the input.
   */
  useClientLayoutEffect(() => {
    queueMicrotask(() => setLocalOpen(isListOpen));
  }, [isListOpen]);

  const { maxSelected, isMultiSelect } = useSelectedOptionsContext();

  const shouldRenderNonSelectables =
    (isMultiSelect && maxSelected.limit) || // Render maxSelected message
    isLoading || // Render loading message
    (!isLoading && filteredOptions.length === 0 && !allowNewValues); // Render no hits message

  const shouldRenderFilteredOptionsList =
    (allowNewValues && isValueNew && !maxSelected.isLimitReached) || // Render add new option
    filteredOptions.length > 0; // Render filtered options

  return (
    <DismissableLayer
      asChild
      safeZone={{
        anchor: anchorRef,
      }}
      onDismiss={() => localOpen && toggleIsListOpen(false)}
      onEscapeKeyDown={(event) => {
        /* We handle this manually in Input */
        event.preventDefault();
      }}
      enabled={localOpen}
    >
      <Floating.Content
        ref={floatingRef}
        className={cl("aksel-combobox__list", {
          "aksel-combobox__list--closed": !isListOpen,
          "aksel-combobox__list--with-hover": isMouseLastUsedInputDevice,
        })}
        id={filteredOptionsUtil.getFilteredOptionsId(id)}
        tabIndex={-1}
        sideOffset={8}
        side="bottom"
        fallbackPlacements={["top"]}
        enabled={isListOpen}
        style={{
          maxHeight: localOpen
            ? `min(316px, var(--__axc-floating-available-height))`
            : `316px`,
        }}
        autoUpdateWhileMounted={false}
      >
        {shouldRenderNonSelectables && (
          <div className="aksel-combobox__list_non-selectables" role="status">
            {isMultiSelect && maxSelected.limit && <MaxSelectedMessage />}
            {isLoading && <LoadingMessage />}
            {!isLoading && filteredOptions.length === 0 && !allowNewValues && (
              <NoSearchHitsMessage />
            )}
          </div>
        )}

        {shouldRenderFilteredOptionsList && (
          <ul
            ref={setFilteredOptionsRef}
            role="listbox"
            className="aksel-combobox__list-options"
          >
            {isValueNew && !maxSelected.isLimitReached && allowNewValues && (
              <AddNewOption />
            )}
            {filteredOptions.map((option) => (
              <FilteredOptionsItem key={option.value} option={option} />
            ))}
          </ul>
        )}
      </Floating.Content>
    </DismissableLayer>
  );
};

export default FilteredOptions;
