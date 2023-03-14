import { Add, Close, Collapse, Expand } from "@navikt/ds-icons";
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
    //TODO: scroll dropdown when navigating with keyboard
    //TODO: make it so that clicking Collapse/Expand closes list if list is open,
    /////// BUT leave it open if user tabs to it. AKA isListOpen cant be based on focus, but on state

    const inputRef = useRef<HTMLInputElement | null>(null);
    const mergedInputRef = useMemo(() => mergeRefs([inputRef, ref]), [ref]);
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const [isInternalListOpen, setInternalListOpen] = useState<boolean | null>(
      isListOpen
    );
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

    const isInternalValueNew = useMemo(() => {
      return (
        internalValue &&
        !options?.find(
          (option) => normalizeText(option) === normalizeText(internalValue)
        )
      );
    }, [internalValue, options]);

    const handleChange = useCallback(
      (val: string) => {
        value === undefined && setInternalValue(val);
        onChange?.(val);
        setFilteredOptionsIndex(0);
        if (!isInternalListOpen && !!val) {
          setInternalListOpen(true);
        }
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

    const onKeyDown = useCallback(
      (e) => {
        if (e.key === "Escape") {
          e.preventDefault();
          handleClear({ trigger: e.key, event: e });
          setInternalListOpen(false);
        } else if (e.key === "Enter") {
          e.preventDefault();
          toggleOption();
        }
      },
      [handleClear, toggleOption]
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

    //focus on input whenever selectedOptions changes
    // TODO: Seems like a band-aid. Why does focus disappear?
    useEffect(() => {
      if (prevSelectedOptions !== selectedOptions) focusInput();
    }, [focusInput, selectedOptions, prevSelectedOptions]);

    function onFocusWrapper(e) {
      if (
        wrapperRef.current?.contains(e.target) &&
        !wrapperRef.current?.contains(e.relatedTarget)
      ) {
        setInternalListOpen(true);
      }
    }

    function onBlurWrapper(e) {
      if (!wrapperRef.current?.contains(e.relatedTarget)) {
        setInternalListOpen(false);
      }
    }

    return (
      <div
        ref={wrapperRef}
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
        onBlur={onBlurWrapper}
        onFocus={onFocusWrapper}
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
                ref={mergedInputRef}
                {...omit(rest, ["error", "errorId", "size"])}
                {...inputProps}
                value={value ?? internalValue}
                onChange={(e) => handleChange(e.target.value)}
                onKeyDown={onKeyDown}
                type="search"
                role="combobox"
                aria-controls={isInternalListOpen ? id : ""}
                aria-expanded={!!isInternalListOpen}
                autoComplete="off"
                aria-autocomplete="list"
                aria-owns={`${id}-options`}
                aria-activedescendant={`${id}-option-${filteredOptions[filteredOptionsIndex]}`}
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
                type="button"
                onClick={() => setInternalListOpen(!isInternalListOpen)}
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
              role="listbox"
            >
              {isInternalValueNew && (
                <li
                  id={`${id}-combobox-new-option`}
                  className="navds-combobox__list-item navds-combobox__list-item__new-option"
                  role="option"
                  aria-selected={!selectedOptions.includes(internalValue)}
                >
                  <Add />
                  <BodyShort size="medium">
                    Legg til{" "}
                    <Label as="span">&#8220;{internalValue}&#8221;</Label>
                  </BodyShort>
                </li>
              )}
              {filteredOptions.map((o, i) => (
                <li
                  className={cl("navds-combobox__list-item", {
                    "navds-combobox__list-item--focus":
                      i === filteredOptionsIndex,
                    "navds-combobox__list-item--selected":
                      selectedOptions.includes(o),
                  })}
                  id={`${id}-option-${o}`}
                  key={o}
                  onClick={() => toggleOption()}
                  role="option"
                  aria-selected={selectedOptions.includes(o)}
                >
                  <BodyShort size="medium">{o}</BodyShort>
                  {selectedOptions.includes(o) && (
                    <svg
                      width="16"
                      height="13"
                      viewBox="0 0 16 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        fill="#005B82"
                        d="M14.2014 0L16 1.89047L4.77943 13L0 8.39552L1.79361 6.5L4.77418 9.3019L14.2014 0Z"
                      />
                    </svg>
                  )}
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
