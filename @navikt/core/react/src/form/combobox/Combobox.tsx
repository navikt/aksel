import cl from "clsx";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { BodyShort, Label, mergeRefs, omit, useEventListener } from "../..";
import usePrevious from "../../util/usePrevious";
import { useFormField } from "../useFormField";
import ClearButton from "./ClearButton";
import { keyDownHandler } from "./events";
import Options from "./FilteredOptions";
import SelectedOptions from "./SelectedOptions";
import ToggleListButton from "./ToggleListButton";

import { ComboboxClearEvent, ComboboxProps } from "./types";

const normalizeText = (text: string) =>
  typeof text === "string" ? text.toLowerCase().trim() : "";

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
      isListOpen,
      id = "",
      setOptions,
      options = [],
      selectedOptions,
      setSelectedOptions,
      ...rest
    } = props;

    //TODO: add logic for new option on enter
    //TODO: add different list for "just added" options that shows up on top of list
    //TODO: pre-selected options
    //TODO: add option to add new option
    //TODO: add caret icon with onClick to open list
    //TODO: allow user to add isListOpen as a prop to control list open/close
    //TODO: scroll dropdown when navigating with keyboard
    //TODO: make it so that clicking Collapse/Expand closes list if list is open, BUT leave it open if user tabs to it. AKA isListOpen cant be based on focus, but on state

    const inputRef = useRef<HTMLInputElement | null>(null);
    const mergedInputRef = useMemo(() => mergeRefs([inputRef, ref]), [ref]);
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const filteredOptionsRef = useRef<HTMLUListElement | null>(null);
    const [isInternalListOpen, setInternalListOpen] = useState<boolean | null>(
      isListOpen
    );
    const prevSelectedOptions = usePrevious(selectedOptions);
    const [internalValue, setInternalValue] = useState<string>("");
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

    const toggleOption = useCallback(
      (textContent, isNew = false) => {
        const curFilteredOpt = filteredOptions[filteredOptionsIndex];
        if (isNew) {
          setSelectedOptions([...selectedOptions, textContent]);
          setInternalValue("");
          setInternalListOpen(false);
          focusInput();
        } else if (textContent) {
          if (selectedOptions.includes(textContent))
            setSelectedOptions(
              selectedOptions.filter((o) => o !== textContent)
            );
          else if (filteredOptions.includes(textContent))
            setSelectedOptions([...selectedOptions, textContent]);
        } else if (curFilteredOpt && selectedOptions.includes(curFilteredOpt))
          setSelectedOptions(
            selectedOptions.filter((o) => o !== curFilteredOpt)
          );
        else if (
          isInternalListOpen &&
          curFilteredOpt &&
          (filteredOptions?.includes?.(String(value)) || !value)
        )
          setSelectedOptions([...selectedOptions, curFilteredOpt]);
      },
      [
        filteredOptions,
        filteredOptionsIndex,
        selectedOptions,
        setSelectedOptions,
        isInternalListOpen,
        value,
        focusInput,
      ]
    );

    const handleDeleteSelectedOption = (clickedOption) => {
      setSelectedOptions(
        selectedOptions.filter((option) => option !== clickedOption)
      );
    };

    useEventListener("keydown", (e) =>
      keyDownHandler(e, {
        internalValue,
        selectedOptions,
        setInternalListOpen,
        setFilteredOptionsIndex,
        filteredOptions,
        setSelectedOptions,
        handleClear,
        toggleOption,
        filteredOptionsIndex,
        filteredOptionsRef,
      })
    );

    //focus on input whenever selectedOptions changes
    // TODO: Seems like a band-aid. Why does focus disappear?
    useEffect(() => {
      if (prevSelectedOptions !== selectedOptions) focusInput();
    }, [focusInput, selectedOptions, prevSelectedOptions]);

    function onFocusWrapper(e) {
      const ref = wrapperRef.current;
      if (ref?.contains(e.target) && !ref?.contains(e.relatedTarget))
        setInternalListOpen(true);
    }

    function onBlurWrapper(e) {
      if (!wrapperRef.current?.contains(e.relatedTarget))
        setInternalListOpen(false);
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
            <SelectedOptions
              selectedOptions={selectedOptions}
              handleDeleteSelectedOption={handleDeleteSelectedOption}
            >
              <input
                key="combobox-input"
                ref={mergedInputRef}
                {...omit(rest, ["error", "errorId", "size"])}
                {...inputProps}
                value={value}
                onChange={(e) => handleChange(e.target.value)}
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
            {value && clearButton && (
              <ClearButton
                handleClear={(event) =>
                  handleClear({ trigger: "Click", event })
                }
                clearButtonLabel={clearButtonLabel}
              />
            )}
            {toggleListButton && (
              <ToggleListButton
                isInternalListOpen={isInternalListOpen}
                setInternalListOpen={setInternalListOpen}
                toggleListButtonLabel={toggleListButtonLabel}
              />
            )}
          </div>
          <Options
            id={id}
            ref={filteredOptionsRef}
            internalValue={internalValue}
            filteredOptions={filteredOptions}
            filteredOptionsIndex={filteredOptionsIndex}
            selectedOptions={selectedOptions}
            toggleOption={toggleOption}
            focusInput={focusInput}
            isInternalListOpen={isInternalListOpen}
          />
        </div>
      </div>
    );
  }
);

export default Combobox;
