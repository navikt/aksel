import React from "react";
import { Dialog } from "../../dialog";
import { BodyShort, ErrorMessage } from "../../typography";
import { cl } from "../../utils/helpers";
import { useControllableState } from "../../utils/hooks";
import { type FormFieldProps, useFormField } from "../useFormField";
import { ComboboxField } from "./field/ComboboxField";
import { ComboboxFilter } from "./filter/ComboboxFilter";
import { ComboboxLabel } from "./label/ComboboxLabel";
import { ComboboxList } from "./list/ComboboxList";
import { ComboboxOverlay } from "./overlay/ComboboxOverlay";
import { ComboboxPopup } from "./popup/ComboboxPopup";
import type {
  ComboboxGroupData,
  ComboboxOptionData,
  ComboboxRootProps,
} from "./root/ComboboxRoot";
import { ComboboxRoot } from "./root/ComboboxRoot";
import { ComboboxTrigger } from "./trigger/ComboboxTrigger";

interface ComboboxProps<
  T extends ComboboxOptionData | ComboboxGroupData<ComboboxOptionData>,
>
  extends
    Omit<
      ComboboxRootProps<T>,
      "children" | "selectedOptions" | "onToggleOption"
    >,
    Partial<Pick<ComboboxRootProps<T>, "selectedOptions" | "onToggleOption">>,
    Omit<FormFieldProps, "size"> {
  label: string;
  hideLabel?: boolean;
  name?: string;
  defaultSelectedOptions?: ComboboxRootProps<T>["selectedOptions"];
  onSelectedOptionsChange?: (
    newSelectedOptions: ComboboxRootProps<T>["selectedOptions"],
  ) => void;
}

function Combobox<
  T extends ComboboxOptionData | ComboboxGroupData<ComboboxOptionData>,
>({
  label,
  hideLabel,
  name,
  defaultSelectedOptions,
  onSelectedOptionsChange,
  size: sizeProp,
  error,
  errorId: errorIdProp,
  disabled: disabledProp,
  description,
  id,
  readOnly: readOnlyProp,
  multiselect = false, // Default value should be synced with ComboboxRoot
  selectedOptions: selectedOptionsProp,
  onToggleOption: onToggleOptionProp,
  ...rest
}: ComboboxProps<T>) {
  const {
    inputProps,
    errorId,
    showErrorMsg,
    hasError,
    size,
    inputDescriptionId,
    readOnly,
  } = useFormField(
    {
      description,
      disabled: disabledProp,
      error,
      errorId: errorIdProp,
      id,
      readOnly: readOnlyProp,
      size: sizeProp,
    },
    "combobox",
  );

  const [selectedOptions, setSelectedOptions] = useControllableState({
    defaultValue: defaultSelectedOptions || [],
    value: selectedOptionsProp,
    onChange: onSelectedOptionsChange,
  });

  const onToggleOption: ComboboxRootProps<T>["onToggleOption"] = (
    option,
    isSelected,
  ) => {
    onToggleOptionProp?.(option, isSelected);
    setSelectedOptions((prevSelectedOptions) => {
      if (!multiselect) {
        return [option.value];
      }
      if (isSelected) {
        return [...prevSelectedOptions, option.value];
      }
      return prevSelectedOptions.filter((value) => value !== option.value);
    });
  };

  return (
    <ComboboxRoot
      size={size}
      disabled={inputProps.disabled}
      multiselect={multiselect}
      selectedOptions={selectedOptions}
      onToggleOption={onToggleOption}
      {...rest}
    >
      <ComboboxLabel
        htmlFor={inputProps.id}
        hide={hideLabel}
        readOnly={readOnly}
      >
        {label}
      </ComboboxLabel>
      {!!description && (
        <BodyShort
          className={cl(
            "aksel-form-field__description aksel-combobox2__description",
            { "aksel-sr-only": hideLabel },
          )}
          id={inputDescriptionId}
          size={size}
          as="div"
        >
          {description}
        </BodyShort>
      )}
      <ComboboxTrigger readOnly={readOnly} {...inputProps}>
        <ComboboxField hasError={hasError} />
      </ComboboxTrigger>
      <div
        className="aksel-form-field__error aksel-combobox2__error"
        id={errorId}
        aria-relevant="additions removals"
        aria-live="polite"
      >
        {showErrorMsg && (
          <ErrorMessage size={size} showIcon>
            {error}
          </ErrorMessage>
        )}
      </div>

      {name &&
        selectedOptions.map((value) => (
          <input key={value} type="hidden" name={name} value={value} />
        ))}

      <ComboboxOverlay
        mobileHeader={
          <Dialog.Header>
            <Dialog.Title>{label}</Dialog.Title>
            {!!description && (
              <Dialog.Description>{description}</Dialog.Description>
            )}
          </Dialog.Header>
        }
      >
        <ComboboxPopup>
          <ComboboxFilter />
          <ComboboxList />
        </ComboboxPopup>
      </ComboboxOverlay>
    </ComboboxRoot>
  );
}

export { Combobox };
export type { ComboboxProps };
