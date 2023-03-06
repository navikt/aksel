import meta from "@navikt/aksel-icons/metadata";
import { GetStaticPaths, GetStaticProps } from "next/types";

import { IconPage } from "components/website-modules/icon-page/IconPage";

const Page = (props: { name: string }) => <IconPage {...props} />;

export default Page;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { name: [] } },
      ...Object.keys(meta).map((x) => ({
        params: { name: [x] },
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
