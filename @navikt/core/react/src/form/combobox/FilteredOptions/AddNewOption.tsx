import cl from "clsx";
import React from "react";
import { PlusIcon } from "@navikt/aksel-icons";
import { BodyShort, Label } from "../../../typography";
import { useInputContext } from "../Input/Input.context";
import { useSelectedOptionsContext } from "../SelectedOptions/selectedOptionsContext";
import { isInList, toComboboxOption } from "../combobox-utils";
import filteredOptionsUtil from "./filtered-options-util";
import { useFilteredOptionsContext } from "./filteredOptionsContext";

const AddNewOption = () => {
  const {
    inputProps: { id },
    size,
    value,
  } = useInputContext();
  const {
    setIsMouseLastUsedInputDevice,
    toggleIsListOpen,
    activeDecendantId,
    virtualFocus,
  } = useFilteredOptionsContext();
  const { isMultiSelect, selectedOptions, toggleOption } =
    useSelectedOptionsContext();
  return (
    <li
      tabIndex={-1}
      onMouseMove={() => {
        if (activeDecendantId !== filteredOptionsUtil.getAddNewOptionId(id)) {
          virtualFocus.moveFocusToElement(
            filteredOptionsUtil.getAddNewOptionId(id),
          );
          setIsMouseLastUsedInputDevice(true);
        }
      }}
      onPointerUp={(event) => {
        toggleOption(toComboboxOption(value), event);
        if (!isMultiSelect && !isInList(value, selectedOptions))
          toggleIsListOpen(false);
      }}
      id={filteredOptionsUtil.getAddNewOptionId(id)}
      className={cl(
        "navds-combobox__list-item navds-combobox__list-item--new-option",
        {
          "navds-combobox__list-item--new-option--focus":
            activeDecendantId === filteredOptionsUtil.getAddNewOptionId(id),
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
  );
};

export default AddNewOption;
