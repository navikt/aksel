import { SanityBlockContent } from "@/sanity-block";
import { SANITY_API_VERSION } from "@/sanity/config";
import { useClient } from "sanity";
import useSWR from "swr";

export const WriteHelp = () => {
  const client = useClient({ apiVersion: SANITY_API_VERSION });
  const { data, error } = useSWR(`*[_id == "skrivehjelp"][0]`, (query) =>
    client.fetch(query),
  );

  if (error) {
    return <div>Kan ikke hente skrivehjelp...</div>;
  }

  const content = data?.content;

  return <SanityBlockContent blocks={content ?? []} />;
};

export default WriteHelp;
