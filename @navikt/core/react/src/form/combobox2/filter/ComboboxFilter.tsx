import React from "react";
import { Listbox } from "../../../utils/components/Listbox/root/ListboxRoot";
import { useI18n } from "../../../utils/i18n/i18n.hooks";
import { Search } from "../../search";
import { useComboboxPopupContext } from "../popup/ComboboxPopup";
import { useComboboxRootContext } from "../root/ComboboxRoot";

type ComboboxFilterProps = Pick<
  React.ComponentProps<typeof Search>,
  "value" | "onChange"
>;

export const ComboboxFilter = (props: ComboboxFilterProps) => {
  const translate = useI18n("Combobox2");
  const { size } = useComboboxRootContext();
  const {
    filterString,
    setFilterString,
    virtuallyFocusedOptionValue,
    setVirtuallyFocusedOptionValue,
  } = useComboboxPopupContext();

  return (
    <div className="aksel-combobox2__filter">
      <Listbox.InputSlot virtuallyFocusedOptionId={virtuallyFocusedOptionValue}>
        <Search
          value={filterString}
          onChange={setFilterString}
          size={size}
          {...props}
          label={translate("filter")}
          hideLabel
          variant="simple"
          onKeyUp={(event) => {
            if (["ArrowUp", "ArrowDown"].includes(event.key)) {
              event.preventDefault(); // Prevents navigation with screen reader
            }
          }}
          onKeyDown={(event) => {
            if (["ArrowLeft", "ArrowRight"].includes(event.key)) {
              setVirtuallyFocusedOptionValue("");
            }
          }}
          aria-autocomplete="list"
          inputMode="text"
        />
      </Listbox.InputSlot>
    </div>
  );
};
