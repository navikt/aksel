import React from "react";
import { Floating } from "../../../utils/components/floating/Floating";
import { Slot } from "../../../utils/components/slot/Slot";
import { useComboboxRootContext } from "../root/ComboboxRoot";

interface ComboboxTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Should be a <button> element.
   */
  children: React.ReactNode;
  readOnly?: boolean;
}

const ComboboxTrigger = ({
  children,
  readOnly,
  ...rest
}: ComboboxTriggerProps) => {
  const rootContext = useComboboxRootContext();

  return (
    <Floating.Anchor asChild ref={rootContext.triggerRef}>
      <Slot
        role="combobox"
        //aria-haspopup="listbox" // Dette er implicit med role combobox. TODO: Vurder om hele popupen bør ha role listbox, ev. dialog.
        aria-expanded={readOnly ? undefined : rootContext.open} // TODO: Can consider to always set this, but might be confusing.
        //aria-controls={context.open ? context.contentId : undefined} // Del av Combobox Pattern, men vet ikke om det er hensiktsmessig.
        onClick={() => !readOnly && rootContext.setOpen(!rootContext.open)}
        onMouseDown={(event) => {
          // Prevents "flash of focus" on trigger before focus is moved to input
          if (!readOnly && !rootContext.open) event.preventDefault();
        }}
        /*onKeyDown={composeEventHandlers(onKeyDown, (event) => {
          if (event.key === "ArrowDown") {
            context.onOpenChange(true);
            // Stop keydown from scrolling window
            event.preventDefault();
          }
        })}*/
        data-readonly={readOnly}
        aria-readonly={readOnly} // TODO: Vurder
        disabled={rootContext.disabled}
        {...rest}
      >
        {children}
      </Slot>
    </Floating.Anchor>
  );
};

export { ComboboxTrigger };
