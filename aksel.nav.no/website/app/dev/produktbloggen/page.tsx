import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Image } from "sanity";
import { BodyLong, HGrid, Heading } from "@navikt/ds-react";
import { sanityFetch } from "@/app/_sanity/live";
import {
  BLOGG_LANDINGSSIDE_BLOGS_QUERY,
  BLOGG_LANDINGSSIDE_PAGE_QUERY,
} from "@/app/_sanity/queries";
import { urlForOpenGraphImage } from "@/app/_sanity/utils";
import {
  LinkCard,
  LinkCardAnchor,
  LinkCardDescription,
  LinkCardFooter,
  LinkCardTitle,
} from "../(god-praksis)/_ui/link-card/LinkCard";
import styles from "./_ui/Produktbloggen.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const { data: pageData } = await sanityFetch({
    query: BLOGG_LANDINGSSIDE_PAGE_QUERY,
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
    query: BLOGG_LANDINGSSIDE_BLOGS_QUERY,
  });

  if (!pageData?.bloggposts) {
    notFound();
  }

  const bloggPosts = pageData.bloggposts;

  return (
    <div className={styles.bloggMain}>
      <Heading level="1" size="xlarge" className={styles.bloggHeading}>
        Produktbloggen
      </Heading>
      <BodyLong size="large" className={styles.bloggDescription}>
        Skriverier fra produktutviklingsmiljøet i NAV. Har du eller teamet ditt
        noe å dele? Ta kontakt med Team Aksel!
      </BodyLong>
      <HGrid columns={{ xs: 1, md: 2 }} gap="space-24">
        {bloggPosts.map((bloggPost) => {
          return (
            <LinkCard key={bloggPost._id}>
              <LinkCardTitle as="span">
                <LinkCardAnchor href={bloggPost.slug ?? "#"}>
                  {bloggPost.heading}
                </LinkCardAnchor>
              </LinkCardTitle>
              <LinkCardDescription>{bloggPost.ingress}</LinkCardDescription>
              <LinkCardFooter>avatars...</LinkCardFooter>
            </LinkCard>
          );
        })}
      </HGrid>
    </div>
  );
}
