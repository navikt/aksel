import { createContext as ReactCreateContext } from "react";
import { createStrictContext } from "../utils/helpers";
import type { ToggleGroupProps } from "./ToggleGroup.types";
import type { useToggleGroup } from "./useToggleGroup";

interface ToggleContextProps {
  size: "medium" | "small";
}

export const ToggleGroupContext = ReactCreateContext<ToggleContextProps | null>(
  null,
);
type ToggleGroupProviderProps = ReturnType<typeof useToggleGroup> &
  Pick<ToggleGroupProps, "size">;

/* State context */
export const {
  Provider: ToggleGroupProvider,
  useContext: useToggleGroupContext,
} = createStrictContext<ToggleGroupProviderProps>({
  name: "ToggleGroupContext",
  errorMessage: "<ToggleGroup.Item> needs to be wrapped within <ToggleGroup>",
});
