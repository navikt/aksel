import { createContext } from "../../../util/create-context";
import { GraceIntent } from "../../Menu.types";

type MenuContentContextValue = {
  onItemEnter(event: React.PointerEvent): void;
  onItemLeave(event: React.PointerEvent): void;
  onTriggerLeave(event: React.PointerEvent): void;
  pointerGraceTimerRef: React.MutableRefObject<number>;
  onPointerGraceIntentChange(intent: GraceIntent | null): void;
};

export const [MenuContentProvider, useMenuContentContext] =
  createContext<MenuContentContextValue>({
    providerName: "MenuContentProvider",
    hookName: "useMenuContentContext",
  });
