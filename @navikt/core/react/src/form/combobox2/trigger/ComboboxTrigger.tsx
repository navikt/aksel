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
  /**
   * Whether to open when the user starts typing.
   * Set to `false` if the filter input is omitted.
   * @default true
   */
  openWhenStartsTyping?: boolean; // TODO: Check ComboboxFilter presence automatically? Or check in dev and warn if prop wrong.
}

const ComboboxTrigger = ({
  children,
  readOnly,
  openWhenStartsTyping = true,
  ...rest
}: ComboboxTriggerProps) => {
  const rootContext = useComboboxRootContext();

  return (
    <Floating.Anchor asChild ref={rootContext.triggerRef}>
      <Slot
        // oxlint-disable-next-line jsx-a11y/role-has-required-aria-props -- aria-controls can be supplied through rest or the slotted trigger.
        role="combobox"
        aria-expanded={readOnly ? undefined : rootContext.open}
        onClick={() => !readOnly && rootContext.setOpen(!rootContext.open)}
        onMouseDown={(event) => {
          // Prevents "flash of focus" on trigger before focus is moved to input
          if (!readOnly && !rootContext.open) event.preventDefault();
        }}
        onKeyDown={(event) => {
          if (readOnly) {
            return;
          }
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            rootContext.setOpen(true);
            event.preventDefault(); // Stop keydown from scrolling window
          } else if (
            openWhenStartsTyping &&
            !event.nativeEvent.isComposing &&
            !event.ctrlKey &&
            !event.metaKey &&
            !event.altKey &&
            event.key.length === 1 &&
            event.key !== " "
          ) {
            rootContext.setOpen(true); // Open when you start writing
          }
        }}
        data-readonly={readOnly}
        disabled={rootContext.disabled}
        {...rest}
      >
        {children}
      </Slot>
    </Floating.Anchor>
  );
};

export { ComboboxTrigger };
