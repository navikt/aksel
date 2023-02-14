import { Close } from "@navikt/ds-icons";
import cl from "clsx";
import React, {
  forwardRef,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  BodyShort,
  Chips as SelectedOptions,
  Label,
  mergeRefs,
  omit,
  useEventListener,
} from "../..";
import usePrevious from "../../util/usePrevious";
import { FormFieldProps, useFormField } from "../useFormField";

export type ComboboxClearEvent =
  | {
      trigger: "Click";
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>;
    }
  | { trigger: "Escape"; event: React.KeyboardEvent<HTMLDivElement> };

export interface ComboboxProps
  extends FormFieldProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
  isListOpen: boolean;
  options?: string[];
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

export interface ComboboxContextProps {
  disabled?: boolean;
  size: "medium" | "small";
  variant: "primary" | "secondary" | "simple";
}

const normalizeText = (text) => (text ? text.toLowerCase().trim() : "");

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
      hideLabel = false,
      description,
      label,
      children,
      clearButtonLabel,
      clearButton = true,
      defaultValue,
      isListOpen,
      id,
      setOptions,
      options = [],
      selectedOptions,
      setSelectedOptions,
      ...rest
    } = props;
    //TODO: fix bug where if virtual focus is on an option and you click on another option, the virtually focused option is selected
    //TODO: dont inputFocus on load, only after element immediately after render

    const inputRef = useRef<HTMLInputElement | null>(null);
    const mergedRef = useMemo(() => mergeRefs([inputRef, ref]), [ref]);
    const [wrapperRef, setWrapperRef] = useState<HTMLDivElement | null>(null);
    const [isInternalListOpen, setInternalListOpen] =
      useState<boolean>(isListOpen);
    const prevSelectedOptions = usePrevious(selectedOptions);
    const [internalValue, setInternalValue] = useState<string>(
      defaultValue ? String(defaultValue) : ""
    );
    const [filteredOptionsIndex, setFilteredOptionsIndex] = useState(0);

    const filteredOptions = useMemo(() => {
      if (internalValue) {
        return (
          options?.filter((option) =>
            normalizeText(option).includes(normalizeText(internalValue))
          ) || []
        );
      } else {
        return options;
      }
    }, [internalValue, options]);

    const handleChange = useCallback(
      (val: string) => {
        value === undefined && setInternalValue(val);
        onChange?.(val);
        if (!!val !== isInternalListOpen) {
          setInternalListOpen(!!val);
        }
        setFilteredOptionsIndex(0);
      },
      [isInternalListOpen, onChange, value]
    );

    const focusInput = useCallback(() => {
      console.log("focusInput");
      inputRef.current && inputRef.current?.focus?.();
    }, []);

    const handleClear = useCallback(
      (event: ComboboxClearEvent) => {
        onClear?.(event);
        handleChange("");
      },
      [handleChange, onClear]
    );

    const toggleOption = useCallback(() => {
      const curFilteredOpt = filteredOptions[filteredOptionsIndex];
      if (selectedOptions.includes(curFilteredOpt))
        setSelectedOptions(selectedOptions.filter((o) => o !== curFilteredOpt));
      else setSelectedOptions([...selectedOptions, curFilteredOpt]);
    }, [
      selectedOptions,
      filteredOptions,
      filteredOptionsIndex,
      setSelectedOptions,
    ]);

    const handleDeleteSelectedOption = (clickedOption) => {
      setSelectedOptions(
        selectedOptions.filter((option) => option !== clickedOption)
      );
    };

    useEventListener(
      "keypress",
      useCallback(
        (e) => {
          if (e.key === "Escape") {
            e.preventDefault();
            handleClear({ trigger: e.key, event: e });
          } else if (e.key === "Enter") {
            e.preventDefault();
            toggleOption();
          }
        },
        [handleClear, toggleOption]
      ),
      wrapperRef
    );

    useEventListener(
      "keydown",
      useCallback(
        (e) => {
          if (e.key === "Backspace" && internalValue === "")
            setSelectedOptions(selectedOptions.slice(0, -1));
          else if (e.key === "ArrowDown")
            setFilteredOptionsIndex(
              Math.min(filteredOptionsIndex + 1, filteredOptions.length - 1)
            );
          else if (e.key === "ArrowUp")
            setFilteredOptionsIndex(Math.max(0, filteredOptionsIndex - 1));
        },
        [
          selectedOptions,
          internalValue,
          filteredOptionsIndex,
          filteredOptions,
          setSelectedOptions,
        ]
      )
    );

    //focus on input whenever selectedOptions changes
    useEffect(() => {
      console.log("useEffect");
      if (prevSelectedOptions !== selectedOptions) focusInput();
    }, [focusInput, selectedOptions, prevSelectedOptions]);

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
            <SelectedOptions className="navds-combobox__selected-options">
              {selectedOptions.length
                ? selectedOptions.map((option, i) => {
                    return (
                      <SelectedOptions.Removable
                        className="navds-combobox__selected-option"
                        key={option + i}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteSelectedOption(option);
                        }}
                      >
                        {option}
                      </SelectedOptions.Removable>
                    );
                  })
                : []}

              <input
                key="combobox-input"
                ref={mergedRef}
                {...omit(rest, ["error", "errorId", "size"])}
                {...inputProps}
                value={value ?? internalValue}
                onChange={(e) => handleChange(e.target.value)}
                onFocus={() => setInternalListOpen(true)}
                onBlur={() => setInternalListOpen(false)}
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
            </SelectedOptions>
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
          {filteredOptions && (
            <ul
              className={cl("navds-combobox__list", {
                "navds-combobox__list--closed": !isInternalListOpen,
              })}
              id={`${id}-options`}
            >
              {filteredOptions.map((o, i) => (
                <li
                  className={cl("navds-combobox__list-item", {
                    "navds-combobox__list-item--focus":
                      i === filteredOptionsIndex,
                    "navds-combobox__list-item--selected":
                      selectedOptions.includes(o),
                  })}
                  key={o}
                  onClick={() => toggleOption()}
                >
                  <BodyShort size="medium">{o}</BodyShort>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
);

export default Combobox;
