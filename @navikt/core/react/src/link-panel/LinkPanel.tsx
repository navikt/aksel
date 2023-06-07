import React, { forwardRef } from "react";
import { Panel, OverridableComponent } from "..";

import cl from "clsx";
import { LinkPanelTitle, LinkPanelTitleProps } from "./LinkPanelTitle";
import {
  LinkPanelDescription,
  LinkPanelDescriptionProps,
} from "./LinkPanelDescription";
import { ChevronRightIcon } from "@navikt/aksel-icons";

export interface LinkPanelProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Panel content
   */
  children?: React.ReactNode;
  /**
   * Adds border to panel if true
   * @default true
   */
  border?: boolean;
}

interface LinkPanelComponentType
  extends OverridableComponent<LinkPanelProps, HTMLAnchorElement> {
  /**
   * @see 🏷️ {@link LinkPanelDescriptionProps}
   * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
   */
  Title: OverridableComponent<LinkPanelTitleProps, HTMLDivElement>;
  /**
   * @see 🏷️ {@link LinkPanelDescriptionProps}
   */
  Description: React.ForwardRefExoticComponent<
    LinkPanelDescriptionProps & React.RefAttributes<HTMLDivElement>
  >;
}

/**
 * A component that displays a link panel.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/linkpanel)
 * @see 🏷️ {@link LinkPanelProps}
 * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
 *
 * @example
 * ```jsx
 * <LinkPanel href="#" border>
 *   <LinkPanel.Title>Arbeidssøker eller permittert</LinkPanel.Title>
 *   <LinkPanel.Description>
 *     Om jobb, registrering, CV, dagpenger og feriepenger av dagpenger
 *   </LinkPanel.Description>
 * </LinkPanel>
 * ```
 */
export const LinkPanelComponent: OverridableComponent<
  LinkPanelProps,
  HTMLAnchorElement
> = forwardRef(
  ({ children, as = "a", border = true, className, ...rest }, ref) => {
    return (
      <Panel
        {...rest}
        as={as}
        border={border}
        ref={ref}
        className={cl("navds-link-panel", className)}
      >
        <div className="navds-link-panel__content">{children}</div>
        <ChevronRightIcon className="navds-link-panel__chevron" aria-hidden />
      </Panel>
    );
  }
);

const LinkPanel = LinkPanelComponent as LinkPanelComponentType;

LinkPanel.Title = LinkPanelTitle;
LinkPanel.Description = LinkPanelDescription;

export default LinkPanel;
