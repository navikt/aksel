import { Dispatch, SetStateAction } from "react";
import { createContext } from "../create-context";
import { createDescendantContext } from "../hooks/descendants/useDescendant";
import { SlottedDivElementRef } from "./SlottedDivElement";

export const [
  VirtualFocusDescendantsProvider,
  useVirtualFocusDescendantsContext,
  useVirtualFocusDescendantInitializer,
  useVirtualFocusDescendant,
] = createDescendantContext<
  SlottedDivElementRef,
  {
    handleOnSelect: () => void;
    handleOnActive: () => void;
  }
>();

export const [
  VirtualFocusInternalContextProvider,
  useVirtualFocusInternalContext,
] = createContext<{
  virtualFocusIdx: number;
  setVirtualFocusIdx: Dispatch<SetStateAction<number>>;
  loop: boolean;
  uniqueId: string;
}>();
