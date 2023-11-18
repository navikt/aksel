/**
 * https://www.sanity.io/guides/ultimate-guide-for-customising-portable-text-from-schema-to-react-component
 */

import { SANITY_API_VERSION } from "@/sanity/config";
import { Tooltip } from "@navikt/ds-react";
import { useClient } from "sanity";
import useSWR from "swr";

export const ExternalLinkRenderer = (props) => {
  return (
    <Tooltip
      content={props.value?.href || "Ingen lenke definert"}
      placement="bottom"
    >
      {props.renderDefault(props)}
    </Tooltip>
  );
};

export const InternalLinkRenderer = (props) => {
  const client = useClient({
    apiVersion: SANITY_API_VERSION,
  });

  const { data, error, isValidating } = useSWR(
    `*[_id == "${props.value?.reference?._ref}"]{heading, 'slug': slug.current}[0]`,
    (query) => client.fetch(query)
  );

  console.log({ data, error, isValidating });

  if (
    error ||
    !data ||
    (data && (data.heading === null || !data.slug === null))
  ) {
    return props.renderDefault(props);
  }

  return (
    <Tooltip
      content={
        isValidating ? "Henter lenke" : `${data?.heading}: /${data?.slug}`
      }
      /* Unknown how long title + slug will be */
      maxChar={999}
      placement="bottom"
    >
      {props.renderDefault(props)}
    </Tooltip>
  );
};
