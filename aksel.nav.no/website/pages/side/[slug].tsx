import { LayoutPicker } from "@/components";
import { akselBloggBySlug, SanityT, usePreviewSubscription } from "@/lib";
import { getClient } from "@/sanity-client";
import { GetServerSideProps } from "next/types";
import React from "react";
import NotFotfund from "../404";

const Page = (props: {
  slug?: string;
  page: SanityT.Schema.aksel_standalone;
  preview: boolean;
}): JSX.Element => {
  const { data } = usePreviewSubscription(akselBloggBySlug, {
    params: { slug: `side/${props.slug}`, valid: "true" },
    initialData: props.page,
    enabled: props?.preview,
  });

  if (!data) {
    return <NotFotfund />;
  }

  return <LayoutPicker title="Aksel" data={data} />;
};

interface StaticProps {
  props: {
    page: SanityT.Schema.aksel_standalone;
    slug: string;
    preview: boolean;
    validUser?: boolean;
  };
  notFound: boolean;
}

export const getServerSideProps: GetServerSideProps = async (
  context
): Promise<StaticProps | { notFound: true }> => {
  /* const isValidUser = await isValidated(context); */

  const page = await getClient().fetch(akselBloggBySlug, {
    slug: `side/${context.params.slug}`,
    valid: "true" /* `${isValidUser}` */,
  });

  return {
    props: {
      page,
      slug: context.params.slug as string,
      preview: context.preview ?? false,
      /* validUser: isValidUser, */
    },
    notFound: !page && !context.preview,
  };
};

export default Page;
