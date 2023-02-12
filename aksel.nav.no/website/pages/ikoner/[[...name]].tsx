import { Search } from "@navikt/ds-react";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next/types";
import { useState } from "react";
import metadata from "@navikt/aksel-icons/metadata";

const Page = () => {
  const [query, setQuery] = useState("");
  return (
    <div>
      <Link href="/ikoner">forside</Link>
      <Link href="/ikoner/mute">ikonside</Link>
      <Search value={query} onChange={setQuery} label="Søk" />
    </div>
  );
};
export default Page;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { name: [] } },
      ...Object.keys(metadata).map((x) => ({
        params: { name: [x.toLowerCase()] },
      })),
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      name: params,
    },
  };
};
