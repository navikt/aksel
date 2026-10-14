import { createStrictContext } from "../../../helpers";

export const { Provider: ListboxProvider, useContext: useListboxContext } =
  createStrictContext<{
    /**
     * Unique ID for the Listbox instance. Used as prefix for the IDs of the options,
     * which in turn are referenced in `aria-activedescendant` in InputSlot.
     */
    optionIdPrefix: string;
    /**
     * Updates which option currently has virtual focus.
     */
    setVirtuallyFocusedOptionId: (value: string) => void;
    /**
     * @default "medium"
     */
    size: "small" | "medium";
  }>({
    name: "Listbox",
  });
