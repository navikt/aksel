import React, { forwardRef } from "react";
import DismissableLayer from "../../../overlay/dismiss/DismissableLayer";
import Floating from "../../../overlays/floating/Floating";
import { composeEventHandlers } from "../../../util/composeEventHandlers";
import { useMergeRefs } from "../../../util/hooks";
import {
  useMenuContext,
  useMenuDescendantsContext,
  useMenuRootContext,
} from "../../Menu.context";
import { GraceIntent, SubMenuSide } from "../../Menu.types";
import {
  FIRST_LAST_KEYS,
  LAST_KEYS,
  getOpenState,
  isPointerInGraceArea,
  whenMouse,
} from "../../Menu.utils";
import { FocusScope } from "../util/FocusScope";
import { RowingFocus, RowingFocusProps } from "../util/RowingFocus";
import { MenuContentProvider } from "./Menu.context";

type MenuContentImplElement = React.ElementRef<typeof Floating.Content>;
type FocusScopeProps = React.ComponentPropsWithoutRef<typeof FocusScope>;
type DismissableLayerProps = React.ComponentPropsWithoutRef<
  typeof DismissableLayer
>;

type PopperContentProps = React.ComponentPropsWithoutRef<
  typeof Floating.Content
>;

type MenuContentImplPrivateProps = {
  onOpenAutoFocus?: FocusScopeProps["onMountAutoFocus"];
  onDismiss?: DismissableLayerProps["onDismiss"];
  disableOutsidePointerEvents?: DismissableLayerProps["disableOutsidePointerEvents"];
};

interface MenuContentImplProps
  extends MenuContentImplPrivateProps,
    Omit<PopperContentProps, "dir" | "onPlaced"> {
  /**
   * Event handler called when auto-focusing on close.
   * Can be prevented.
   */
  onCloseAutoFocus?: FocusScopeProps["onUnmountAutoFocus"];
  onEntryFocus?: RowingFocusProps["onEntryFocus"];
  onEscapeKeyDown?: DismissableLayerProps["onEscapeKeyDown"];
  onPointerDownOutside?: DismissableLayerProps["onPointerDownOutside"];
  onFocusOutside?: DismissableLayerProps["onFocusOutside"];
  onInteractOutside?: DismissableLayerProps["onInteractOutside"];
}

const MenuContentImpl = forwardRef<
  MenuContentImplElement,
  MenuContentImplProps
>((props: MenuContentImplProps, forwardedRef) => {
  const {
    onOpenAutoFocus,
    onCloseAutoFocus,
    disableOutsidePointerEvents,
    onEntryFocus,
    onEscapeKeyDown,
    onPointerDownOutside,
    onFocusOutside,
    onInteractOutside,
    onDismiss,
    ...contentProps
  } = props;

  const descendants = useMenuDescendantsContext();

  const context = useMenuContext();
  const rootContext = useMenuRootContext();

  const contentRef = React.useRef<HTMLDivElement>(null);
  const composedRefs = useMergeRefs(
    forwardedRef,
    contentRef,
    context.onContentChange,
  );
  const pointerGraceTimerRef = React.useRef(0);
  const pointerGraceIntentRef = React.useRef<GraceIntent | null>(null);
  const pointerDirRef = React.useRef<SubMenuSide>("right");
  const lastPointerXRef = React.useRef(0);

  // Make sure the whole tree has focus guards as our `MenuContent` may be
  // the last element in the DOM (beacuse of the `Portal`)
  /* TODO: Testing just not having guards */
  /* useFocusGuards(); */

  const isPointerMovingToSubmenu = React.useCallback(
    (event: React.PointerEvent) => {
      const isMovingTowards =
        pointerDirRef.current === pointerGraceIntentRef.current?.side;
      return (
        isMovingTowards &&
        isPointerInGraceArea(event, pointerGraceIntentRef.current?.area)
      );
    },
    [],
  );

  return (
    <MenuContentProvider
      onItemEnter={React.useCallback(
        (event) => {
          if (isPointerMovingToSubmenu(event)) event.preventDefault();
        },
        [isPointerMovingToSubmenu],
      )}
      onItemLeave={React.useCallback(
        (event) => {
          if (isPointerMovingToSubmenu(event)) return;
          contentRef.current?.focus();
        },
        [isPointerMovingToSubmenu],
      )}
      onTriggerLeave={React.useCallback(
        (event) => {
          if (isPointerMovingToSubmenu(event)) event.preventDefault();
        },
        [isPointerMovingToSubmenu],
      )}
      pointerGraceTimerRef={pointerGraceTimerRef}
      onPointerGraceIntentChange={React.useCallback((intent) => {
        pointerGraceIntentRef.current = intent;
      }, [])}
    >
      <FocusScope
        asChild
        onMountAutoFocus={composeEventHandlers(onOpenAutoFocus, (event) => {
          // when opening, explicitly focus the content area only and leave
          // `onEntryFocus` in  control of focusing first item
          event.preventDefault();

          console.log("onMountuatoFocus", contentRef.current);
          contentRef.current?.focus({ preventScroll: true });
        })}
        onUnmountAutoFocus={onCloseAutoFocus}
      >
        <DismissableLayer
          asChild
          disableOutsidePointerEvents={disableOutsidePointerEvents}
          onEscapeKeyDown={onEscapeKeyDown}
          onPointerDownOutside={onPointerDownOutside}
          onFocusOutside={onFocusOutside}
          onInteractOutside={onInteractOutside}
          onDismiss={onDismiss}
        >
          <RowingFocus
            asChild
            descendants={descendants}
            onEntryFocus={composeEventHandlers(onEntryFocus, (event) => {
              /* console.log("called entryfocus"); */
              // only focus first item when using keyboard
              if (!rootContext.isUsingKeyboardRef.current)
                event.preventDefault();
              /* console.log("prevent entryFocus"); */
            })}
          >
            <Floating.Content
              role="menu"
              aria-orientation="vertical"
              data-state={getOpenState(context.open)}
              data-radix-menu-content=""
              dir="ltr"
              {...contentProps}
              ref={composedRefs}
              style={{ outline: "none", ...contentProps.style }}
              onKeyDown={composeEventHandlers(
                contentProps.onKeyDown,
                (event) => {
                  /* console.log("content"); */
                  // submenu key events bubble through portals. We only care about keys in this menu.
                  const target = event.target as HTMLElement;
                  const isKeyDownInside =
                    target.closest("[data-radix-menu-content]") ===
                    event.currentTarget;
                  if (isKeyDownInside) {
                    // menus should not be navigated using tab key so we prevent it
                    if (event.key === "Tab") event.preventDefault();
                  }

                  // focus first/last item based on key pressed
                  const content = contentRef.current;
                  if (event.target !== content) return;
                  if (!FIRST_LAST_KEYS.includes(event.key)) return;
                  event.preventDefault();

                  console.log(descendants.values().map((x) => x.node));
                  if (LAST_KEYS.includes(event.key)) {
                    descendants.lastEnabled()?.node?.focus();
                    return;
                  }
                  console.log("firstNode", descendants.firstEnabled()?.node);
                  descendants.firstEnabled()?.node?.focus();
                },
              )}
              onPointerMove={composeEventHandlers(
                props.onPointerMove,
                whenMouse((event) => {
                  const target = event.target as HTMLElement;
                  const pointerXHasChanged =
                    lastPointerXRef.current !== event.clientX;

                  // We don't use `event.movementX` for this check because Safari will
                  // always return `0` on a pointer event.
                  if (
                    event.currentTarget.contains(target) &&
                    pointerXHasChanged
                  ) {
                    const newDir =
                      event.clientX > lastPointerXRef.current
                        ? "right"
                        : "left";
                    pointerDirRef.current = newDir;
                    lastPointerXRef.current = event.clientX;
                  }
                }),
              )}
            />
          </RowingFocus>
        </DismissableLayer>
      </FocusScope>
    </MenuContentProvider>
  );
});

interface MenuContentImplTypeProps
  extends Omit<MenuContentImplProps, keyof MenuContentImplPrivateProps> {}

export {
  MenuContentImpl,
  type MenuContentImplProps,
  type MenuContentImplElement,
  type MenuContentImplTypeProps,
  type MenuContentImplPrivateProps,
};
