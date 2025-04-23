import differenceInMonths from "date-fns/differenceInMonths";
import { PortableTextBlock } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TagFillIcon } from "@navikt/aksel-icons";
import { BodyShort, HStack, Heading, Label, VStack } from "@navikt/ds-react";
import { CustomPortableText } from "@/app/CustomPortableText";
import { sanityFetch } from "@/app/_sanity/live";
import {
  GOD_PRAKSIS_ARTICLE_BY_SLUG,
  TOC_BY_SLUG_QUERY,
} from "@/app/_sanity/queries";
import { SystemPanel } from "@/app/_ui/panels/SystemPanel";
import { TableOfContents } from "@/app/_ui/toc/TableOfContents";
import { LinkCardArrow } from "@/app/dev/(god-praksis)/_ui/link-card/LinkCard";
import { abbrName, dateStr } from "@/utils";
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
          {`Oppdatert ${await dateStr(verifiedDate)}`}
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
        {outdated && <SystemPanel variant="outdated" docId={pageData._id} />}
        <SystemPanel variant="outdated" docId={pageData._id} />
        <CustomPortableText
          value={(pageData.content ?? []) as PortableTextBlock[]}
        />
        {authors?.length > 0 && (
          <VStack gap="space-8" marginBlock="space-48">
            <Label data-aksel-heading-color as="p">
              Medvirkende
            </Label>

            <HStack gap="space-4" asChild>
              <BodyShort textColor="subtle">
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
        {/* {userState && <Feedback userState={userState} />} */}
      </div>
    </article>
  );
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
