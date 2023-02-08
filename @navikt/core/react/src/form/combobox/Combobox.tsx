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
}

interface ComboboxComponent
  extends React.ForwardRefExoticComponent<
    ComboboxProps & React.RefAttributes<HTMLDivElement>
  > {
  // dropdown: DropdownType;
  //Tag: ComboboxTagType;
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
      hideLabel = false,
      description,
      label,
      children,
      clearButtonLabel,
      clearButton = true,
      variant = "primary",
      defaultValue,
      isListOpen,
      id,
      ...rest
    } = props;

    const comboboxRef = useRef<HTMLInputElement | null>(null);
    const mergedRef = useMemo(() => mergeRefs([comboboxRef, ref]), [ref]);
    const [wrapperRef, setWrapperRef] = useState<HTMLDivElement | null>(null);
    const [chips, setChips] = useState<string[]>([]);

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
      "keypress",
      useCallback(
        (e) => {
          if (e.key === "Escape") {
            e.preventDefault();
            handleClear({ trigger: "Escape", event: e });
          } else if (e.key === "Enter") {
            setChips([...chips, e.target.value]);
            handleClear({ trigger: "Escape", event: e });
          }
        },
        [chips, handleClear]
      ),
      wrapperRef
    );

    useEventListener(
      "keydown",
      useCallback(
        (e) => {
          if (e.key === "Backspace" && internalValue === "") {
            setChips(chips.slice(0, -1));
          }
        },
        [chips, internalValue]
      )
    );

    function onRemoveChip(value) {
      setChips(chips.filter((chip) => chip !== value));
    }

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
            {chips.length > 0 && (
              <Chips>
                {chips.map((chip, i) => {
                  return (
                    <Chips.Removable
                      onDelete={() => onRemoveChip(chip)}
                      key={chip}
                    >
                      {chip}
                    </Chips.Removable>
                  );
                })}
              </Chips>
            )}
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
                "navds-search__input",
                `navds-search__input--${variant}`,
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
