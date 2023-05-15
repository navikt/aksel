import { omit } from "../../..";
import { useFormField } from "../../useFormField";
import React, { useCallback, forwardRef, InputHTMLAttributes } from "react";
import cl from "clsx";
import { useSelectedOptionsContext } from "../SelectedOptions/selectedOptionsContext";
import { useInputContext } from "./inputContext";
import { useCustomOptionsContext } from "../customOptionsContext";
import { useFilteredOptionsContext } from "../FilteredOptions/filteredOptionsContext";

interface InputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "size" | "onChange" | "value"
  > {
  ref: React.Ref<HTMLInputElement>;
  handleClear: (e) => void;
  toggleOption: (e) => void;
  inputClassName?: string;
  size?: "small" | "medium";
  errorId?: string;
  value?: string;
  onChange?: (value: any) => void;
  error?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      handleClear,
      toggleOption,
      inputClassName,
      error,
      errorId,
      size: _size,
      ...rest
    },
    ref
  ) => {
    const {
      inputProps: { id, ...inputProps },
      size = "medium",
    } = useFormField({ size: _size, error, errorId }, "comboboxfield");
    const { selectedOptions, removeSelectedOption } =
      useSelectedOptionsContext();
    const { customOptions, removeCustomOption } = useCustomOptionsContext();
    const { value, onChange } = useInputContext();
    const {
      toggleIsListOpen,
      isListOpen,
      filteredOptions,
      filteredOptionsIndex,
      moveFocusUp,
      moveFocusDown,
    } = useFilteredOptionsContext();

    const handleKeyUp = (e) => {
      //console.log("handleKeyUp", e.key);
      e.preventDefault();
      switch (e.key) {
        case "Escape":
          handleClear({ trigger: e.key, event: e });
          toggleIsListOpen(false);
          break;
        case "Enter":
          e.preventDefault();
          toggleOption(e);
          break;
        default:
          break;
      }
    };

    const handleKeyDown = useCallback(
      (e) => {
        if (e.key === "Backspace" && value === "") {
          const lastSelectedOption =
            selectedOptions[selectedOptions.length - 1];
          if (customOptions.includes(lastSelectedOption))
            removeCustomOption({ value: lastSelectedOption });
          removeSelectedOption(lastSelectedOption);
        } else if (e.key === "ArrowDown") {
          // Check that cursor position is at the end of the input field,
          // so we don't interfere with text editing
          if (e.target.selectionStart === value.length) {
            e.preventDefault();
            moveFocusDown();
          }
        } else if (e.key === "ArrowUp") {
          // Check that the FilteredOptions list is open and has virtual focus.
          // Otherwise ignore keystrokes, so it doesn't interfere with text editing
          if (isListOpen && filteredOptionsIndex !== null) {
            e.preventDefault();
            moveFocusUp();
          }
        }
      },
      [
        value,
        selectedOptions,
        customOptions,
        removeCustomOption,
        removeSelectedOption,
        moveFocusDown,
        isListOpen,
        filteredOptionsIndex,
        moveFocusUp,
      ]
    );

    function getActiveDescendantId() {
      if (filteredOptionsIndex === null) {
        return undefined;
      } else if (filteredOptionsIndex === -1) {
        return `${id}-combobox-new-option`;
      } else {
        return `${id}-option-${filteredOptions[filteredOptionsIndex]}`;
      }
    }

    return (
      <input
        ref={ref}
        {...omit(rest, ["error", "errorId", "size"])}
        {...inputProps}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="text"
        role="combobox"
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
        aria-controls={`${id}-filteredOptions`}
        aria-expanded={!!isListOpen}
        autoComplete="off"
        aria-autocomplete="list"
        aria-activedescendant={getActiveDescendantId()}
        className={cl(
          inputClassName,
          "navds-combobox__input",
          "navds-body-short",
          `navds-body-${size}`
        )}
      />
    );
  }
);

export default Input;
