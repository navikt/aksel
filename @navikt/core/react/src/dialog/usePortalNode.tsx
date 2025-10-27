import React from "react";
import { useClientLayoutEffect, useId } from "../util";

interface FloatingPortalProps {
  children?: React.ReactNode;
  /**
   * Specifies the root node the portal container will be appended to.
   */
  root?: HTMLElement | null;
}

const attr = `data-aksel-portal-container`;

function useFloatingPortalNode(props: FloatingPortalProps = {}) {
  const { root } = props;

  const uniqueId = useId();
  const [portalNode, setPortalNode] = React.useState<HTMLElement | null>(null);
  const portalNodeRef = React.useRef<HTMLDivElement | null>(null);

  useClientLayoutEffect(() => {
    return () => {
      portalNode?.remove();
      // Allow the subsequent layout effects to create a new node on updates.
      // The portal node will still be cleaned up on unmount.
      // https://github.com/floating-ui/floating-ui/issues/2454
      queueMicrotask(() => {
        portalNodeRef.current = null;
      });
    };
  }, [portalNode]);

  useClientLayoutEffect(() => {
    if (root === null || portalNodeRef.current) {
      return;
    }

    const container = root || document.body;
    const subRoot = document.createElement("div");

    subRoot.id = uniqueId;
    subRoot.setAttribute(attr, "");
    container.appendChild(subRoot);

    portalNodeRef.current = subRoot;
    setPortalNode(subRoot);
  }, [root, uniqueId]);

  return portalNode;
}

export { useFloatingPortalNode };
