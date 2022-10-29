import { getTemaSlug, SanityT, urlFor } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { Next } from "@navikt/ds-icons";
import { BodyShort, Heading, Ingress, Label } from "@navikt/ds-react";
import { FooterSlope } from "components/website-modules/Slope";
import Head from "next/head";
import NextLink from "next/link";
import {
  abbrName,
  ArtikkelCard,
  BreadCrumbs,
  dateStr,
  Feedback,
  TableOfContents,
} from "../..";
import { NoSidebarLayout } from "./wrappers/NoSidebar";

const AkselArtikkelTemplate = ({
  data,
  title,
}: {
  data: SanityT.Schema.aksel_artikkel;
  title: string;
}): JSX.Element => {
  if (!data.content || !data.heading) {
    return null;
  }

  const authors = (data?.contributors as any)?.map((x) => x?.title);

  const hasTema = "tema" in data && data.tema && data?.tema.length > 0;

  const aside = data?.relevante_artikler?.length > 0 && (
    <aside className="mt-16 overflow-x-clip bg-gray-50 ">
      <FooterSlope />
      <div className="relative bg-gray-100 pt-12 pb-16">
        <div className="dynamic-wrapper">
          <Heading level="2" size="medium" className="px-4 text-deepblue-700">
            {data?.relevante_artikler?.length === 1
              ? `Les også`
              : `Relevante artikler`}
          </Heading>
          <div className="card-grid-3-1 mt-6 px-4">
            {data.relevante_artikler.map((x: any) => (
              <ArtikkelCard {...x} source={x.title} key={x._id} />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );

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
      <NoSidebarLayout aside={aside}>
        <div className="mx-auto mb-16 max-w-prose lg:ml-0">
          <BreadCrumbs auto />
          <Heading
            level="1"
            size="large"
            className="algolia-index-lvl1 mt-4 text-deepblue-700 md:text-5xl"
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
              className="whitespace-nowrap text-text-muted"
            >
              {dateStr(data?._updatedAt)}
            </BodyShort>
            {authors?.length > 0 && (
              <BodyShort size="small" as="div" className="flex flex-wrap gap-1">
                <address className="not-italic">{authors[0]}</address>
              </BodyShort>
            )}
          </div>
          {hasTema && (
            <div className="mt-8 flex flex-wrap gap-2">
              {data.tema.map(({ title }: any) => (
                <span key={title}>
                  <NextLink
                    key={title}
                    href={`/tema/${getTemaSlug(title)}`}
                    passHref
                  >
                    <BodyShort
                      size="small"
                      as="a"
                      className="algolia-index-lvl5 flex min-h-8 items-center justify-center gap-[2px] rounded-full bg-gray-200 pl-4 pr-1 capitalize text-deepblue-800 no-underline hover:bg-gray-100 hover:underline focus:outline-none focus-visible:shadow-focus"
                    >
                      {title}
                      <Next aria-hidden />
                    </BodyShort>
                  </NextLink>
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="relative mx-auto mt-4 max-w-prose lg:ml-0 lg:grid lg:max-w-none lg:grid-flow-row-dense lg:grid-cols-3 lg:items-start lg:gap-x-12">
          <TableOfContents
            changedState={data?.content ?? []}
            hideToc={false}
            aksel
          />
          <div className="max-w-prose lg:col-span-2 lg:col-start-1">
            <SanityBlockContent blocks={data?.content ?? []} variant="aksel" />
            <div className="mt-12">
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
            <div className="mt-12 md:mt-16">
              <Feedback akselFeedback docId={data?._id} docType={data?._type} />
            </div>
          </div>
        </div>
      </NoSidebarLayout>
    </>
  );
};

export default AkselArtikkelTemplate;
