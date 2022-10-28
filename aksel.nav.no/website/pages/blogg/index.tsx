import { BloggCard } from "@/components";
import { AkselHeader, Footer } from "@/layout";
import { SanityT, akselBloggPosts, usePreviewSubscription } from "@/lib";
import { getClient } from "@/sanity-client";
import { Heading } from "@navikt/ds-react";
import Head from "next/head";
import React from "react";
import NotFotfund from "../404";

const Page = (props: PageProps): JSX.Element => {
  const { data: page } = usePreviewSubscription(akselBloggPosts, {
    initialData: props.page,
    enabled: props?.preview,
  });

  if (!page) {
    return <NotFotfund />;
  }

  return (
    <>
      <Head>
        <title>{`Blogg - Aksel`}</title>
        <meta property="og:title" content={`Blogg - Aksel`} />
      </Head>
      <div className="bg-gray-50">
        <AkselHeader variant="inngang" />
        <main
          tabIndex={-1}
          id="hovedinnhold"
          className="min-h-[80vh] bg-gray-100 focus:outline-none"
        >
          <div className="relative bg-white px-4 pt-8 pb-8 md:pt-12">
            <div className="dynamic-wrapper-2xl w-fit">
              <Heading
                level="1"
                size="xlarge"
                spacing
                className="algolia-index-lvl1"
              >
                Blogg
              </Heading>
            </div>
          </div>
          <div className="relative px-4 pt-8 pb-24">
            <div className="dynamic-wrapper-2xl w-fit">
              <div className="mt-4 grid gap-2 divide-y divide-gray-300">
                {page.map((blog) => (
                  <BloggCard key={blog._id} blog={blog} />
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer variant="aksel" />
      </div>
    </>
  );
};

export type AkselBloggPage = Partial<
  SanityT.Schema.aksel_blogg & {
    slug: string;
    contributors?: { title?: string }[];
  }
>;

interface PageProps {
  page: AkselBloggPage[];
  preview: boolean;
}

interface StaticProps {
  props: PageProps;
  notFound: boolean;
  revalidate: number;
}

export const getStaticProps = async ({
  preview = false,
}: {
  preview?: boolean;
}): Promise<StaticProps | { notFound: true }> => {
  const bloggs = await getClient().fetch(akselBloggPosts);

  return {
    props: {
      page: bloggs,
      preview,
    },
    notFound: !bloggs && !preview,
    revalidate: 60,
  };
};

export default Page;
