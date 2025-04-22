import { PortableTextBlock } from "next-sanity";
import NextImage from "next/image";
import { notFound } from "next/navigation";
import { Image } from "sanity";
import { BodyLong, BodyShort, Detail, HStack, Heading } from "@navikt/ds-react";
import { CustomPortableText } from "@/app/CustomPortableText";
import { sanityFetch } from "@/app/_sanity/live";
import { BLOGG_BY_SLUG_QUERY } from "@/app/_sanity/queries";
import { urlForImage } from "@/app/_sanity/utils";
import { abbrName, dateStr, getImage } from "@/utils";
import styles from "../_ui/Produktbloggen.module.css";

type Props = {
  params: Promise<{ slug: string }>;
};

/* https://nextjs.org/docs/app/api-reference/file-conventions/page#props */
export default async function Page({ params }: Props) {
  const { slug } = await params;

  const parsedSlug = `produktbloggen/${slug}`;

  const { data: pageData } = await sanityFetch({
    query: BLOGG_BY_SLUG_QUERY,
    params: { slug: parsedSlug },
  });

  const publishedAtRaw = pageData?.publishedAt ?? "";
  const publishDate = await dateStr(publishedAtRaw);
  const authors = (pageData?.contributors as any)?.map((x) => x?.title) ?? [];

  const imageUrl = urlForImage(pageData?.seo?.image as Image)
    ?.quality(100)
    .url();

  if (!pageData?._id) {
    notFound();
  }

  if (!pageData.content || !pageData.heading) {
    return null;
  }

  return (
    <>
      {/*
        generateMetadata() (see others)
      <SEO
        title={page?.heading}
        description={page?.seo?.meta ?? page?.ingress}
        image={page?.seo?.image}
        fallbackImage={getImage(page?.heading ?? "", "OG")}
        publishDate={publishDate}
      />
      */}

      <main tabIndex={-1} id="hovedinnhold" className={styles.main}>
        <div className={styles.preamble}>
          <div className={styles.intro}>
            <Heading level="1" size="xlarge" className={styles.articleTitle}>
              {pageData.heading}
            </Heading>
            {pageData?.ingress && (
              <BodyLong className={styles.bodyLong1}>
                {pageData?.ingress}
              </BodyLong>
            )}
            <div className={styles.articleMeta}>
              <Detail uppercase as="span">
                {publishDate}
              </Detail>
              {authors?.[0] && (
                <>
                  <span className={styles.diamond} />
                  <BodyShort size="small" as="address" className="not-italic">
                    {authors?.[0]}
                  </BodyShort>
                </>
              )}
            </div>
          </div>
          <div className={styles.image}>
            {imageUrl ? (
              <NextImage
                src={imageUrl}
                blurDataURL={imageUrl}
                placeholder="blur"
                decoding="sync"
                layout="fill"
                objectFit="cover"
                aria-hidden
                priority
                alt=""
                quality={100}
              />
            ) : (
              <NextImage
                src={getImage(pageData?.heading ?? "", "thumbnail")}
                decoding="sync"
                layout="fill"
                objectFit="cover"
                aria-hidden
                priority
                alt=""
              />
            )}
          </div>
        </div>

        <div className={styles.customBlockWrapper}>
          <CustomPortableText
            data-wrapper-prose
            value={(pageData?.content ?? []) as PortableTextBlock[]}
          />
        </div>

        <div className={styles.articleEnd}>
          <div data-wrapper-prose>
            <div className={`${styles.diamond} ${styles.diamondCenter}`} />
            {authors?.length > 0 && (
              <Detail uppercase className={styles.authorText} as="p">
                Bidragsytere
              </Detail>
            )}
            {authors?.length > 0 && (
              <BodyShort as="div" className={styles.author}>
                {authors.map(abbrName).map((x, y) => (
                  <address key={x}>
                    {x}
                    {y !== authors.length - 1 && ", "}
                  </address>
                ))}
              </BodyShort>
            )}
            <HStack justify="center">
              <BodyShort textColor="subtle">Publisert: {publishDate}</BodyShort>
            </HStack>
          </div>
        </div>
      </main>
    </>
  );
}
