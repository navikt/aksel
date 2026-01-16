import { Dispatch, SetStateAction } from "react";
import { createStrictContext } from "../create-strict-context";
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

export const {
  Provider: VirtualFocusInternalContextProvider,
  useContext: useVirtualFocusInternalContext,
} = createStrictContext<{
  virtualFocusIdx: number;
  setVirtualFocusIdx: Dispatch<SetStateAction<number>>;
  loop: boolean;
  uniqueId: string;
}>({
  name: "VirtualFocusInternalContext",
});
