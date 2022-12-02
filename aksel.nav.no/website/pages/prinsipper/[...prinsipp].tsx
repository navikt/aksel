import { LayoutPicker } from "@/components";
import {
  akselPrinsippBySlug,
  /* isValidated, */
  SanityT,
} from "@/lib";
import { getClient } from "@/sanity-client";
import { PreviewSuspense } from "next-sanity/preview";
import { GetServerSideProps } from "next/types";
import React, { lazy } from "react";
import NotFotfund from "../404";

interface PageProps {
  prinsipp: SanityT.Schema.aksel_prinsipp;
  slug: string[];
  preview: boolean;
}

const Page = (props: PageProps): JSX.Element => {
  if (!props?.prinsipp) {
    return <NotFotfund />;
  }

  return <LayoutPicker title="Aksel" data={props.prinsipp} />;
};

const WithPreview = lazy(() => import("../../components/WithPreview"));

const Wrapper = (props: any): JSX.Element => {
  if (props?.preview) {
    return (
      <PreviewSuspense fallback={<Page {...props} />}>
        <WithPreview
          comp={Page}
          query={akselPrinsippBySlug}
          props={props}
          params={{
            slug: `prinsipper/${props.slug.join("/")}`,
            valid: "true",
          }}
        />
      </PreviewSuspense>
    );
  }

  return <Page {...props} />;
};

export default Wrapper;

export const getServerSideProps: GetServerSideProps = async (
  context
): Promise<any | { notFound: true }> => {
  /* const isValidUser = await isValidated(context); */

  if (context.params.prinsipp.length > 2) return { notFound: true };

  const { prinsipp } = await getClient().fetch(akselPrinsippBySlug, {
    slug: `prinsipper/${(context.params.prinsipp as string[]).join("/")}`,
    valid: "true",
  });

  return {
    props: {
      prinsipp,
      slug: context.params.prinsipp,
      preview: context.preview ?? false,
    },
    notFound: !prinsipp && !context.preview,
  };
};
