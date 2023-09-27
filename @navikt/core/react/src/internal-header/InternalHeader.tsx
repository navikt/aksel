import cl from "clsx";
import React, { forwardRef, HTMLAttributes } from "react";
import { OverridableComponent } from "../util/OverridableComponent";
import InternalHeaderButton, {
  InternalHeaderButtonProps,
} from "./InternalHeaderButton";
import InternalHeaderTitle, {
  InternalHeaderTitleProps,
} from "./InternalHeaderTitle";
import InternalHeaderUser, {
  InternalHeaderUserProps,
} from "./InternalHeaderUser";
import InternalHeaderUserButton, {
  InternalHeaderUserButtonProps,
} from "./InternalHeaderUserButton";

export interface InternalHeaderProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

interface InternalHeaderComponent
  extends React.ForwardRefExoticComponent<
    InternalHeaderProps & React.RefAttributes<HTMLElement>
  > {
  /**
   * @see 🏷️ {@link InternalHeaderTitleProps}
   * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
   */
  Title: OverridableComponent<InternalHeaderTitleProps, HTMLAnchorElement>;
  /**
   * @see 🏷️ {@link InternalHeaderUserProps}
   */
  User: React.ForwardRefExoticComponent<
    InternalHeaderUserProps & React.RefAttributes<HTMLDivElement>
  >;
  /**
   * @see 🏷️ {@link InternalHeaderButtonProps}
   * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
   */
  Button: OverridableComponent<InternalHeaderButtonProps, HTMLButtonElement>;
  /**
   * @see 🏷️ {@link InternalHeaderUserButtonProps}
   * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
   */
  UserButton: OverridableComponent<
    InternalHeaderUserButtonProps,
    HTMLButtonElement
  >;
}

/**
 * Simple Header for internal pages and systems.
 *
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/i-header)
 * @see 🏷️ {@link InternalHeaderProps}
 *
 * @example
 * ```jsx
 * <InternalHeader>
 *   <InternalHeader.Title as="h1">Sykepenger</InternalHeader.Title>
 *   <InternalHeader.User name="Ola Normann" className="ml-auto" />
 * </InternalHeader>
 * ```
 * @example
 * ```jsx
 * <InternalHeader >
 *  <InternalHeader.Title href="/#home">Tittel med lenke</InternalHeader.Title>
 *  <Dropdown>
 *    <InternalHeader.Button
 *      as={Dropdown.Toggle}
 *    >
 *      <MenuGridIcon title="MenuGridIconer og oppslagsverk" />
 *    </InternalHeader.Button>
 *    <Dropdown.Menu />
 *  </Dropdown>
 * </InternalHeader>
 * ```
 */
export const InternalHeader = forwardRef(({ className, ...rest }, ref) => (
  <header
    data-theme="dark"
    {...rest}
    ref={ref}
    className={cl("navds-internalheader", className)}
  />
)) as InternalHeaderComponent;

InternalHeader.Title = InternalHeaderTitle;
InternalHeader.User = InternalHeaderUser;
InternalHeader.Button = InternalHeaderButton;
InternalHeader.UserButton = InternalHeaderUserButton;

export default InternalHeader;
