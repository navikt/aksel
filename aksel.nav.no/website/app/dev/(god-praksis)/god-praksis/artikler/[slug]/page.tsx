import { PortableTextBlock } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TagFillIcon } from "@navikt/aksel-icons";
import { BodyShort, HStack, Heading } from "@navikt/ds-react";
import { CustomPortableText } from "@/app/CustomPortableText";
import { sanityFetch } from "@/app/_sanity/live";
import {
  GOD_PRAKSIS_ARTICLE_BY_SLUG,
  TOC_BY_SLUG_QUERY,
} from "@/app/_sanity/queries";
import { TableOfContents } from "@/app/_ui/toc/TableOfContents";
import { LinkCardArrow } from "@/app/dev/(god-praksis)/_ui/link-card/LinkCard";
import { dateStr } from "@/utils";
import styles from "./page.module.css";

type Props = {
  params: Promise<{ slug: string }>;
};

/* export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;

  const { data: seoData } = await sanityFetch({
    query: GOD_PRAKSIS_TEMA_BY_SLUG_QUERY,
    params: { slug: tema },
    stega: false,
  });

  const ogImages = (await parent).openGraph?.images || [];
  const pageOgImage = urlForOpenGraphImage(seoData?.seo?.image as Image);

  pageOgImage && ogImages.unshift(pageOgImage);

  return {
    title: seoData?.title ?? "Tema",
    description: seoData?.seo?.meta ?? seoData?.description,
    openGraph: {
      images: ogImages,
    },
  };
} */

export default async function Page(props: Props) {
  const { slug } = await props.params;
  /* const headersList = await headers() */

  const parsedSlug = `god-praksis/artikler/${slug}`;

  const [{ data: pageData }, { data: toc }] = await Promise.all([
    sanityFetch({
      query: GOD_PRAKSIS_ARTICLE_BY_SLUG,
      params: { slug: parsedSlug },
    }),
    sanityFetch({
      query: TOC_BY_SLUG_QUERY,
      params: { slug: parsedSlug },
    }),
  ]);

  if (!pageData || !pageData.heading) {
    notFound();
  }

  return (
    <article className={styles.pageArticle}>
      <div>
        {pageData.innholdstype && (
          <BodyShort size="large" className={styles.pageEyebrow}>
            {pageData.innholdstype}
          </BodyShort>
        )}
        <Heading size="xlarge" level="1" data-aksel-heading-color>
          {pageData.heading}
        </Heading>
        {pageData.ingress && (
          <BodyShort
            size="large"
            className={styles.pageIngress}
            data-text-prose
          >
            {pageData.ingress}
          </BodyShort>
        )}
        <BodyShort size="small" as="time" textColor="subtle">
          {`Oppdatert ${await dateStr(
            pageData?.updateInfo?.lastVerified ??
              pageData?.publishedAt ??
              pageData?._updatedAt,
          )}`}
        </BodyShort>
        <HStack gap="space-8" marginBlock="space-16 space-48">
          {pageData.undertema?.map(({ tema, title }) => (
            <UnderTemaLink
              key={title}
              href={`/god-praksis/${tema?.slug}?undertema=${encodeURIComponent(
                title ?? "",
              )}`}
            >
              {title}
            </UnderTemaLink>
          ))}
        </HStack>
      </div>
      <TableOfContents
        feedback={{
          name: pageData.heading,
          text: "Send innspill",
        }}
        toc={toc}
      />
      <div>
        {/* {outdated && <OutdatedAlert />} */}

        <CustomPortableText
          value={(pageData.content ?? []) as PortableTextBlock[]}
        />
      </div>
    </article>
  );

  /* return (
    <div>
      <GodPraksisIntroHero
        title={temaPage.title ?? "Tema"}
        description={temaPage.description}
        image={temaPage.pictogram}
        isCollapsible
      />
      <VStack
        gap="space-48"
        paddingBlock="space-24"
        paddingInline={{ xs: "space-16", lg: "space-40" }}
      >
        <GodPrakisChipsNavigation
          articles={articlesByContext}
          innholdstype={innholdstypeParam}
          undertema={undertemaParam}
        />
        <VStack gap="space-48">
          {Object.entries(articlesMap).length === 0 ? (
            <p>Ingen artikler funnet.</p>
          ) : (
            Object.values(articlesMap).map(
              ({ title, description, ariaLabel, articles }) => (
                <section aria-label={ariaLabel} key={title}>
                  <VStack gap="space-8" marginBlock="0 space-24">
                    <Heading level="2" size="large" data-aksel-heading-color>
                      {title}
                    </Heading>
                    {description && (
                      <BodyLong data-text-prose>{description}</BodyLong>
                    )}
                  </VStack>
                  <HGrid
                    key={title}
                    as="ul"
                    columns={{ xs: 1, md: 2 }}
                    gap={{ xs: "space-12", md: "space-24" }}
                  >
                    {articles.map((article) => (
                      <li key={article.slug}>
                        <LinkCard>
                          <LinkCardTitle as="h2">
                            <LinkCardAnchor href={article.slug ?? ""}>
                              {article.heading}
                            </LinkCardAnchor>
                          </LinkCardTitle>

                          {article.description && (
                            <LinkCardDescription>
                              {article.displayDate && (
                                <Box asChild marginBlock="0 space-8">
                                  <Detail
                                    as="time"
                                    textColor="subtle"
                                    uppercase
                                  >
                                    {article.displayDate}
                                  </Detail>
                                </Box>
                              )}
                              <p>{article.description}</p>
                            </LinkCardDescription>
                          )}
                          <LinkCardFooter>
                            <HStack gap="space-12">
                              <GodPraksisTaxonomyTag type="undertema">
                                {article.undertema}
                              </GodPraksisTaxonomyTag>
                              <GodPraksisTaxonomyTag type="innholdstype">
                                {article.innholdstype}
                              </GodPraksisTaxonomyTag>
                            </HStack>
                          </LinkCardFooter>
                        </LinkCard>
                      </li>
                    ))}
                  </HGrid>
                </section>
              ),
            )
          )}
        </VStack>
      </VStack>
    </div>
  ); */
}

function UnderTemaLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link
      className={styles.pageUndertemaTag}
      href={href}
      data-link-card-anchor
      data-umami-event="navigere"
      data-umami-event-kilde="god praksis artikkel chips"
    >
      <TagFillIcon aria-hidden fontSize="1.25rem" />
      <span className={styles.pageUndertemaTagText}>{children}</span>
      <LinkCardArrow />
    </Link>
  );
}
