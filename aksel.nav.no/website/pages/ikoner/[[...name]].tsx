import meta from "@navikt/ds-icons/meta.json";
import { GetStaticPaths, GetStaticProps } from "next/types";

import { IconPage } from "components/website-modules/icon-page/IconPage";

const Page = (props: { name: string }) => <IconPage {...props} />;

export default Page;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      /* { params: { name: [] } },
      ...Object.keys(metadata).map((x) => ({
        params: { name: [x] },
      })), */
      { params: { name: [] } },
      ...meta.map((x) => ({
        params: { name: [x.name] },
      })),
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params: { name } }) => {
  return {
    props: {
      name: name ? (typeof name === "string" ? name : name.join("")) : "",
    },
  };
};
