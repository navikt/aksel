import { BaseAlert } from "../../base-alert";

type InfoCardTitleProps = BaseAlert.TitleProps;

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
const InfoCardTitle = BaseAlert.Title;

export { InfoCardTitle };
export type { InfoCardTitleProps };
