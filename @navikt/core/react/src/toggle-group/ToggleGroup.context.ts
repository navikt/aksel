import { createContext as ReactCreateContext } from "react";
import { createContext } from "../util/create-context";
import { createDescendantContext } from "../util/hooks/descendants/useDescendant";
import { ToggleGroupProps } from "./ToggleGroup.types";
import { useToggleGroup } from "./useToggleGroup";

interface ToggleContextProps {
  size: "medium" | "small";
}

export const ToggleGroupContext = ReactCreateContext<ToggleContextProps | null>(
  null,
);

export const [
  ToggleGroupDescendantsProvider,
  useToggleGroupDescendantsContext,
  useToggleGroupDescendants,
  useToggleGroupDescendant,
] = createDescendantContext<HTMLButtonElement, { value: string }>();

type ToggleGroupProviderProps = ReturnType<typeof useToggleGroup> &
  Pick<ToggleGroupProps, "size">;

/* State context */
export const [ToggleGroupProvider, useToggleGroupContext] =
  createContext<ToggleGroupProviderProps>({
    name: "ToggleGroupContext",
    hookName: "useToggleGroupContext",
    providerName: "ToggleGroupProvider",
    errorMessage: "<ToggleGroup.Item> needs to be wrapped within <ToggleGroup>",
  });
