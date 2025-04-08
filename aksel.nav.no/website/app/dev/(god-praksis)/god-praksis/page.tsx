import { notFound } from "next/navigation";
import { Image } from "sanity";
import { BodyLong, Box, Stack } from "@navikt/ds-react";

/* @ts-expect-error Workspace cant resolve valid import */
import { Page as AkselPage, PageBlock } from "@navikt/ds-react/Page";
import { sanityFetch } from "@/app/_sanity/live";
import { GOD_PRAKSIS_ALL_TEMA_QUERY } from "@/app/_sanity/queries";
import { urlForImage } from "@/app/_sanity/utils";
import Footer from "@/app/_ui/footer/Footer";
import { Header } from "@/app/_ui/header/Header";
import {
  GodPraksisIntroHero,
  GodPraksisTemaCard,
} from "@/app/dev/(god-praksis)/_ui/hero/Hero";

/* type Props = {
  params: Promise<{ slug: string[] }>;
};
 */
/* export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;

  const { data: page } = await sanityFetch({
    query: METADATA_BY_SLUG_QUERY,
    params: { slug: parseDesignsystemSlug(slug, "monster-maler") },
    stega: false,
  });

  const ogImages = (await parent).openGraph?.images || [];
  const pageOgImage = urlForOpenGraphImage(page?.seo?.image as Image);

  pageOgImage && ogImages.unshift(pageOgImage);

  return {
    title: page?.heading,
    description: page?.seo?.meta,
    openGraph: {
      images: ogImages,
    },
  };
} */

/* https://nextjs.org/docs/app/api-reference/file-conventions/page#props */
export default async function Page() {
  const [{ data: temaList }] = await Promise.all([
    sanityFetch({
      query: GOD_PRAKSIS_ALL_TEMA_QUERY,
    }),
  ]);

  if (!temaList || temaList.length === 0) {
    notFound();
  }

  return (
    <AkselPage footer={<Footer />} footerPosition="belowFold">
      <Header />
      <Box paddingBlock="space-40" tabIndex={-1} id="hovedinnhold" asChild>
        <PageBlock width="xl" gutters as="main">
          <GodPraksisIntroHero title="God praksis">
            <BodyLong data-text-prose spacing>
              Mange som jobber med produktutvikling i NAV sitter på kunnskap og
              erfaring som er nyttig for oss alle. Det er god praksis som vi
              deler her.
            </BodyLong>
            <nav aria-label="Temavelger">
              <Stack
                gap={{ xs: "4", md: "6" }}
                wrap
                direction={{ xs: "column", md: "row" }}
                as="ul"
              >
                {temaList
                  .filter((x) => x.articles.length > 0)
                  .map((tema) => {
                    const url = urlForImage(tema.pictogram as Image)?.url();

                    return (
                      <li key={tema.slug}>
                        <GodPraksisTemaCard
                          href={`/god-praksis/${tema.slug}`}
                          imageSrc={url}
                          title={tema.title ?? ""}
                        />
                      </li>
                    );
                  })}
              </Stack>
            </nav>
          </GodPraksisIntroHero>
        </PageBlock>
      </Box>
    </AkselPage>
  );
}
