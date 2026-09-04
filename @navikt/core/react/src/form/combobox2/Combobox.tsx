import React from "react";
import { BodyShort, ErrorMessage } from "../../typography";
import { cl } from "../../utils/helpers";
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
  label: string;
  hideLabel?: boolean;
  //name?: string; // TODO: rendre hidden input med valgt(e) verdi(er) hvis satt.
}
// TODO: extend React.HTMLAttributes<HTMLDivElement>

function Combobox<
  T extends ComboboxOptionData | ComboboxGroupData<ComboboxOptionData>,
>({
  label,
  hideLabel,
  size: sizeProp,
  error,
  errorId: errorIdProp,
  disabled: disabledProp,
  description,
  id,
  readOnly: readOnlyProp,
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

  // TODO: Kunne være ukontrollert?
  // TODO: Vurder om Label og Description (og error?) skal være sub-komponenter eller ikke.

  return (
    <ComboboxRoot size={size} disabled={inputProps.disabled} {...rest}>
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

      <ComboboxOverlay>
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
