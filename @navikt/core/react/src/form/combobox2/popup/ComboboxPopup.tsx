import React, { useEffect, useRef, useState } from "react";
import { Listbox } from "../../../utils/components/Listbox/root/ListboxRoot";
import { createStrictContext } from "../../../utils/helpers";
import { useComboboxRootContext } from "../root/ComboboxRoot";

interface ComboboxPopupContextProps {
  virtuallyFocusedOptionValue: string;
  filterString: string;
  setFilterString: (value: string) => void;
}

export const {
  Provider: ComboboxPopupContextProvider,
  useContext: useComboboxPopupContext,
} = createStrictContext<ComboboxPopupContextProps>({
  name: "ComboboxPopupContext",
  errorMessage: "The component must be used within <Combobox.Popup>",
});

export interface ComboboxPopupProps {
  children: React.ReactNode;
}

export const ComboboxPopup = ({ children }: ComboboxPopupProps) => {
  const [virtuallyFocusedOptionValue, setVirtuallyFocusedOptionValue] =
    useState("");
  const [filterString, setFilterString] = useState("");

  const rootContext = useComboboxRootContext();

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(
    function onOpen() {
      // Virtually focus and scroll to first (selected) option
      const selectedOptionElm = ref.current?.querySelector<HTMLElement>(
        '[aria-selected="true"]',
      );
      if (selectedOptionElm) {
        setVirtuallyFocusedOptionValue(selectedOptionElm.dataset.id || "");
        setTimeout(
          () => selectedOptionElm.scrollIntoView({ block: "nearest" }),
          0,
        );
      } else {
        const firstOptionElm =
          ref.current?.querySelector<HTMLElement>('[role="option"]');
        if (firstOptionElm) {
          setVirtuallyFocusedOptionValue(firstOptionElm.dataset.id || "");
        }
      }

      // Autofocus
      if (!rootContext.triggerRef.current) {
        return; // Assume we don't need to autofocus if there's no trigger
      }
      const inputElm = ref.current?.querySelector<HTMLInputElement>("input");
      if (inputElm) {
        inputElm.focus();
        return;
      }
      const listElm =
        ref.current?.querySelector<HTMLElement>('[role="listbox"]');
      if (listElm) {
        listElm.focus();
        // TODO: For at ting skal funke som det skal med skjermleser, må vi kanskje beholde fokus på knappen.
      }
    },
    [rootContext.triggerRef],
  );

  return (
    <Listbox
      ref={ref}
      className="aksel-combobox2__popup"
      setVirtuallyFocusedOptionId={setVirtuallyFocusedOptionValue}
      size={rootContext.size}
    >
      <ComboboxPopupContextProvider
        virtuallyFocusedOptionValue={virtuallyFocusedOptionValue}
        filterString={filterString}
        setFilterString={setFilterString}
      >
        {children}
      </ComboboxPopupContextProvider>
    </Listbox>
  );
};
