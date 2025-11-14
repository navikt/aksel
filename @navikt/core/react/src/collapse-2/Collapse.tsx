import React, { useEffect, useRef } from "react";
import { useOpenChangeAnimationComplete } from "../overlays/overlay/hooks/useOpenChangeAnimationComplete";
import { useTransitionStatus } from "../overlays/overlay/hooks/useTransitionStatus";
import { useClientLayoutEffect, useId } from "../util";
import { composeEventHandlers } from "../util/composeEventHandlers";
import { createContext } from "../util/create-context";
import { useMergeRefs } from "../util/hooks";
import { useControllableState } from "../util/hooks/useControllableState";

/* -------------------------------------------------------------------------------------------------
 * Collapsible
 * -----------------------------------------------------------------------------------------------*/
type CollapsibleContextValue = {
  contentId: string;
  disabled?: boolean;
  open: boolean;
  onOpenToggle(): void;
  mounted: boolean;
  setMounted: React.Dispatch<React.SetStateAction<boolean>>;
  keepMounted: boolean;
  panelRef: React.RefObject<HTMLElement | null>;
};

const [CollapsibleProvider, useCollapsibleContext] =
  createContext<CollapsibleContextValue>({
    hookName: "useCollapsibleContext",
    providerName: "<CollapsibleProvider />",
  });

interface CollapsibleProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean;
  open?: boolean;
  disabled?: boolean;
  onOpenChange?(open: boolean): void;
  keepMounted?: boolean;
}

/**
 * TODO:
 * - Does wrapper need to be a div? Context only might be better
 */
const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
  (props: CollapsibleProps, forwardedRef) => {
    const {
      open: openProp,
      defaultOpen = false,
      disabled,
      onOpenChange,
      keepMounted = false,
      ...collapsibleProps
    } = props;

    const [open, setOpen] = useControllableState({
      value: openProp,
      defaultValue: defaultOpen,
      onChange: onOpenChange,
    });

    const panelRef = useRef<HTMLElement | null>(null);

    const { mounted, setMounted } = useTransitionStatus(open, true, true);

    useOpenChangeAnimationComplete({
      enabled: true,
      ref: panelRef,
      open,
      onComplete: () => {
        if (!open) {
          setMounted(false);
        }
      },
    });

    return (
      <CollapsibleProvider
        disabled={disabled}
        contentId={useId()}
        open={open}
        mounted={mounted}
        setMounted={setMounted}
        keepMounted={keepMounted}
        panelRef={panelRef}
        onOpenToggle={React.useCallback(
          () => setOpen((prevOpen) => !prevOpen),
          [setOpen],
        )}
      >
        <div
          data-state={getState(open)}
          data-disabled={disabled ? "" : undefined}
          {...collapsibleProps}
          ref={forwardedRef}
        />
      </CollapsibleProvider>
    );
  },
);

/* -------------------------------------------------------------------------------------------------
 * CollapsibleTrigger
 * -----------------------------------------------------------------------------------------------*/
type CollapsibleTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const CollapsibleTrigger = React.forwardRef<
  HTMLButtonElement,
  CollapsibleTriggerProps
>((props: CollapsibleTriggerProps, forwardedRef) => {
  const { ...triggerProps } = props;
  const context = useCollapsibleContext();

  return (
    <button
      type="button"
      aria-controls={context.contentId}
      aria-expanded={context.open || false}
      data-state={getState(context.open)}
      data-disabled={context.disabled ? "" : undefined}
      disabled={context.disabled}
      {...triggerProps}
      ref={forwardedRef}
      onClick={composeEventHandlers(props.onClick, context.onOpenToggle)}
    />
  );
});

/* -------------------------------------------------------------------------------------------------
 * CollapsibleContent
 * -----------------------------------------------------------------------------------------------*/

type CollapsibleContentProps = CollapsibleContentImplProps;

const CollapsibleContent = React.forwardRef<
  HTMLDivElement,
  CollapsibleContentProps
>((props: CollapsibleContentProps, forwardedRef) => {
  return <CollapsibleContentImpl {...props} ref={forwardedRef} />;
});

/* -----------------------------------------------------------------------------------------------*/

type CollapsibleContentImplProps = React.HTMLAttributes<HTMLDivElement>;

const CollapsibleContentImpl = React.forwardRef<
  HTMLDivElement,
  CollapsibleContentImplProps
>((props: CollapsibleContentImplProps, forwardedRef) => {
  const { children, ...contentProps } = props;
  const context = useCollapsibleContext();
  const [isPresent, setIsPresent] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const composedRefs = useMergeRefs(forwardedRef, ref, context.panelRef);
  const heightRef = React.useRef<number | undefined>(0);
  const height = heightRef.current;
  const widthRef = React.useRef<number | undefined>(0);
  const width = widthRef.current;
  // when opening we want it to immediately open to retrieve dimensions
  // when closing we delay `present` to retrieve dimensions before closing
  const isOpen = context.open || isPresent;
  const isMountAnimationPreventedRef = React.useRef(isOpen);
  const originalStylesRef = React.useRef<Record<string, string>>(undefined);

  /* Prevent initial opening animation */
  useEffect(() => {
    const rAF = requestAnimationFrame(() => {
      isMountAnimationPreventedRef.current = false;
    });
    return () => cancelAnimationFrame(rAF);
  }, []);

  useClientLayoutEffect(() => {
    const node = ref.current;

    if (node) {
      originalStylesRef.current = originalStylesRef.current || {
        transitionDuration: node.style.transitionDuration,
        animationName: node.style.animationName,
      };
      // block any animations/transitions so the element renders at its full dimensions
      node.style.transitionDuration = "0s";
      node.style.animationName = "none";

      // get width and height from full dimensions
      const rect = node.getBoundingClientRect();
      heightRef.current = rect.height;
      widthRef.current = rect.width;

      // kick off any animations/transitions that were originally set up if it isn't the initial mount
      if (!isMountAnimationPreventedRef.current) {
        node.style.transitionDuration =
          originalStylesRef.current.transitionDuration!;
        node.style.animationName = originalStylesRef.current.animationName!;
      }

      setIsPresent(context.mounted);
    }
    /**
     * depends on `context.open` because it will change to `false`
     * when a close is triggered but `mounted` will be `false` on
     * animation end (so when close finishes). This allows us to
     * retrieve the dimensions *before* closing.
     */
  }, [context.open, context.mounted]);

  const shouldRenderContent = context.keepMounted || context.mounted;

  if (!shouldRenderContent) {
    return null;
  }

  return (
    <div
      data-state={getState(context.open)}
      data-disabled={context.disabled ? "" : undefined}
      id={context.contentId}
      hidden={!isOpen}
      {...contentProps}
      ref={composedRefs}
      style={{
        [`--panel-height` as any]: height ? `${height}px` : undefined,
        [`--panel-width` as any]: width ? `${width}px` : undefined,
        ...props.style,
      }}
    >
      {isOpen && children}
    </div>
  );
});

/* -----------------------------------------------------------------------------------------------*/

function getState(open?: boolean) {
  return open ? "open" : "closed";
}

const Root = Collapsible;
const Trigger = CollapsibleTrigger;
const Panel = CollapsibleContent;

export { Panel, Root, Trigger };
export type {
  CollapsibleContentProps,
  CollapsibleProps,
  CollapsibleTriggerProps,
};
