import { Close, Search } from "@navikt/ds-icons";
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
import { useSearchField } from "./useSearchField";

export interface SearchFieldProps
  extends Omit<FormFieldProps, "error" | "errorId">,
    Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
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
   * Callback for when user manually clears input with button or Escape
   */
  onClear?: (e: clearEventT) => void;
  /**
   * Callback for value in input after change
   */
  onChange?: (value: string) => void;
  /**
   * Toggles display of "clear"-button when there is text in field
   */
  clearButton?: boolean;
}

type clearEventT =
  | {
      trigger: "Click";
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>;
    }
  | { trigger: "Escape"; event: React.KeyboardEvent<HTMLDivElement> };

const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  (props, ref) => {
    const { inputProps, size, inputDescriptionId } = useSearchField(
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
      clearButton = true,
      ...rest
    } = props;

    const [controlledValue, setControlledValue] = useState(value ?? "");
    const searchRef = useRef<HTMLInputElement | null>(null);
    const mergedRef = mergeRefs([searchRef, ref]);
    const [wrapperRef, setWrapperRef] = useState<HTMLDivElement | null>(null);

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

    return (
      <div
        ref={setWrapperRef}
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
        <div
          data-value={!!controlledValue}
          className="navds-search-field__input-wrapper"
        >
          <span className="navds-search-field__input-icon">
            <Search aria-hidden />
          </span>
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
              onClick={(e) => handleClear({ trigger: "Click", event: e })}
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
