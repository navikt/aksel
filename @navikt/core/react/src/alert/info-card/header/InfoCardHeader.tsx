import { BaseAlert } from "../../base-alert";

type InfoCardHeaderProps = BaseAlert.HeaderProps;

/**
 * @see 🏷️ {@link InfoCardHeaderProps}
 * @example
 * ```jsx
 *  <InfoCard>
 *    <InfoCard.Header icon={<InformationSquareIcon />}>
 *      <InfoCard.Title>Info title</InfoCard.Title>
 *    </InfoCard.Header>
 *  </InfoCard>
 * ```
 */
const InfoCardHeader = BaseAlert.Header;

export { InfoCardHeader };
export type { InfoCardHeaderProps };
