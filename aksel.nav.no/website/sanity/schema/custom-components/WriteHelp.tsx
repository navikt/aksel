import { useClient } from "sanity";
import useSWR from "swr";
import { SanityBlockContent } from "@/sanity-block";

export const WriteHelp = () => {
  const client = useClient({ apiVersion: "2021-06-07" });
  const { data, error } = useSWR(`*[_id == "skrivehjelp"][0]`, (query) =>
    client.fetch(query)
  );

  if (error) {
    return <div>Kan ikke hente skrivehjelp...</div>;
  }

  const content = data?.content;

  return <SanityBlockContent blocks={content ?? []} />;
};

export default WriteHelp;
