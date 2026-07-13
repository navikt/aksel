import React, { forwardRef } from "react";
import { BaseAlert } from "../../utils/components/base-alert";
import {
  InfoCardContent,
  type InfoCardContentProps,
} from "../content/InfoCardContent";
import {
  InfoCardHeader,
  type InfoCardHeaderProps,
} from "../header/InfoCardHeader";
import {
  InfoCardMessage,
  type InfoCardMessageProps,
} from "../message/InfoCardMessage";
import { InfoCardTitle, type InfoCardTitleProps } from "../title/InfoCardTitle";

type InfoCardProps = Omit<
  BaseAlert.RootProps,
  "type" | "global" | "status" | "as"
> & {
  /**
   * Changes the HTML element used for the root element.
   *
   * **When using `section`, provide either `aria-label` or `aria-labelledby` for better accessibility.**
   * `axe-core` might warn about unique landmarks if you have multiple InfoCards on page with the same label.
   * In those cases consider updating to unique `aria-label` or `aria-labelledby` props.
   * @see [📝 Landmarks unique](https://dequeuniversity.com/rules/axe/4.6/landmark-unique)
   * @default "div"
   */
  as?: "div" | "section";
};

const InfoCardRoot = forwardRef<HTMLDivElement, InfoCardProps>(
  (
    {
      "data-color": dataColor = "info",
      as = "div",
      ...restProps
    }: InfoCardProps,
    forwardedRef,
  ) => {
    return (
      <BaseAlert.Root
        ref={forwardedRef}
        data-color={dataColor}
        {...restProps}
        type="moderate"
        global={false}
        as={as}
      />
    );
  },
);

/**
 * A component for displaying informational content in a card format.
 * @see [📝 Documentation](https://aksel.nav.no/komponenter/core/infocard)
 * @see 🏷️ {@link InfoCardProps}
 * @example
 * ```jsx
 *  <InfoCard data-color="info">
 *    <InfoCard.Header icon={<InformationSquareIcon aria-hidden />}>
 *      <InfoCard.Title>Info title</InfoCard.Title>
 *    </InfoCard.Header>
 *    <InfoCard.Content>Content</InfoCard.Content>
 *  </InfoCard>
 * ```
 */
const InfoCard = Object.assign(InfoCardRoot, {
  /**
   * @see 🏷️ {@link InfoCardHeaderProps}
   * @example
   * ```jsx
   *  <InfoCard>
   *    <InfoCard.Header icon={<InformationSquareIcon aria-hidden />}>
   *      <InfoCard.Title>Info title</InfoCard.Title>
   *    </InfoCard.Header>
   *  </InfoCard>
   * ```
   */
  Header: InfoCardHeader,
  /**
   * Title component for InfoCard. Remember to use correct heading-level with the `as` prop.
   * @see 🏷️ {@link InfoCardTitleProps}
   * @example
   * ```jsx
   *  <InfoCard>
   *    <InfoCard.Header>
   *      <InfoCard.Title as="h2">Info title</InfoCard.Title>
   *    </InfoCard.Header>
   *  </InfoCard>
   * ```
   */
  Title: InfoCardTitle,
  /**
   * @see 🏷️ {@link InfoCardContentProps}
   * @example
   * ```jsx
   *  <InfoCard>
   *    <InfoCard.Header>
   *      <InfoCard.Title>Info title</InfoCard.Title>
   *    </InfoCard.Header>
   *
   *    <InfoCard.Content>Content</InfoCard.Content>
   *  </InfoCard>
   * ```
   */
  Content: InfoCardContent,
  /**
   * @see 🏷️ {@link InfoCardMessageProps}
   * @example
   * ```jsx
   * <InfoCard data-color="info">
   *   <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
   *     Message contents
   *   </InfoCard.Message>
   * </InfoCard>
   * ```
   */
  Message: InfoCardMessage,
});

export {
  InfoCard,
  InfoCardContent,
  InfoCardHeader,
  InfoCardTitle,
  InfoCardMessage,
};
export type {
  InfoCardProps,
  InfoCardHeaderProps,
  InfoCardTitleProps,
  InfoCardContentProps,
  InfoCardMessageProps,
};
