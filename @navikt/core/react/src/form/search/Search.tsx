import cl from "clsx";
import React, {
  InputHTMLAttributes,
  forwardRef,
  useCallback,
  useRef,
  useState,
} from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@navikt/aksel-icons";
import { BodyShort, ErrorMessage, Label } from "../../typography";
import { omit } from "../../util";
import { useMergeRefs } from "../../util/hooks/useMergeRefs";
import { FormFieldProps, useFormField } from "../useFormField";
import SearchButton, { SearchButtonType } from "./SearchButton";
import { SearchContext } from "./context";

export type SearchClearEvent =
  | {
      trigger: "Click";
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>;
    }
  | { trigger: "Escape"; event: React.KeyboardEvent<HTMLDivElement> };

export interface SearchProps
  extends Omit<FormFieldProps, "readOnly">,
    Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange" | "type"> {
  children?: React.ReactNode;
  /**
   * Search label.
   *
   * Will be hidden by default and is required for WCAG compliance.
   */
  label: React.ReactNode;
  /**
   * Shows label and description for screenreaders only.
   * @default true
   */
  hideLabel?: boolean;
  /**
   * Callback for value-change in input.
   */
  onChange?: (value: string) => void;
  /**
   * Callback for click on clear-button or Escape keydown.
   */
  onClear?: (e: SearchClearEvent) => void;
  /**
   * Callback for Search-button submit.
   */
  onSearchClick?: (value: string) => void;
  /**
   * Sets the `aria-label` for the clear button.
   * @default "Tøm"
   */
  clearButtonLabel?: string;
  /**
   * Removes clear-button if `false`.
   * @default true
   */
  clearButton?: boolean;
  /**
   * Changes button-variant.
   *
   * - "primary": When this is the main function of the page.
   * - "secondary": This is probably the one you want if in doubt.
   * - "simple": Removes the search button.
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "simple";
  /**
   * Exposes the HTML size attribute. Specifies the width of the element, in characters.
   */
  htmlSize?: number | string;
  /*
   * Exposes role attribute.
   */
  role?: string;
}

interface SearchComponent
  extends React.ForwardRefExoticComponent<
    SearchProps & React.RefAttributes<HTMLDivElement>
  > {
  Button: SearchButtonType;
}

/**
 * A component that displays a search input field.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/search)
 * @see 🏷️ {@link SearchProps}
 *
 * @example
 * ```jsx
 * <form role="search">
 *   <Search label="Søk alle NAV sine sider" variant="primary" />
 * </form>
 * ```
 */
export const Search = forwardRef<HTMLInputElement, SearchProps>(
  (props, ref) => {
    const {
      inputProps,
      size = "medium",
      inputDescriptionId,
      errorId,
      showErrorMsg,
      hasError,
    } = useFormField(props, "searchfield");

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
      variant = "primary",
      defaultValue,
      onChange,
      onSearchClick,
      htmlSize,
      role,
      ...rest
    } = props;

    const searchRef = useRef<HTMLInputElement | null>(null);
    const mergedRef = useMergeRefs(searchRef, ref);

    const [internalValue, setInternalValue] = useState(defaultValue ?? "");

    const handleChange = useCallback(
      (v: string) => {
        value === undefined && setInternalValue(v);
        onChange?.(v);
      },
      [onChange, value],
    );

    const handleClear = useCallback(
      (event: SearchClearEvent) => {
        onClear?.(event);
        handleChange("");
        searchRef.current && searchRef.current?.focus?.();
      },
      [handleChange, onClear],
    );

    const handleClick = () => {
      onSearchClick?.(`${value ?? internalValue}`);
    };

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        onKeyDown={(e) => {
          if (e.key !== "Escape") {
            return;
          }
          searchRef.current?.value &&
            searchRef.current?.value !== "" &&
            e.preventDefault();

          handleClear({ trigger: "Escape", event: e });
        }}
        className={cl(
          className,
          "navds-form-field",
          `navds-form-field--${size}`,
          "navds-search",

          {
            "navds-search--error": hasError,
            "navds-search--disabled": !!inputProps.disabled,
            "navds-search--with-size": !!htmlSize,
          },
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
            className={cl("navds-form-field__description", {
              "navds-sr-only": hideLabel,
            })}
            id={inputDescriptionId}
            size={size}
            as="div"
          >
            {description}
          </BodyShort>
        )}
        <div className="navds-search__wrapper">
          <div className="navds-search__wrapper-inner">
            {variant === "simple" && (
              <MagnifyingGlassIcon
                aria-hidden
                className="navds-search__search-icon"
              />
            )}
            <input
              ref={mergedRef}
              {...omit(rest, ["error", "errorId", "size", "readOnly"])}
              {...inputProps}
              value={value ?? internalValue}
              onChange={(e) => handleChange(e.target.value)}
              type="search"
              role={role ?? "searchbox"}
              className={cl(
                className,
                "navds-search__input",
                `navds-search__input--${variant}`,
                "navds-text-field__input",
                "navds-body-short",
                `navds-body-short--${size}`,
              )}
              {...(htmlSize ? { size: Number(htmlSize) } : {})}
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
                <XMarkIcon aria-hidden />
              </button>
            )}
          </div>
          <SearchContext.Provider
            value={{
              size,
              disabled: inputProps.disabled,
              variant,
              handleClick,
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
  },
) as SearchComponent;

Search.Button = SearchButton;

export default Search;
