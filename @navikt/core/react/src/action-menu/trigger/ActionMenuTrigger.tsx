import React, { forwardRef } from "react";
import { Menu } from "../../utils/components/floating-menu/Menu";
import { Slot } from "../../utils/components/slot/Slot";
import { composeEventHandlers, requireReactElement } from "../../utils/helpers";
import { useMergeRefs } from "../../utils/hooks";
import { useActionMenuContext } from "../root/ActionMenuRoot.context";

interface ActionMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactElement;
}

const ActionMenuTrigger = forwardRef<HTMLButtonElement, ActionMenuTriggerProps>(
  (
    { children, onKeyDown, style, onClick, ...rest }: ActionMenuTriggerProps,
    ref,
  ) => {
    const context = useActionMenuContext();
    const mergedRefs = useMergeRefs(ref, context.triggerRef);

    return (
      <Menu.Anchor asChild>
        <Slot
          type="button"
          id={context.triggerId}
          aria-haspopup="menu"
          aria-expanded={context.open}
          aria-controls={context.open ? context.contentId : undefined}
          data-state={context.open ? "open" : "closed"}
          ref={mergedRefs}
          {...rest}
          style={{ ...style, pointerEvents: context.open ? "auto" : undefined }}
          onClick={composeEventHandlers(onClick, context.onOpenToggle)}
          onKeyDown={composeEventHandlers(onKeyDown, (event) => {
            if (event.key === "ArrowDown") {
              context.onOpenChange(true);
              /* Stop keydown from scrolling window */
              event.preventDefault();
            }
          })}
        >
          {requireReactElement(children)}
        </Slot>
      </Menu.Anchor>
    );
  },
);

export { ActionMenuTrigger };
export type { ActionMenuTriggerProps };
