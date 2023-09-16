import { urlFor } from "@/sanity/interface";
import Head from "next/head";

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
      {image && (
        <meta
          property="og:image"
          content={urlFor(image)
            .width(1200)
            .height(630)
            .fit("crop")
            .quality(100)
            .url()}
          key="ogimage"
        />
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
    </Head>
  );
}

export function BaseSEO({ path }: { path: string }) {
  return (
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta
        property="og:url"
        content={`https://aksel.nav.no${path.split("?")[0].split("#")[0]}`}
        key="ogurl"
      />
      <link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml" />
      <link
        rel="shortcut icon"
        href="/favicon.svg"
        sizes="any"
        type="image/svg+xml"
      />
      <meta property="og:site_name" content="Aksel" key="ogsitename" />
    </Head>
  );
}

/*

<Head>

        <meta
          property="og:image"
          content={
            page?.seo?.image
              ? urlFor(page?.seo?.image)
                  .width(1200)
                  .height(630)
                  .fit("crop")
                  .quality(100)
                  .url()
              : ""
          }
          key="ogimage"
        />
      </Head>

*/
