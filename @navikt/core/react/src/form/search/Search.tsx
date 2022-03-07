import { Close } from "@navikt/ds-icons";
import cl from "classnames";
import React, {
  forwardRef,
  InputHTMLAttributes,
  useCallback,
  useEffect,
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
   * @default "tertiary"
   */
  variant?: "tertiary" | "primary";
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
  variant?: "tertiary" | "primary";
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
    variant = "tertiary",
    ...rest
  } = props;

  const searchRef = useRef<HTMLInputElement | null>(null);
  const mergedRef = mergeRefs([searchRef, ref]);
  const [wrapperRef, setWrapperRef] = useState<HTMLFormElement | null>(null);

  const [controlledValue, setControlledValue] = useState(value ?? "");

  const handleChange = useCallback(
    (v: string) => {
      searchRef.current && value === undefined && setControlledValue(v);
      props?.onChange?.(v);
    },
    [props, value]
  );

  const handleClear = useCallback(
    (event: SearchClearEvent) => {
      onClear?.(event);
      handleChange("");
      if (searchRef.current && value === undefined) {
        searchRef.current.value = "";
      }
      searchRef.current && searchRef.current?.focus?.();
    },
    [handleChange, onClear, value]
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

  useEffect(() => {
    value !== undefined && setControlledValue(value);
  }, [value]);

  return (
    <form
      role="search"
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
      onSubmit={(e) => {
        e.preventDefault();
        onSearch?.(controlledValue);
      }}
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
          <input
            ref={mergedRef}
            {...omit(rest, ["size"])}
            {...inputProps}
            {...(props.value !== undefined && { value: props.value })}
            onChange={(e) => handleChange(e.target.value)}
            type="search"
            role="searchbox"
            className={cl(
              className,
              "navds-search__input",
              "navds-text-field__input",
              "navds-body-short",
              `navds-body-${size ?? "medium"}`
            )}
          />
          {controlledValue && clearButton && (
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
          {children ? children : <SearchButton />}
        </SearchContext.Provider>
      </div>
    </form>
  );
}) as SearchComponent;

Search.Button = SearchButton;

export default Search;
