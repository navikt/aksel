import { Close, Search as SearchIcon } from "@navikt/ds-icons";
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
  Combobox,
  ErrorMessage,
  Label,
  mergeRefs,
  omit,
  useEventListener,
} from "../../";
import { SearchProps } from "../search/Search";
import { useFormField } from "../useFormField";
import SearchButton, { SearchButtonType } from "../search/SearchButton";

export type ComboboxClearEvent =
  | {
      trigger: "Click";
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>;
    }
  | { trigger: "Escape"; event: React.KeyboardEvent<HTMLDivElement> };

export interface ComboboxProps extends SearchProps {}

interface ComboboxComponent
  extends React.ForwardRefExoticComponent<
    ComboboxProps & React.RefAttributes<HTMLDivElement>
  > {
  Button: SearchButtonType;
  //Tag: ComboboxTagType;
}

export interface ComboboxContextProps {
  disabled?: boolean;
  size: "medium" | "small";
  variant: "primary" | "secondary" | "simple";
}

export const SearchContext = React.createContext<ComboboxContextProps | null>(
  null
);

export const Search = forwardRef<HTMLInputElement, ComboboxProps>(
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
      variant = "primary",
      defaultValue,
      ...rest
    } = props;

    const searchRef = useRef<HTMLInputElement | null>(null);
    const mergedRef = useMemo(() => mergeRefs([searchRef, ref]), [ref]);
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
        searchRef.current && searchRef.current?.focus?.();
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
        <div className="navds-search__wrapper">
          <div className="navds-search__wrapper-inner">
            {variant === "simple" && (
              <SearchIcon aria-hidden className="navds-search__search-icon" />
            )}
            <input
              ref={mergedRef}
              {...omit(rest, ["error", "errorId", "size"])}
              {...inputProps}
              value={value ?? internalValue}
              onChange={(e) => handleChange(e.target.value)}
              type="search"
              role="searchbox"
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
          <SearchContext.Provider
            value={{
              size,
              disabled: inputProps.disabled,
              variant,
            }}
          >
            {children ? children : variant !== "simple" && <SearchButton />}
          </SearchContext.Provider>
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

Combobox.Button = SearchButton;

export default Search;
