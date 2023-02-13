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
      /* variant = "primary", */
      defaultValue,
      isListOpen,
      id,
      setOptions,
      options = [],
      selectedOptions,
      setSelectedOptions,
      ...rest
    } = props;

    const inputRef = useRef<HTMLInputElement | null>(null);
    const mergedRef = useMemo(() => mergeRefs([inputRef, ref]), [ref]);
    const [wrapperRef, setWrapperRef] = useState<HTMLDivElement | null>(null);
    const [isInternalListOpen, setInternalListOpen] =
      useState<boolean>(isListOpen);
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
      (v: string) => {
        value === undefined && setInternalValue(v);
        onChange?.(v);
        if (!!v !== isInternalListOpen) {
          setInternalListOpen(!!v);
        }
        setFilteredOptionsIndex(0);
      },
      [isInternalListOpen, onChange, value]
    );

    const focusInput = useCallback(() => {
      inputRef.current && inputRef.current?.focus?.();
    }, []);

    const handleClear = useCallback(
      (event: ComboboxClearEvent) => {
        onClear?.(event);
        handleChange("");
        focusInput();
      },
      [handleChange, onClear, focusInput]
    );

    const toggleOption = useCallback(() => {
      const activeChip = filteredOptions[filteredOptionsIndex];
      if (selectedOptions.includes(activeChip)) {
        setSelectedOptions(
          selectedOptions.filter((option) => option !== activeChip)
        );
      } else {
        setSelectedOptions([...selectedOptions, activeChip]);
      }
    }, [
      selectedOptions,
      filteredOptions,
      filteredOptionsIndex,
      setSelectedOptions,
    ]);

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
            handleClear({ trigger: e.key, event: e });
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

    const handleDeleteChip = (clickedOption) => {
      setSelectedOptions(
        selectedOptions.filter((option) => option !== clickedOption)
      );
    };

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
                ? selectedOptions.map((option, i) => {
                    return (
                      <Chips.Removable
                        className="navds-combobox__selected-option"
                        key={option + i}
                        onClick={() => handleDeleteChip(option)}
                      >
                        {option}
                      </Chips.Removable>
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
                  onClick={() => setSelectedOptions([...selectedOptions, o])}
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
) as ComboboxComponent;

export default Combobox;
