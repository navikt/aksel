import { differenceInMonths } from "date-fns";
import { Metadata } from "next";
import { PortableTextBlock, stegaClean } from "next-sanity";
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
import { Avatar, avatarUrl } from "@/app/_ui/avatar/Avatar";
import { EditorPanel } from "@/app/_ui/editor-panel/EditorPanel";
import { NextLink } from "@/app/_ui/next-link/NextLink";
import { SystemPanel } from "@/app/_ui/system-panel/SystemPanel";
import { TableOfContents } from "@/app/_ui/toc/TableOfContents";
import { WebsiteList, WebsiteListItem } from "@/app/_ui/typography/WebsiteList";
import { formatDateString } from "@/ui-utils/format-date";
import { humanizeRedaksjonType } from "@/ui-utils/format-text";
import { getValidRenderArray } from "@/ui-utils/valid-array";
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
  const writers = getValidRenderArray(pageData.writers);

  const undertema = getValidRenderArray(pageData.undertema);
  const relevanteArtikler = getValidRenderArray(pageData.relevante_artikler);

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
          {undertema?.map(({ tema, title }) => {
            const cleanTitle = stegaClean(title ?? "");
            const href = `/god-praksis/${stegaClean(tema?.slug)}?undertema=${encodeURIComponent(
              cleanTitle,
            )}`;

            return (
              <NextLink
                key={cleanTitle}
                className={styles.pageUndertemaTag}
                href={href}
                data-animated-arrow-anchor
                data-umami-event="navigere"
                data-umami-event-kilde="god praksis artikkel chips"
                data-umami-event-url={href}
              >
                <TagFillIcon aria-hidden fontSize="1.25rem" />
                <span className={styles.pageUndertemaTagText}>
                  {cleanTitle}
                </span>
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

        {writers && (
          <VStack gap="space-8" marginBlock="space-48">
            <Label data-aksel-heading-color as="p">
              Medvirkende
            </Label>
            <HStack gap="space-32">
              {writers?.map((writer) => {
                return (
                  <Avatar
                    type={humanizeRedaksjonType(writer.type)}
                    name={writer.title ?? ""}
                    key={writer.title}
                    imageSrc={avatarUrl(writer.avatar_id?.current ?? "missing")}
                    showName
                  />
                );
              })}
            </HStack>
          </VStack>
        )}
        {relevanteArtikler && (
          <Box marginBlock="space-0 space-48">
            <EditorPanel variant="links" heading="Relatert innhold fra Aksel">
              <WebsiteList as="ul">
                {relevanteArtikler.map((item) => (
                  <WebsiteListItem key={item.heading} icon>
                    <Link
                      variant="neutral"
                      href={`/${item.slug?.current}`}
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
