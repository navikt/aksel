import { Footer } from "@/layout";
import { SanityT, akselBloggPosts, urlFor } from "@/lib";
import { getClient } from "@/sanity-client";
import { BodyLong, BodyShort, Heading, Link } from "@navikt/ds-react";
import { Header } from "components/layout/header/Header";
import { PreviewSuspense } from "next-sanity/preview";
import Head from "next/head";
import React, { lazy } from "react";
import NotFotfund from "../404";
import Image from "next/image";
import NextLink from "next/link";
import { dateStr } from "@/utils";

const getAuthors = (blog: PageProps["bloggposts"][0]) =>
  (blog?.contributors as any)?.map((x) => x?.title) ?? [];

const getImage = (n: string, size: "small" | "large") => {
  const smallOptions = 18;
  const largeOptions = 4;

  const hash = n.split("").reduce(function (a, b) {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);

  if (size === "small") {
    return `/images/thumbnail-small/Small-${(hash % smallOptions) - 1 + 1}.svg`;
  }
  return `/images/thumbnail-large/Large-${(hash % largeOptions) - 1 + 1}.svg`;
};

const Page = (props: PageProps): JSX.Element => {
  if (!props.bloggposts) {
    return <NotFotfund />;
  }

  const mostRecent = props.bloggposts[0];

  return (
    <>
      <Head>
        <title>Produktbloggen - Aksel</title>
        <meta property="og:title" content="Produktbloggen - Aksel" />
      </Head>
      <div className="bg-surface-default">
        <Header />
        <div className="xs:px-4 mx-auto grid w-full max-w-screen-xl gap-6 px-6">
          <Heading
            level="1"
            size="xlarge"
            spacing
            className="algolia-index-lvl1 text-deepblue-800 mt-14"
          >
            Blogg
          </Heading>
          {/* Desktop-view */}
          <div className="my-20 hidden grid-cols-2 gap-12 lg:grid">
            <div className="w-full">
              <div className="relative mb-10 block aspect-video">
                {mostRecent?.seo?.image ? (
                  <Image
                    src={urlFor(mostRecent.seo.image).auto("format").url()}
                    decoding="async"
                    layout="fill"
                    objectFit="cover"
                    aria-hidden
                    priority
                    className="rounded-lg"
                  />
                ) : (
                  <Image
                    src={getImage(mostRecent?.heading ?? "", "large")}
                    decoding="async"
                    layout="fill"
                    objectFit="contain"
                    aria-hidden
                    priority
                    className="rounded-lg"
                  />
                )}
              </div>
              <Heading size="large" as="a" className="">
                <NextLink href={`/${mostRecent.slug}`} passHref>
                  <Link className="text-deepblue-500 no-underline hover:underline">
                    {mostRecent.heading}
                  </Link>
                </NextLink>
              </Heading>
              <BodyLong className="mt-4">{mostRecent?.ingress}</BodyLong>
              {getAuthors(mostRecent).length > 0 && (
                <BodyShort
                  size="small"
                  className="text-text-subtle mt-4 flex gap-2"
                >
                  <span className="font-semibold">
                    {getAuthors(mostRecent)[0]}
                  </span>
                  <span>
                    {dateStr(mostRecent?.publishedAt ?? mostRecent._createdAt)}
                  </span>
                </BodyShort>
              )}
            </div>
            <div className="grid w-full gap-12">
              {props.bloggposts.slice(1, 4).map((blog) => (
                <div key={blog._id} className="flex gap-6">
                  <div className="relative block aspect-square h-[11.75rem]">
                    {blog?.seo?.image ? (
                      <Image
                        src={urlFor(blog.seo.image).auto("format").url()}
                        decoding="async"
                        layout="fill"
                        objectFit="cover"
                        aria-hidden
                        priority
                        className="rounded-lg"
                      />
                    ) : (
                      <Image
                        src={getImage(blog?.heading ?? "", "small")}
                        decoding="async"
                        layout="fill"
                        objectFit="contain"
                        aria-hidden
                        priority
                        className="rounded-lg"
                      />
                    )}
                  </div>
                  <div>
                    <Heading size="small" as="a" className="">
                      <NextLink href={`/${blog.slug}`} passHref>
                        <Link className="text-deepblue-500 no-underline hover:underline">
                          {blog.heading}
                        </Link>
                      </NextLink>
                    </Heading>
                    <BodyLong className="mt-4">{blog?.ingress}</BodyLong>
                    {getAuthors(blog).length > 0 && (
                      <BodyShort
                        size="small"
                        className="text-text-subtle mt-4 flex gap-2"
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
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* <main
          tabIndex={-1}
          id="hovedinnhold"
          className="min-h-[80vh] bg-gray-100 focus:outline-none"
        >
          <div className="relative bg-white px-4 pt-8 pb-8 md:pt-12">
            <div className="dynamic-wrapper-2xl w-fit">
              <Heading
                level="1"
                size="xlarge"
                spacing
                className="algolia-index-lvl1"
              >
                Produktbloggen
              </Heading>
            </div>
          </div>
          <div className="relative px-4 pt-8 pb-24">
            <div className="dynamic-wrapper-2xl w-fit">
              <div className="mt-4 grid gap-2 divide-y divide-gray-300">
                {props.bloggposts.map((blog) => (
                  <BloggCard key={blog._id} blog={blog} />
                ))}
              </div>
            </div>
          </div>
        </main> */}
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
