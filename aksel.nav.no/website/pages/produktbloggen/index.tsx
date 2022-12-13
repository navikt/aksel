import { Footer } from "@/layout";
import { akselBloggPosts, SanityT } from "@/lib";
import { getClient } from "@/sanity-client";
import { dateStr } from "@/utils";
import { BodyLong, BodyShort, Heading, Link } from "@navikt/ds-react";
import { Header } from "components/layout/header/Header";
import { BloggAd } from "components/website-modules/BloggAd";
import {
  getAuthors,
  LatestBloggposts,
} from "components/website-modules/LatestBloggs";
import { PreviewSuspense } from "next-sanity/preview";
import Head from "next/head";
import NextLink from "next/link";
import { lazy } from "react";
import NotFotfund from "../404";

const Page = (props: PageProps): JSX.Element => {
  if (!props.bloggposts) {
    return <NotFotfund />;
  }

  const remainingPosts = props?.bloggposts?.slice(4, props?.bloggposts.length);

  return (
    <>
      <Head>
        <title>Produktbloggen - Aksel</title>
        <meta property="og:title" content="Produktbloggen - Aksel" />
      </Head>
      <div className="bg-[#FFFCF0]">
        <Header variant="blogg" />
        <main
          tabIndex={-1}
          id="hovedinnhold"
          className="min-h-[80vh] focus:outline-none"
        >
          <div className="centered-layout mb-40 grid max-w-screen-2xl">
            <LatestBloggposts bloggs={props?.bloggposts} title="Blogg" />
            {/* Skriv for bloggen */}

            <BloggAd />
            {/* Flere blogger */}
            {remainingPosts && (
              <div>
                <Heading level="2" size="xlarge">
                  Flere blogginnlegg
                </Heading>
                <ul className="mt-12 grid gap-x-3 gap-y-6 sm:grid-cols-2 sm:gap-y-10 md:gap-x-6 lg:grid-cols-3">
                  {remainingPosts.map((blog) => (
                    <li
                      key={blog._id}
                      className="border-b-border-subtle border-b pb-8"
                    >
                      <Heading size="medium" as="div">
                        <NextLink href={`/${blog.slug}`} passHref>
                          <Link className="text-deepblue-500 no-underline hover:underline">
                            {blog.heading}
                          </Link>
                        </NextLink>
                      </Heading>
                      <BodyLong className="mt-2">{blog?.ingress}</BodyLong>
                      {getAuthors(blog).length > 0 && (
                        <BodyShort
                          size="small"
                          className="text-text-subtle mt-6 flex gap-2"
                        >
                          <span className="font-semibold">
                            {getAuthors(blog)[0]}
                          </span>
                          <span>
                            {dateStr(blog?.publishedAt ?? blog._createdAt)}
                          </span>
                        </BodyShort>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

const WithPreview = lazy(() => import("../../components/WithPreview"));

const Wrapper = (props: any): JSX.Element => {
  if (props?.preview) {
    return (
      <PreviewSuspense fallback={<Page {...props} />}>
        <WithPreview comp={Page} query={akselBloggPosts} props={props} />
      </PreviewSuspense>
    );
  }

  return <Page {...props} />;
};

export default Wrapper;

export type AkselBloggPage = Partial<
  SanityT.Schema.aksel_blogg & {
    slug: string;
    contributors?: { title?: string }[];
  }
>;

interface PageProps {
  bloggposts: AkselBloggPage[];
  preview: boolean;
}

interface StaticProps {
  props: PageProps;
  notFound: boolean;
  revalidate: number;
}

export const getStaticProps = async ({
  preview = false,
}: {
  preview?: boolean;
}): Promise<StaticProps | { notFound: true }> => {
  const { bloggposts } = await getClient().fetch(akselBloggPosts);

  return {
    props: {
      bloggposts,
      preview,
    },
    notFound: !bloggposts && !preview,
    revalidate: 60,
  };
};
