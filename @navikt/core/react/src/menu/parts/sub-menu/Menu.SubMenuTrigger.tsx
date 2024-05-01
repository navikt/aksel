import React, { forwardRef, useCallback, useRef } from "react";
import { composeEventHandlers } from "../../../util/composeEventHandlers";
import { useMergeRefs } from "../../../util/hooks";
import { useMenuContext } from "../../Menu.context";
import { SubMenuSide } from "../../Menu.types";
import { SUB_OPEN_KEYS, getOpenState, whenMouse } from "../../Menu.utils";
import { MenuAnchor } from "../Menu.Anchor";
import { useMenuContentContext } from "../content/Menu.context";
import { MenuItemElement } from "../item/Menu.Item";
import { MenuItemImpl, MenuItemImplProps } from "../item/Menu.ItemImpl";
import { useMenuSubContext } from "./Menu.SubMenu.context";

interface MenuSubTriggerProps extends MenuItemImplProps {}

const MenuSubTrigger = forwardRef<MenuItemElement, MenuSubTriggerProps>(
  (props: MenuSubTriggerProps, forwardedRef) => {
    const context = useMenuContext();
    const subContext = useMenuSubContext();
    const contentContext = useMenuContentContext();
    const openTimerRef = useRef<number | null>(null);
    const { pointerGraceTimerRef, onPointerGraceIntentChange } = contentContext;

    const composedRefs = useMergeRefs(forwardedRef, subContext.onTriggerChange);

    const clearOpenTimer = useCallback(() => {
      if (openTimerRef.current) {
        window.clearTimeout(openTimerRef.current);
      }
      openTimerRef.current = null;
    }, []);

    React.useEffect(() => clearOpenTimer, [clearOpenTimer]);

    React.useEffect(() => {
      const pointerGraceTimer = pointerGraceTimerRef.current;
      return () => {
        window.clearTimeout(pointerGraceTimer);
        onPointerGraceIntentChange(null);
      };
    }, [pointerGraceTimerRef, onPointerGraceIntentChange]);

    return (
      <MenuAnchor asChild>
        <MenuItemImpl
          id={subContext.triggerId}
          aria-haspopup="menu"
          aria-expanded={context.open}
          aria-controls={subContext.contentId}
          data-state={getOpenState(context.open)}
          {...props}
          ref={composedRefs}
          // This is redundant for mouse users but we cannot determine pointer type from
          // click event and we cannot use pointerup event (see git history for reasons why)
          onClick={(event) => {
            /* console.log("kdwn"); */
            props.onClick?.(event);
            if (props.disabled || event.defaultPrevented) return;
            /**
             * We manually focus because iOS Safari doesn't always focus on click (e.g. buttons)
             * and we rely heavily on `onFocusOutside` for submenus to close when switching
             * between separate submenus.
             */
            event.currentTarget.focus();
            if (!context.open) context.onOpenChange(true);
          }}
          onPointerMove={composeEventHandlers(
            props.onPointerMove,
            whenMouse((event) => {
              contentContext.onItemEnter(event);
              if (event.defaultPrevented) return;
              if (!props.disabled && !context.open && !openTimerRef.current) {
                contentContext.onPointerGraceIntentChange(null);
                openTimerRef.current = window.setTimeout(() => {
                  context.onOpenChange(true);
                  clearOpenTimer();
                }, 100);
              }
            }),
          )}
          onPointerLeave={composeEventHandlers(
            props.onPointerLeave,
            whenMouse((event) => {
              clearOpenTimer();

              const contentRect = context.content?.getBoundingClientRect();
              if (contentRect) {
                // TODO: make sure to update this when we change positioning logic
                const side = context.content?.dataset.side as SubMenuSide;
                const rightSide = side === "right";
                const bleed = rightSide ? -5 : +5;
                const contentNearEdge =
                  contentRect[rightSide ? "left" : "right"];
                const contentFarEdge =
                  contentRect[rightSide ? "right" : "left"];

                contentContext.onPointerGraceIntentChange({
                  area: [
                    // Apply a bleed on clientX to ensure that our exit point is
                    // consistently within polygon bounds
                    { x: event.clientX + bleed, y: event.clientY },
                    { x: contentNearEdge, y: contentRect.top },
                    { x: contentFarEdge, y: contentRect.top },
                    { x: contentFarEdge, y: contentRect.bottom },
                    { x: contentNearEdge, y: contentRect.bottom },
                  ],
                  side,
                });

                window.clearTimeout(pointerGraceTimerRef.current);
                pointerGraceTimerRef.current = window.setTimeout(
                  () => contentContext.onPointerGraceIntentChange(null),
                  300,
                );
              } else {
                contentContext.onTriggerLeave(event);
                if (event.defaultPrevented) return;

                // There's 100ms where the user may leave an item before the submenu was opened.
                contentContext.onPointerGraceIntentChange(null);
              }
            }),
          )}
          onKeyDown={composeEventHandlers(props.onKeyDown, (event) => {
            if (props.disabled) {
              return;
            }
            if (SUB_OPEN_KEYS.includes(event.key)) {
              context.onOpenChange(true);
              // The trigger may hold focus if opened via pointer interaction
              // so we ensure content is given focus again when switching to keyboard.
              context.content?.focus();
              console.log("opening submenu", context.content);
              // prevent window from scrolling
              event.preventDefault();
            }
          })}
        />
      </MenuAnchor>
    );
  },
);

export { MenuSubTrigger };
