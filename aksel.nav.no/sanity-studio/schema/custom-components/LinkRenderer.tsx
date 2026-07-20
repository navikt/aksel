/**
 * https://www.sanity.io/guides/ultimate-guide-for-customising-portable-text-from-schema-to-react-component
 */
import type { FieldProps } from "sanity";
import { Tooltip } from "@navikt/ds-react";

export const ExternalLinkRenderer = (props: FieldProps) => {
  if (props.validation.length > 0) {
    return props.renderDefault(props);
  }

  return (
    <Tooltip
      content={
        (props.value as { href: string })?.href || "Ingen lenke definert"
      }
      placement="bottom"
      maxChar={999}
    >
      {props.renderDefault(props)}
    </Tooltip>
  );
};
