import { createContext } from "../../util/create-context";
import { ComboboxProps } from "./Combobox.types";

export const [ComboboxPropsContextProvider, useComboboxPropsContext] =
  createContext<ComboboxProps>({
    name: "ComboboxPropsContext",
    hookName: "useComboboxPropsContext",
    providerName: "ComboboxPropsProvider",
  });
