import React, { forwardRef, useCallback, useEffect } from "react";
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
  contentRef: React.RefObject<HTMLDialogElement | null>;
  titleId: string;
};

const [DialogPrimitiveProvider, useDialogPrimitive] =
  createContext<DialogPrimitiveContextValue>({
    providerName: "DialogPrimitiveProvider",
    hookName: "useDialogPrimitive",
  });

type DialogPrimitiveProps = {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

type DialogPrimitiveComponent = React.FC<DialogPrimitiveProps>;

const DialogPrimitiveRoot = ({
  children,
  defaultOpen = false,
  onOpenChange,
  open: _open,
}: DialogPrimitiveProps) => {
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const contentRef = React.useRef<HTMLDialogElement>(null);

  const [open, setOpen] = useControllableState({
    defaultValue: defaultOpen,
    onChange: onOpenChange,
    value: _open,
  });

  const instantStateToggle = useCallback(
    (newOpen: boolean) => {
      setOpen(newOpen);
      if (newOpen) {
        contentRef.current?.showModal();
      } else {
        contentRef.current?.close();
      }
    },
    [setOpen],
  );

  useEffect(() => {
    const isDomOpen = contentRef.current?.open;
    if (open && !isDomOpen) {
      contentRef.current?.showModal();
      return;
    } else if (!open && isDomOpen) {
      contentRef.current?.close();
      return;
    }
    console.info(
      "DialogPrimitive: contentRef.current?.open is not in sync with open state",
    );
  }, [open]);

  return (
    <DialogPrimitiveProvider
      triggerRef={triggerRef}
      contentRef={contentRef}
      titleId={useId()}
      open={open}
      onOpenChange={instantStateToggle}
      onOpenToggle={useCallback(() => {
        instantStateToggle(!open);
      }, [instantStateToggle, open])}
    >
      {children}
    </DialogPrimitiveProvider>
  );
};

const DialogPrimitive = DialogPrimitiveRoot as DialogPrimitiveComponent;

/* ------------------------- DialogPrimitive Trigger ------------------------- */
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

/* ------------------------- DialogPrimitive Content ------------------------- */
type DialogPrimitiveContentProps =
  React.DialogHTMLAttributes<HTMLDialogElement>;

const DialogPrimitiveContent = forwardRef<
  HTMLDialogElement,
  DialogPrimitiveContentProps
>(({ children, ...restProps }: DialogPrimitiveContentProps, forwardedRef) => {
  const context = useDialogPrimitive();

  const mergedRefs = useMergeRefs(forwardedRef, context.contentRef);

  return (
    <dialog
      ref={mergedRefs}
      data-state={getState(context.open)}
      aria-labelledby={context.titleId}
      {...restProps}
    >
      {children}
    </dialog>
  );
});

/* ------------------------- DialogPrimitive Close ------------------------- */
type DialogPrimitiveCloseProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const DialogPrimitiveClose = forwardRef<
  HTMLButtonElement,
  DialogPrimitiveCloseProps
>(
  (
    { children, onClick, ...restProps }: DialogPrimitiveCloseProps,
    forwardedRef,
  ) => {
    const context = useDialogPrimitive();

    return (
      <Slot
        ref={forwardedRef}
        type="button"
        {...restProps}
        onClick={composeEventHandlers(onClick, () =>
          context.onOpenChange(false),
        )}
      >
        {requireReactElement(children)}
      </Slot>
    );
  },
);

/* ------------------------- DialogPrimitive Close ------------------------- */
type DialogPrimitiveTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

const DialogPrimitiveTitle = forwardRef<
  HTMLHeadingElement,
  DialogPrimitiveTitleProps
>(({ children, ...restProps }: DialogPrimitiveTitleProps, forwardedRef) => {
  const context = useDialogPrimitive();

  return (
    <h1 ref={forwardedRef} id={context.titleId} {...restProps}>
      {children}
    </h1>
  );
});

/* ------------------------ DialogPrimitive utilities ----------------------- */
function getState(open: boolean) {
  return open ? "open" : "closed";
}

export {
  DialogPrimitive,
  DialogPrimitiveTrigger,
  DialogPrimitiveContent,
  DialogPrimitiveClose,
  DialogPrimitiveTitle,
};
