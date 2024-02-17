import { GetServerSideProps } from "next/types";
import { Heading } from "@navikt/ds-react";
import { PagePreview } from "@/draftmode/PagePreview";
import { getDraftClient } from "@/draftmode/client";
import { draftmodeToken, viewerToken } from "@/draftmode/token";
import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";
import { SanityBlockContent } from "@/sanity-block";
import { destructureBlocks } from "@/sanity/queries";
import { AkselStandaloneDocT, NextPageT, ResolveSlugT } from "@/types";
import { SEO } from "@/web/seo/SEO";
import NotFotfund from "../404";

type PageProps = NextPageT<{ page: ResolveSlugT<AkselStandaloneDocT> }>;

const Page = ({ page }: PageProps["props"]) => {
  if (!page) {
    return <NotFotfund />;
  }

  if (!page.content || !page.heading) {
    return null;
  }

  return (
    <>
      <SEO title={page?.heading} />

      <Header variant="subtle" />
      <main
        tabIndex={-1}
        id="hovedinnhold"
        className="aksel-artikkel group/aksel bg-surface-subtle pb-16 pt-[8vw] focus:outline-none sm:pb-32"
      >
        <div className="px-4">
          <div className="dynamic-wrapper-prose">
            <Heading level="1" size="xlarge" className="mt-1">
              {page.heading}
            </Heading>
          </div>
        </div>
        <div className="mt-12">
          <div className="mt-8 px-4">
            <SanityBlockContent
              className="dynamic-wrapper-prose"
              blocks={page?.content ?? []}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export const query = `{
  "page": *[slug.current == $slug && _type == "aksel_standalone"] | order(_updatedAt desc)[0]
  {
    ...,
    "slug": slug.current,
    content[]{
      ...,
      ${destructureBlocks}
    }
  }
}`;

export const getServerSideProps: GetServerSideProps = async (
  context,
): Promise<PageProps> => {
  const client = getDraftClient({
    draftMode: context.draftMode,
    token: context.draftMode ? draftmodeToken : viewerToken,
  });

  const { page } = await client.fetch(query, {
    slug: `side/${context.params.slug}`,
  });

  return {
    props: {
      page,
      slug: context.params.slug as string,
      preview: context.preview ?? false,
      id: page?._id ?? "",
      title: page?.heading ?? "",
      draftMode: context.draftMode,
      token: context.draftMode ? draftmodeToken : "",
    },
    notFound: !page && !context.preview,
  };
};

export default function StandalonePage(props: PageProps["props"]) {
  return props.draftMode ? (
    <PagePreview
      query={query}
      props={props}
      params={{ slug: `side/${props.slug}` }}
    >
      {(_props) => <Page {..._props} />}
    </PagePreview>
  ) : (
    <Page {...props} />
  );
}
