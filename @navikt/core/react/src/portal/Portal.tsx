import React, { HTMLAttributes, forwardRef } from "react";
import ReactDOM from "react-dom";
import { PortalContextProvider, usePortalNode } from "../dialog/usePortalNode";
import { Slot } from "../slot/Slot";
import { Theme, useThemeInternal } from "../theme/Theme";
import { AsChildProps } from "../util/types";

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

    const { portalNode, portalSubtree } = usePortalNode({
      root: rootElement,
    });

    const Component = asChild ? Slot : "div";

    /**
     * Portal can be mounted outside of theme-classNames.
     * If a theme is present, we want to make sure that theme cascades to portaled element.
     */
    if (themeContext?.isDarkside) {
      return (
        <>
          {portalSubtree}
          <PortalContextProvider portalNode={portalNode}>
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
          </PortalContextProvider>
        </>
      );
    }

    return portalNode
      ? ReactDOM.createPortal(<Component ref={ref} {...rest} />, portalNode)
      : null;
  },
);

export default Portal;
