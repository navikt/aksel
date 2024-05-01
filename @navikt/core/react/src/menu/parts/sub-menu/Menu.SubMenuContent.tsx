import React, { forwardRef } from "react";
import { composeEventHandlers } from "../../../util/composeEventHandlers";
import { useMergeRefs } from "../../../util/hooks";
import {
  MenuDescendantsProvider,
  useMenuContext,
  useMenuDescendants,
  useMenuRootContext,
} from "../../Menu.context";
import { SUB_CLOSE_KEYS } from "../../Menu.utils";
import {
  MenuContentImpl,
  MenuContentImplElement,
  MenuContentImplPrivateProps,
  MenuContentImplProps,
} from "../content/Menu.ContentImpl";
import { useMenuSubContext } from "./Menu.SubMenu.context";

interface MenuSubContentProps
  extends Omit<
    MenuContentImplProps,
    | keyof MenuContentImplPrivateProps
    | "onCloseAutoFocus"
    | "onEntryFocus"
    | "side"
    | "align"
  > {}

const MenuSubContent = forwardRef<MenuContentImplElement, MenuSubContentProps>(
  (props: MenuSubContentProps, forwardedRef) => {
    const descendants = useMenuDescendants();

    const { ...subContentProps } = props;
    const context = useMenuContext();
    const rootContext = useMenuRootContext();
    const subContext = useMenuSubContext();
    const ref = React.useRef<MenuContentImplElement>(null);
    const composedRefs = useMergeRefs(forwardedRef, ref);

    return (
      <MenuDescendantsProvider value={descendants}>
        <MenuContentImpl
          id={subContext.contentId}
          aria-labelledby={subContext.triggerId}
          {...subContentProps}
          ref={composedRefs}
          align="start"
          side="right"
          disableOutsidePointerEvents={false}
          onOpenAutoFocus={(event) => {
            // when opening a submenu, focus content for keyboard users only
            if (rootContext.isUsingKeyboardRef.current) {
              ref.current?.focus();
              /* console.log(ref.current); */
              console.log("ran openautofocus");
            }
            event.preventDefault();
          }}
          // The menu might close because of focusing another menu item in the parent menu. We
          // don't want it to refocus the trigger in that case so we handle trigger focus ourselves.
          onCloseAutoFocus={(event) => event.preventDefault()}
          onFocusOutside={composeEventHandlers(
            props.onFocusOutside,
            (event) => {
              // We prevent closing when the trigger is focused to avoid triggering a re-open animation
              // on pointer interaction.
              if (event.target !== subContext.trigger)
                context.onOpenChange(false);
            },
          )}
          onEscapeKeyDown={composeEventHandlers(
            props.onEscapeKeyDown,
            (event) => {
              rootContext.onClose();
              // ensure pressing escape in submenu doesn't escape full screen mode
              event.preventDefault();
            },
          )}
          onKeyDown={composeEventHandlers(props.onKeyDown, (event) => {
            // Submenu key events bubble through portals. We only care about keys in this menu.
            const isKeyDownInside = event.currentTarget.contains(
              event.target as HTMLElement,
            );
            const isCloseKey = SUB_CLOSE_KEYS.includes(event.key);
            if (isKeyDownInside && isCloseKey) {
              context.onOpenChange(false);
              // We focus manually because we prevented it in `onCloseAutoFocus`
              subContext.trigger?.focus();
              // prevent window from scrolling
              event.preventDefault();
            }
          })}
        />
      </MenuDescendantsProvider>
    );
  },
);

export { MenuSubContent, type MenuSubContentProps };
