/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {
  InputHTMLAttributes,
  forwardRef,
  useRef,
  useState,
} from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@navikt/aksel-icons";
import type { AkselStatusColorRole } from "@navikt/ds-tokens/types";
import { Button } from "../../button";
import { AkselColor } from "../../types";
import { BodyShort, ErrorMessage, Label } from "../../typography";
import { omit } from "../../utils-external";
import { cl } from "../../utils/helpers";
import { useMergeRefs } from "../../utils/hooks";
import { useI18n } from "../../utils/i18n/i18n.hooks";
import { FormFieldProps, useFormField } from "../useFormField";
import SearchButton, { SearchButtonType } from "./SearchButton";
import { SearchContext } from "./context";

export type SearchNativeProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size" | "onChange" | "type"
>;

export type SearchClearEvent =
  | {
      trigger: "Click";
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>;
    }
  | { trigger: "Escape"; event: React.KeyboardEvent<HTMLDivElement> };

export interface SearchProps
  extends Omit<FormFieldProps, "readOnly">, SearchNativeProps {
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
   * @default "Tøm feltet"
   * @deprecated Use `<Provider />`-component
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
   * HTML size attribute. Specifies the width of the input, in characters.
   */
  htmlSize?: number | string;
  /**
   * @private
   */
  "data-color"?: Exclude<AkselColor, AkselStatusColorRole>;
}

interface SearchComponent extends React.ForwardRefExoticComponent<
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
 *   <Search label="Søk i alle Nav sine sider" variant="primary" />
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
      "data-color": dataColor,
      ...rest
    } = props;

    const searchRef = useRef<HTMLInputElement | null>(null);
    const mergedRef = useMergeRefs(searchRef, ref);

    const [internalValue, setInternalValue] = useState(defaultValue ?? "");

    const handleChange = (newValue: string) => {
      value === undefined && setInternalValue(newValue);
      onChange?.(newValue);
    };

    const handleClear = (clearEvent: SearchClearEvent) => {
      onClear?.(clearEvent);
      handleChange("");
      searchRef.current?.focus?.();
    };

    const handleClick = () => {
      onSearchClick?.(`${value ?? internalValue}`);
    };

    const showClearButton =
      clearButton && !inputProps.disabled && (value ?? internalValue);

    return (
      // biome-ignore lint/a11y/noStaticElementInteractions: Escape key handler for clearing input
      <div
        onKeyDown={(event) => {
          if (event.key !== "Escape") {
            return;
          }
          searchRef.current?.value && event.preventDefault();
          handleClear({ trigger: "Escape", event });
        }}
        className={cl(
          className,
          "aksel-form-field",
          `aksel-form-field--${size}`,
          "aksel-search",
          {
            "aksel-search--error": hasError,
            "aksel-search--disabled": inputProps.disabled,
            "aksel-search--with-size": htmlSize,
          },
        )}
        data-color={dataColor}
      >
        <Label
          htmlFor={inputProps.id}
          size={size}
          className={cl("aksel-form-field__label", {
            "aksel-sr-only": hideLabel,
          })}
        >
          {label}
        </Label>
        {!!description && (
          <BodyShort
            className={cl("aksel-form-field__description", {
              "aksel-sr-only": hideLabel,
            })}
            id={inputDescriptionId}
            size={size}
            as="div"
          >
            {description}
          </BodyShort>
        )}
        <div className="aksel-search__wrapper">
          <div className="aksel-search__wrapper-inner">
            {variant === "simple" && (
              <MagnifyingGlassIcon
                aria-hidden
                className="aksel-search__search-icon"
              />
            )}
            <input
              ref={mergedRef}
              {...omit(rest, ["error", "errorId", "size", "readOnly"])}
              {...inputProps}
              value={value ?? internalValue}
              onChange={(e) => handleChange(e.target.value)}
              type="search"
              className={cl(
                className,
                "aksel-search__input",
                `aksel-search__input--${variant}`,
                "aksel-text-field__input",
                "aksel-body-short",
                `aksel-body-short--${size}`,
              )}
              {...(htmlSize ? { size: Number(htmlSize) } : {})}
            />
            {showClearButton && (
              <ClearButton
                handleClear={handleClear}
                size={size}
                clearButtonLabel={clearButtonLabel}
              />
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
            {children
              ? children
              : variant !== "simple" && <SearchButton data-color={dataColor} />}
          </SearchContext.Provider>
        </div>
        <div
          className="aksel-form-field__error"
          id={errorId}
          aria-relevant="additions removals"
          aria-live="polite"
        >
          {showErrorMsg && (
            <ErrorMessage size={size} showIcon>
              {props.error}
            </ErrorMessage>
          )}
        </div>
      </div>
    );
  },
) as SearchComponent;

type SearchClearButtonProps = Pick<SearchProps, "size" | "clearButtonLabel"> & {
  handleClear: (clearEvent: SearchClearEvent) => void;
};

function ClearButton({
  size,
  clearButtonLabel,
  handleClear,
}: SearchClearButtonProps) {
  const translate = useI18n("Search");

  return (
    <Button
      className="aksel-search__button-clear"
      variant="tertiary"
      data-color="neutral"
      size={size === "medium" ? "small" : "xsmall"}
      icon={<XMarkIcon aria-hidden />}
      title={clearButtonLabel || translate("clear")}
      onClick={(event) => handleClear({ trigger: "Click", event })}
      type="button"
    />
  );
}

Search.Button = SearchButton;

export default Search;
