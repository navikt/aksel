import React, { createContext, forwardRef, useContext } from "react";
import ReactDOM from "react-dom";
import { useProvider } from "../provider/Provider";
import { useClientLayoutEffect, useId } from "../util";

const PortalContext = createContext<HTMLElement | null>(null);

function usePortalNode(rootElement?: HTMLElement | null) {
  const providedRootElement = useProvider()?.rootElement ?? rootElement;
  const parentPortalNode = useContext(PortalContext);

  const uniqueId = useId();

  const [containerElement, setContainerElement] = React.useState<
    HTMLElement | ShadowRoot | null
  >(null);
  const [portalNode, setPortalNode] = React.useState<HTMLElement | null>(null);

  const containerRef = React.useRef<HTMLElement | ShadowRoot | null>(null);

  const setPortalNodeRef = React.useCallback((node: HTMLDivElement | null) => {
    setPortalNode(node);
  }, []);

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
        <PortalDiv ref={setPortalNodeRef} id={uniqueId} data-aksel-portal="" />,
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
    return <div ref={forwardedRef} {...props} />;
  },
);

export { PortalContext, usePortalNode };
