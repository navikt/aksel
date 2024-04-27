/**
 * API
 * Menu
 * MenuTrigger
 * MenuContent
 * MenuSubTrigger
 * MenuSubContent
 * MenuDivider
 * MenuGroup
 * MenuLabel
 * MenuItem
 * MenuRadioGroup
 * MenuRadioItem
 * MenuCheckbox
 */

/**
 * MenuTrigger is the trigger for the menu
 * MenuContent sets up descendants API-wrapper
 * MenuSubTrigger is the trigger for a sub-menu
 * MenuSubContent sets up nested descendants API-wrapper. cant use same descendants
 * MenuDivider is a visual divider/line
 * MenuGroup groups items together semantically with a label
 * MenuLabel is a label for a group, or menu in general
 * MenuItem is a clickable item. Can be button and link?
 * MenuRadioGroup is a group of radio buttons (fieldset)
 * MenuRadioItem is a radio button
 * MenuCheckbox is a checkbox. Checkboxes can be standalone so no fieldset needed
 */
import React, {
  HTMLAttributes,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import DismissableLayer from "../../overlay/dismiss/DismissableLayer";
import { DismissableLayerProps } from "../../overlay/dismiss/DismissableLayer.types";
import { composeEventHandlers } from "../../util/composeEventHandlers";
import { useCallbackRef, useId, useMergeRefs } from "../../util/hooks";
import { createDescendantContext } from "../../util/hooks/descendants/useDescendant";
import Floating from "../floating/Floating";
import { FloatingAnchorProps } from "../floating/parts/Anchor";
import { FloatingContentProps } from "../floating/parts/Content";
import { useFocusGuards } from "./FocusGuard";
import { FocusScope, FocusScopeProps } from "./FocusLock";
import {
  MenuContentProvider,
  MenuProvider,
  MenuSubProvider,
  useMenuContentContext,
  useMenuContext,
  useMenuSubContext,
} from "./Menu.context";
import {
  GraceIntent,
  MenuContentType,
  Point,
  Polygon,
  SubmenuSide,
} from "./Menu.types";
import { SUB_OPEN_KEYS, whenMouse } from "./Menu.utils";
import { RowingListSlow } from "./RowingListSlot";
import { MenuItem, MenuItemProps } from "./parts/Menu.Item";

/* Utils */

const FIRST_KEYS = ["ArrowDown", "PageUp", "Home"];
const LAST_KEYS = ["ArrowUp", "PageDown", "End"];
const FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];

/**
 * Menu
 */
export interface MenuProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /**
   * @default "bottom"
   */
}

interface MenuComponent extends React.FC<MenuProps> {}

export const Menu: MenuComponent = ({
  children,
  open = false,
  onOpenChange,
}: MenuProps) => {
  const handleOpenChange = useCallbackRef(onOpenChange);

  const [content, setContent] = useState<MenuContentType | null>(null);

  return (
    <Floating>
      <MenuProvider
        onClose={useCallback(() => handleOpenChange(false), [handleOpenChange])}
        open={open}
        onOpenChange={handleOpenChange}
        content={content}
        onContentChange={setContent}
      >
        {children}
      </MenuProvider>
    </Floating>
  );
};

/**
 * Trigger
 */
interface MenuTriggerProps extends FloatingAnchorProps {}

export const MenuTrigger = forwardRef<
  React.ElementRef<typeof Floating.Anchor>,
  MenuTriggerProps
>(({ children, ...rest }: MenuTriggerProps, ref) => {
  return (
    <Floating.Anchor ref={ref} {...rest}>
      {children}
    </Floating.Anchor>
  );
});

/**
 * Content
 */
interface MenuContentProps extends FloatingContentProps {
  /**
   * Event handler called when auto-focusing on close.
   * Can be prevented.
   */
  onCloseAutoFocus?: FocusScopeProps["onUnmountAutoFocus"];
  onEscapeKeyDown?: DismissableLayerProps["onEscapeKeyDown"];
  onPointerDownOutside?: DismissableLayerProps["onPointerDownOutside"];
  onFocusOutside?: DismissableLayerProps["onFocusOutside"];
  onInteractOutside?: DismissableLayerProps["onInteractOutside"];
  onOpenAutoFocus?: FocusScopeProps["onMountAutoFocus"];
}

export const [
  MenuContentDescendantsProvider,
  useMenuContentDescendantsContext,
  useMenuContentDescendants,
  useMenuContentDescendant,
] = createDescendantContext<HTMLElement>();

export const MenuContent = ({ children, ...rest }: MenuContentProps) => {
  const descendants = useMenuContentDescendants();

  return (
    <MenuContentDescendantsProvider value={descendants}>
      <MenuContentImpl {...rest}>{children}</MenuContentImpl>
    </MenuContentDescendantsProvider>
  );
};

/* Cotent Impl */
/**
 * TODO:
 * - Implement rowing keyboard nav
 * - Focusgroup/lock
 */
export const MenuContentImpl = forwardRef<
  React.ElementRef<typeof Floating.Content>,
  MenuContentProps
>(
  (
    {
      children,
      style,
      onFocusOutside,
      onCloseAutoFocus,
      onOpenAutoFocus,
      onPointerMove,
      onKeyDown,
      ...rest
    }: MenuContentProps,
    ref,
  ) => {
    const context = useMenuContext();
    const _ref = useRef<HTMLDivElement>(null);
    const composedRefs = useMergeRefs(ref, _ref);

    const pointerGraceTimerRef = useRef(0);
    const pointerGraceIntentRef = useRef<GraceIntent | null>(null);
    const pointerDirRef = useRef<SubmenuSide>("right");

    const contentRef = useRef<HTMLDivElement>(null);

    const lastPointerXRef = useRef(0);

    /* const [currentItemId, setCurrentItemId] = useState<string | null>(null); */

    // Make sure the whole tree has focus guards as our `MenuContent` may be
    // the last element in the DOM (beacuse of the `Portal`)
    useFocusGuards();

    const isPointerMovingToSubmenu = useCallback(
      (event: React.PointerEvent) => {
        const isMovingTowards =
          pointerDirRef.current === pointerGraceIntentRef.current?.submenuSide;
        return (
          isMovingTowards &&
          isPointerInGraceArea(event, pointerGraceIntentRef.current?.area)
        );
      },
      [],
    );

    const descendants = useMenuContentDescendantsContext();

    /* https://github.com/radix-ui/primitives/blob/main/packages/react/menu/src/Menu.tsx#L435 */
    return (
      <MenuContentProvider
        onItemEnter={useCallback(
          (event) => {
            if (isPointerMovingToSubmenu(event)) {
              event.preventDefault();
            }
          },
          [isPointerMovingToSubmenu],
        )}
        onItemLeave={React.useCallback(
          (event) => {
            if (isPointerMovingToSubmenu(event)) {
              return;
            }
            contentRef.current?.focus();
            /* setCurrentItemId(null); */
          },
          [isPointerMovingToSubmenu],
        )}
        onTriggerLeave={React.useCallback(
          (event) => {
            if (isPointerMovingToSubmenu(event)) {
              event.preventDefault();
            }
          },
          [isPointerMovingToSubmenu],
        )}
        pointerGraceTimerRef={pointerGraceTimerRef}
        onPointerGraceIntentChange={React.useCallback((intent) => {
          pointerGraceIntentRef.current = intent;
        }, [])}
      >
        {/* Not 100% convinced we actually need this API */}
        <FocusScope
          asChild
          onMountAutoFocus={composeEventHandlers<any>(
            onOpenAutoFocus,
            (event) => {
              // when opening, explicitly focus the content area only and leave
              // `onEntryFocus` in  control of focusing first item
              event.preventDefault();
              contentRef.current?.focus({ preventScroll: true });
            },
          )}
          onUnmountAutoFocus={onCloseAutoFocus}
        >
          <DismissableLayer
            asChild
            /* Do we really need to disable all outside interaction? */
            /* disableOutsidePointerEvents={context.open} */
            /* TODO: Fix support for custom types */
            onFocusOutside={composeEventHandlers<any>(
              onFocusOutside,
              (event) => event.preventDefault(),
              { checkForDefaultPrevented: false },
            )}
            onDismiss={() => context.onOpenChange(false)}
          >
            <RowingListSlow descendants={descendants} direction="vertical">
              <Floating.Content
                role="menu"
                aria-orientation="vertical"
                data-state={context.open ? "open" : "closed"}
                data-aksel-menu-content=""
                {...rest}
                ref={composedRefs}
                style={{ outline: "none", ...style }}
                onKeyDown={composeEventHandlers(onKeyDown, (event) => {
                  // submenu key events bubble through portals. We only care about keys in this menu.
                  const target = event.target as HTMLElement;

                  if (
                    target.closest("[data-aksel-menu-content]") ===
                      event.currentTarget &&
                    event.key === "Tab"
                  ) {
                    // menus should not be navigated using tab key so we prevent it
                    event.preventDefault();
                  }
                  // focus first/last item based on key pressed
                  const content = contentRef.current;
                  if (event.target !== content) {
                    return;
                  }
                  if (!FIRST_LAST_KEYS.includes(event.key)) {
                    return;
                  }
                  event.preventDefault();
                  /* This should be handled by decendantcontext */
                  /* const items = getItems().filter((item) => !item.disabled);
                const candidateNodes = items.map((item) => item.ref.current!);
                if (LAST_KEYS.includes(event.key)) candidateNodes.reverse();
                focusFirst(candidateNodes); */
                })}
                onPointerMove={composeEventHandlers(
                  onPointerMove,
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
              >
                {children}
              </Floating.Content>
            </RowingListSlow>
          </DismissableLayer>
        </FocusScope>
      </MenuContentProvider>
    );
  },
);

// Determine if a point is inside of a polygon.
// Based on https://github.com/substack/point-in-polygon
function isPointInPolygon(point: Point, polygon: Polygon) {
  const { x, y } = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;

    // prettier-ignore
    const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }

  return inside;
}

function isPointerInGraceArea(event: React.PointerEvent, area?: Polygon) {
  if (!area) return false;
  const cursorPos = { x: event.clientX, y: event.clientY };
  return isPointInPolygon(cursorPos, area);
}

/**
 * Divider
 */
interface MenuDividerProps extends HTMLAttributes<HTMLDivElement> {}

export const MenuDivider = forwardRef<HTMLDivElement, MenuDividerProps>(
  ({ children, ...rest }: MenuDividerProps, ref) => {
    return (
      <div ref={ref} {...rest} role="separator" aria-orientation="horizontal">
        {children}
      </div>
    );
  },
);

/**
 * Group
 */
export interface MenuGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const MenuGroup = forwardRef<HTMLDivElement, MenuGroupProps>(
  ({ ...rest }: MenuGroupProps, ref) => {
    return <div role="group" ref={ref} {...rest} />;
  },
);

/**
 * Label
 */
interface MenuLabelProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const MenuLabel = ({ ...rest }: MenuLabelProps) => {
  return <div {...rest} />;
};

/**
 * SubMenu
 */
interface MenuSubProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const MenuSub = ({
  children,
  open = false,
  onOpenChange,
}: MenuSubProps) => {
  const parentMenuContext = useMenuContext();

  const [trigger, setTrigger] = useState<React.ElementRef<
    typeof Floating.Anchor
  > | null>(null);

  const [content, setContent] = useState<React.ElementRef<
    typeof Floating.Content
  > | null>(null);

  const handleOpenChange = useCallbackRef(onOpenChange);

  // Prevent the parent menu from reopening with open submenus.
  useEffect(() => {
    if (parentMenuContext.open === false) handleOpenChange(false);
    return () => handleOpenChange(false);
  }, [parentMenuContext.open, handleOpenChange]);

  return (
    <Floating>
      <MenuProvider
        onClose={useCallback(() => handleOpenChange(false), [handleOpenChange])}
        open={open}
        onOpenChange={handleOpenChange}
        content={content}
        onContentChange={setContent}
      >
        <MenuSubProvider
          contentId={useId()}
          triggerId={useId()}
          trigger={trigger}
          onTriggerChange={setTrigger}
        >
          {children}
        </MenuSubProvider>
      </MenuProvider>
    </Floating>
  );
};

/**
 * SubTrigger
 */
interface MenuSubTriggerProps extends MenuItemProps {}

export const MenuSubTrigger = forwardRef<HTMLDivElement, MenuSubTriggerProps>(
  (
    {
      onClick,
      onPointerMove,
      onPointerLeave,
      onKeyDown,
      ...rest
    }: MenuSubTriggerProps,
    ref,
  ) => {
    const context = useMenuContext();
    const subContext = useMenuSubContext();
    const contentContext = useMenuContentContext();

    const composedRefs = useMergeRefs(ref, subContext.onTriggerChange);

    const openTimerRef = useRef<number | null>(null);
    const { pointerGraceTimerRef, onPointerGraceIntentChange } = contentContext;

    const clearOpenTimer = useCallback(() => {
      if (openTimerRef.current) window.clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }, []);

    useEffect(() => clearOpenTimer, [clearOpenTimer]);

    useEffect(() => {
      const pointerGraceTimer = pointerGraceTimerRef.current;
      return () => {
        window.clearTimeout(pointerGraceTimer);
        onPointerGraceIntentChange(null);
      };
    }, [pointerGraceTimerRef, onPointerGraceIntentChange]);

    return (
      <MenuTrigger asChild>
        <MenuItem
          id={subContext.triggerId}
          aria-haspopup="menu"
          aria-expanded={context.open}
          aria-controls={subContext.contentId}
          data-state={context.open ? "open" : "closed"}
          {...rest}
          ref={composedRefs}
          // This is redundant for mouse users but we cannot determine pointer type from
          // click event and we cannot use pointerup event (see git history for reasons why)
          onClick={(event) => {
            onClick?.(event);
            if (rest.disabled || event.defaultPrevented) {
              return;
            }
            /**
             * We manually focus because iOS Safari doesn't always focus on click (e.g. buttons)
             * and we rely heavily on `onFocusOutside` for submenus to close when switching
             * between separate submenus.
             */
            event.currentTarget.focus();
            if (!context.open) context.onOpenChange(true);
          }}
          onPointerMove={composeEventHandlers(
            onPointerMove,
            whenMouse((event) => {
              contentContext.onItemEnter(event);
              if (event.defaultPrevented) return;
              if (!rest.disabled && !context.open && !openTimerRef.current) {
                contentContext.onPointerGraceIntentChange(null);
                openTimerRef.current = window.setTimeout(() => {
                  context.onOpenChange(true);
                  clearOpenTimer();
                }, 100);
              }
            }),
          )}
          onPointerLeave={composeEventHandlers(
            onPointerLeave,
            whenMouse((event) => {
              clearOpenTimer();

              const contentRect = context.content?.getBoundingClientRect();
              if (contentRect) {
                // TODO: make sure to update this when we change positioning logic
                const side = context.content?.dataset.side as SubmenuSide;
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
                  submenuSide: side,
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
          onKeyDown={composeEventHandlers(onKeyDown, (event) => {
            if (rest.disabled) {
              return;
            }
            if (SUB_OPEN_KEYS.includes(event.key)) {
              context.onOpenChange(true);
              // The trigger may hold focus if opened via pointer interaction
              // so we ensure content is given focus again when switching to keyboard.
              context.content?.focus();
              // prevent window from scrolling
              event.preventDefault();
            }
          })}
        />
      </MenuTrigger>
    );
  },
);

/**
 * SubContent
 */
interface MenuSubContentProps {
  children: React.ReactNode;
}

export const MenuSubContent = ({ children }: MenuSubContentProps) => {
  return <div>{children}</div>;
};
