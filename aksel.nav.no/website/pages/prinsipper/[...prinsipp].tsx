import {
  abbrName,
  Bilde,
  BreadCrumbs,
  dateStr,
  Feedback,
  TableOfContents,
} from "@/components";
import { Footer } from "@/layout";
import { contributorsAll, destructureBlocks, urlFor } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { getClient } from "@/sanity-client";
import {
  AkselPrinsippDocT,
  NextPageT,
  ResolveContributorsT,
  ResolveSlugT,
} from "@/types";
import { BodyShort, Heading, Ingress, Label } from "@navikt/ds-react";
import cl from "clsx";
import { Header } from "components/layout/header/Header";
import { PreviewSuspense } from "next-sanity/preview";
import Head from "next/head";
import { GetServerSideProps } from "next/types";
import { lazy } from "react";
import NotFotfund from "../404";

type PageProps = NextPageT<{
  prinsipp: ResolveContributorsT<ResolveSlugT<AkselPrinsippDocT>>;
}>;

export const query = `{
  "prinsipp": *[slug.current == $slug] | order(_updatedAt desc)[0]
  {
    ...,
    "slug": slug.current,
    "content": select(
      $valid == "true" => content[]{
        ...,
        ${destructureBlocks}
      },
      $valid != "true" => []
    ),
    ${contributorsAll}
  }
}`;

export const getServerSideProps: GetServerSideProps = async (
  context
): Promise<PageProps> => {
  const { prinsipp } = await getClient().fetch(query, {
    slug: `prinsipper/${(context.params?.prinsipp as string[]).join("/")}`,
    valid: "true",
  });

  return {
    props: {
      prinsipp,
      slug: (context.params?.prinsipp as string[]).join("/"),
      preview: context.preview ?? false,
      id: prinsipp?._id,
      title: prinsipp?.heading ?? "",
    },
    notFound:
      (!prinsipp && !context.preview) || context.params.prinsipp.length > 2,
  };
};

const Page = ({ prinsipp: data }: PageProps["props"]) => {
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
  const mainPage = data?.prinsipp?.hovedside;

  return (
    <>
      <Head>
        <title>{`${data?.heading} - Prinsipp - Aksel`}</title>
        <meta
          property="og:title"
          content={`${data?.heading} - Aksel`}
          key="ogtitle"
        />
        <meta
          property="og:description"
          content={data?.seo?.meta ?? data?.ingress}
          key="ogdesc"
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:image"
          content={
            data?.seo?.image
              ? urlFor(data?.seo?.image)
                  .width(1200)
                  .height(630)
                  .fit("crop")
                  .quality(100)
                  .url()
              : ""
          }
          key="ogimage"
        />
      </Head>
      <Header variant={mainPage ? "default" : "subtle"} />
      <main
        tabIndex={-1}
        id="hovedinnhold"
        className={cl("aksel-artikkel pt-4 focus:outline-none", {
          "bg-white": mainPage,
          "bg-surface-subtle": !mainPage,
        })}
      >
        <article className="overflow-x-clip">
          <div
            className={cl("max-w-aksel mx-auto px-4 sm:w-[90%]", {
              "pb-32": mainPage,
            })}
          >
            <div className="pt-12">
              <div className="mx-auto mb-16 max-w-prose lg:ml-0 ">
                {!mainPage && (
                  <BreadCrumbs
                    text={`Prinsipper for ${data?.prinsipp?.prinsippvalg}`}
                    href={`/prinsipper/${data?.prinsipp?.prinsippvalg}`}
                  />
                )}
                <Heading
                  level="1"
                  size="large"
                  className="text-deepblue-700 mt-4 md:text-5xl"
                >
                  {data.heading}
                </Heading>
                {data?.ingress && (
                  <Ingress className="override-text-700 mt-5 text-2xl">
                    {data?.ingress}
                  </Ingress>
                )}
                <div className="mt-6 flex gap-3 text-base">
                  <BodyShort
                    size="small"
                    as="span"
                    className="text-text-subtle "
                  >
                    {dateStr(data?._updatedAt)}
                  </BodyShort>
                  {authors?.length > 0 && (
                    <BodyShort
                      size="small"
                      as="div"
                      className="flex flex-wrap gap-1"
                    >
                      <address className="not-italic">{authors[0]}</address>
                    </BodyShort>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            className={cl("pt-32", {
              "bg-gray-100": mainPage,
            })}
          >
            <div className="max-w-aksel mx-auto px-4 sm:w-[90%]">
              <div className="pb-16 md:pb-32">
                <div className="relative mx-auto mt-4 max-w-prose lg:ml-0 lg:grid lg:max-w-none lg:grid-flow-row-dense lg:grid-cols-3 lg:items-start lg:gap-x-12">
                  <TableOfContents
                    changedState={data?.content ?? []}
                    hideToc={false}
                    aksel
                  />
                  <div className="max-w-prose lg:col-span-2 lg:col-start-1">
                    {data?.hero_bilde && (
                      <Bilde
                        node={data.hero_bilde as any}
                        className="-mt-36 mb-10 sm:-mt-72"
                      />
                    )}
                    <SanityBlockContent
                      blocks={data?.content ?? []}
                      variant="aksel"
                    />
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
                      <BodyShort as="span" className="text-text-subtle ">
                        Publisert:{" "}
                        {dateStr(data?.publishedAt ?? data?._updatedAt)}
                      </BodyShort>
                    </div>
                    <div className="mt-12 md:mt-16">
                      <Feedback
                        akselFeedback
                        docId={data?._id}
                        docType={data?._type}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
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
          query={query}
          props={props}
          params={{
            slug: `prinsipper/${props.slug}`,
            valid: "true",
          }}
        />
      </PreviewSuspense>
    );
  }

  return <Page {...props} />;
};

export default Wrapper;
