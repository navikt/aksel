import cl from "clsx";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { BodyShort, Label, mergeRefs, omit } from "../..";
import usePrevious from "../../util/usePrevious";
import { useFormField } from "../useFormField";
import ClearButton from "./ClearButton";
import FilteredOptions from "./FilteredOptions";
import SelectedOptions from "./SelectedOptions";
import ToggleListButton from "./ToggleListButton";

import { ComboboxClearEvent, ComboboxProps } from "./types";
import useCustomOptions from "./useCustomOptions";

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
      value: externalValue,
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

    // TODO: in the dropdown, show a temporary list for "custom" options that shows up on top. On blur, add to filteredOptions
    // TODO: bug fix, when click toggleListButton, the list opens and then closes immediately because of race conditions with focusInHandler
    // TODO: mousein and arrow up/down shares virtual focus, mouseout does NOT remove focus
    // TODO: if no results and no "add" option, s how "no results" message
    // TODO: if text is long, new line
    // TODO: mobile, should fewer options be shown at a time?
    // TODO: mobile, should press area for input be taller?

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
    const {
      customOptions,
      setCustomOptions,
      removeCustomOption,
      addCustomOption,
    } = useCustomOptions(setSelectedOptions);

    const value = useMemo(
      () => String(externalValue ?? internalValue),
      [externalValue, internalValue]
    );

    const filteredOptions = useMemo(() => {
      const opts = [...customOptions, ...options];

      return opts?.filter((option) =>
        normalizeText(option).includes(normalizeText(value ?? ""))
      );
    }, [value, options, customOptions]);

    const handleChange = useCallback(
      (val: string) => {
        externalValue ?? setInternalValue(val);
        onChange?.(val);
        setFilteredOptionsIndex(0);
        if (!isInternalListOpen && !!val) {
          setInternalListOpen(true);
        }
      },
      [isInternalListOpen, onChange, externalValue]
    );

    const focusInput = useCallback(() => {
      inputRef.current?.focus?.();
    }, []);

    const handleClear = useCallback(
      (event: ComboboxClearEvent) => {
        onClear?.(event);
        handleChange("");
      },
      [handleChange, onClear]
    );

    const toggleOption = useCallback(
      (event) => {
        const clickedOption = event?.target?.textContent;
        const curFilteredOpt = filteredOptions[filteredOptionsIndex];
        // toggle selected option on click
        if (clickedOption) {
          if (selectedOptions.includes(clickedOption)) {
            setSelectedOptions(
              selectedOptions.filter((o) => o !== clickedOption)
            );
            if (customOptions.includes(clickedOption))
              removeCustomOption({ event });
          } else if (filteredOptions.includes(clickedOption))
            setSelectedOptions([...selectedOptions, clickedOption]);
        }
        // remove selected filteredOption on Enter
        else if (curFilteredOpt && selectedOptions.includes(curFilteredOpt)) {
          setSelectedOptions(
            selectedOptions.filter((o) => o !== curFilteredOpt)
          );
          if (customOptions.includes(curFilteredOpt))
            removeCustomOption({ value: curFilteredOpt });
        } else if (
          // add new option on Enter input value if in filteredOptions OR if input value is empty
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
        isInternalListOpen,
        value,
        setSelectedOptions,
        customOptions,
        removeCustomOption,
      ]
    );

    const handleAddCustomOption = useCallback(
      (event) => {
        if (selectedOptions.includes(value.trim())) return;
        addCustomOption({ value });
        handleClear(event);
        focusInput();
      },
      [selectedOptions, value, addCustomOption, handleClear, focusInput]
    );

    const handleDeleteSelectedOption = (clickedOption) => {
      setSelectedOptions(
        selectedOptions.filter((option) => option !== clickedOption)
      );
      if (customOptions.includes(clickedOption))
        setCustomOptions(customOptions.filter((o) => o !== clickedOption));
    };

    const handleKeyUp = (e) => {
      const scrollToOption = (newIndex: number) => {
        if (filteredOptionsRef.current) {
          const child = filteredOptionsRef.current.children[newIndex];
          const { top, bottom } = child.getBoundingClientRect();
          const parentRect = filteredOptionsRef.current.getBoundingClientRect();
          if (top < parentRect.top || bottom > parentRect.bottom)
            child.scrollIntoView({ block: "nearest" });
        }
      };
      switch (e.key) {
        case "Escape":
          handleClear({ trigger: e.key, event: e });
          setInternalListOpen(false);
          break;
        case "ArrowDown": {
          e.preventDefault();
          const newIndex = Math.min(
            filteredOptionsIndex + 1,
            filteredOptions.length - 1
          );
          setFilteredOptionsIndex(newIndex);
          scrollToOption(newIndex);
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          const newIndex = Math.max(0, filteredOptionsIndex - 1);
          setFilteredOptionsIndex(newIndex);
          scrollToOption(newIndex);
          break;
        }
        case "Enter":
          e.preventDefault();
          toggleOption(e);
          if (value && !filteredOptions.includes(value))
            handleAddCustomOption(e);
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
            // todo remove custom option on backspace
            setCustomOptions(
              customOptions.filter((o) => o !== lastSelectedOption)
            );
          setSelectedOptions(selectedOptions.slice(0, -1));
        }
      },
      [
        value,
        selectedOptions,
        setSelectedOptions,
        customOptions,
        setCustomOptions,
      ]
    );

    //focus on input whenever selectedOptions changes
    //Seems like a band-aid. Why does focus disappear?
    useEffect(() => {
      if (prevSelectedOptions !== selectedOptions) focusInput();
    }, [focusInput, selectedOptions, prevSelectedOptions]);

    function onFocusWrapper(e) {
      const ref = wrapperRef.current;
      if (ref?.contains(e.target) && !ref?.contains(e.relatedTarget)) {
        setInternalListOpen(true);
      }
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
          <div className="navds-combobox__wrapper-inner navds-text-field__input">
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
                onKeyUp={handleKeyUp}
                onKeyDown={handleKeyDown}
                aria-controls={isInternalListOpen ? id : ""}
                aria-expanded={!!isInternalListOpen}
                autoComplete="off"
                aria-autocomplete="list"
                aria-owns={`${id}-options`}
                aria-activedescendant={`${id}-option-${filteredOptions[filteredOptionsIndex]}`}
                className={cl(
                  className,
                  "navds-combobox__input",
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
          <FilteredOptions
            id={id}
            ref={filteredOptionsRef}
            filteredOptions={filteredOptions}
            filteredOptionsIndex={filteredOptionsIndex}
            selectedOptions={selectedOptions}
            toggleOption={toggleOption}
            focusInput={focusInput}
            isInternalListOpen={isInternalListOpen}
            value={value}
            addNewOption={handleAddCustomOption}
          />
        </div>
      </div>
    );
  }
);

export default Combobox;
