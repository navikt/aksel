import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/app/_sanity/live";

type Props = {
  params: Promise<{ category: string; year: string }>;
};

export default async function Page({ params }: Props) {
  const { year } = await params;
  const { data: logsData } = await sanityFetch({
    query: defineQuery(
      `*[_type == "ds_endringsloggartikkel" && endringsdato >= $year && endringsdato <= $nextYear]{endringsdato, endringstype, fremhevet, heading, innhold, merinnhold, vismer, slug}`,
    ),
    params: { year, nextYear: year + 1 },
  });

  //   console.log("test:logsData", logsData);
  return <div>{JSON.stringify(logsData)}</div>;
}
