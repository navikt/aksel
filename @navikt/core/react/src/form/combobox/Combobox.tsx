import { Close, Collapse, Expand } from "@navikt/ds-icons";
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
  | { trigger: "Escape"; event: React.KeyboardEvent<HTMLDivElement> }
  | { trigger: "Enter"; event: React.KeyboardEvent<HTMLButtonElement> };

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
  toggleListButton?: boolean;
  toggleListButtonLabel?: string;
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
      clearButton = true,
      clearButtonLabel,
      toggleListButton = true,
      toggleListButtonLabel,
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
    //TODO: fix bug where if you add empty string or non-existing option, it adds an empty chip
    //TODO: make list have a max-height and scroll
    //TODO: pre-selected options
    //TODO: add option to add new option
    //TODO: add caret icon with onClick to open list
    //TODO: allow user to add isListOpen as a prop to control list open/close
    //TODO: make it so that clicking Collapse/Expand closes list if list is open,
    /////// BUT leave it open if user tabs to it. AKA isListOpen cant be based on focus, but on state

    const inputRef = useRef<HTMLInputElement | null>(null);
    const mergedInputRef = useMemo(() => mergeRefs([inputRef, ref]), [ref]);
    const [wrapperRef, setWrapperRef] = useState<HTMLDivElement | null>(null);
    const [comboboxRef, setComboboxRef] = useState<HTMLDivElement | null>(null);
    const [isInternalListOpen, setInternalListOpen] =
      useState<boolean>(isListOpen);
    const prevSelectedOptions = usePrevious(selectedOptions);
    const [internalValue, setInternalValue] = useState<string>(
      defaultValue ? String(defaultValue) : ""
    );
    const [filteredOptionsIndex, setFilteredOptionsIndex] = useState(0);
    const [isComboboxFocused, setIsComboboxFocused] = useState(false);

    useEffect(() => {
      //manually set depending on whether focus is outside or inside combobox
      //check if comboboxRef-state contains activeElement
      //because of weird focusing rules, focus lands on body after tabbing, then moves to the next element
      //With state, we can avoid a "one step behind" issue we might get with refs
    }, [comboboxRef, isComboboxFocused]);

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
      inputRef.current && inputRef.current?.focus?.();
      setIsComboboxFocused(true);
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
          if (e.key === "Backspace" && internalValue === "") {
            setSelectedOptions(selectedOptions.slice(0, -1));
          } else if (e.key === "ArrowDown") {
            e.preventDefault();
            setFilteredOptionsIndex(
              Math.min(filteredOptionsIndex + 1, filteredOptions.length - 1)
            );
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setFilteredOptionsIndex(Math.max(0, filteredOptionsIndex - 1));
          }
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

    const handleBlur = useCallback(
      (e) => {
        console.log("blur", e.target, document.activeElement);
        if (!e?.target?.contains(document.activeElement))
          setInternalListOpen(false);
      },
      [setInternalListOpen]
    );

    //focus on input whenever selectedOptions changes
    useEffect(() => {
      if (prevSelectedOptions !== selectedOptions) focusInput();
    }, [focusInput, selectedOptions, prevSelectedOptions]);

    console.log("activelement bf render", document.activeElement);

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
        <div
          className="navds-combobox__wrapper"
          ref={setComboboxRef}
          onBlur={(e) => handleBlur(e)}
        >
          <div className="navds-combobox__wrapper-inner" onClick={focusInput}>
            <SelectedOptions className="navds-combobox__selected-options">
              {selectedOptions.length
                ? selectedOptions.map((option, i) => {
                    return (
                      <SelectedOptions.Removable
                        className="navds-combobox__selected-option"
                        key={option + i}
                        onFocus={() => setInternalListOpen(true)}
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
                ref={mergedInputRef}
                {...omit(rest, ["error", "errorId", "size"])}
                {...inputProps}
                value={value ?? internalValue}
                onChange={(e) => handleChange(e.target.value)}
                onFocus={() => setInternalListOpen(true)}
                type="search"
                role="combobox"
                aria-controls={isInternalListOpen ? id : ""}
                aria-expanded={isInternalListOpen}
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
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleClear({ trigger: e.key, event: e });
                  }
                }}
                onClick={(event) => handleClear({ trigger: "Click", event })}
                className="navds-combobox__button-clear"
              >
                <span className="navds-sr-only">
                  {clearButtonLabel ? clearButtonLabel : "Tøm"}
                </span>
                <Close aria-hidden width="20" height="20" />
              </button>
            )}
            {toggleListButton && (
              <button
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    setInternalListOpen((state) => !state);
                  }
                }}
                type="button"
                onClick={() => setInternalListOpen((state) => !state)}
                className="navds-combobox__button-toggle-list"
              >
                <span className="navds-sr-only">
                  {toggleListButtonLabel
                    ? toggleListButtonLabel
                    : isInternalListOpen
                    ? "Lukk"
                    : "Åpne"}
                </span>
                {isInternalListOpen ? (
                  <Collapse aria-hidden width="20" height="20" />
                ) : (
                  <Expand aria-hidden width="20" height="20" />
                )}
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
