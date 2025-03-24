import Head from "next/head";
import { urlFor } from "@/sanity/interface";

type SEOProps = {
  title: string;
  description?: string;
  image?: string;
  fallbackImage?: string;
  publishDate?: string;
  canonical?: string;
};

export function SEO({
  title,
  description,
  image,
  publishDate,
  fallbackImage,
  canonical,
}: SEOProps) {
  const imageUrl = urlFor(image)
    ?.width(1200)
    .height(630)
    .fit("crop")
    .quality(100)
    .url();
  return (
    <Head>
      <title>{`${title} - aksel.nav.no`}</title>
      <meta
        property="og:title"
        content={`${title} - aksel.nav.no`}
        key="ogtitle"
      />
      {description && (
        <meta name="description" content={description} key="desc" />
      )}
      {description && (
        <meta property="og:description" content={description} key="ogdesc" />
      )}
      {imageUrl && (
        <meta property="og:image" content={imageUrl} key="ogimage" />
      )}
      {!image && fallbackImage && (
        <meta property="og:image" content={fallbackImage} key="ogimage" />
      )}
      {publishDate && (
        <>
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:label1" content="Publisert" />
          <meta name="twitter:data1" content={publishDate} />
          <meta property="og:type" content="article" />
        </>
      )}
      {canonical && <link rel="canonical" href={canonical} />}
      <link
        rel="alternate"
        type="application/rss+xml"
        title="Produktbloggen - aksel.nav.no"
        href="https://aksel.nav.no/rss/produktbloggen-rss.xml"
      />
    </Head>
  );
}
