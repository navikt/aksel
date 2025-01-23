import Image from "next/legacy/image";
import { GetServerSideProps } from "next/types";
import { BodyLong, BodyShort, Detail, Heading } from "@navikt/ds-react";
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
import { BloggList } from "@/web/blogg-page/parts/BloggList";
import { PagePreview } from "@/web/preview/PagePreview";
import { SEO } from "@/web/seo/SEO";
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
    seo,
    ${contributorsAll},
  }
}`;

export const getServerSideProps: GetServerSideProps = async (
  context,
): Promise<PageProps> => {
  const slug = context.params?.slug as string;
  const { blogg, morePosts } = await getClient().fetch(query, {
    slug: `produktbloggen/${slug}`,
  });

  return {
    props: {
      blogg,
      morePosts,
      slug,
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
        className="aksel-artikkel group/aksel overflow-hidden bg-amber-50 pb-16 pt-[8vw] focus:outline-none sm:pb-32"
      >
        <div className="px-4">
          <div className="dynamic-wrapper-prose text-center">
            <Heading
              level="1"
              size="xlarge"
              className="text-wrap-balance mt-1 hyphens-auto break-words text-5xl leading-[1.2] text-deepblue-800 md:hyphens-none"
            >
              {blogg.heading}
            </Heading>
            {blogg?.ingress && (
              <BodyLong
                size="large"
                className="mt-4 text-2xl leading-normal text-deepblue-700"
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
                  <span className="h-2 w-2 rotate-45 rounded-[1px] bg-deepblue-700 opacity-50" />
                  <BodyShort size="small" as="address" className="not-italic">
                    {authors?.[0]}
                  </BodyShort>
                </>
              )}
            </div>
          </div>
          <div className="relative mx-auto mt-20 aspect-video w-full max-w-3xl rounded-2xl ring-1 ring-border-subtle">
            {blogg?.seo?.image ? (
              <Image
                src={urlFor(blogg?.seo?.image)
                  .auto("format")
                  .quality(100)
                  .url()}
                blurDataURL={urlFor(blogg?.seo?.image)
                  .width(24)
                  .height(24)
                  .blur(10)
                  .url()}
                placeholder="blur"
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
          <div className="relative z-10 mt-8 px-4">
            <SanityBlockContent
              className="dynamic-wrapper-prose"
              blocks={blogg?.content ?? []}
            />
          </div>
        </div>
        <div className="relative z-10 mt-16 px-4">
          <div className="dynamic-wrapper-prose">
            <div className="mx-auto mb-10 h-2 w-2 rotate-45 rounded-[1px] bg-deepblue-800" />
            {authors?.length > 0 && (
              <Detail
                className="mb-2 text-center uppercase text-deepblue-700"
                as="p"
              >
                Bidragsytere
              </Detail>
            )}
            {authors?.length > 0 && (
              <BodyShort
                as="div"
                className="mb-1 flex flex-wrap justify-center gap-1 text-text-subtle"
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
              className="flex justify-center text-text-subtle"
            >
              Publisert: {publishDate}
            </BodyShort>
          </div>
          {morePosts && (
            <div className="mx-auto mt-32 w-full max-w-4xl">
              <Heading level="2" size="large">
                Flere blogginnlegg
              </Heading>
              <ul className="mt-12 grid gap-12">
                {morePosts.map((post) => (
                  <BloggList key={post._id} blogg={post} />
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default function Blogg(props: PageProps["props"]) {
  return props.preview ? (
    <PagePreview
      query={query}
      props={props}
      params={{ slug: `produktbloggen/${props.slug}` }}
    >
      {(previewProps) => <Page {...previewProps} />}
    </PagePreview>
  ) : (
    <Page {...props} />
  );
}
