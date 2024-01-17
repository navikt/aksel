import cl from "clsx";
import React from "react";
import { CheckmarkIcon, PlusIcon } from "@navikt/aksel-icons";
import { Loader } from "../../../loader";
import { BodyShort, Label } from "../../../typography";
import { useInputContext } from "../Input/inputContext";
import { useSelectedOptionsContext } from "../SelectedOptions/selectedOptionsContext";
import filteredOptionsUtil from "./filtered-options-util";
import { useFilteredOptionsContext } from "./filteredOptionsContext";

const FilteredOptions = () => {
  const {
    inputProps: { id },
    size,
    value,
  } = useInputContext();
  const {
    allowNewValues,
    isLoading,
    isListOpen,
    filteredOptions,
    setFilteredOptionsRef,
    isMouseLastUsedInputDevice,
    setIsMouseLastUsedInputDevice,
    isValueNew,
    toggleIsListOpen,
    activeDecendantId,
    virtualFocus,
  } = useFilteredOptionsContext();
  const {
    canSelectMoreOptions,
    isMultiSelect,
    selectedOptions,
    toggleOption,
    maxSelectedOptions,
    maxSelectedMessage,
  } = useSelectedOptionsContext();

  const isDisabled = (option) =>
    !canSelectMoreOptions && !selectedOptions.includes(option);

  return (
    <div
      className={cl("navds-combobox__list", {
        "navds-combobox__list--closed": !isListOpen,
        "navds-combobox__list--with-hover": isMouseLastUsedInputDevice,
      })}
      id={filteredOptionsUtil.getFilteredOptionsId(id)}
      tabIndex={-1}
    >
      <div className="navds-combobox__list_non-selectables">
        {!canSelectMoreOptions && (
          <div
            className="navds-combobox__list-item navds-combobox__list-item__max-selected sticky"
            aria-selected={false}
            id={`${id}-max-selected`}
            data-no-focus="true"
          >
            {maxSelectedMessage ??
              `${selectedOptions.length} av ${maxSelectedOptions} er valgt.`}
          </div>
        )}
        {isLoading && (
          <div
            className="navds-combobox__list-item navds-combobox__list-item__loading sticky"
            aria-selected={false}
            id={filteredOptionsUtil.getIsLoadingId(id)}
            data-no-focus="true"
          >
            <Loader title="Søker..." />
          </div>
        )}
        {!isLoading && filteredOptions.length === 0 && (
          <div
            className="navds-combobox__list-item navds-combobox__list-item__no-options sticky"
            aria-selected={false}
            id={filteredOptionsUtil.getNoHitsId(id)}
            data-no-focus="true"
          >
            Ingen søketreff
          </div>
        )}
      </div>

      <ul
        ref={setFilteredOptionsRef}
        role="listbox"
        className="navds-combobox__list-options"
      >
        {isValueNew && canSelectMoreOptions && allowNewValues && (
          <li
            tabIndex={-1}
            onMouseMove={() => {
              if (
                activeDecendantId !== filteredOptionsUtil.getAddNewOptionId(id)
              ) {
                virtualFocus.moveFocusToElement(
                  filteredOptionsUtil.getAddNewOptionId(id),
                );
                setIsMouseLastUsedInputDevice(true);
              }
            }}
            onPointerUp={(event) => {
              toggleOption(value, event);
              if (!isMultiSelect && !selectedOptions.includes(value))
                toggleIsListOpen(false);
            }}
            id={filteredOptionsUtil.getAddNewOptionId(id)}
            className={cl(
              "navds-combobox__list-item navds-combobox__list-item__new-option",
              {
                "navds-combobox__list-item__new-option--focus":
                  activeDecendantId ===
                  filteredOptionsUtil.getAddNewOptionId(id),
              },
            )}
            role="option"
            aria-selected={false}
          >
            <PlusIcon aria-hidden />
            <BodyShort size={size}>
              Legg til{" "}
              <Label as="span" size={size}>
                &#8220;{value}&#8221;
              </Label>
            </BodyShort>
          </li>
        )}
        {filteredOptions.map((option) => (
          <li
            className={cl("navds-combobox__list-item", {
              "navds-combobox__list-item--focus":
                activeDecendantId ===
                filteredOptionsUtil.getOptionId(id, option),
              "navds-combobox__list-item--selected":
                selectedOptions.includes(option),
            })}
            data-no-focus={isDisabled(option) || undefined}
            id={filteredOptionsUtil.getOptionId(id, option)}
            key={option}
            tabIndex={-1}
            onMouseMove={() => {
              if (
                activeDecendantId !==
                filteredOptionsUtil.getOptionId(id, option)
              ) {
                virtualFocus.moveFocusToElement(
                  filteredOptionsUtil.getOptionId(id, option),
                );
                setIsMouseLastUsedInputDevice(true);
              }
            }}
            onPointerUp={(event) => {
              if (isDisabled(option)) {
                return;
              }
              toggleOption(option, event);
              if (!isMultiSelect && !selectedOptions.includes(option))
                toggleIsListOpen(false);
            }}
            role="option"
            aria-selected={selectedOptions.includes(option)}
          >
            <BodyShort size={size}>{option}</BodyShort>
            {selectedOptions.includes(option) && <CheckmarkIcon />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilteredOptions;
