import { SanityBlockContent } from "@/sanity-block";
import { useClient } from "sanity";
import useSWR from "swr";

export const WriteHelp = (props) => {
  const client = useClient({ apiVersion: "2021-06-07" });
  const docType = props.schemaType?.options?.docType;
  const { data, error } = useSWR(`*[_id == "skrivehjelp"][0]`, (query) =>
    client.fetch(query)
  );

  if (error) {
    return <div>Kan ikke hente skrivehjelp...</div>;
  }

  const content = data?.[`${docType}_writeHelp`];

  console.log(content);

  return (
    <div className="flex shrink-0 items-center justify-between">
      <SanityBlockContent blocks={content} />
    </div>
  );
};

export default WriteHelp;
