import { Close } from "@navikt/ds-icons";
import cl from "clsx";
import React, {
  forwardRef,
  InputHTMLAttributes,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  BodyShort,
  Chips,
  /* Dropdown, */
  Label,
  mergeRefs,
  omit,
  useEventListener,
} from "../..";
import { FormFieldProps, useFormField } from "../useFormField";

export type ComboboxClearEvent =
  | {
      trigger: "Click";
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>;
    }
  | { trigger: "Escape"; event: React.KeyboardEvent<HTMLDivElement> }
  | { trigger: "Enter"; event: React.KeyboardEvent<HTMLDivElement> };

export interface ComboboxProps
  extends FormFieldProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
  isListOpen: boolean;
  options: any[];
  selectedOptions: string[];
  setOptions: React.Dispatch<React.SetStateAction<any[]>>;
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
  onClear?: (e: ComboboxClearEvent) => void;
  variant?: "primary" | "secondary" | "simple";
  clearButton?: boolean;
  clearButtonLabel?: string;
  onChange?: (value: string) => void;
  hideLabel?: boolean;
  label: React.ReactNode;
  children?: React.ReactNode;
}

interface ComboboxComponent
  extends React.ForwardRefExoticComponent<
    ComboboxProps & React.RefAttributes<HTMLDivElement>
  > {
  // Dropdown: DropdownType;
  // Chips: ComboboxChipsType;
}

export interface ComboboxContextProps {
  disabled?: boolean;
  size: "medium" | "small";
  variant: "primary" | "secondary" | "simple";
}

export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(
  (props, ref) => {
    const {
      inputProps,
      size = "medium",
      inputDescriptionId,
      hasError,
    } = useFormField(props, "comboboxfield");

    const {
      value,
      onChange,
      onClear,
      className,
      hideLabel = true,
      description,
      label,
      children,
      clearButtonLabel,
      clearButton = true,
      /* variant = "primary", */
      defaultValue,
      isListOpen,
      id,
      setOptions,
      options,
      selectedOptions,
      setSelectedOptions,
      ...rest
    } = props;

    const inputRef = useRef<HTMLInputElement | null>(null);
    const mergedRef = useMemo(() => mergeRefs([inputRef, ref]), [ref]);
    const [wrapperRef, setWrapperRef] = useState<HTMLDivElement | null>(null);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue ?? "");

    const handleChange = useCallback(
      (v: string) => {
        value === undefined && setInternalValue(v);
        onChange?.(v);
      },
      [onChange, value]
    );

    const focusInput = useCallback(() => {
      inputRef.current && inputRef.current?.focus?.();
      setIsInputFocused(true);
    }, [setIsInputFocused]);

    const handleClear = useCallback(
      (event: ComboboxClearEvent) => {
        onClear?.(event);
        handleChange("");
        focusInput();
      },
      [handleChange, onClear, focusInput]
    );

    useEventListener(
      "keydown",
      useCallback(
        (e) => {
          if (e.key === "Escape") {
            e.preventDefault();
            handleClear({ trigger: e.key, event: e });
          } else if (e.key === "Enter" && (value ?? internalValue)) {
            const val = String(value ?? internalValue);
            console.log("DEBUG - val", value ?? internalValue);
            e.preventDefault();
            setSelectedOptions([...selectedOptions, val]);
            handleClear({ trigger: e.key, event: e });
          }
        },
        [handleClear, setSelectedOptions, selectedOptions, internalValue, value]
      ),
      wrapperRef
    );

    const handleDeleteChip = (clickedOption) => {
      setSelectedOptions(
        selectedOptions.filter((option) => option !== clickedOption)
      );
      console.log("DEBUG - tet:", selectedOptions, clickedOption);
    };
    console.log("DEBUG - selectedOptions:", selectedOptions);
    return (
      <div
        ref={setWrapperRef}
        className={cl(
          className,
          "navds-form-field",
          `navds-form-field--${size}`,
          "navds-search",
          {
            "navds-search--error": hasError,
            "navds-search--disabled": !!inputProps.disabled,
          }
        )}
      >
        <Label
          htmlFor={inputProps.id}
          size={size}
          className={cl("navds-form-field__label", {
            "navds-sr-only": hideLabel,
          })}
        >
          {label}
        </Label>
        {!!description && (
          <BodyShort
            as="div"
            className={cl("navds-form-field__description", {
              "navds-sr-only": hideLabel,
            })}
            id={inputDescriptionId}
            size={size}
          >
            {description}
          </BodyShort>
        )}
        <div className="navds-combobox__wrapper">
          <div className="navds-combobox__wrapper-inner" onClick={focusInput}>
            <Chips className="navds-combobox__selected-options">
              {selectedOptions.length
                ? selectedOptions.map((option) => {
                    return (
                      <Chips.Removable
                        className="navds-combobox__selected-option"
                        key={option}
                        onClick={() => handleDeleteChip(option)}
                      >
                        {option}
                      </Chips.Removable>
                    );
                  })
                : []}

              <input
                ref={mergedRef}
                onBlur={() => setIsInputFocused(false)}
                {...omit(rest, ["error", "errorId", "size"])}
                {...inputProps}
                value={value ?? internalValue}
                onChange={(e) => handleChange(e.target.value)}
                type="search"
                role="combobox"
                aria-controls={isListOpen ? id : ""}
                aria-expanded={isListOpen}
                className={cl(
                  className,
                  "navds-combobox__input",
                  "navds-text-field__input",
                  "navds-body-short",
                  `navds-body-${size}`
                )}
              />
            </Chips>
            {(value ?? internalValue) && clearButton && (
              <button
                type="button"
                onClick={(e) => handleClear({ trigger: "Click", event: e })}
                className="navds-search__button-clear"
              >
                <span className="navds-sr-only">
                  {clearButtonLabel ? clearButtonLabel : "Tøm"}
                </span>
                <Close aria-hidden />
              </button>
            )}
          </div>
          <div className="navds-combobox__wrapper-dropdown">
            <select
              className={cl("navds-combobox__dropdown", {
                "navds-combobox__dropdown--open": isInputFocused,
              })}
              onChange={(e) => {
                setSelectedOptions([...selectedOptions, e.target.value]);
                //selectedValue = first value in array
              }}
            >
              {options
                ?.filter(
                  (opt) =>
                    !selectedOptions.some(
                      (selected) => selected.toLowerCase() === opt.toLowerCase()
                    )
                )
                ?.map((opt) => (
                  <option value={opt?.toLowerCase()}>{opt}</option>
                ))}
            </select>
          </div>
        </div>
      </div>
    );
  }
) as ComboboxComponent;

export default Combobox;
