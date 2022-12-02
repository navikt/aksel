import { LayoutPicker } from "@/components";
import { SanityT, akselBloggBySlug } from "@/lib";
import { getClient } from "@/sanity-client";
import { PreviewSuspense } from "next-sanity/preview";
import { GetServerSideProps } from "next/types";
import React, { lazy } from "react";
import NotFotfund from "../404";

const Page = (props: {
  slug?: string;
  blogg: SanityT.Schema.aksel_blogg;
  preview: boolean;
}): JSX.Element => {
  if (!props?.blogg) {
    return <NotFotfund />;
  }

  return <LayoutPicker title="Aksel" data={props.blogg} />;
};

const WithPreview = lazy(() => import("../../components/WithPreview"));

const Wrapper = (props: any): JSX.Element => {
  if (props?.preview) {
    return (
      <PreviewSuspense fallback={<Page {...props} />}>
        <WithPreview
          comp={Page}
          query={akselBloggBySlug}
          props={props}
          params={{ slug: `produktbloggen/${props.slug}`, valid: "true" }}
        />
      </PreviewSuspense>
    );
  }

  return <Page {...props} />;
};

export default Wrapper;

interface StaticProps {
  props: {
    blogg: SanityT.Schema.aksel_blogg;
    slug: string;
    preview: boolean;
    validUser?: boolean;
    id?: string;
  };
  notFound: boolean;
}

export const getServerSideProps: GetServerSideProps = async (
  context
): Promise<StaticProps | { notFound: true }> => {
  /* const isValidUser = await isValidated(context); */

  const { blogg } = await getClient().fetch(akselBloggBySlug, {
    slug: `produktbloggen/${context.params.slug}`,
    valid: "true" /* `${isValidUser}` */,
  });

  return {
    props: {
      blogg,
      slug: context.params.slug as string,
      preview: context.preview ?? false,
      id: blogg?._id,
    },
    notFound: !blogg && !context.preview,
  };
};
