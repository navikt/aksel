import { SanityT, urlFor } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { BodyShort, Heading, Ingress, Label } from "@navikt/ds-react";
import Head from "next/head";
import { abbrName, dateStr, Feedback, TableOfContents } from "../..";
import Footer from "../footer/Footer";
import AkselHeader from "../header/AkselHeader";

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

  const authors = (data?.contributors as any)?.map((x) => x?.title);

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

      <AkselHeader variant="blogg" />
      <main
        tabIndex={-1}
        id="hovedinnhold"
        className="aksel-artikkel bg-orange-50 pt-[8vw] pb-16 focus:outline-none xs:pb-32"
      >
        <div className="px-4">
          <div className="dynamic-wrapper-prose text-center">
            <Heading
              level="1"
              size="xlarge"
              className="algolia-index-lvl1 hyphen mt-1 break-words text-5xl"
            >
              {data.heading}
            </Heading>
            {data?.ingress && (
              <Ingress className="mt-4">{data?.ingress}</Ingress>
            )}
            <div className="mt-8 inline-flex flex-wrap gap-2 text-base">
              {authors?.[0] && (
                <>
                  <BodyShort size="small" as="address" className="not-italic">
                    {authors?.[0]}
                  </BodyShort>
                  <BodyShort
                    size="small"
                    className="text-text-muted/40"
                    as="span"
                  >
                    —
                  </BodyShort>
                </>
              )}
              <BodyShort size="small" as="span" className="text-text-muted">
                {dateStr(data?.publishedAt ?? data._createdAt)}
              </BodyShort>
            </div>
          </div>
        </div>
        <div className="mt-16">
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
            {authors?.length > 0 && (
              <Label className="mb-2 text-deepblue-700" as="p">
                Bidragsytere
              </Label>
            )}
            {authors?.length > 0 && (
              <BodyShort
                as="div"
                className="mb-1 flex flex-wrap gap-1 text-text/80"
              >
                {authors.map(abbrName).map((x, y) => (
                  <address className="not-italic" key={x}>
                    {x}
                    {y !== authors.length - 1 && ", "}
                  </address>
                ))}
              </BodyShort>
            )}
            <BodyShort as="span" className="whitespace-nowrap text-text/80">
              Publisert: {dateStr(data?.publishedAt ?? data?._updatedAt)}
            </BodyShort>
          </div>
          <div className="dynamic-wrapper-prose pt-16">
            <Feedback akselFeedback docId={data?._id} docType={data?._type} />
          </div>
        </div>
      </main>
      <Footer variant="aksel" />
    </>
  );
};

export default AkselBloggTemplate;
