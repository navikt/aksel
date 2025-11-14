import React, {
  HTMLAttributes,
  createContext,
  forwardRef,
  useContext,
} from "react";
import ReactDOM from "react-dom";
import { useProvider } from "../provider/Provider";
import { Theme, useThemeInternal } from "../theme/Theme";
import { useClientLayoutEffect, useMergeRefs } from "../util/hooks";

export interface PortalProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * An optional container where the portaled content should be appended.
   */
  rootElement?: HTMLElement | null;
}

const PortalContext = createContext<HTMLElement | null>(null);

export const Portal = forwardRef<HTMLDivElement, PortalProps>(
  ({ rootElement, children, ...restProps }, forwardedRef) => {
    const providerRootElement = useProvider()?.rootElement;

    const parentPortalNode = useContext(PortalContext);

    const [containerElement, setContainerElement] = React.useState<
      HTMLElement | ShadowRoot | null
    >(null);
    const [portalNode, setPortalNode] = React.useState<HTMLElement | null>(
      null,
    );

    const containerRef = React.useRef<HTMLElement | ShadowRoot | null>(null);

    const mergedRefs = useMergeRefs(forwardedRef, setPortalNode);

    /**
     * We update container in effect to avoid SSR mismatches.
     */
    useClientLayoutEffect(() => {
      /* Wait for the container to be resolved if explicitly `null`. */
      if ((rootElement ?? providerRootElement) === null) {
        if (containerRef.current) {
          containerRef.current = null;
          setPortalNode(null);
          setContainerElement(null);
        }
        return;
      }

      const resolvedContainer =
        rootElement ??
        parentPortalNode ??
        providerRootElement ??
        globalThis?.document?.body;

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
    }, [parentPortalNode, providerRootElement, rootElement]);

    if (!containerElement) {
      return null;
    }

    return ReactDOM.createPortal(
      <PortalDiv ref={mergedRefs} {...restProps} data-aksel-portal="">
        <PortalContext.Provider value={portalNode}>
          {children}
        </PortalContext.Provider>
      </PortalDiv>,
      containerElement,
    );
  },
);

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

export default Portal;
