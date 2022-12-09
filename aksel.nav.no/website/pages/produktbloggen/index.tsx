import { Footer } from "@/layout";
import { akselBloggPosts, SanityT } from "@/lib";
import { getClient } from "@/sanity-client";
import { dateStr } from "@/utils";
import { BodyLong, BodyShort, Heading, Link } from "@navikt/ds-react";
import { Header } from "components/layout/header/Header";
import {
  getAuthors,
  LatestBlogs,
} from "components/website-modules/LatestBloggs";
import { PreviewSuspense } from "next-sanity/preview";
import Head from "next/head";
import NextLink from "next/link";
import { lazy } from "react";
import NotFotfund from "../404";

const CubeLarge = () => (
  <svg
    width="1016"
    height="320"
    viewBox="0 0 1016 320"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="pointer-events-none absolute right-0 hidden lg:block"
    aria-hidden
  >
    <path
      d="M849.229 637.344L1096.48 390.09L849.228 142.836L601.975 390.09L849.229 637.344Z"
      stroke="white"
      strokeOpacity="0.4"
      strokeWidth="3.54219"
      strokeLinejoin="round"
    />
    <path
      d="M872.671 119.393L1119.93 -127.861H873.041L625.787 119.393H872.671Z"
      stroke="white"
      strokeOpacity="0.4"
      strokeWidth="3.54219"
      strokeLinejoin="round"
    />
  </svg>
);

const CubeSmall = () => (
  <svg
    className="pointer-events-none absolute left-0 max-w-full overflow-hidden lg:hidden"
    width="390"
    height="290"
    viewBox="0 0 390 290"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M-0.327544 508.393L246.927 261.139H0.0431418L-247.212 508.393H-0.327544Z"
      stroke="white"
      strokeOpacity="0.4"
      strokeWidth="3.54219"
      strokeLinejoin="round"
    />
    <path
      d="M517.621 -9.55799L764.876 237.697L517.992 237.697L270.737 -9.55799H517.621Z"
      stroke="white"
      strokeOpacity="0.4"
      strokeWidth="3.54219"
      strokeLinejoin="round"
    />
  </svg>
);

const Page = (props: PageProps): JSX.Element => {
  if (!props.bloggposts) {
    return <NotFotfund />;
  }

  /* TODO: slice(4, -1) etter testing*/
  const remainingPosts = props?.bloggposts?.slice(0, -1);

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
          <div className="centered-layout mb-40 grid max-w-screen-xl">
            <LatestBlogs bloggs={props?.bloggposts} title="Blogg" />
            {/* Skriv for bloggen */}

            <div className="full-bleed my-20 flex h-72 items-center bg-[#B2F0E4] px-4 md:rounded-2xl md:px-6 lg:h-80 lg:bg-[#68D1BF] lg:pl-12">
              <div className="text-deepblue-800">
                <Heading level="2" size="xlarge" spacing>
                  Skriv for bloggen
                </Heading>

                <BodyLong spacing>
                  Har du en rosablogger i deg som brenner for å skrive om
                  digital produktutvikling?
                </BodyLong>
                <BodyLong>
                  Ta kontakt med{" "}
                  <NextLink
                    href="https://nav-it.slack.com/archives/C0370ADS0HX"
                    passHref
                  >
                    <Link className="text-deepblue-800 font-semibold">
                      #Aksel
                    </Link>
                  </NextLink>{" "}
                  på Slack
                </BodyLong>
              </div>
              <CubeLarge />
              <CubeSmall />
            </div>
            {/* Flere blogger */}
            {remainingPosts && (
              <div>
                <Heading level="2" size="xlarge">
                  Flere blogginnlegg
                </Heading>
                <div className="mt-12 grid gap-x-3 gap-y-6 sm:grid-cols-2 sm:gap-y-10 md:gap-x-6 lg:grid-cols-3">
                  {remainingPosts.map((blog) => (
                    <div
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
                    </div>
                  ))}
                </div>
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
