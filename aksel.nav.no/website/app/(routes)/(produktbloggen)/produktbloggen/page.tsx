import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BodyLong, Heading, Show, VStack } from "@navikt/ds-react";
import { BloggArticleBlock } from "@/app/(routes)/(produktbloggen)/produktbloggen/_ui/BloggArticleBlogg";
import {
  type DynamicFetchOptions,
  getDynamicFetchOptions,
  sanityFetch,
  sanityFetchMetadata,
} from "@/app/_sanity/live";
import {
  BLOGG_LANDINGSSIDE_BLOGS_QUERY,
  BLOGG_LANDINGSSIDE_PAGE_QUERY,
} from "@/app/_sanity/queries";
import { urlForOpenGraphImage } from "@/app/_sanity/utils";
import { BloggList } from "./_ui/BloggList";
import { HighlightedBlogg } from "./_ui/HighlightedBlogg";
import styles from "./_ui/Produktbloggen.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const { perspective } = await getDynamicFetchOptions();
  const { data: pageData } = await sanityFetchMetadata({
    query: BLOGG_LANDINGSSIDE_PAGE_QUERY,
    perspective,
  });

  const pageOgImage = urlForOpenGraphImage(pageData?.page.seo?.image);

  return {
    title: "Produktbloggen",
    description: pageData?.page.seo?.meta,
    openGraph: {
      images: pageOgImage,
    },
  };
}

/* https://nextjs.org/docs/app/api-reference/file-conventions/page#props */
export default async function Page() {
  const { isEnabled: isDraftMode } = await draftMode();

  if (!isDraftMode) {
    return <CachedProduktbloggen perspective="published" stega={false} />;
  }

  return (
    <Suspense fallback={null}>
      <DynamicProduktbloggen />
    </Suspense>
  );
}

async function DynamicProduktbloggen() {
  const { perspective, stega } = await getDynamicFetchOptions();
  return <CachedProduktbloggen perspective={perspective} stega={stega} />;
}

async function CachedProduktbloggen({
  perspective,
  stega,
}: DynamicFetchOptions) {
  "use cache";

  const { data: pageData } = await sanityFetch({
    query: BLOGG_LANDINGSSIDE_BLOGS_QUERY,
    perspective,
    stega,
  });

  if (!pageData?.bloggposts) {
    notFound();
  }

  const remainingPosts = pageData?.bloggposts?.slice(
    2,
    pageData?.bloggposts.length,
  );

  return (
    <div className={styles.bloggPosts}>
      <VStack align="center">
        <Heading
          level="1"
          size="xlarge"
          spacing
          className={styles.overviewTitle}
        >
          Produktbloggen
        </Heading>
        <BodyLong className={styles.overviewSubtitle}>
          Skriverier fra produktutviklingsmiljøet i Nav. Har du eller teamet
          ditt noe å dele? Ta kontakt med Team Aksel!
        </BodyLong>
      </VStack>

      <div className={styles.latestBloggPosts}>
        <HighlightedBlogg blogg={pageData.bloggposts[0]} />
        <Show above="md">
          <HighlightedBlogg blogg={pageData.bloggposts[1]} />
        </Show>
        <Show below="md">
          <BloggArticleBlock blogg={pageData.bloggposts[1]} />
        </Show>
      </div>

      {/* Flere blogger */}
      {remainingPosts && (
        <ul className={styles.remainingPosts}>
          {remainingPosts.map((blogg) => (
            <BloggList blogg={blogg} key={blogg._id} />
          ))}
        </ul>
      )}
    </div>
  );
}
