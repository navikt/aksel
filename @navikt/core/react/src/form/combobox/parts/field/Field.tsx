import cl from "clsx";
import React from "react";
import { useComboboxPropsContext } from "../../Combobox.context";
import ClearButton from "../buttons/ClearButton";
import ToggleListButton from "../buttons/ToggleListButton";
import { useFilteredOptionsContext } from "../filtered-options/FilteredOptions.context";
import { useInputContext } from "../input/Input.context";
import SelectedOptions from "../selected-options/SelectedOptions";
import { useSelectedOptionsContext } from "../selected-options/SelectedOptions.context";

type FieldProps = {
  children: React.ReactNode;
  toggleRef: React.RefObject<HTMLButtonElement>;
};

const Field = ({ children, toggleRef }: FieldProps) => {
  const { activeDecendantId } = useFilteredOptionsContext();

  const { selectedOptions } = useSelectedOptionsContext();

  const { clearInput, focusInput, value, size = "medium" } = useInputContext();

  const {
    shouldShowSelectedOptions,
    clearButton,
    clearButtonLabel,
    toggleListButton,
    toggleListButtonLabel,
  } = useComboboxPropsContext();

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={cl("navds-combobox__wrapper-inner navds-text-field__input", {
        "navds-combobox__wrapper-inner--virtually-unfocused":
          activeDecendantId !== undefined,
      })}
      onClick={focusInput}
    >
      {!shouldShowSelectedOptions ? (
        children
      ) : (
        <SelectedOptions selectedOptions={selectedOptions} size={size}>
          {children}
        </SelectedOptions>
      )}
      <div>
        {value && clearButton && (
          <ClearButton
            handleClear={clearInput}
            clearButtonLabel={clearButtonLabel}
            tabIndex={-1}
          />
        )}
        {toggleListButton && (
          <ToggleListButton
            toggleListButtonLabel={toggleListButtonLabel}
            ref={toggleRef}
          />
        )}
      </div>
    </div>
  );
};

export default Field;
