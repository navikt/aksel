import { createContext } from "../util/create-context";
import { createDescendantContext } from "../util/hooks/descendants/useDescendant";
import { ListboxBaseProps } from "./Listbox.types";

export const [ListboxContextProvider, useListboxContext] =
  createContext<ListboxBaseProps>({
    hookName: "useListboxContext",
    providerName: "ListboxContextProvider",
    name: "ListboxContext",
  });

export const [
  ListboxDescendantsProvider,
  _,
  useListboxDescendants,
  useListboxDescendant,
] = createDescendantContext<HTMLDivElement>();

export interface ListboxImplContextProps {
  focusedId: string | null;
  selectOption: (id: string) => void;
}

export const [ListboxImlpContextProvider, useListboxImplContext] =
  createContext<ListboxImplContextProps>({
    hookName: "useListboxImplContext",
    providerName: "ListboxImlpContextProvider",
    name: "ListboxImplContext",
  });
