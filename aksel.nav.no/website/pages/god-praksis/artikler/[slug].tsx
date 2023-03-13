import { LayoutPicker } from "@/components";
import { SanityT, akselDocumentBySlug, getAkselDocuments } from "@/lib";
import { getClient } from "@/sanity-client";
import { PreviewSuspense } from "next-sanity/preview";
import React, { lazy } from "react";
import NotFotfund from "../../404";

const Page = (props: {
  slug?: string;
  page: SanityT.Schema.aksel_artikkel;
  preview: boolean;
}): JSX.Element => {
  if (!props?.page) {
    return <NotFotfund />;
  }

  return <LayoutPicker title="Aksel" data={props.page} />;
};

const WithPreview = lazy(() => import("../../../components/WithPreview"));

const Wrapper = (props: any): JSX.Element => {
  if (props?.preview) {
    return (
      <PreviewSuspense fallback={<Page {...props} />}>
        <WithPreview
          comp={Page}
          query={akselDocumentBySlug}
          props={props}
          params={{
            slug: `god-praksis/artikler/${props?.slug}`,
          }}
        />
      </PreviewSuspense>
    );
  }

  return <Page {...props} />;
};

export default Wrapper;

export const getStaticPaths = async (): Promise<{
  fallback: string;
  paths: { params: { slug: string } }[];
}> => {
  return {
    paths: await getAkselDocuments("aksel_artikkel").then((paths) =>
      paths.map((slug) => ({
        params: {
          slug: slug.replace("god-praksis/artikler/", ""),
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
    id?: string;
    title: string;
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
  const { page } = await getClient().fetch(akselDocumentBySlug, {
    slug: `god-praksis/artikler/${slug}`,
  });

  return {
    props: {
      page,
      slug,
      preview,
      id: page?._id ?? "",
      title: page?.heading ?? "",
    },
    notFound: !page && !preview,
    revalidate: 60,
  };
};
