import React from "react";
import { Listbox } from "../../../utils/components/Listbox/root/ListboxRoot";
import { Search } from "../../search";
import { useComboboxPopupContext } from "../popup/ComboboxPopup";
import { useComboboxRootContext } from "../root/ComboboxRoot";

type ComboboxFilterProps = Pick<
  React.ComponentProps<typeof Search>,
  "value" | "onChange"
>;

export const ComboboxFilter = (props: ComboboxFilterProps) => {
  const { size } = useComboboxRootContext();
  const { filterString, setFilterString } = useComboboxPopupContext();

  return (
    <div className="aksel-combobox2__filter">
      <Listbox.InputSlot>
        <Search
          value={filterString}
          onChange={setFilterString}
          size={size}
          {...props}
          label="Filtrer"
          hideLabel
          variant="simple"
          onKeyUp={(event) => {
            if (["ArrowUp", "ArrowDown"].includes(event.key)) {
              event.preventDefault(); // Prevents navigation with screen reader
            }
          }}
          aria-autocomplete="list"
        />
      </Listbox.InputSlot>
    </div>
  );
};
