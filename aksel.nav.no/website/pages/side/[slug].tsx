import { SanityBlockContent } from "@/sanity-block";
import { getClient } from "@/sanity/client.server";
import { destructureBlocks } from "@/sanity/queries";
import { AkselStandaloneDocT, NextPageT, ResolveSlugT } from "@/types";
import { Heading } from "@navikt/ds-react";
import Footer from "components/layout/footer/Footer";
import { Header } from "components/layout/header/Header";
import { SEO } from "components/website-modules/seo/SEO";
import { GetServerSideProps } from "next/types";
import { Suspense, lazy } from "react";
import NotFotfund from "../404";
import TableOfContents from "components/website-modules/toc/TOC";

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
  context
): Promise<PageProps> => {
  const { page } = await getClient().fetch(query, {
    slug: `side/${context.params.slug}`,
  });

  return {
    props: {
      page,
      slug: context.params.slug as string,
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
          <TableOfContents hideToc />
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

const WithPreview = lazy(() => import("../../components/WithPreview"));

const Wrapper = (props: any) => {
  if (props?.preview) {
    return (
      <Suspense fallback={<Page {...props} />}>
        <WithPreview
          comp={Page}
          query={query}
          props={props}
          params={{
            slug: `side/${props.slug}`,
          }}
        />
      </Suspense>
    );
  }

  return <Page {...props} />;
};

export default Wrapper;
