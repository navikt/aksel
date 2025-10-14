import { BaseAlert } from "../../base-alert";

type InfoCardContentProps = BaseAlert.ContentProps;

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
const InfoCardContent = BaseAlert.Content;

export { InfoCardContent };
export type { InfoCardContentProps };
