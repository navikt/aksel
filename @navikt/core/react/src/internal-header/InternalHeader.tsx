import React, { type HTMLAttributes, forwardRef } from "react";
import { Theme } from "../theme/Theme";
import { cl } from "../utils/helpers";
import InternalHeaderButton, {
  type InternalHeaderButtonProps,
} from "./InternalHeaderButton";
import InternalHeaderTitle, {
  type InternalHeaderTitleProps,
} from "./InternalHeaderTitle";
import InternalHeaderUser, {
  type InternalHeaderUserProps,
} from "./InternalHeaderUser";
import InternalHeaderUserButton, {
  type InternalHeaderUserButtonProps,
} from "./InternalHeaderUserButton";

interface InternalHeaderProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

interface InternalHeaderComponent extends React.ForwardRefExoticComponent<
  InternalHeaderProps & React.RefAttributes<HTMLElement>
> {
  /**
   * @see 🏷️ {@link InternalHeaderTitleProps}
   * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
   */
  Title: typeof InternalHeaderTitle;
  /**
   * @see 🏷️ {@link InternalHeaderUserProps}
   */
  User: typeof InternalHeaderUser;
  /**
   * @see 🏷️ {@link InternalHeaderButtonProps}
   * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
   */
  Button: typeof InternalHeaderButton;
  /**
   * @see 🏷️ {@link InternalHeaderUserButtonProps}
   * @see [🤖 OverridableComponent](https://aksel.nav.no/grunnleggende/kode/overridablecomponent) support
   */
  UserButton: typeof InternalHeaderUserButton;
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
 *  <ActionMenu>
 *   <ActionMenu.Trigger>
 *    <InternalHeader.Button>
 *      <MenuGridIcon title="MenuGridIconer og oppslagsverk" />
 *    </InternalHeader.Button>
 *   </ActionMenu.Trigger>
 *  </ActionMenu>
 * </InternalHeader>
 * ```
 */
export const InternalHeader = forwardRef(({ className, ...rest }, ref) => {
  /*
   * Component is always in "dark" mode, so we manually override global theme.
   */
  return (
    <Theme theme="dark" asChild hasBackground={false}>
      <header
        {...rest}
        ref={ref}
        className={cl("aksel-internalheader", className)}
      />
    </Theme>
  );
}) as InternalHeaderComponent;

InternalHeader.Title = InternalHeaderTitle;
InternalHeader.User = InternalHeaderUser;
InternalHeader.Button = InternalHeaderButton;
InternalHeader.UserButton = InternalHeaderUserButton;

export default InternalHeader;
export {
  InternalHeaderTitle,
  InternalHeaderUser,
  InternalHeaderButton,
  InternalHeaderUserButton,
};
export type {
  InternalHeaderProps,
  InternalHeaderTitleProps,
  InternalHeaderUserProps,
  InternalHeaderButtonProps,
  InternalHeaderUserButtonProps,
};
