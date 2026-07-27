import { createStrictContext } from "../../../helpers";

export const { Provider: ListboxProvider, useContext: useListboxContext } =
  createStrictContext<{
    /**
     * ID for the option that currently has virtual focus.
     * Set on the active option and referenced by the combobox's `aria-activedescendant`.
     */
    activeId: string;
    /**
     * Updates which option currently has virtual focus.
     */
    setVirtuallyFocusedOptionId: (value: string) => void;
  }>({
    name: "Listbox",
  });
