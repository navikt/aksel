import React, { forwardRef, useCallback } from "react";
import { Slot } from "../../slot/Slot";
import { composeEventHandlers } from "../../util/composeEventHandlers";
import { createContext } from "../../util/create-context";
import { useControllableState, useId, useMergeRefs } from "../../util/hooks";
import { requireReactElement } from "../../util/requireReactElement";

type DialogPrimitiveContextValue = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenToggle: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  /* TODO: Link type directly to content-type? */
  contentRef: React.RefObject<HTMLDivElement | null>;
  titleId: string;
};

const [DialogPrimitiveProvider, useDialogPrimitive] =
  createContext<DialogPrimitiveContextValue>({
    providerName: "DialogPrimitiveProvider",
    hookName: "useDialogPrimitive",
  });

type DialogPrimtiveProps = {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

type DialogPrimitiveComponent = React.FC<DialogPrimtiveProps>;

const DialogPrimtiveRoot = ({
  children,
  defaultOpen = false,
  onOpenChange,
  open: _open,
}: DialogPrimtiveProps) => {
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  const [open, setOpen] = useControllableState({
    defaultValue: defaultOpen,
    onChange: onOpenChange,
    value: _open,
  });

  return (
    <DialogPrimitiveProvider
      triggerRef={triggerRef}
      contentRef={contentRef}
      titleId={useId()}
      open={open}
      onOpenChange={setOpen}
      onOpenToggle={useCallback(
        () => setOpen((prevOpen) => !prevOpen),
        [setOpen],
      )}
    >
      {children}
    </DialogPrimitiveProvider>
  );
};

const DialogPrimtive = DialogPrimtiveRoot as DialogPrimitiveComponent;

/* ------------------------- DialogPrimtive Trigger ------------------------- */
type DialogPrimitiveTriggerProps =
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const DialogPrimitiveTrigger = forwardRef<
  HTMLButtonElement,
  DialogPrimitiveTriggerProps
>(
  (
    { children, onClick, ...restProps }: DialogPrimitiveTriggerProps,
    forwardedRef,
  ) => {
    const context = useDialogPrimitive();

    const mergedRefs = useMergeRefs(forwardedRef, context.triggerRef);

    return (
      <Slot
        ref={mergedRefs}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={context.open}
        /*TODO: Consier if needed in <dialog> aria-controls={context.contentId} */
        data-state={getState(context.open)}
        {...restProps}
        onClick={composeEventHandlers(onClick, context.onOpenToggle)}
      >
        {requireReactElement(children)}
      </Slot>
    );
  },
);

/* ------------------------ DialogPrimitive utilities ----------------------- */
function getState(open: boolean) {
  return open ? "open" : "closed";
}

export { DialogPrimtive, DialogPrimitiveTrigger };
