import Image from "next/image";
import { notFound } from "next/navigation";
import { BodyLong, BodyShort, Detail, Heading } from "@navikt/ds-react";
import { CustomPortableText } from "@/app/CustomPortableText";
import { sanityFetch } from "@/app/_sanity/live";
import { BLOGG_BY_SLUG_QUERY } from "@/app/_sanity/queries";
import { urlFor } from "@/sanity/interface";
import { abbrName, getImage } from "@/utils";
import { parseDesignsystemSlug } from "../../(designsystemet)/slug";
import styles from "../_ui/Produktbloggen.module.css";

type Props = {
  params: Promise<{ slug: string[] }>;
};

/* https://nextjs.org/docs/app/api-reference/file-conventions/page#props */
export default async function Page({ params }: Props) {
  const { slug } = await params;

  const parsedSlug = parseDesignsystemSlug(slug, "produktbloggen");

  const { data: page } = await sanityFetch({
    query: BLOGG_BY_SLUG_QUERY,
    params: { slug: parsedSlug },
  });

  const { publishedAt: publishDate } = page;
  const authors = (page?.contributors as any)?.map((x) => x?.title) ?? [];

  const imageUrl = urlFor(page?.seo?.image)
    ?.auto("format")
    .quality(100)
    .url();

  if (!page?._id) {
    notFound();
  }

  if (!page.content || !page.heading) {
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
              {page.heading}
            </Heading>
            {page?.ingress && (
              <BodyLong className={styles.bodyLong1}>{page?.ingress}</BodyLong>
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
              <Image
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
              <Image
                src={getImage(page?.heading ?? "", "thumbnail")}
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
          <CustomPortableText data-wrapper-prose value={page?.content ?? []} />
        </div>

        <div className={styles.articleEnd}>
          <div data-wrapper-prose>
            <div className={styles.diamondCenter} />
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
            <BodyShort as="span" className={styles.publishedText}>
              Publisert: {publishDate}
            </BodyShort>
          </div>
        </div>
      </main>
    </>
  );
}
