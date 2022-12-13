import { akselBloggBySlug, SanityT, urlFor } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { getClient } from "@/sanity-client";
import { abbrName, dateStr } from "@/utils";
import { BodyShort, Detail, Heading, Ingress } from "@navikt/ds-react";
import Footer from "components/layout/footer/Footer";
import { Header } from "components/layout/header/Header";
import { BloggAd } from "components/website-modules/BloggAd";
import { AkselCubeStatic } from "components/website-modules/cube";
import Feedback from "components/website-modules/feedback";
import TableOfContents from "components/website-modules/TOC";
import { PreviewSuspense } from "next-sanity/preview";
import Head from "next/head";
import Image from "next/image";
import { GetServerSideProps } from "next/types";
import { lazy } from "react";
import NotFotfund from "../404";

const Page = ({
  blogg,
  morePosts,
}: {
  slug?: string;
  blogg: SanityT.Schema.aksel_blogg;
  morePosts: SanityT.Schema.aksel_blogg[];
  preview: boolean;
}): JSX.Element => {
  if (!blogg) {
    return <NotFotfund />;
  }

  if (!blogg.content || !blogg.heading) {
    return null;
  }

  const authors = (blogg?.contributors as any)?.map((x) => x?.title) ?? [];

  return (
    <>
      <Head>
        <title>{`${blogg?.heading} - Aksel`}</title>
        <meta
          property="og:title"
          content={`${blogg?.heading} - Aksel`}
          key="ogtitle"
        />
        <meta
          property="og:description"
          content={blogg?.seo?.meta ?? blogg?.ingress}
          key="ogdesc"
        />
        {authors?.[0] && <meta name="twitter:label1" content="Skrevet av" />}
        {authors?.[0] && <meta name="twitter:data1" content={authors?.[0]} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:label2" content="Publisert" />
        <meta
          name="twitter:data2"
          content={dateStr(blogg?.publishedAt ?? blogg._createdAt)}
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:image"
          content={
            blogg?.seo?.image
              ? urlFor(blogg?.seo?.image)
                  .width(1200)
                  .height(630)
                  .fit("crop")
                  .url()
              : ""
          }
          key="ogimage"
        />
      </Head>

      <Header variant="blogg" />
      <main
        tabIndex={-1}
        id="hovedinnhold"
        className="aksel-artikkel xs:pb-32 overflow-hidden bg-[#FFFCF0] pt-[8vw] pb-16 focus:outline-none"
      >
        <div className="px-4">
          <div className="dynamic-wrapper-prose text-center">
            <Heading
              level="1"
              size="xlarge"
              className="algolia-index-lvl1 hyphen text-deepblue-800 mt-1 break-words text-5xl"
            >
              {blogg.heading}
            </Heading>
            {blogg?.ingress && (
              <Ingress className="text-deepblue-700 mt-4">
                {blogg?.ingress}
              </Ingress>
            )}
            <div className="mt-8 inline-flex flex-wrap items-center gap-2 text-base">
              <Detail uppercase as="span">
                {dateStr(blogg?.publishedAt ?? blogg._createdAt)}
              </Detail>
              {authors?.[0] && (
                <>
                  <span className="bg-deepblue-700 h-2 w-2 rotate-45 rounded-[1px] opacity-50" />
                  <BodyShort size="small" as="address" className="not-italic">
                    {authors?.[0]}
                  </BodyShort>
                </>
              )}
            </div>
          </div>
          {blogg?.seo?.image && (
            <div className="relative mx-auto mt-20 aspect-video w-full max-w-3xl">
              <Image
                src={urlFor(blogg?.seo?.image).auto("format").url()}
                decoding="sync"
                layout="fill"
                objectFit="cover"
                aria-hidden
                priority
                className="rounded-2xl"
                alt="Illustrasjon"
              />
            </div>
          )}
        </div>
        <div className="relative mt-16">
          <AkselCubeStatic className="text-[#FFE78A] opacity-20" />
          <TableOfContents changedState={blogg?.content ?? []} hideToc />
          <div className="mt-8 px-4">
            <SanityBlockContent
              className="dynamic-wrapper-prose"
              blocks={blogg?.content ?? []}
              variant="aksel"
            />
          </div>
        </div>
        <div className="mt-16 px-4">
          <div className="dynamic-wrapper-prose">
            <div className="bg-deepblue-800 mx-auto mb-10 h-2 w-2 rotate-45 rounded-[1px]" />
            {authors?.length > 0 && (
              <Detail
                className="text-deepblue-700 mb-2 text-center uppercase"
                as="p"
              >
                Bidragsytere
              </Detail>
            )}
            {authors?.length > 0 && (
              <BodyShort
                as="div"
                className="text-text-subtle mb-1 flex flex-wrap justify-center gap-1"
              >
                {authors.map(abbrName).map((x, y) => (
                  <address className="not-italic" key={x}>
                    {x}
                    {y !== authors.length - 1 && ", "}
                  </address>
                ))}
              </BodyShort>
            )}
            <BodyShort
              as="span"
              className="text-text-subtle flex justify-center whitespace-nowrap"
            >
              Publisert: {dateStr(blogg?.publishedAt ?? blogg?._updatedAt)}
            </BodyShort>
          </div>
          <div className="dynamic-wrapper-prose pt-16">
            <Feedback akselFeedback docId={blogg?._id} docType={blogg?._type} />
          </div>

          <div className="max-w-content-w-padding mx-auto grid w-full">
            <BloggAd />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
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
    morePosts: SanityT.Schema.aksel_blogg[];
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

  const { blogg, morePosts } = await getClient().fetch(akselBloggBySlug, {
    slug: `produktbloggen/${context.params.slug}`,
    valid: "true" /* `${isValidUser}` */,
  });

  return {
    props: {
      blogg,
      morePosts,
      slug: context.params.slug as string,
      preview: context.preview ?? false,
      id: blogg?._id,
    },
    notFound: !blogg && !context.preview,
  };
};
