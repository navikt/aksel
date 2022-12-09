import BlockContent from "@sanity/block-content-to-react";
import { useClient } from "sanity";
import useSWR from "swr";
import { serializers } from "../../util";

export const WriteHelp = (props) => {
  const client = useClient({ apiVersion: "2021-06-07" });
  const { data, error } = useSWR(`*[_id == "skrivehjelp"][0]`, (query) =>
    client.fetch(query)
  );

  if (error) {
    return <div>Kan ikke hente skrivehjelp...</div>;
  }

  const content = data?.content;

  return (
    <div className="flex shrink-0 items-center justify-between">
      <BlockContent
        blocks={content ?? []}
        serializers={serializers}
        options={{ size: "small" }}
        renderContainerOnSingleChild
      />
    </div>
  );
};

export default WriteHelp;
