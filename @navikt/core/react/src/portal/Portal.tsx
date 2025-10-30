import React, { HTMLAttributes, forwardRef } from "react";
import ReactDOM from "react-dom";
import { Slot } from "../slot/Slot";
import { Theme, useThemeInternal } from "../theme/Theme";
import { AsChildProps } from "../util/types";
import { PortalContext, usePortalNode } from "./usePortalNode";

interface PortalBaseProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * An optional container where the portaled content should be appended.
   */
  rootElement?: HTMLElement | null;
}

export type PortalProps = PortalBaseProps & AsChildProps;

export const Portal = forwardRef<HTMLDivElement, PortalProps>(
  ({ rootElement, asChild, ...rest }, ref) => {
    const themeContext = useThemeInternal(false);
    const { portalNode, portalSubtree } = usePortalNode(rootElement);

    const Component = asChild ? Slot : "div";

    if (!portalSubtree && !portalNode) {
      return null;
    }

    /**
     * Portal can be mounted outside of theme-classNames.
     * If a theme is present, we want to make sure that theme cascades to portaled element.
     */
    if (themeContext?.isDarkside) {
      return (
        <>
          {portalSubtree}
          <PortalContext.Provider value={portalNode}>
            {portalNode &&
              ReactDOM.createPortal(
                <Theme
                  theme={themeContext.theme}
                  asChild
                  hasBackground={false}
                  data-color={themeContext.color}
                >
                  <Component ref={ref} {...rest} />
                </Theme>,
                portalNode,
              )}
          </PortalContext.Provider>
        </>
      );
    }

    return (
      <>
        {portalSubtree}
        <PortalContext.Provider value={portalNode}>
          {portalNode &&
            ReactDOM.createPortal(
              <Component ref={ref} {...rest} />,
              portalNode,
            )}
        </PortalContext.Provider>
      </>
    );
  },
);

export default Portal;

/* TODO: Fix ref, there are to many divs now */
