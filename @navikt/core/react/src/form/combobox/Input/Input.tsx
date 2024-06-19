import cl from "clsx";
import React, {
  ChangeEvent,
  InputHTMLAttributes,
  forwardRef,
  useCallback,
} from "react";
import { omit } from "../../../util";
import VirtualFocus from "../../virtualfocus/VirtualFocus";
import { useFilteredOptionsContext } from "../FilteredOptions/filteredOptionsContext";
import { useInputContext } from "./Input.context";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "value"> {
  ref: React.Ref<HTMLInputElement>;
  inputClassName?: string;
  value?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ inputClassName, ...rest }, ref) => {
    const { inputProps, onChange, size } = useInputContext();
    const {
      filteredOptions,
      toggleIsListOpen,
      isListOpen,
      ariaDescribedBy,
      shouldAutocomplete,
      virtualFocus,
    } = useFilteredOptionsContext();

    const onChangeHandler = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        if (newValue && newValue !== "") {
          toggleIsListOpen(true);
        } else if (filteredOptions.length === 0) {
          toggleIsListOpen(false);
        }
        virtualFocus.moveFocusToTop();
        onChange(event);
      },
      [filteredOptions.length, virtualFocus, onChange, toggleIsListOpen],
    );

    return (
      <VirtualFocus.Anchor
        {...rest}
        {...omit(inputProps, ["aria-invalid"])}
        ref={ref}
        onBlur={() => virtualFocus.moveFocusToTop()}
        onChange={onChangeHandler}
        role="combobox"
        aria-expanded={!!isListOpen}
        aria-autocomplete={shouldAutocomplete ? "both" : "list"}
        aria-describedby={ariaDescribedBy}
        aria-invalid={inputProps["aria-invalid"]}
        className={cl(
          inputClassName,
          "navds-combobox__input",
          "navds-body-short",
          `navds-body-short--${size}`,
        )}
        onActive={() => {
          console.log("Anchor onActive():");
        }}
        onSelect={() => {
          console.log("Anchor onSelect():");
        }}
      >
        <input type="text" autoComplete="off"></input>
      </VirtualFocus.Anchor>
    );
  },
);

export default Input;
