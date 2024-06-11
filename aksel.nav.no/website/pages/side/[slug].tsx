import { GetServerSideProps } from "next/types";
import { Heading } from "@navikt/ds-react";
import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";
import { SanityBlockContent } from "@/sanity-block";
import { getClient } from "@/sanity/client.server";
import { destructureBlocks } from "@/sanity/queries";
import { AkselStandaloneDocT, NextPageT, ResolveSlugT } from "@/types";
import { PagePreview } from "@/web/preview/PagePreview";
import { SEO } from "@/web/seo/SEO";
import NotFotfund from "../404";

type PageProps = NextPageT<{ page: ResolveSlugT<AkselStandaloneDocT> }>;

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
  const slug = context.params?.slug as string;

  const { page } = await getClient().fetch(query, {
    slug: `side/${slug}`,
  });

  return {
    props: {
      page,
      slug,
      preview: context.preview ?? false,
      id: page?._id ?? "",
      title: page?.heading ?? "",
    },
    notFound: !page && !context.preview,
  };
};

/* Standalone-sider */
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

export default function StandalonePage(props: PageProps["props"]) {
  return props?.preview ? (
    <PagePreview
      query={query}
      props={props}
      params={{ slug: `side/${props.slug}` }}
    >
      {(previewProps) => <Page {...previewProps} />}
    </PagePreview>
  ) : (
    <Page {...props} />
  );
}
