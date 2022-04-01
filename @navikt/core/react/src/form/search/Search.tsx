import { Close, Search as SearchIcon } from "@navikt/ds-icons";
import cl from "classnames";
import React, {
  forwardRef,
  InputHTMLAttributes,
  useCallback,
  useRef,
  useState,
} from "react";
import mergeRefs from "react-merge-refs";
import { BodyShort, Label, omit, useEventListener } from "../..";
import { FormFieldProps } from "../useFormField";
import SearchButton, { SearchButtonType } from "./SearchButton";
import { useSearch } from "./useSearch";

export type SearchClearEvent =
  | {
      trigger: "Click";
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>;
    }
  | { trigger: "Escape"; event: React.KeyboardEvent<HTMLDivElement> };

export interface SearchProps
  extends Omit<FormFieldProps, "error" | "errorId">,
    Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
  children?: React.ReactNode;
  /**
   * Search label
   * @info Will be hidden by default, is required for accessibility reasons.
   */
  label: React.ReactNode;
  /**
   * Shows label and description for screenreaders-only
   * @default true
   */
  hideLabel?: boolean;
  /**
   * Callback for value-change in input
   */
  onChange?: (value: string) => void;
  /**
   * Callback for <Search.Button/> click or onSubmit in form
   */
  onSearch?: (value: string | number | readonly string[]) => void;
  /**
   * Callback for click on clear-button or Escape keydown
   */
  onClear?: (e: SearchClearEvent) => void;
  /**
   * aria-label on clear button
   * @default "Tøm"
   */
  clearButtonLabel?: string;
  /**
   * If false, removes clear-button option from input.
   * @default true
   */
  clearButton?: boolean;
  /**
   * Changes button-variant
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "simple";
}

interface SearchComponent
  extends React.ForwardRefExoticComponent<
    SearchProps & React.RefAttributes<HTMLDivElement>
  > {
  Button: SearchButtonType;
}

export interface SearchContextProps {
  disabled?: boolean;
  size: "medium" | "small";
  variant: "primary" | "secondary" | "simple";
  onSearch: () => void;
}

export const SearchContext = React.createContext<SearchContextProps | null>(
  null
);

const Search = forwardRef<HTMLInputElement, SearchProps>((props, ref) => {
  const { inputProps, size = "medium", inputDescriptionId } = useSearch(
    props,
    "searchfield"
  );

  const {
    className,
    hideLabel = true,
    label,
    description,
    value,
    clearButtonLabel,
    onClear,
    clearButton = true,
    children,
    onSearch,
    variant = "primary",
    defaultValue,
    onChange,
    ...rest
  } = props;

  const searchRef = useRef<HTMLInputElement | null>(null);
  const mergedRef = mergeRefs([searchRef, ref]);
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
    (event: SearchClearEvent) => {
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
          "navds-search--disabled": !!inputProps.disabled,
        }
      )}
    >
      <Label
        htmlFor={inputProps.id}
        size={size}
        as="label"
        className={cl("navds-text-field__label", {
          "navds-sr-only": hideLabel,
        })}
      >
        {label}
      </Label>
      {!!description && (
        <BodyShort
          as="div"
          className={cl("navds-text-field__description", {
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
            {...omit(rest, ["size"])}
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
            onSearch: () => onSearch?.(value ?? internalValue),
          }}
        >
          {children ? children : variant !== "simple" && <SearchButton />}
        </SearchContext.Provider>
      </div>
    </div>
  );
}) as SearchComponent;

Search.Button = SearchButton;

export default Search;
