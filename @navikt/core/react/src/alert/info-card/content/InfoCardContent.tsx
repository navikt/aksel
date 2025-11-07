import { BaseAlert } from "../../base-alert";

type InfoCardContentProps = BaseAlert.ContentProps;

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
const InfoCardContent = BaseAlert.Content;

export { InfoCardContent };
export type { InfoCardContentProps };
