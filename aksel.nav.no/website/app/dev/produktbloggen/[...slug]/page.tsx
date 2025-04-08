import Image from "next/image";
import { notFound } from "next/navigation";
import {
  BodyLong,
  BodyShort,
  Detail,
  Heading,
  Page as _Page,
} from "@navikt/ds-react";
// @ts-expect-error weird error with direct imports (going via npm package honors package.json["exports"])
import { PageBlock as _PageBlock } from "@navikt/ds-react/Page";
import { CustomPortableText } from "@/app/CustomPortableText";
import { sanityFetch } from "@/app/_sanity/live";
import { BLOGG_BY_SLUG_QUERY } from "@/app/_sanity/queries";
import { urlFor } from "@/sanity/interface";
import { abbrName, getImage } from "@/utils";
import { parseDesignsystemSlug } from "../../(designsystemet)/slug";

type Props = {
  params: Promise<{ slug: string[] }>;
};

/* https://nextjs.org/docs/app/api-reference/file-conventions/page#props */
export default async function Page({ params }: Props) {
  const { slug } = await params;

  const parsedSlug = parseDesignsystemSlug(slug, "produktbloggen");

  const { data: page } = await sanityFetch({
    query: BLOGG_BY_SLUG_QUERY,
    params: { slug: parsedSlug },
  });

  const { publishedAt: publishDate } = page;
  const authors = (page?.contributors as any)?.map((x) => x?.title) ?? [];

  const imageUrl = urlFor(page?.seo?.image)
    ?.auto("format")
    .quality(100)
    .url();

  if (!page?._id) {
    notFound();
  }

  if (!page.content || !page.heading) {
    return null;
  }

  return (
    <>
      {/*
      <SEO
        title={page?.heading}
        description={page?.seo?.meta ?? page?.ingress}
        image={page?.seo?.image}
        fallbackImage={getImage(page?.heading ?? "", "OG")}
        publishDate={publishDate}
      />
      */}

      <main
        tabIndex={-1}
        id="hovedinnhold"
        className="aksel-artikkel overflow-hidden pb-16 pt-[8vw] focus:outline-none sm:pb-32"
      >
        <_Page>
          <div className="px-4">
            <div className="dynamic-wrapper-prose text-center">
              <Heading
                level="1"
                size="xlarge"
                className="text-wrap-balance mt-1 hyphens-auto break-words text-5xl leading-[1.2] text-deepblue-800 md:hyphens-none"
              >
                {page.heading}
              </Heading>
              {page?.ingress && (
                <BodyLong
                  size="large"
                  className="mt-4 text-2xl leading-normal text-deepblue-700"
                >
                  {page?.ingress}
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
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  blurDataURL={imageUrl}
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
                  src={getImage(page?.heading ?? "", "thumbnail")}
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
          <_PageBlock width="text">
            <div className="relative mt-16">
              <div className="relative z-10 mt-8 px-4">
                <CustomPortableText
                  className="dynamic-wrapper-prose"
                  value={page?.content ?? []}
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
              {/*
          morePosts && (
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
          )
          */}
            </div>
          </_PageBlock>
        </_Page>
      </main>
    </>
  );
}
