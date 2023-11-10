import ArtikkelCard from "@/cms/cards/ArtikkelCard";
import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";
import { SanityBlockContent } from "@/sanity-block";
import { getClient } from "@/sanity/client.server";
import { getDocuments } from "@/sanity/interface";
import {
  contributorsAll,
  contributorsSingle,
  destructureBlocks,
} from "@/sanity/queries";
import {
  AkselGodPraksisDocT,
  NextPageT,
  ResolveContributorsT,
  ResolveRelatedArticlesT,
  ResolveSlugT,
  ResolveTemaT,
} from "@/types";
import { abbrName, dateStr } from "@/utils";
import { BreadCrumbs } from "@/web/BreadCrumbs";
import { SEO } from "@/web/seo/SEO";
import TableOfContents from "@/web/toc/TOC";
import { ChevronRightIcon } from "@navikt/aksel-icons";
import { BodyLong, BodyShort, Detail, Heading, Label } from "@navikt/ds-react";
import NextLink from "next/link";
import { GetStaticPaths, GetStaticProps } from "next/types";
import { Suspense, lazy } from "react";
import NotFotfund from "../../404";

type PageProps = NextPageT<{
  page: ResolveContributorsT<
    ResolveTemaT<ResolveSlugT<ResolveRelatedArticlesT<AkselGodPraksisDocT>>>
  >;
  publishDate: string;
  verifiedDate: string;
}>;

export const query = `{
  "page": *[slug.current == $slug] | order(_updatedAt desc)[0]
  {
    ...,
    "slug": slug.current,
    content[]{
      ...,
      ${destructureBlocks}
    },
    tema[]->{title, slug, seo},
    ${contributorsAll},
    relevante_artikler[]->{
      _id,
      heading,
      _createdAt,
      _updatedAt,
      publishedAt,
      updateInfo,
      "slug": slug.current,
      "tema": tema[]->tag,
      ingress,
      "contributor": ${contributorsSingle},
    }
  }
}`;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: await getDocuments("aksel_artikkel").then((paths) =>
      paths.map(({ slug }) => ({
        params: {
          slug: slug.replace("god-praksis/artikler/", ""),
        },
      }))
    ),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({
  params: { slug },
  preview = false,
}: {
  params: { slug: string };
  preview?: boolean;
}): Promise<PageProps> => {
  const { page } = await getClient().fetch(query, {
    slug: `god-praksis/artikler/${slug}`,
  });

  return {
    props: {
      page,
      slug,
      preview,
      id: page?._id ?? "",
      title: page?.heading ?? "",
      verifiedDate: await dateStr(
        page?.updateInfo?.lastVerified ?? page?.publishedAt ?? page?._updatedAt
      ),
      publishDate: await dateStr(page?.publishedAt ?? page?._updatedAt),
    },
    notFound: !page && !preview,
    revalidate: 60,
  };
};

const Page = ({
  page: data,
  publishDate,
  verifiedDate,
}: PageProps["props"]) => {
  if (!data) {
    return <NotFotfund />;
  }

  if (!data.content || !data.heading) {
    console.warn(
      `Artikkelen har ikke ${
        !data.content ? "innhold" : "overskrift"
      }, så den kan ikke vises.`
    );
    return null;
  }

  const authors = (data?.contributors as any)?.map((x) => x?.title) ?? [];

  const hasTema = "tema" in data && data.tema && data?.tema.length > 0;

  const aside = data?.relevante_artikler?.length > 0 && (
    <aside
      className="overflow-x-clip py-8"
      aria-labelledby="relevante-artikler-aside"
    >
      <div className="relativept-12 pb-16">
        <div className="dynamic-wrapper">
          <Heading
            level="2"
            size="medium"
            className="text-deepblue-700 px-4"
            id="relevante-artikler-aside"
          >
            {data?.relevante_artikler?.length === 1
              ? `Les også`
              : `Relevante artikler`}
          </Heading>
          <div className="card-grid-3-1 mt-6 px-4">
            {data.relevante_artikler.map((x: any) =>
              x && x?._id ? <ArtikkelCard level="3" {...x} key={x._id} /> : null
            )}
          </div>
        </div>
      </div>
    </aside>
  );

  const filteredTema =
    hasTema && data?.tema?.filter((x: any) => x?.title && x?.slug);

  return (
    <>
      <SEO
        title={data?.heading}
        description={data?.seo?.meta ?? data?.ingress}
        image={data?.seo?.image ?? (data?.tema?.[0] as any)?.seo?.image}
        publishDate={publishDate}
        canonical={`/${data.slug}`}
      />

      <Header variant="subtle" />
      <main
        tabIndex={-1}
        id="hovedinnhold"
        className="aksel-artikkel group/aksel bg-surface-subtle pt-4 focus:outline-none"
      >
        <div className="max-w-aksel mx-auto px-4 sm:w-[90%]">
          <article className="pb-16 pt-12 md:pb-32">
            <div className="mx-auto mb-16 max-w-prose lg:ml-0">
              <BreadCrumbs auto />
              <Heading
                level="1"
                size="large"
                className="text-deepblue-800 mt-4 md:text-5xl"
              >
                {data.heading}
              </Heading>
              {data?.ingress && (
                <BodyLong
                  size="large"
                  className="override-text-700 mt-4 text-2xl"
                >
                  {data?.ingress}
                </BodyLong>
              )}

              <div className="mt-6 inline-flex flex-wrap items-center gap-2 text-base">
                <Detail uppercase as="span">
                  {verifiedDate}
                </Detail>
                {authors?.length > 0 && (
                  <>
                    <span className="bg-deepblue-700 h-2 w-2 rotate-45 rounded-[1px] opacity-25" />
                    <BodyShort
                      size="small"
                      as="div"
                      className="flex flex-wrap gap-1"
                    >
                      <address className="not-italic">{authors?.[0]}</address>
                    </BodyShort>
                  </>
                )}
              </div>
              {hasTema && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {filteredTema.map(({ title, slug }: any) => (
                    <span key={title}>
                      <BodyShort
                        href={`/god-praksis/${slug.current}`}
                        key={title}
                        size="small"
                        as={NextLink}
                        className="min-h-8 text-deepblue-800 focus-visible:shadow-focus bg-surface-neutral-subtle hover:bg-surface-neutral-subtle-hover ring-border-subtle flex items-center  justify-center gap-[2px] rounded-full pl-4 pr-1 ring-1 ring-inset focus:outline-none"
                      >
                        {title}
                        <ChevronRightIcon aria-hidden fontSize="1.25rem" />
                      </BodyShort>
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="relative mx-auto mt-4 max-w-prose lg:ml-0 lg:grid lg:max-w-none lg:grid-flow-row-dense lg:grid-cols-3 lg:items-start lg:gap-x-12">
              <TableOfContents hideToc={false} aksel />
              <div className="max-w-prose lg:col-span-2 lg:col-start-1">
                <SanityBlockContent blocks={data?.content ?? []} />
                <div className="mt-12">
                  {authors?.length > 0 && (
                    <Label className="text-deepblue-700 mb-2" as="p">
                      Bidragsytere
                    </Label>
                  )}
                  {authors?.length > 0 && (
                    <BodyShort
                      as="div"
                      className="text-text-subtle mb-1 flex flex-wrap gap-1"
                    >
                      {authors.map(abbrName).map((x, y) => (
                        <address className="not-italic" key={x}>
                          {x}
                          {y !== authors.length - 1 && ", "}
                        </address>
                      ))}
                    </BodyShort>
                  )}
                  <BodyShort as="span" className="text-text-subtle">
                    Publisert: {publishDate}
                  </BodyShort>
                </div>
              </div>
            </div>
          </article>
        </div>
        {aside}
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
          params={{
            slug: `god-praksis/artikler/${props?.slug}`,
          }}
        />
      </Suspense>
    );
  }

  return <Page {...props} />;
};

export default Wrapper;
