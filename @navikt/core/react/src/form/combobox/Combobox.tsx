import { Close } from "@navikt/ds-icons";
import cl from "clsx";
import React, {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  BodyShort,
  Chips,
  /* Dropdown, */
  ErrorMessage,
  Label,
  mergeRefs,
  omit,
  useEventListener,
} from "../..";
import { SearchProps } from "../search/Search";
import { useFormField } from "../useFormField";

export type ComboboxClearEvent =
  | {
      trigger: "Click";
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>;
    }
  | { trigger: "Escape"; event: React.KeyboardEvent<HTMLDivElement> };

export interface ComboboxProps extends SearchProps {
  isListOpen: boolean;
  options: any[];
  selectedOptions: string[];
  setOptions: React.Dispatch<React.SetStateAction<any[]>>;
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
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
      errorId,
      showErrorMsg,
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

    const comboboxRef = useRef<HTMLInputElement | null>(null);
    const mergedRef = useMemo(() => mergeRefs([comboboxRef, ref]), [ref]);
    const [wrapperRef, setWrapperRef] = useState<HTMLDivElement | null>(null);

    const [internalValue, setInternalValue] = useState(defaultValue ?? "");

    const handleChange = useCallback(
      (v: string) => {
        value === undefined && setInternalValue(v);
        onChange?.(v);
      },
      [onChange, value]
    );

    const handleClear = useCallback(
      (event: ComboboxClearEvent) => {
        onClear?.(event);
        handleChange("");
        comboboxRef.current && comboboxRef.current?.focus?.();
      },
      [handleChange, onClear]
    );

    useEventListener(
      "keydown",
      useCallback(
        (e) => {
          if (e.key === "Escape") {
            e.preventDefault();
            handleClear({ trigger: "Escape", event: e });
          }
        },
        [handleClear]
      ),
      wrapperRef
    );

    const handleDeleteChip = (clickedOption) => {
      setSelectedOptions(
        selectedOptions.filter((option) => option !== clickedOption)
      );
      console.log("DEBUG - tet:", selectedOptions, clickedOption);
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
          <div className="navds-combobox__wrapper-inner">
            <Chips>
              {selectedOptions.length
                ? selectedOptions.map((option) => {
                    return (
                      <Chips.Removable
                        key={option}
                        onClick={() => handleDeleteChip(option)}
                      >
                        {option}
                      </Chips.Removable>
                    );
                  })
                : []}
            </Chips>
            <input
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
        </div>
        <div
          className="navds-form-field__error"
          id={errorId}
          aria-relevant="additions removals"
          aria-live="polite"
        >
          {showErrorMsg && (
            <ErrorMessage size={size}>{props.error}</ErrorMessage>
          )}
        </div>
      </div>
    );
  }
) as ComboboxComponent;

export default Combobox;
