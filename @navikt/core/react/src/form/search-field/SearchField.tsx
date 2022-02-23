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
import { useSearchField } from "./useSearchField";

export type clearEventT =
  | {
      trigger: "Click";
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>;
    }
  | { trigger: "Escape"; event: React.KeyboardEvent<HTMLDivElement> };

export interface SearchFieldProps
  extends Omit<FormFieldProps, "error" | "errorId">,
    Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
  children: React.ReactNode;
  /**
   * SearchField label
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
   * Callback for <SearchField.Button/> click with current input-value
   */
  onSearch?: (value: string | number | readonly string[]) => void;
  /**
   * Callback for click on clear-button or Escape keydown
   */
  onClear?: (e: clearEventT) => void;
  /**
   * aria-label on clear button
   * @default "Slett tekst i felt"
   */
  clearButtonLabel?: string;
  /**
   * If false, removes clear-button option from input.
   * @default true
   */
  clearButton?: boolean;
}

interface SearchFieldComponent
  extends React.ForwardRefExoticComponent<
    SearchFieldProps & React.RefAttributes<HTMLDivElement>
  > {
  Button: SearchButtonType;
}

export interface SearchFieldContextProps {
  disabled?: boolean;
  size: "medium" | "small";
  onSearch: () => void;
}

export const SearchFieldContext = React.createContext<SearchFieldContextProps | null>(
  null
);

const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  (props, ref) => {
    const { inputProps, size = "medium", inputDescriptionId } = useSearchField(
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
      (event: clearEventT) => {
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

    if (!children) {
      console.error(
        "<SearchField/> is required to have a <SearchField.Button/> child"
      );
      return null;
    }

    return (
      <form
        role="search"
        ref={setWrapperRef}
        className={cl(
          className,
          "navds-form-field",
          `navds-form-field--${size}`,
          "navds-search-field",
          {
            "navds-search-field--disabled": !!inputProps.disabled,
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
        <div className="navds-search-field--relative-flex">
          <div className="navds-search-field--relative-flex">
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
                "navds-search-field__input",
                "navds-text-field__input",
                "navds-body-short",
                `navds-body-${size ?? "medium"}`
              )}
            />
            {controlledValue && clearButton && (
              <button
                type="button"
                onClick={(e) => handleClear({ trigger: "Click", event: e })}
                className="navds-search-field__clear-button"
              >
                <span className="navds-sr-only">
                  {clearButtonLabel ? clearButtonLabel : "Tøm"}
                </span>
                <Close aria-hidden />
              </button>
            )}
          </div>
          <SearchFieldContext.Provider
            value={{
              size,
              disabled: inputProps.disabled,
              onSearch: () => onSearch?.(controlledValue),
            }}
          >
            {children}
          </SearchFieldContext.Provider>
        </div>
      </form>
    );
  }
) as SearchFieldComponent;

SearchField.Button = SearchButton;

export default SearchField;
