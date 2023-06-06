import React, { forwardRef, HTMLAttributes } from "react";
import InternalHeaderTitle, {
  InternalHeaderTitleType,
} from "./InternalHeaderTitle";
import InternalHeaderUser, {
  InternalHeaderUserType,
} from "./InternalHeaderUser";
import InternalHeaderButton, {
  InternalHeaderButtonType,
} from "./InternalHeaderButton";
import InternalHeaderUserButton, {
  InternalHeaderUserButtonType,
} from "./InternalHeaderUserButton";
import cl from "clsx";

export interface InternalHeaderProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

interface InternalHeaderComponent
  extends React.ForwardRefExoticComponent<
    InternalHeaderProps & React.RefAttributes<HTMLElement>
  > {
  Title: InternalHeaderTitleType;
  User: InternalHeaderUserType;
  Button: InternalHeaderButtonType;
  UserButton: InternalHeaderUserButtonType;
}

/**
 * A component that displays a header with a title and user information.
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
