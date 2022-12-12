import { SanityT, urlFor } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { BodyShort, Detail, Heading, Ingress } from "@navikt/ds-react";
import { Header } from "components/layout/header/Header";
import { BloggAd } from "components/website-modules/BloggAd";
import { AkselCubeStatic } from "components/website-modules/cube";
import Head from "next/head";
import Image from "next/image";

import { abbrName, dateStr, Feedback, TableOfContents } from "../..";
import Footer from "../footer/Footer";

const AkselBloggTemplate = ({
  data,
  title,
}: {
  data: SanityT.Schema.aksel_blogg;
  title: string;
}): JSX.Element => {
  if (!data.content || !data.heading) {
    return null;
  }

  const authors = (data?.contributors as any)?.map((x) => x?.title) ?? [];

  return (
    <>
      <Head>
        <title>{`${data?.heading} - ${title}`}</title>
        <meta
          property="og:title"
          content={`${data?.heading} - ${title}`}
          key="ogtitle"
        />
        <meta
          property="og:description"
          content={data?.seo?.meta ?? data?.ingress}
          key="ogdesc"
        />
        {authors?.[0] && <meta name="twitter:label1" content="Skrevet av" />}
        {authors?.[0] && <meta name="twitter:data1" content={authors?.[0]} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:label2" content="Publisert" />
        <meta
          name="twitter:data2"
          content={dateStr(data?.publishedAt ?? data._createdAt)}
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:image"
          content={
            data?.seo?.image
              ? urlFor(data?.seo?.image)
                  .width(1200)
                  .height(630)
                  .fit("crop")
                  .url()
              : ""
          }
          key="ogimage"
        />
      </Head>

      <Header variant="blogg" />
      <main
        tabIndex={-1}
        id="hovedinnhold"
        className="aksel-artikkel xs:pb-32 overflow-hidden bg-[#FFFCF0] pt-[8vw] pb-16 focus:outline-none"
      >
        <div className="px-4">
          <div className="dynamic-wrapper-prose text-center">
            <Heading
              level="1"
              size="xlarge"
              className="algolia-index-lvl1 hyphen text-deepblue-800 mt-1 break-words text-5xl"
            >
              {data.heading}
            </Heading>
            {data?.ingress && (
              <Ingress className="text-deepblue-700 mt-4">
                {data?.ingress}
              </Ingress>
            )}
            <div className="mt-8 inline-flex flex-wrap items-center gap-2 text-base">
              <Detail uppercase as="span">
                {dateStr(data?.publishedAt ?? data._createdAt)}
              </Detail>
              {authors?.[0] && (
                <>
                  <span className="bg-deepblue-700 h-2 w-2 rotate-45 rounded-[1px] opacity-50" />
                  <BodyShort size="small" as="address" className="not-italic">
                    {authors?.[0]}
                  </BodyShort>
                </>
              )}
            </div>
          </div>
          {data?.seo?.image && (
            <div className="relative mx-auto mt-20 aspect-video w-full max-w-3xl">
              <Image
                src={urlFor(data?.seo?.image).auto("format").url()}
                decoding="sync"
                layout="fill"
                objectFit="cover"
                aria-hidden
                priority
                className="rounded-2xl"
                alt="Illustrasjon"
              />
            </div>
          )}
        </div>
        <div className="relative mt-16">
          <AkselCubeStatic className="text-[#FFE78A] opacity-20" />
          <TableOfContents changedState={data?.content ?? []} hideToc />
          <div className="mt-8 px-4">
            <SanityBlockContent
              className="dynamic-wrapper-prose"
              blocks={data?.content ?? []}
              variant="aksel"
            />
          </div>
        </div>
        <div className="mt-16 px-4">
          <div className="dynamic-wrapper-prose">
            <div className="bg-deepblue-800 mx-auto mb-10 h-2 w-2 rotate-45 rounded-[1px]" />
            {authors?.length > 0 && (
              <Detail
                className="text-deepblue-700 mb-2 text-center uppercase"
                as="p"
              >
                Bidragsytere
              </Detail>
            )}
            {authors?.length > 0 && (
              <BodyShort
                as="div"
                className="text-text-subtle mb-1 flex flex-wrap justify-center gap-1"
              >
                {authors.map(abbrName).map((x, y) => (
                  <address className="not-italic" key={x}>
                    {x}
                    {y !== authors.length - 1 && ", "}
                  </address>
                ))}
              </BodyShort>
            )}
            <BodyShort
              as="span"
              className="text-text-subtle flex justify-center whitespace-nowrap"
            >
              Publisert: {dateStr(data?.publishedAt ?? data?._updatedAt)}
            </BodyShort>
          </div>
          <div className="dynamic-wrapper-prose pt-16">
            <Feedback akselFeedback docId={data?._id} docType={data?._type} />
          </div>

          <div className="max-w-content-w-padding mx-auto grid w-full">
            <BloggAd />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AkselBloggTemplate;
