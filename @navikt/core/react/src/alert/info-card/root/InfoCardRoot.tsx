import React, { forwardRef } from "react";
import { BaseAlert } from "../../base-alert";
import {
  InfoCardContent,
  type InfoCardContentProps,
} from "../content/InfoCardContent";
import {
  InfoCardHeader,
  type InfoCardHeaderProps,
} from "../header/InfoCardHeader";
import { InfoCardTitle, type InfoCardTitleProps } from "../title/InfoCardTitle";

type InfoCardProps = Omit<
  BaseAlert.RootProps,
  "type" | "global" | "statusType" | "status"
> & {
  /**
   * Changes the HTML element used for the root element.
   *
   * @important When using `section`, provide either `aria-label` or `aria-labelledby` for better accessibility.
   *
   * **Testing**: When using `axe-core` for accessibility testing, `section` might warn about unique landmarks if you have multipe InfoCards on page with the same status.
   * In those cases, consider using `div` as the root element, or adding unique `aria-label` or `aria-labelledby` props.
   * @see [📝 Landmarks unique](https://dequeuniversity.com/rules/axe/4.6/landmark-unique)
   * @default "div"
   */
  as?: "div" | "section";
};

interface InfoCardComponent
  extends React.ForwardRefExoticComponent<
    InfoCardProps & React.RefAttributes<HTMLDivElement>
  > {
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
  Header: typeof InfoCardHeader;

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
  Title: typeof InfoCardTitle;

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
  Content: typeof InfoCardContent;
}

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
const InfoCard = forwardRef<HTMLDivElement, InfoCardProps>(
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
        statusType="message"
        as={as}
      />
    );
  },
) as InfoCardComponent;

InfoCard.Header = InfoCardHeader;
InfoCard.Title = InfoCardTitle;
InfoCard.Content = InfoCardContent;

export { InfoCard, InfoCardContent, InfoCardHeader, InfoCardTitle };
export type {
  InfoCardProps,
  InfoCardHeaderProps,
  InfoCardTitleProps,
  InfoCardContentProps,
};
