import { PortableTextBlock } from "next-sanity";
import { useClient } from "sanity";
import useSWR from "swr";
import { CustomPortableText } from "@/app/CustomPortableText";
import { SANITY_API_VERSION } from "@/sanity/config";

export const WriteHelp = () => {
  const client = useClient({ apiVersion: SANITY_API_VERSION });
  const { data, error } = useSWR(`*[_id == "skrivehjelp"][0]`, (query) =>
    client.fetch(query),
  );

  if (error) {
    return <div>Kan ikke hente skrivehjelp...</div>;
  }

  const content = data?.content;

  return <CustomPortableText value={(content ?? []) as PortableTextBlock[]} />;
};

export default WriteHelp;
