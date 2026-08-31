import React from "react";
import { BodyShort } from "../../typography";
import { omit } from "../../utils-external";
import { cl } from "../../utils/helpers";
import { useFormField } from "../useFormField";
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
> extends Omit<ComboboxRootProps<T>, "children"> {
  label: string;
  description?: string;
  hideLabel?: boolean;
  readOnly?: boolean;
  //name?: string; // TODO: rendre hidden input med valgt(e) verdi(er) hvis satt.
} // TODO: trolig extend FormFieldProps
// TODO: extend React.HTMLAttributes<HTMLDivElement>

function Combobox<
  T extends ComboboxOptionData | ComboboxGroupData<ComboboxOptionData>,
>({
  label,
  hideLabel,
  description,
  size: sizeProp,
  readOnly: readOnlyProp,
  ...rest
}: ComboboxProps<T>) {
  const {
    inputProps,
    //errorId,
    //showErrorMsg,
    //hasError,
    size,
    inputDescriptionId,
    readOnly,
  } = useFormField(
    {
      description,
      //disabled,
      //error,
      //errorId,
      //id: rest.triggerId,
      readOnly: readOnlyProp,
      size: sizeProp,
    },
    "combobox",
  );

  // TODO: Kunne være ukontrollert?
  // TODO: Vurder å koble opp label her, slik at vi slipper å ha triggerId prop i ComboboxRoot.

  return (
    <ComboboxRoot size={size} triggerId={inputProps.id} {...rest}>
      <ComboboxLabel hide={hideLabel} readOnly={readOnly}>
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
      <ComboboxTrigger readOnly={readOnly} {...omit(inputProps, ["id"])}>
        <ComboboxField />
      </ComboboxTrigger>
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
