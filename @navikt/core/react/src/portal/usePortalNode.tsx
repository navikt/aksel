import React, { createContext, forwardRef, useContext } from "react";
import ReactDOM from "react-dom";
import { useProvider } from "../provider/Provider";
import { Theme, useThemeInternal } from "../theme/Theme";
import { useClientLayoutEffect, useId } from "../util";
import { useMergeRefs } from "../util/hooks";

const PortalContext = createContext<HTMLElement | null>(null);

type PortalNodeOptions = {
  /**
   * An optional container where the portaled content should be appended.
   */
  rootElement?: HTMLElement | null;
  /**
   * Ref forwarded to the portal container div.
   */
  ref: React.ForwardedRef<HTMLDivElement>;
  /**
   * Props forwarded to the portal container div.
   */
  props: React.HTMLAttributes<HTMLDivElement>;
  // TEMP TEST
  children: React.ReactNode;
};

function usePortalNode({
  rootElement,
  ref: forwardedRef,
  props,
  children,
}: PortalNodeOptions) {
  const providedRootElement = useProvider()?.rootElement ?? rootElement;
  const parentPortalNode = useContext(PortalContext);

  const uniqueId = useId();

  const [containerElement, setContainerElement] = React.useState<
    HTMLElement | ShadowRoot | null
  >(null);
  const [portalNode, setPortalNode] = React.useState<HTMLElement | null>(null);

  const containerRef = React.useRef<HTMLElement | ShadowRoot | null>(null);

  const mergedRefs = useMergeRefs(forwardedRef, setPortalNode);

  useClientLayoutEffect(() => {
    /* Wait for the container to be resolved if explicitly `null`. */
    if (providedRootElement === null) {
      if (containerRef.current) {
        containerRef.current = null;
        setPortalNode(null);
        setContainerElement(null);
      }
      return;
    }

    /* React 17 does not use React.useId(). */
    if (uniqueId == null) {
      return;
    }

    const resolvedContainer =
      providedRootElement ?? parentPortalNode ?? globalThis?.document?.body;

    if (resolvedContainer === null) {
      if (containerRef.current) {
        containerRef.current = null;
        setPortalNode(null);
        setContainerElement(null);
      }
      return;
    }

    if (containerRef.current !== resolvedContainer) {
      containerRef.current = resolvedContainer;
      setPortalNode(null);
      setContainerElement(resolvedContainer);
    }
  }, [parentPortalNode, providedRootElement, uniqueId]);

  /**
   * This `createPortal` call injects `portalElement` into the `container`.
   * Another call inside `Portal`-component then injects the children into the new `portalElement`.
   */
  const portalSubtree = containerElement
    ? ReactDOM.createPortal(
        <PortalDiv
          ref={mergedRefs}
          id={uniqueId}
          {...props}
          data-aksel-portal=""
        >
          <PortalContext.Provider value={portalNode}>
            {children}
          </PortalContext.Provider>
        </PortalDiv>,
        containerElement,
      )
    : null;

  return {
    portalNode,
    portalSubtree,
  };
}

type PortalDivProps = React.HTMLAttributes<HTMLDivElement>;

const PortalDiv = forwardRef<HTMLDivElement, PortalDivProps>(
  (props: PortalDivProps, forwardedRef) => {
    const themeContext = useThemeInternal(false);

    if (themeContext?.isDarkside) {
      return (
        <Theme
          theme={themeContext?.theme}
          asChild
          hasBackground={false}
          data-color={themeContext?.color}
        >
          <div ref={forwardedRef} {...props} />
        </Theme>
      );
    }

    return <div ref={forwardedRef} {...props} />;
  },
);

export { PortalContext, usePortalNode };
