import React from "react";
import { PlusIcon } from "@navikt/aksel-icons";
import { BodyShort, Label } from "../../../typography";
import { cl } from "../../../util/className";
import { useI18n } from "../../../util/i18n/i18n.hooks";
import { useInputContext } from "../Input/Input.context";
import { useSelectedOptionsContext } from "../SelectedOptions/selectedOptionsContext";
import { isInList, toComboboxOption } from "../combobox-utils";
import filteredOptionsUtil from "./filtered-options-util";
import { useFilteredOptionsContext } from "./filteredOptionsContext";

const AddNewOption = () => {
  const {
    inputProps: { id },
    size,
    searchTerm,
  } = useInputContext();

  const {
    setIsMouseLastUsedInputDevice,
    toggleIsListOpen,
    activeDecendantId,
    virtualFocus,
  } = useFilteredOptionsContext();

  const { isMultiSelect, selectedOptions, toggleOption } =
    useSelectedOptionsContext();

  const translate = useI18n("Combobox");

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
        toggleOption(toComboboxOption(searchTerm), event);
        if (!isMultiSelect && !isInList(searchTerm, selectedOptions))
          toggleIsListOpen(false);
      }}
      id={filteredOptionsUtil.getAddNewOptionId(id)}
      className={cl(
        "aksel-combobox__list-item aksel-combobox__list-item--new-option",
        {
          "aksel-combobox__list-item--new-option--focus":
            activeDecendantId === filteredOptionsUtil.getAddNewOptionId(id),
        },
      )}
      role="option"
      aria-selected={false}
    >
      <PlusIcon aria-hidden />
      <BodyShort size={size}>
        {translate("addOption")}{" "}
        <Label as="span" size={size}>
          &#8220;{searchTerm}&#8221;
        </Label>
      </BodyShort>
    </li>
  );
};

export default AddNewOption;
