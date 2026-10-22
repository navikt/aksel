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
  extends Omit<ComboboxRootProps<T>, "children">, Omit<FormFieldProps, "size"> {
  /**
   * Label
   */
  label: string;
  /**
   * Hides the label and description visually while keeping them available to screen readers.
   */
  hideLabel?: boolean;
  /**
   * Field name. When provided, the field value will be included in form submissions.
   */
  name?: string;
}

function Combobox<
  T extends ComboboxOptionData | ComboboxGroupData<ComboboxOptionData>,
>({
  label,
  hideLabel,
  name,
  size: sizeProp,
  error,
  errorId: errorIdProp,
  disabled: disabledProp,
  description,
  id,
  readOnly: readOnlyProp,
  multiple,
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

  return (
    <ComboboxRoot
      size={size}
      disabled={inputProps.disabled}
      multiple={multiple}
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
        rest.value.map((val) => (
          <input key={val} type="hidden" name={name} value={val} />
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

// ----------- ComboboxSingle ----------- //

interface ComboboxSingleProps<
  T extends ComboboxOptionData | ComboboxGroupData<ComboboxOptionData>,
> extends Omit<ComboboxProps<T>, "multiple" | "value" | "onToggleOption"> {
  /**
   * Called when selected option changes.
   */
  onChange?: (
    newValue: NonNullable<ComboboxProps<T>["value"]>[number] | undefined,
  ) => void;
  /**
   * Value of the selected option.
   */
  value?: NonNullable<ComboboxProps<T>["value"]>[number];
  /**
   * Initial value when uncontrolled.
   */
  defaultValue?: NonNullable<ComboboxProps<T>["value"]>[number];
}

function ComboboxSingle<
  T extends ComboboxOptionData | ComboboxGroupData<ComboboxOptionData>,
>({ onChange, value, defaultValue, ...rest }: ComboboxSingleProps<T>) {
  const [localValue, setLocalValue] = useControllableState({
    defaultValue,
    value,
    onChange,
  });

  const onToggleOption: ComboboxProps<T>["onToggleOption"] = (
    option,
    isSelected,
  ) => {
    setLocalValue(isSelected ? option.value : undefined);
  }; // TODO: Dumt at ikke får hele option-objektet... Legge til i onChange? Hvis vi tilbyr onToggle så blir det så likt onChange...

  return (
    <Combobox
      {...rest}
      value={localValue ? [localValue] : []}
      defaultValue={defaultValue ? [defaultValue] : []}
      multiple={false}
      onToggleOption={onToggleOption}
    />
  );
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ComboboxSingle {
  export type Props<
    T extends ComboboxOptionData | ComboboxGroupData<ComboboxOptionData>,
  > = ComboboxSingleProps<T>;
}

// ----------- ComboboxMulti ----------- //

interface ComboboxMultiProps<
  T extends ComboboxOptionData | ComboboxGroupData<ComboboxOptionData>,
>
  extends
    Omit<ComboboxProps<T>, "multiple" | "value" | "onToggleOption">,
    Partial<Pick<ComboboxProps<T>, "onToggleOption">> {
  /**
   * Called when selected options change.
   */
  onChange?: (newValue: ComboboxProps<T>["value"]) => void;
  /**
   * Value of the selected options.
   */
  value?: ComboboxProps<T>["value"];
  /**
   * Initial value when uncontrolled.
   */
  defaultValue?: ComboboxProps<T>["value"];
}

function ComboboxMulti<
  T extends ComboboxOptionData | ComboboxGroupData<ComboboxOptionData>,
>({
  onChange,
  value,
  defaultValue,
  onToggleOption,
  ...rest
}: ComboboxMultiProps<T>) {
  const [localValue, setLocalValue] = useControllableState({
    defaultValue: defaultValue || [],
    value,
    onChange,
  });

  const localOnToggleOption: ComboboxProps<T>["onToggleOption"] = (
    option,
    isSelected,
  ) => {
    onToggleOption?.(option, isSelected);
    setLocalValue((prevSelectedOptions) =>
      isSelected
        ? [...prevSelectedOptions, option.value]
        : prevSelectedOptions.filter((optVal) => optVal !== option.value),
    );
  };

  return (
    <Combobox
      {...rest}
      value={localValue}
      defaultValue={defaultValue}
      multiple
      onToggleOption={localOnToggleOption}
    />
  );
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ComboboxMulti {
  export type Props<
    T extends ComboboxOptionData | ComboboxGroupData<ComboboxOptionData>,
  > = ComboboxMultiProps<T>;
}

export { ComboboxSingle, ComboboxMulti };
