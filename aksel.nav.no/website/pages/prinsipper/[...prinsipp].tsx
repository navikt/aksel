import { LayoutPicker } from "@/components";
import {
  akselPrinsippBySlug,
  /* isValidated, */
  SanityT,
  usePreviewSubscription,
} from "@/lib";
import { getClient } from "@/sanity-client";
import { GetServerSideProps } from "next/types";
import React from "react";
import NotFotfund from "../404";

interface PageProps {
  page: SanityT.Schema.aksel_prinsipp;
  prinsipp: string[];
  preview: boolean;
}

const Page = (props: PageProps): JSX.Element => {
  const { data } = usePreviewSubscription(akselPrinsippBySlug, {
    params: { slug: `prinsipper/${props.prinsipp.join("/")}`, valid: "true" },
    initialData: props.page,
    enabled: props?.preview,
  });

  if (!data) {
    return <NotFotfund />;
  }

  return <LayoutPicker title="Aksel" data={data} />;
};

export const getServerSideProps: GetServerSideProps = async (
  context
): Promise<any | { notFound: true }> => {
  /* const isValidUser = await isValidated(context); */

  if (context.params.prinsipp.length > 2) return { notFound: true };

  const page = await getClient().fetch(akselPrinsippBySlug, {
    slug: `prinsipper/${(context.params.prinsipp as string[]).join("/")}`,
    valid: "true",
  });

  return {
    props: {
      page,
      prinsipp: context.params.prinsipp,
      preview: context.preview ?? false,
    },
    notFound: !page && !context.preview,
  };
};

export default Page;
