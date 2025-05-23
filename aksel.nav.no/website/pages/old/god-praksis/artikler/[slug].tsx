import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { differenceInMonths } from "date-fns";
import { GetServerSideProps } from "next/types";
import { BodyLong, BodyShort, Detail, Heading, Label } from "@navikt/ds-react";
import { UserStateT } from "@/auth/auth.types";
import { getAuthUserState } from "@/auth/getUserState";
import Footer from "@/layout/footer/Footer";
import GpArticleCard from "@/layout/god-praksis-page/cards/GpArticleCard";
import { GpTemaLink } from "@/layout/god-praksis-page/chipnavigation/GpTemaLink";
import Header from "@/layout/header/Header";
import { SanityBlockContent } from "@/sanity-block";
import { getClient } from "@/sanity/client.server";
import { contributorsAll, destructureBlocks } from "@/sanity/queries";
import {
  AkselGodPraksisDocT,
  NextPageT,
  ResolveContributorsT,
  ResolveRelatedArticlesT,
  ResolveSlugT,
  TableOfContentsT,
} from "@/types";
import { abbrName, dateStr, generateTableOfContents } from "@/utils";
import { Feedback } from "@/web/Feedback/Feedback";
import OutdatedAlert from "@/web/OutdatedAlert";
import { PagePreview } from "@/web/preview/PagePreview";
import { SEO } from "@/web/seo/SEO";
import { TableOfContents } from "@/web/toc/TableOfContents";
import NotFound from "../../404";

type PageProps = NextPageT<{
  page: ResolveContributorsT<
    ResolveSlugT<ResolveRelatedArticlesT<AkselGodPraksisDocT>>
  > & {
    innholdstype: string;
    undertema: {
      title: string;
      tema: { slug: string; title: string; image: SanityImageSource };
    }[];
  };
  publishDate: string;
  verifiedDate: string;
  outdated: boolean;
  toc: TableOfContentsT;
  userState: UserStateT;
}>;

const query = `{
  "page": *[slug.current == $slug] | order(_updatedAt desc)[0]
  {
    ...,
    "slug": slug.current,
    content[]{
      ...,
      ${destructureBlocks}
    },
    "innholdstype": innholdstype->title,
    "undertema": undertema[]->{
      title,
      "tema": tema->{
        title,
        "slug": slug.current,
        "image": seo.image
      }
    },
    ${contributorsAll},
    relevante_artikler[]->{
      heading,
      ingress,
      "slug": slug.current,
      "innholdstype": innholdstype->title,
    }
  }
}`;

export const getServerSideProps: GetServerSideProps = async (
  context,
): Promise<PageProps> => {
  const userState = await getAuthUserState(context.req.headers);

  const isPreview = context.preview ?? false;

  const slug = context.params?.slug as string;

  const { page } = await getClient().fetch(query, {
    slug: `god-praksis/artikler/${slug}`,
  });

  const verifiedDate =
    page?.updateInfo?.lastVerified ?? page?.publishedAt ?? page?._updatedAt;

  return {
    props: {
      page,
      slug,
      preview: isPreview,
      id: page?._id ?? "",
      title: page?.heading ?? "",
      verifiedDate: await dateStr(verifiedDate),
      outdated: differenceInMonths(new Date(), new Date(verifiedDate)) >= 12,
      publishDate: await dateStr(page?.publishedAt ?? page?._updatedAt),
      toc: generateTableOfContents({
        content: page?.content,
        type: "aksel_artikkel",
      }),
      userState,
    },
    notFound: !page && !isPreview,
  };
};

const Page = ({
  page: data,
  publishDate,
  verifiedDate,
  outdated,
  toc,
  userState,
}: PageProps["props"]) => {
  if (!data) {
    return <NotFound />;
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

  const aside = data?.relevante_artikler &&
    data.relevante_artikler.length > 0 && (
      <aside
        className="overflow-x-clip py-8"
        aria-labelledby="relevante-artikler-aside"
      >
        <div className="relativept-12 pb-16">
          <div className="dynamic-wrapper">
            <Heading
              level="2"
              size="medium"
              className="px-4 text-deepblue-700"
              id="relevante-artikler-aside"
            >
              {data?.relevante_artikler?.length === 1
                ? `Les også`
                : `Relevante artikler`}
            </Heading>
            <div className="card-grid-3-1 mt-6 px-4">
              {data.relevante_artikler.map((x) => (
                <GpArticleCard
                  key={x.heading}
                  href={x.slug}
                  description={x.ingress}
                  innholdstype={x.innholdstype}
                >
                  {x.heading}
                </GpArticleCard>
              ))}
            </div>
          </div>
        </div>
      </aside>
    );

  return (
    <>
      <SEO
        title={data?.heading}
        description={data?.seo?.meta ?? data?.ingress}
        image={data?.seo?.image ?? data.undertema?.[0]?.tema?.image}
        publishDate={publishDate}
        canonical={`/${data.slug}`}
      />

      <Header variant="subtle" />
      <main
        tabIndex={-1}
        id="hovedinnhold"
        className="aksel-artikkel group/aksel bg-surface-subtle pt-4 focus:outline-none"
      >
        <div className="mx-auto max-w-aksel px-4 sm:w-[90%]">
          <article className="pb-16 pt-12 md:pb-32">
            <div className="mx-auto mb-16 max-w-prose lg:ml-0">
              {data.innholdstype && (
                <BodyShort
                  weight="semibold"
                  className="uppercase text-violet-600"
                >
                  {data.innholdstype}
                </BodyShort>
              )}
              <Heading
                level="1"
                size="large"
                className="text-wrap-balance mt-1 text-deepblue-800 md:text-5xl"
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

              <div className="mt-5 grid">
                <Detail as="time" textColor="subtle">
                  {`Oppdatert ${verifiedDate}`}
                </Detail>
                <Detail as="time" textColor="subtle">
                  {`Publisert ${publishDate}`}
                </Detail>
              </div>

              {data.undertema && data.undertema.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {data.undertema.map(({ title, tema }) => (
                    <GpTemaLink
                      key={title}
                      href={`/god-praksis/${
                        tema.slug
                      }?undertema=${encodeURIComponent(title)}`}
                    >
                      {tema.title}
                    </GpTemaLink>
                  ))}
                </div>
              )}
            </div>
            <div className="relative mx-auto mt-4 max-w-prose lg:ml-0 lg:grid lg:max-w-none lg:grid-flow-row-dense lg:grid-cols-3 lg:items-start lg:gap-x-12">
              <TableOfContents toc={toc} variant="subtle" />
              <div className="max-w-prose lg:col-span-2 lg:col-start-1">
                {outdated && <OutdatedAlert />}
                <SanityBlockContent blocks={data?.content ?? []} />
                <div className="mt-12">
                  {authors?.length > 0 && (
                    <Label className="mb-2 text-deepblue-700" as="p">
                      Medvirkende
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
                  {userState && <Feedback userState={userState} />}
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

export default function GodPraksisArticle(props: PageProps["props"]) {
  return props.preview ? (
    <PagePreview
      query={query}
      props={props}
      params={{
        slug: `god-praksis/artikler/${props?.slug}`,
      }}
    >
      {(previewProps, loading) => {
        if (loading) {
          return <Page {...props} />;
        }
        return (
          <Page
            {...previewProps}
            toc={generateTableOfContents({
              content: previewProps?.page?.content,
              type: "aksel_artikkel",
            })}
          />
        );
      }}
    </PagePreview>
  ) : (
    <Page {...props} />
  );
}
