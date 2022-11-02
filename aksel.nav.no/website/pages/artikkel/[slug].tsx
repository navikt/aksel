import { LayoutPicker } from "@/components";
import {
  SanityT,
  akselDocumentBySlug,
  getAkselDocuments,
  usePreviewSubscription,
} from "@/lib";
import { getClient } from "@/sanity-client";
import React from "react";
import NotFotfund from "../404";

const Page = (props: {
  slug?: string;
  page: SanityT.Schema.aksel_artikkel;
  preview: boolean;
}): JSX.Element => {
  const { data } = usePreviewSubscription(akselDocumentBySlug, {
    params: { slug: `artikkel/${props.slug}` },
    initialData: props.page,
    enabled: props?.preview,
  });

  if (!data) {
    return <NotFotfund />;
  }

  return <LayoutPicker title="Aksel" data={data} />;
};

export const getStaticPaths = async (): Promise<{
  fallback: string;
  paths: { params: { slug: string } }[];
}> => {
  return {
    paths: await getAkselDocuments("aksel_artikkel").then((paths) =>
      paths.map((slug) => ({
        params: {
          slug: slug.replace("artikkel/", ""),
        },
      }))
    ),
    fallback: "blocking",
  };
};

interface StaticProps {
  props: {
    page: SanityT.Schema.aksel_artikkel;
    slug: string;
    preview: boolean;
  };
  notFound: boolean;
  revalidate: number;
}

export const getStaticProps = async ({
  params: { slug },
  preview = false,
}: {
  params: { slug: string };
  preview?: boolean;
}): Promise<StaticProps | { notFound: true }> => {
  const page = await getClient().fetch(akselDocumentBySlug, {
    slug: `artikkel/${slug}`,
  });

  return {
    props: {
      page,
      slug,
      preview,
    },
    notFound: !page && !preview,
    revalidate: 60,
  };
};

export default Page;
