import React, { HTMLAttributes, forwardRef } from "react";
import { Theme, useRenameCSS, useThemeInternal } from "../theme/Theme";
import { OverridableComponent } from "../util/types";
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
 *   <Spacer />
 *   <InternalHeader.User name="Ola Normann"  />
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
export const InternalHeader = forwardRef(({ className, ...rest }, ref) => {
  const themeContext = useThemeInternal(false);
  const { cn } = useRenameCSS();

  /*
   * Component is always in "dark" mode, so we manually override global theme.
   */
  if (themeContext) {
    return (
      <Theme theme="dark" asChild hasBackground={false}>
        <header
          {...rest}
          ref={ref}
          className={cn("navds-internalheader", className)}
        />
      </Theme>
    );
  }

  return (
    <header
      data-theme="dark"
      {...rest}
      ref={ref}
      className={cn("navds-internalheader", className)}
    />
  );
}) as InternalHeaderComponent;

InternalHeader.Title = InternalHeaderTitle;
InternalHeader.User = InternalHeaderUser;
InternalHeader.Button = InternalHeaderButton;
InternalHeader.UserButton = InternalHeaderUserButton;

export default InternalHeader;
