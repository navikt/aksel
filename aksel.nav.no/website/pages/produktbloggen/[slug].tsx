import BloggCard from "@/cms/cards/BloggCard";
import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";
import { SanityBlockContent } from "@/sanity-block";
import { getClient } from "@/sanity/client.server";
import { urlFor } from "@/sanity/interface";
import { contributorsAll, destructureBlocks } from "@/sanity/queries";
import {
  AkselBloggDocT,
  NextPageT,
  ResolveContributorsT,
  ResolveSlugT,
} from "@/types";
import { abbrName, dateStr, getImage } from "@/utils";
import { BloggAd } from "@/web/BloggAd";
import { AkselCubeStatic } from "@/web/aksel-cube/AkselCube";
import { SEO } from "@/web/seo/SEO";
import TableOfContents from "@/web/toc/TOC";
import { BodyLong, BodyShort, Detail, Heading } from "@navikt/ds-react";
import Image from "next/legacy/image";
import { GetServerSideProps } from "next/types";
import { Suspense, lazy } from "react";
import NotFotfund from "../404";

type PageProps = NextPageT<{
  blogg: ResolveContributorsT<ResolveSlugT<AkselBloggDocT>>;
  morePosts: ResolveContributorsT<ResolveSlugT<AkselBloggDocT>>[];
  publishDate: string;
}>;

export const query = `{
  "blogg": *[slug.current == $slug && _type == "aksel_blogg"] | order(_updatedAt desc)[0]
  {
    ...,
    "slug": slug.current,
    content[]{
      ...,
      ${destructureBlocks}
    },
    ${contributorsAll}
  },
  "morePosts": *[_type == "aksel_blogg" && slug.current != $slug] | order(publishedAt desc, _updatedAt desc)[0...3] {
    "slug": slug.current,
    heading,
    _createdAt,
    _id,
    ingress,
    ${contributorsAll},
  }
}`;

export const getServerSideProps: GetServerSideProps = async (
  context
): Promise<PageProps> => {
  const { blogg, morePosts } = await getClient().fetch(query, {
    slug: `produktbloggen/${context.params.slug}`,
  });

  return {
    props: {
      blogg,
      morePosts,
      slug: context.params.slug as string,
      preview: context.preview ?? false,
      id: blogg?._id ?? "",
      title: blogg?.heading ?? "",
      publishDate: await dateStr(blogg?.publishedAt ?? blogg?._createdAt),
    },
    notFound: !blogg && !context.preview,
  };
};

const Page = ({ blogg, morePosts, publishDate }: PageProps["props"]) => {
  if (!blogg) {
    return <NotFotfund />;
  }

  if (!blogg.content || !blogg.heading) {
    return null;
  }

  const authors = (blogg?.contributors as any)?.map((x) => x?.title) ?? [];

  return (
    <>
      <SEO
        title={blogg?.heading}
        description={blogg?.seo?.meta ?? blogg?.ingress}
        image={blogg?.seo?.image}
        fallbackImage={getImage(blogg?.heading ?? "", "OG")}
        publishDate={publishDate}
      />

      <Header variant="blogg" />
      <main
        tabIndex={-1}
        id="hovedinnhold"
        className="aksel-artikkel group/aksel overflow-hidden bg-[#FEFCE9] pb-16 pt-[8vw] focus:outline-none sm:pb-32"
      >
        <div className="px-4">
          <div className="dynamic-wrapper-prose text-center">
            <Heading
              level="1"
              size="xlarge"
              className="text-deepblue-800 mt-1 break-words text-5xl leading-[1.2] [hyphens:_auto]"
            >
              {blogg.heading}
            </Heading>
            {blogg?.ingress && (
              <BodyLong
                size="large"
                className="text-deepblue-700 mt-4 text-2xl leading-normal"
              >
                {blogg?.ingress}
              </BodyLong>
            )}
            <div className="mt-8 inline-flex flex-wrap items-center gap-2 text-base">
              <Detail uppercase as="span">
                {publishDate}
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
          <div className="relative mx-auto mt-20 aspect-video w-full max-w-3xl">
            {blogg?.seo?.image ? (
              <Image
                src={urlFor(blogg?.seo?.image)
                  .auto("format")
                  .quality(100)
                  .url()}
                decoding="sync"
                layout="fill"
                objectFit="cover"
                aria-hidden
                priority
                className="rounded-2xl"
                alt=""
                quality={100}
              />
            ) : (
              <Image
                src={getImage(blogg?.heading ?? "", "thumbnail")}
                decoding="sync"
                layout="fill"
                objectFit="cover"
                aria-hidden
                priority
                className="rounded-2xl"
                alt=""
              />
            )}
          </div>
        </div>
        <div className="relative mt-16">
          <AkselCubeStatic className="text-[#FFE78A] opacity-20" />
          <TableOfContents hideToc />
          <div className="mt-8 px-4">
            <SanityBlockContent
              className="dynamic-wrapper-prose"
              blocks={blogg?.content ?? []}
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
              className="text-text-subtle flex justify-center"
            >
              Publisert: {publishDate}
            </BodyShort>
          </div>
          {morePosts && (
            <div className="mx-auto mt-32 w-full max-w-4xl">
              <Heading level="2" size="large">
                Flere blogginnlegg
              </Heading>
              <ul className="mt-12 grid gap-x-6 gap-y-6 md:grid-cols-2 md:gap-x-6 md:gap-y-10 lg:grid-cols-3">
                {morePosts.map((post) => (
                  <BloggCard key={post._id} blog={post} />
                ))}
              </ul>
            </div>
          )}

          <div className="mx-auto grid w-full max-w-4xl">
            <BloggAd />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

const WithPreview = lazy(() => import("@/preview"));

const Wrapper = (props: any) => {
  if (props?.preview) {
    return (
      <Suspense fallback={<Page {...props} />}>
        <WithPreview
          comp={Page}
          query={query}
          props={props}
          params={{ slug: `produktbloggen/${props.slug}` }}
        />
      </Suspense>
    );
  }

  return <Page {...props} />;
};

export default Wrapper;
