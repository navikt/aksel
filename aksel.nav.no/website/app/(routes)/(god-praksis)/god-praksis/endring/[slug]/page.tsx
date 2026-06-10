import { format } from "date-fns/format";
import { nb } from "date-fns/locale";
import { PortableTextBlock } from "next-sanity";
import { notFound } from "next/navigation";
import {
  BodyShort,
  Box,
  Heading,
  InfoCard,
  List,
  VStack,
} from "@navikt/ds-react";
import {
  InfoCardContent,
  InfoCardHeader,
  InfoCardTitle,
} from "@navikt/ds-react/InfoCard";
import { ListItem } from "@navikt/ds-react/List";
import { CustomPortableText } from "@/app/CustomPortableText";
import { sanityFetch } from "@/app/_sanity/live";
import {
  GP_CHANGELOGS_BY_SLUG_QUERY,
  TOC_BY_SLUG_QUERY,
} from "@/app/_sanity/queries";
import { TableOfContents } from "@/app/_ui/toc/TableOfContents";
import { UmamiLink } from "@/app/_ui/umami/UmamiLink";
import styles from "../../artikler/[slug]/page.module.css";

type Props = {
  params: Promise<{ slug: string }>;
};

/* export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const { data: seoData } = await sanityFetch({
    query: GOD_PRAKSIS_ARTICLE_BY_SLUG_QUERY,
    params: { slug: decodeURIComponent(`god-praksis/artikler/${slug}`) },
    stega: false,
  });

  const pageOgImage = urlForOpenGraphImage(seoData?.seo?.image);
  const fallbackOgImage = urlForOpenGraphImage(
    seoData?.undertema?.[0]?.tema?.image,
  );

  return {
    title: seoData?.heading,
    description: seoData?.seo?.meta ?? seoData?.ingress,
    openGraph: {
      images: pageOgImage ?? fallbackOgImage,
      publishedTime: seoData?.publishedAt ?? seoData?._updatedAt,
      modifiedTime: seoData?.updateInfo?.lastVerified ?? seoData?._updatedAt,
    },
  };
} */

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const [{ data: pageData }, { data: toc }] = await Promise.all([
    sanityFetch({
      query: GP_CHANGELOGS_BY_SLUG_QUERY,
      params: { slug },
    }),
    sanityFetch({
      query: TOC_BY_SLUG_QUERY,
      params: { slug },
    }),
  ]);

  if (!pageData?.heading || !pageData._id) {
    notFound();
  }

  const changelogFor =
    pageData.artikler?.filter(
      (article) => !!article.slug && !!article.heading,
    ) ?? [];

  return (
    <article className={styles.pageArticle}>
      <Box marginBlock="space-0 space-28">
        <VStack gap="space-4">
          <BodyShort textColor="subtle" data-color="brand-blue" size="small">
            God praksis
          </BodyShort>
          <Heading level="1" size="xlarge" data-aksel-heading-color spacing>
            {pageData.heading}
          </Heading>
        </VStack>
        <BodyShort size="small" textColor="subtle" data-color="neutral">
          {format(new Date(pageData.endringsdato || ""), "d. MMMM yyy", {
            locale: nb,
          })}
        </BodyShort>
      </Box>
      <TableOfContents toc={toc || []} />
      <div>
        {changelogFor.length && (
          <div>
            <Heading size="medium" level="2" data-aksel-heading-color spacing>
              Endringslogg for artikkel
            </Heading>
            <List>
              {changelogFor.map((artikkel) => (
                <ListItem key={artikkel.slug}>
                  <UmamiLink
                    href={`/${artikkel.slug!}`}
                    lenkegruppe="endringslogg-backlink"
                  >
                    {artikkel.heading}
                  </UmamiLink>
                </ListItem>
              ))}
            </List>
          </div>
        )}
        {changelogFor.length > 0 && (
          <InfoCard data-block-margin="space-28" data-color="brand-blue">
            <InfoCardHeader>
              <InfoCardTitle>Endringslogg for artikkel</InfoCardTitle>
            </InfoCardHeader>
            <InfoCardContent>
              <List>
                {changelogFor.map((artikkel) => (
                  <ListItem key={artikkel.slug}>
                    <UmamiLink
                      href={`/${artikkel.slug!}`}
                      lenkegruppe="endringslogg-backlink"
                    >
                      {artikkel.heading}
                    </UmamiLink>
                  </ListItem>
                ))}
              </List>
            </InfoCardContent>
          </InfoCard>
        )}
        <CustomPortableText
          value={(pageData.content ?? []) as PortableTextBlock[]}
        />
      </div>
    </article>
  );
}
