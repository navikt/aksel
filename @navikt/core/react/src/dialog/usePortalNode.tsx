import React, { forwardRef } from "react";
import ReactDOM from "react-dom";
import { useProvider } from "../provider/Provider";
import { useClientLayoutEffect, useId } from "../util";
import { createContext } from "../util/create-context";

type PortalContextValue = {
  portalNode: HTMLElement | null;
};

const [PortalContextProvider, usePortalContext] =
  createContext<PortalContextValue>({
    hookName: "usePortalContext",
    providerName: "PortalContextProvider",
    name: "PortalContext",
  });

interface UsePortalNodeProps {
  /**
   * Specifies the root node the portal container will be appended to.
   */
  root?: HTMLElement | null;
}

function usePortalNode(props: UsePortalNodeProps = {}) {
  const { root: containerProp } = props;

  const contextRoot = useProvider()?.rootElement;
  const uniqueId = useId();
  const portalContext = usePortalContext(false);
  const parentPortalNode = portalContext?.portalNode;

  const [containerElement, setContainerElement] = React.useState<
    HTMLElement | ShadowRoot | null
  >(null);
  const [portalNode, setPortalNode] = React.useState<HTMLElement | null>(null);

  const containerRef = React.useRef<HTMLElement | ShadowRoot | null>(null);

  const setPortalNodeRef = React.useCallback((node: HTMLDivElement | null) => {
    setPortalNode(node);
  }, []);

  useClientLayoutEffect(() => {
    // Wait for the container to be resolved if explicitly `null`.
    if (containerProp === null) {
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
      containerProp ??
      contextRoot ??
      parentPortalNode ??
      globalThis?.document?.body;

    if (resolvedContainer == null) {
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
  }, [containerProp, contextRoot, parentPortalNode, uniqueId]);

  /* This `createPortal` call injects `portalElement` into the `container`. */
  /* Another call inside `Portal` then injects the children into the new `portalElement`. */
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

export { PortalContextProvider, usePortalNode };
