import React, { forwardRef } from "react";
import { BaseAlert } from "../../utils/components/base-alert";
import {
  LocalAlertCloseButton,
  type LocalAlertCloseButtonProps,
} from "../close-button/LocalAlertCloseButton";
import {
  LocalAlertContent,
  type LocalAlertContentProps,
} from "../content/LocalAlertContent";
import {
  LocalAlertHeader,
  type LocalAlertHeaderProps,
} from "../header/LocalAlertHeader";
import {
  LocalAlertTitle,
  type LocalAlertTitleProps,
} from "../title/LocalAlertTitle";

interface LocalAlertProps extends Omit<
  BaseAlert.RootProps,
  "type" | "global" | "data-color"
> {
  status: Exclude<BaseAlert.RootProps["status"], undefined>;
  /**
   * data-color has no effect on LocalAlert.
   */
  "data-color"?: never;
}

const LocalAlertRoot = forwardRef<HTMLDivElement, LocalAlertProps>(
  ({ status, ...restProps }: LocalAlertProps, forwardedRef) => {
    return (
      <BaseAlert.Root
        ref={forwardedRef}
        role="alert"
        {...restProps}
        type="strong"
        global={false}
        status={status}
      />
    );
  },
);

/**
 * A component for displaying important messages about a certain part of the page.
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/localalert)
 * @see 🏷️ {@link LocalAlertProps}
 * @example
 * ```jsx
 *  <LocalAlert status="error">
 *    <LocalAlert.Header>
 *      <LocalAlert.Title>Alert title</LocalAlert.Title>
 *    </LocalAlert.Header>
 *    <LocalAlert.Content>Content</LocalAlert.Content>
 *  </LocalAlert>
 * ```
 */
const LocalAlert = Object.assign(LocalAlertRoot, {
  /**
   * @see 🏷️ {@link LocalAlertHeaderProps}
   * @example
   * ```jsx
   *  <LocalAlert>
   *    <LocalAlert.Header>
   *      <LocalAlert.Title>Info title</LocalAlert.Title>
   *    </LocalAlert.Header>
   *  </LocalAlert>
   * ```
   */
  Header: LocalAlertHeader,
  /**
   * Title component for LocalAlert. Remember to use correct heading-level with the `as` prop.
   * @see 🏷️ {@link LocalAlertTitleProps}
   * @example
   * ```jsx
   *  <LocalAlert>
   *    <LocalAlert.Header>
   *      <LocalAlert.Title as="h2">Info title</LocalAlert.Title>
   *    </LocalAlert.Header>
   *  </LocalAlert>
   * ```
   */
  Title: LocalAlertTitle,
  /**
   * @see 🏷️ {@link LocalAlertContentProps}
   * @example
   * ```jsx
   *  <LocalAlert>
   *    <LocalAlert.Header>
   *      <LocalAlert.Title>Info title</LocalAlert.Title>
   *    </LocalAlert.Header>
   *
   *    <LocalAlert.Content>Content</LocalAlert.Content>
   *  </LocalAlert>
   * ```
   */
  Content: LocalAlertContent,
  /**
   * @see 🏷️ {@link LocalAlertCloseButtonProps}
   * @example
   * ```jsx
   *  <LocalAlert>
   *    <LocalAlert.Header>
   *      <LocalAlert.Title>Info title</LocalAlert.Title>
   *     <LocalAlert.CloseButton onClick={() => alert("Closed!")} />
   *    </LocalAlert.Header>
   *  </LocalAlert>
   * ```
   */
  CloseButton: LocalAlertCloseButton,
});

export {
  LocalAlert,
  LocalAlertContent,
  LocalAlertHeader,
  LocalAlertTitle,
  LocalAlertCloseButton,
};
export type {
  LocalAlertProps,
  LocalAlertContentProps,
  LocalAlertHeaderProps,
  LocalAlertTitleProps,
  LocalAlertCloseButtonProps,
};
