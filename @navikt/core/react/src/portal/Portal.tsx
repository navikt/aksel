import React, { HTMLAttributes, forwardRef } from "react";
import ReactDOM from "react-dom";
import { useProvider } from "../provider/Provider";
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
    const contextRoot = useProvider()?.rootElement;
    const root = rootElement ?? contextRoot ?? globalThis?.document?.body;

    const Component = asChild ? Slot : "div";

    /**
     * Portal can be mounted outside of theme-classNames.
     * If a theme is present, we want to make sure that theme cascades to portaled element.
     */
    if (themeContext?.isDarkside) {
      return root
        ? ReactDOM.createPortal(
            <Theme
              theme={themeContext.theme}
              asChild
              hasBackground={false}
              data-color={themeContext.color}
            >
              <Component ref={ref} data-aksel-portal="" {...rest} />
            </Theme>,
            root,
          )
        : null;
    }

    return root
      ? ReactDOM.createPortal(
          <Component ref={ref} data-aksel-portal="" {...rest} />,
          root,
        )
      : null;
  },
);

export default Portal;
