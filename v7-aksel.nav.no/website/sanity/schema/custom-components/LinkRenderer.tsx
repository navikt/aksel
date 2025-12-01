/**
 * https://www.sanity.io/guides/ultimate-guide-for-customising-portable-text-from-schema-to-react-component
 */
import { useClient } from "sanity";
import useSWR from "swr";
import { Tooltip } from "@navikt/ds-react";
import { SANITY_API_VERSION } from "@/sanity/config";

export const ExternalLinkRenderer = (props) => {
  if (props.validation.length > 0) {
    return props.renderDefault(props);
  }

  return (
    <Tooltip
      content={props.value?.href || "Ingen lenke definert"}
      placement="bottom"
      maxChar={999}
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
    (query) => client.fetch(query),
  );

  if (
    error ||
    props.validation.length > 0 ||
    !data ||
    data.heading === null ||
    data.slug === null
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
      placement="right"
    >
      {props.renderDefault(props)}
    </Tooltip>
  );
};
