import { Close, Search } from "@navikt/ds-icons";
import cl from "classnames";
import React, {
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { BodyShort, Label, omit } from "../..";
import { FormFieldProps, useFormField } from "../useFormField";
import mergeRefs from "react-merge-refs";

export interface SearchFieldProps
  extends FormFieldProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * If enabled shows the label and description for screenreaders only
   */
  hideLabel?: boolean;
  /**
   * SearchField label
   */
  label: React.ReactNode;
  /**
   * Inverts color theme
   * @default false
   */
  inverted?: boolean;
  /**
   * Customize aria-label on clear button
   * @default "Slett tekst i felt"
   */
  clearButtonLabel?: string;
  /**
   *
   */
  onClear?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  (props, ref) => {
    const { inputProps, size, inputDescriptionId } = useFormField(
      props,
      "searchfield"
    );

    const {
      className,
      hideLabel,
      label,
      description,
      value,
      clearButtonLabel,
      onClear,
      inverted = false,
      ...rest
    } = props;

    const [controlledValue, setControlledValue] = useState(value ?? "");
    const searchRef = useRef<HTMLInputElement | null>(null);
    const mergedRef = mergeRefs([searchRef, ref]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setControlledValue(e.target.value);
      props?.onChange?.(e);
    };

    useEffect(() => {
      value !== undefined && setControlledValue(value);
    }, [value]);

    const handleClear = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      if (searchRef.current && value === undefined) {
        searchRef.current.value = "";
        setControlledValue("");
        searchRef.current.dispatchEvent(new Event("change"));
      }
      onClear?.(e);
    };

    return (
      <div
        className={cl(
          className,
          "navds-form-field",
          `navds-form-field--${size ?? "medium"}`,
          "navds-search-field",
          {
            "navds-search-field--disabled": !!inputProps.disabled,
            "navds-search-field--inverted": inverted,
          }
        )}
      >
        <Label
          htmlFor={inputProps.id}
          size={size}
          as="label"
          className={cl("navds-text-field__label", {
            "sr-only": hideLabel,
          })}
        >
          {label}
        </Label>
        {!!description && (
          <BodyShort
            as="div"
            className={cl("navds-text-field__description", {
              "sr-only": hideLabel,
            })}
            id={inputDescriptionId}
            size={size}
          >
            {description}
          </BodyShort>
        )}
        <div
          data-value={!!controlledValue}
          className="navds-search-field__input-wrapper"
        >
          <span className="navds-search-field__input-icon">
            <Search aria-hidden />
          </span>
          <input
            ref={mergedRef}
            {...omit(rest, ["error", "errorId", "size"])}
            {...inputProps}
            value={value}
            onChange={(e) => handleChange(e)}
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
          {controlledValue && (
            <button
              onClick={(e) => handleClear(e)}
              className="navds-search-field__clear-button"
            >
              <span className="navds-sr-only">
                {clearButtonLabel ? clearButtonLabel : "Slett tekst i felt"}
              </span>
              <Close aria-hidden />
            </button>
          )}
        </div>
      </div>
    );
  }
);

export default SearchField;
