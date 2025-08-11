import differenceInMonths from "date-fns/differenceInMonths";
import { Metadata } from "next";
import { PortableTextBlock } from "next-sanity";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { TagFillIcon } from "@navikt/aksel-icons";
import {
  BodyLong,
  BodyShort,
  Box,
  HStack,
  Heading,
  Label,
  Link,
  VStack,
} from "@navikt/ds-react";
import { GodPraksisFeedback } from "@/app/(routes)/(god-praksis)/_ui/feedback/GodPraksisFeedback";
import { CustomPortableText } from "@/app/CustomPortableText";
import { sanityFetch } from "@/app/_sanity/live";
import {
  GOD_PRAKSIS_ARTICLE_BY_SLUG_QUERY,
  TOC_BY_SLUG_QUERY,
} from "@/app/_sanity/queries";
import { urlForOpenGraphImage } from "@/app/_sanity/utils";
import { AnimatedArrowRight } from "@/app/_ui/animated-arrow/AnimatedArrow";
import { EditorPanel } from "@/app/_ui/editor-panel/EditorPanel";
import { SystemPanel } from "@/app/_ui/system-panel/SystemPanel";
import { TableOfContents } from "@/app/_ui/toc/TableOfContents";
import { WebsiteList, WebsiteListItem } from "@/app/_ui/typography/WebsiteList";
import { formatDateString } from "@/ui-utils/format-date";
import { abbrName } from "@/ui-utils/format-text";
import styles from "./page.module.css";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
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
}

export default async function Page(props: Props) {
  const { slug } = await props.params;

  const parsedSlug = decodeURIComponent(`god-praksis/artikler/${slug}`);

  const [{ data: pageData }, { data: toc }] = await Promise.all([
    sanityFetch({
      query: GOD_PRAKSIS_ARTICLE_BY_SLUG_QUERY,
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

  const verifiedDate =
    pageData?.updateInfo?.lastVerified ??
    pageData?.publishedAt ??
    pageData?._updatedAt;

  const outdated = differenceInMonths(new Date(), new Date(verifiedDate)) >= 12;
  const authors =
    pageData?.contributors
      ?.filter((auth) => !!auth.title)
      .map((auth) => auth.title ?? "") ?? [];

  return (
    <article className={styles.pageArticle}>
      <div>
        {pageData.innholdstype && (
          <BodyShort size="small" className={styles.pageEyebrow}>
            {pageData.innholdstype}
          </BodyShort>
        )}
        <Heading
          size="xlarge"
          level="1"
          data-aksel-heading-color
          data-text-prose
        >
          {pageData.heading}
        </Heading>
        {pageData.ingress && (
          <BodyLong size="large" className={styles.pageIngress} data-text-prose>
            {pageData.ingress}
          </BodyLong>
        )}
        <BodyShort size="small" as="time" textColor="subtle">
          {`Oppdatert ${formatDateString(verifiedDate)}`}
        </BodyShort>
        <HStack gap="space-8" marginBlock="space-16 space-48">
          {pageData.undertema?.map(({ tema, title }) => {
            const href = `/god-praksis/${tema?.slug}?undertema=${encodeURIComponent(
              title ?? "",
            )}`;

            return (
              <NextLink
                key={title}
                className={styles.pageUndertemaTag}
                href={href}
                data-animated-arrow-anchor
                data-umami-event="navigere"
                data-umami-event-kilde="god praksis artikkel chips"
                data-umami-event-url={href}
              >
                <TagFillIcon aria-hidden fontSize="1.25rem" />
                <span className={styles.pageUndertemaTagText}>{title}</span>
                <AnimatedArrowRight />
              </NextLink>
            );
          })}
        </HStack>
      </div>
      <TableOfContents toc={toc} />
      <div>
        {outdated && <SystemPanel variant="outdated" docId={pageData._id} />}
        <CustomPortableText
          value={(pageData.content ?? []) as PortableTextBlock[]}
        />

        {authors?.length > 0 && (
          <VStack gap="space-8" marginBlock="space-48">
            <Label data-aksel-heading-color as="p">
              Medvirkende
            </Label>
            <HStack gap="space-4" asChild>
              <BodyShort textColor="subtle" as="div">
                {authors.map(abbrName).map((x, y) => (
                  <address key={x}>
                    {x}
                    {y !== authors.length - 1 && ", "}
                  </address>
                ))}
              </BodyShort>
            </HStack>
          </VStack>
        )}
        {pageData.relevante_artikler &&
          pageData.relevante_artikler.length > 0 && (
            <Box marginBlock="space-0 space-48">
              <EditorPanel variant="links" heading="Relatert innhold fra Aksel">
                <WebsiteList as="ul">
                  {pageData.relevante_artikler.map((item) => (
                    <WebsiteListItem key={item.heading} icon>
                      <Link
                        variant="neutral"
                        href={item.slug?.current}
                        data-umami-event="navigere"
                        data-umami-event-kilde="les ogsaa"
                        data-umami-event-url={item.slug?.current ?? ""}
                      >
                        {item.heading}
                      </Link>
                    </WebsiteListItem>
                  ))}
                </WebsiteList>
              </EditorPanel>
            </Box>
          )}

        <GodPraksisFeedback docId={pageData._id} />
      </div>
    </article>
  );
}
