import { Metadata } from "next";
import { PortableTextBlock } from "next-sanity";
import { notFound } from "next/navigation";
import { Image } from "sanity";
import { Heading, Show, VStack } from "@navikt/ds-react";
import { CustomPortableText } from "@/app/CustomPortableText";
import { sanityFetch } from "@/app/_sanity/live";
import { BLOGG_LANDINGSSIDE_QUERY } from "@/app/_sanity/queries";
import { urlForOpenGraphImage } from "@/app/_sanity/utils";
import { BloggList } from "./_ui/BloggList";
import { HighlightedBlogg } from "./_ui/HighlightedBlogg";
import styles from "./_ui/Produktbloggen.module.css";
import { SimpleArticle } from "./_ui/SimpleArticle";

export async function generateMetadata(): Promise<Metadata> {
  const { data: pageData } = await sanityFetch({
    query: BLOGG_LANDINGSSIDE_QUERY,
  });

  const pageOgImage = urlForOpenGraphImage(pageData?.page.seo?.image as Image);

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
  const { data: pageData } = await sanityFetch({
    query: BLOGG_LANDINGSSIDE_QUERY,
  });

  if (!pageData?.bloggposts) {
    notFound();
  }

  const remainingPosts = pageData?.bloggposts?.slice(
    2,
    pageData?.bloggposts.length,
  );

  return (
    <>
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
          {pageData.page.intro && (
            <CustomPortableText
              value={pageData.page.intro as PortableTextBlock[]}
              className={styles.overviewSubtitle}
            />
          )}
        </VStack>

        <div className={styles.latestBloggPosts}>
          <HighlightedBlogg blogg={pageData.bloggposts[0]} />
          <Show above="md">
            <HighlightedBlogg blogg={pageData.bloggposts[1]} />
          </Show>
          <Show below="md">
            <SimpleArticle blogg={pageData.bloggposts[1]} />
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
    </>
  );
}
