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
  "type" | "global" | "statusType" | "variant"
>;

interface InfoCardComponent
  extends React.ForwardRefExoticComponent<
    InfoCardProps & React.RefAttributes<HTMLDivElement>
  > {
  /**
   * @see 🏷️ {@link InfoCardHeaderProps}
   * @example
   * ```jsx
   *  <InfoCard>
   *    <InfoCard.Header icon={<InformationSquareIcon />}>
   *      <InfoCard.Title>Info tittel</InfoCard.Title>
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
   *      <InfoCard.Title as="h2">Info tittel</InfoCard.Title>
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
   *      <InfoCard.Title>Info tittel</InfoCard.Title>
   *    </InfoCard.Header>
   *
   *    <InfoCard.Content>Innhold</InfoCard.Content>
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
 *    <InfoCard.Header icon={<InformationSquareIcon />}>
 *      <InfoCard.Title>Info tittel</InfoCard.Title>
 *    </InfoCard.Header>
 *    <InfoCard.Content>Innhold</InfoCard.Content>
 *  </InfoCard>
 * ```
 */
const InfoCard = forwardRef<HTMLDivElement, InfoCardProps>(
  (
    { "data-color": dataColor = "info", ...restProps }: InfoCardProps,
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
