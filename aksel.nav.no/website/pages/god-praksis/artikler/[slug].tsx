import NextLink from "next/link";
import { GetServerSideProps } from "next/types";
import { Suspense, lazy, useState } from "react";
import { ChevronRightIcon } from "@navikt/aksel-icons";
import { BodyLong, BodyShort, Detail, Heading, Label } from "@navikt/ds-react";
import { getAuthUser } from "@/auth/getAuthUser";
import { validateWonderwallToken } from "@/auth/validateWonderwall";
import ArtikkelCard from "@/cms/cards/ArtikkelCard";
import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";
import { SanityBlockContent } from "@/sanity-block";
import { getClient } from "@/sanity/client.server";
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
  TableOfContentsT,
} from "@/types";
import { abbrName, dateStr, generateTableOfContents } from "@/utils";
import { BreadCrumbs } from "@/web/BreadCrumbs";
import { Feedback } from "@/web/Feedback";
import { SEO } from "@/web/seo/SEO";
import TableOfContents from "@/web/toc/TableOfContents";
import NotFotfund from "../../404";

type PageProps = NextPageT<{
  page: ResolveContributorsT<
    ResolveTemaT<ResolveSlugT<ResolveRelatedArticlesT<AkselGodPraksisDocT>>>
  >;
  publishDate: string;
  verifiedDate: string;
  toc: TableOfContentsT;
  signedIn: boolean;
  user: {
    name: string | null;
    email: string | null;
  };
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

export const getServerSideProps: GetServerSideProps = async (
  context,
): Promise<PageProps> => {
  const signedIn = await validateWonderwallToken(context.req.headers);

  // TODO: why does the typing not work here? shouldn't have to specify it
  const user: { name: string | null; email: string | null } = getAuthUser(
    context.req.headers,
  );

  const isPreview = context.preview ?? false;

  const slug = context.params.slug as string;
  const { page } = await getClient().fetch(query, {
    slug: `god-praksis/artikler/${slug}`,
  });

  return {
    props: {
      page,
      slug,
      preview: isPreview,
      id: page?._id ?? "",
      title: page?.heading ?? "",
      verifiedDate: await dateStr(
        page?.updateInfo?.lastVerified ?? page?.publishedAt ?? page?._updatedAt,
      ),
      publishDate: await dateStr(page?.publishedAt ?? page?._updatedAt),
      toc: generateTableOfContents({
        content: page?.content,
        type: "aksel_artikkel",
      }),
      signedIn,
      user,
    },
    notFound: !page && !isPreview,
  };
};

const Page = ({
  page: data,
  publishDate,
  verifiedDate,
  toc,
  signedIn,
  user,
}: PageProps["props"]) => {
  const [sentFeedback, setSentFeedback] = useState(false);

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
            className="px-4 text-deepblue-700"
            id="relevante-artikler-aside"
          >
            {data?.relevante_artikler?.length === 1
              ? `Les også`
              : `Relevante artikler`}
          </Heading>
          <div className="card-grid-3-1 mt-6 px-4">
            {data.relevante_artikler.map((x: any) =>
              x && x?._id ? (
                <ArtikkelCard level="3" {...x} key={x._id} />
              ) : null,
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
        <div className="mx-auto max-w-aksel px-4 sm:w-[90%]">
          <article className="pb-16 pt-12 md:pb-32">
            <div className="mx-auto mb-16 max-w-prose lg:ml-0">
              <BreadCrumbs auto />
              <Heading
                level="1"
                size="large"
                className="text-wrap-balance mt-4 text-deepblue-800 md:text-5xl"
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
                    <span className="h-2 w-2 rotate-45 rounded-[1px] bg-deepblue-700 opacity-25" />
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
                        className="flex min-h-8 items-center justify-center gap-[2px] rounded-full bg-surface-neutral-subtle pl-4  pr-1 text-deepblue-800 ring-1 ring-inset ring-border-subtle hover:bg-surface-neutral-subtle-hover focus:outline-none focus-visible:shadow-focus"
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
              <TableOfContents toc={toc} variant="subtle" />
              <div className="max-w-prose lg:col-span-2 lg:col-start-1">
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
                  <BodyShort as="span" className="text-text-subtle">
                    Publisert: {publishDate}
                  </BodyShort>
                  {signedIn ? (
                    sentFeedback ? (
                      <Feedback
                        username={user.name}
                        state="feedbackSent"
                        setSentFeedback={setSentFeedback}
                      />
                    ) : (
                      <Feedback
                        username={user.name}
                        state="loggedIn"
                        setSentFeedback={setSentFeedback}
                      />
                    )
                  ) : (
                    <Feedback />
                  )}
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
          resolvers={[
            {
              key: "toc",
              dataKeys: ["page.content"],
              cb: (v) =>
                generateTableOfContents({
                  content: v[0],
                  type: "aksel_artikkel",
                }),
            },
          ]}
        />
      </Suspense>
    );
  }

  return <Page {...props} />;
};

export default Wrapper;
