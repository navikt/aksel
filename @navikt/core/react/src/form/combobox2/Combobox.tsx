import React from "react";
import { BodyShort } from "../../typography";
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
  hideLabel?: boolean;
  description?: string;
  //name?: string; // TODO: rendre hidden input med valgt(e) verdi(er) hvis satt.
}

function Combobox<
  T extends ComboboxOptionData | ComboboxGroupData<ComboboxOptionData>,
>({ label, hideLabel, description, ...rest }: ComboboxProps<T>) {
  const {
    //inputProps,
    //errorId,
    //showErrorMsg,
    //hasError,
    //size,
    inputDescriptionId,
    //readOnly,
  } = useFormField(
    {
      description,
      //disabled,
      //error,
      //errorId,
      //id: rest.triggerId,
      //readOnly,
      //size,
    },
    "combobox",
  );

  // TODO: hideLabel
  // TODO: Kunne være ukontrollert?

  return (
    <ComboboxRoot {...rest}>
      <ComboboxLabel>{label}</ComboboxLabel>
      {!!description && (
        <BodyShort
          className={cl("aksel-form-field__description", {
            "aksel-sr-only": hideLabel,
          })}
          id={inputDescriptionId}
          //size={size}
          as="div"
        >
          {description}
        </BodyShort>
      )}
      <ComboboxTrigger>
        <ComboboxField aria-describedby={inputDescriptionId} />
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
