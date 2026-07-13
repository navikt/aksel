import React, { forwardRef } from "react";
import { BaseAlert } from "../../utils/components/base-alert";
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

interface GlobalAlertProps extends Omit<
  BaseAlert.RootProps,
  "type" | "global" | "data-color"
> {
  status: Exclude<BaseAlert.RootProps["status"], undefined>;
  /**
   * data-color has no effect on GlobalAlert.
   */
  "data-color"?: never;
  /**
   *  Whether title and content are centered or not.
   * @default true
   */
  centered?: boolean;
}

const GlobalAlertRoot = forwardRef<HTMLDivElement, GlobalAlertProps>(
  ({ centered = true, ...rest }: GlobalAlertProps, forwardedRef) => {
    return (
      <BaseAlert.Root
        ref={forwardedRef}
        role="alert"
        {...rest}
        type="strong"
        global
        data-centered={centered}
      />
    );
  },
);

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
const GlobalAlert = Object.assign(GlobalAlertRoot, {
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
  Header: GlobalAlertHeader,
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
  Title: GlobalAlertTitle,
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
  Content: GlobalAlertContent,
  /**
   * @see 🏷️ {@link GlobalAlertCloseButtonProps}
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
  CloseButton: GlobalAlertCloseButton,
});

export {
  GlobalAlert,
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
