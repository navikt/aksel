/**
 * https://www.sanity.io/guides/ultimate-guide-for-customising-portable-text-from-schema-to-react-component
 */
import type { FieldProps } from "sanity";
import { Tooltip } from "@navikt/ds-react";

export const ExternalLinkRenderer = (props: FieldProps) => {
  if (props.validation.length > 0) {
    return props.renderDefault(props);
  }

  const content =
    (props.value as { href: string })?.href || "Ingen lenke definert";

  return (
    <Tooltip
      content={content.length > 145 ? `${content.substring(0, 140)}…` : content}
      placement="bottom"
      maxChar={145}
    >
      {props.renderDefault(props)}
    </Tooltip>
  );
};
