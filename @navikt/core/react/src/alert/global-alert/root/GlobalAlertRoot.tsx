import React, { forwardRef } from "react";
import { useRenameCSS } from "../../../theme/Theme";
import { BaseAlert } from "../../base-alert";
import {
  GlobalAlertCloseButton,
  type GlobalAlertCloseButtonProps,
} from "../close-button/GlobalAlertCloseButton";
import {
  GlobalAlertContent,
  type GlobalAlertContentProps,
} from "../content/GlobalAlertContent";
import {
  GlobalAlertHeader,
  type GlobalAlertHeaderProps,
} from "../header/GlobalAlertHeader";
import {
  GlobalAlertTitle,
  type GlobalAlertTitleProps,
} from "../title/GlobalAlertTitle";

interface GlobalAlertProps
  extends Omit<BaseAlert.RootProps, "type" | "global" | "data-color"> {
  status: Exclude<BaseAlert.RootProps["status"], undefined>;
  /**
   * Alignment of title and content. It defaults to center.
   */
  alignContent?: "center" | "left";
}

interface GlobalAlertComponent
  extends React.ForwardRefExoticComponent<
    GlobalAlertProps & React.RefAttributes<HTMLDivElement>
  > {
  /**
   * @see 🏷️ {@link GlobalAlertHeaderProps}
   * @example
   * ```jsx
   *  <GlobalAlert>
   *    <GlobalAlert.Header>
   *      <GlobalAlert.Title>Info title</GlobalAlert.Title>
   *    </GlobalAlert.Header>
   *  </GlobalAlert>
   * ```
   */
  Header: typeof GlobalAlertHeader;

  /**
   * Title component for GlobalAlert. Remember to use correct heading-level with the `as` prop.
   * @see 🏷️ {@link GlobalAlertTitleProps}
   * @example
   * ```jsx
   *  <GlobalAlert>
   *    <GlobalAlert.Header>
   *      <GlobalAlert.Title as="h2">Info title</GlobalAlert.Title>
   *    </GlobalAlert.Header>
   *  </GlobalAlert>
   * ```
   */
  Title: typeof GlobalAlertTitle;

  /**
   * @see 🏷️ {@link GlobalAlertContentProps}
   * @example
   * ```jsx
   *  <GlobalAlert>
   *    <GlobalAlert.Header>
   *      <GlobalAlert.Title>Info title</GlobalAlert.Title>
   *    </GlobalAlert.Header>
   *
   *    <GlobalAlert.Content>Content</GlobalAlert.Content>
   *  </GlobalAlert>
   * ```
   */
  Content: typeof GlobalAlertContent;

  /**
   * @see 🏷️ {@link GlobalAlertCloseProps}
   * @example
   * ```jsx
   *  <GlobalAlert>
   *    <GlobalAlert.Header>
   *      <GlobalAlert.Title>Info title</GlobalAlert.Title>
   *     <GlobalAlert.CloseButton onClick={() => alert("Closed!")} />
   *    </GlobalAlert.Header>
   *  </GlobalAlert>
   * ```
   */
  CloseButton: typeof GlobalAlertCloseButton;
}

/**
 * A component for displaying alerts about your app.
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/globalalert)
 * @see 🏷️ {@link GlobalAlertProps}
 * @example
 * ```jsx
 *  <GlobalAlert status="error">
 *    <GlobalAlert.Header>
 *      <GlobalAlert.Title>Alert title</GlobalAlert.Title>
 *    </GlobalAlert.Header>
 *    <GlobalAlert.Content>Content</GlobalAlert.Content>
 *  </GlobalAlert>
 * ```
 */
export const GlobalAlert = forwardRef<HTMLDivElement, GlobalAlertProps>(
  (
    { alignContent = "center", className, ...rest }: GlobalAlertProps,
    forwardedRef,
  ) => {
    const { cn } = useRenameCSS();
    return (
      <BaseAlert.Root
        ref={forwardedRef}
        role="alert"
        {...rest}
        type="strong"
        global
        className={cn(className, {
          "navds-global-alert--align-left": alignContent === "left",
        })}
      />
    );
  },
) as GlobalAlertComponent;

GlobalAlert.Header = GlobalAlertHeader;
GlobalAlert.Title = GlobalAlertTitle;
GlobalAlert.Content = GlobalAlertContent;
GlobalAlert.CloseButton = GlobalAlertCloseButton;

export default GlobalAlert;
export {
  GlobalAlertCloseButton,
  GlobalAlertContent,
  GlobalAlertHeader,
  GlobalAlertTitle,
};
export type {
  GlobalAlertCloseButtonProps,
  GlobalAlertContentProps,
  GlobalAlertHeaderProps,
  GlobalAlertProps,
  GlobalAlertTitleProps,
};
