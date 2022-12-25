import { SanityT, urlFor } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { BodyShort, Heading, Ingress, Label } from "@navikt/ds-react";
import cl from "clsx";
import { Header } from "components/layout/header/Header";
import Head from "next/head";
import { Footer } from "..";
import {
  abbrName,
  Bilde,
  BreadCrumbs,
  dateStr,
  Feedback,
  TableOfContents,
} from "../..";

const AkselPrinsippTemplate = ({
  data,
  title,
}: {
  data: SanityT.Schema.aksel_prinsipp;
  title: string;
}): JSX.Element => {
  if (!data.content || !data.heading) {
    return null;
  }

  const authors = (data?.contributors as any)?.map((x) => x?.title) ?? [];
  const mainPage = data?.prinsipp?.hovedside;

  return (
    <>
      <Head>
        <title>{`${data?.heading} - Prinsipp - ${title}`}</title>
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
        <meta property="og:type" content="article" />
        <meta
          property="og:image"
          content={
            data?.seo?.image
              ? urlFor(data?.seo?.image)
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
      <Header variant={mainPage ? "default" : "subtle"} />
      <main
        tabIndex={-1}
        id="hovedinnhold"
        className={cl("aksel-artikkel pt-4 focus:outline-none", {
          "bg-white": mainPage,
        })}
      >
        <article className="overflow-x-clip">
          <div
            className={cl("max-w-aksel xs:w-[90%] mx-auto px-4", {
              "pb-32": mainPage,
            })}
          >
            <div className="pt-12">
              <div className="mx-auto mb-16 max-w-prose lg:ml-0 ">
                {!mainPage && (
                  <BreadCrumbs
                    text={`Prinsipper for ${data?.prinsipp?.prinsippvalg}`}
                    href={`/prinsipper/${data?.prinsipp?.prinsippvalg}`}
                  />
                )}
                <Heading
                  level="1"
                  size="large"
                  className="algolia-index-lvl1 text-deepblue-700 mt-4 md:text-5xl"
                >
                  {data.heading}
                </Heading>
                {data?.ingress && (
                  <Ingress className="override-text-700 mt-5 text-2xl">
                    {data?.ingress}
                  </Ingress>
                )}
                <div className="mt-6 flex gap-3 text-base">
                  <BodyShort
                    size="small"
                    as="span"
                    className="text-text-subtle whitespace-nowrap"
                  >
                    {dateStr(data?._updatedAt)}
                  </BodyShort>
                  {authors?.length > 0 && (
                    <BodyShort
                      size="small"
                      as="div"
                      className="flex flex-wrap gap-1"
                    >
                      <address className="not-italic">{authors[0]}</address>
                    </BodyShort>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            className={cl("pt-32", {
              "bg-gray-100": mainPage,
            })}
          >
            <div className="max-w-aksel xs:w-[90%] mx-auto px-4">
              <div className="pb-16 md:pb-32">
                <div className="relative mx-auto mt-4 max-w-prose lg:ml-0 lg:grid lg:max-w-none lg:grid-flow-row-dense lg:grid-cols-3 lg:items-start lg:gap-x-12">
                  <TableOfContents
                    changedState={data?.content ?? []}
                    hideToc={false}
                    aksel
                  />
                  <div className="max-w-prose lg:col-span-2 lg:col-start-1">
                    {data?.hero_bilde && (
                      <Bilde
                        node={data.hero_bilde as any}
                        className="xs:-mt-72 -mt-36 mb-10"
                      />
                    )}
                    <SanityBlockContent
                      blocks={data?.content ?? []}
                      variant="aksel"
                    />
                    <div className="mt-12">
                      {authors?.length > 0 && (
                        <Label className="text-deepblue-700 mb-2" as="p">
                          Bidragsytere
                        </Label>
                      )}
                      {authors?.length > 0 && (
                        <BodyShort
                          as="div"
                          className="text-text-subtle mb-1 flex flex-wrap gap-1"
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
                        className="text-text-subtle whitespace-nowrap"
                      >
                        Publisert:{" "}
                        {dateStr(data?.publishedAt ?? data?._updatedAt)}
                      </BodyShort>
                    </div>
                    <div className="mt-12 md:mt-16">
                      <Feedback
                        akselFeedback
                        docId={data?._id}
                        docType={data?._type}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
};

export default AkselPrinsippTemplate;
