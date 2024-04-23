import cl from "clsx";
import { GetServerSideProps } from "next/types";
import { Suspense, lazy } from "react";
import { BodyLong, BodyShort, Heading, Label } from "@navikt/ds-react";
import Bilde from "@/cms/bilde/Bilde";
import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";
import { SanityBlockContent } from "@/sanity-block";
import { getClient } from "@/sanity/client.server";
import { contributorsAll, destructureBlocks } from "@/sanity/queries";
import {
  AkselPrinsippDocT,
  NextPageT,
  ResolveContributorsT,
  ResolveSlugT,
  TableOfContentsT,
} from "@/types";
import { abbrName, dateStr, generateTableOfContents } from "@/utils";
import { SEO } from "@/web/seo/SEO";
import TableOfContents from "@/web/toc/TableOfContents";
import NotFotfund from "../404";

type PageProps = NextPageT<{
  prinsipp: ResolveContributorsT<ResolveSlugT<AkselPrinsippDocT>>;
  publishDate: string;
  toc: TableOfContentsT;
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
  context,
): Promise<PageProps> => {
  const slugs = context.params?.prinsipp as string[];
  const slugString = slugs.join("/");

  const { prinsipp } = await getClient().fetch(query, {
    slug: `prinsipper/${slugString}`,
    valid: "true",
  });

  return {
    props: {
      prinsipp,
      slug: slugString,
      preview: context.preview ?? false,
      id: prinsipp?._id,
      title: prinsipp?.heading ?? "",
      publishDate: await dateStr(prinsipp?.publishedAt ?? prinsipp._createdAt),
      toc: generateTableOfContents({
        content: prinsipp?.content,
        type: "aksel_prinsipp",
      }),
    },
    notFound: (!prinsipp && !context.preview) || slugs.length > 2,
  };
};

const Page = ({ prinsipp: data, publishDate, toc }: PageProps["props"]) => {
  if (!data) {
    return <NotFotfund />;
  }

  if (!data.content || !data.heading) {
    console.warn(
      `Artikkelen har ikke ${
        !data.content ? "innhold" : "overskrift"
      }, så den kan ikke vises.`,
    );
    return null;
  }

  const authors = (data?.contributors as any)?.map((x) => x?.title) ?? [];
  const mainPage = data?.prinsipp?.hovedside;

  return (
    <>
      <SEO
        title={`${data?.heading} - Prinsipp`}
        description={data?.seo?.meta ?? data?.ingress}
        publishDate={publishDate}
        image={data?.seo?.image}
      />
      <Header variant={mainPage ? "default" : "subtle"} />
      <main
        tabIndex={-1}
        id="hovedinnhold"
        className={cl("aksel-artikkel group/aksel pt-4 focus:outline-none", {
          "bg-white": mainPage,
          "bg-surface-subtle": !mainPage,
        })}
      >
        <article className="overflow-x-clip">
          <div
            className={cl("mx-auto max-w-aksel px-4 sm:w-[90%]", {
              "pb-32": mainPage,
            })}
          >
            <div className="pt-12">
              <div className="mx-auto mb-16 max-w-prose lg:ml-0 ">
                <Heading
                  level="1"
                  size="large"
                  className="mt-4 text-deepblue-700 md:text-5xl"
                >
                  {data.heading}
                </Heading>
                {data?.ingress && (
                  <BodyLong
                    size="large"
                    className="override-text-700 mt-5 text-2xl"
                  >
                    {data?.ingress}
                  </BodyLong>
                )}
                <div className="mt-6 flex gap-3 text-base">
                  <BodyShort
                    size="small"
                    as="span"
                    className="text-text-subtle "
                  >
                    {publishDate}
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
            <div className="mx-auto max-w-aksel px-4 sm:w-[90%]">
              <div className="pb-16 md:pb-32">
                <div className="relative mx-auto mt-4 max-w-prose lg:ml-0 lg:grid lg:max-w-none lg:grid-flow-row-dense lg:grid-cols-3 lg:items-start lg:gap-x-12">
                  <TableOfContents toc={toc} />
                  <div className="max-w-prose lg:col-span-2 lg:col-start-1">
                    {data?.hero_bilde && (
                      <Bilde
                        node={data.hero_bilde as any}
                        className="-mt-36 mb-10 sm:-mt-72"
                      />
                    )}
                    <SanityBlockContent blocks={data?.content ?? []} />
                    <div className="mt-12">
                      {authors?.length > 0 && (
                        <Label className="mb-2 text-deepblue-700" as="p">
                          Bidragsytere
                        </Label>
                      )}
                      {authors?.length > 0 && (
                        <BodyShort
                          as="div"
                          className="mb-1 flex flex-wrap gap-1 text-text-subtle"
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
                        Publisert: {publishDate}
                      </BodyShort>
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
            slug: `prinsipper/${props.slug}`,
            valid: "true",
          }}
        />
      </Suspense>
    );
  }

  return <Page {...props} />;
};

export default Wrapper;
