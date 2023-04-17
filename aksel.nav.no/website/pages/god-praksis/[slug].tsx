import { abbrName } from "@/components";
import { Footer } from "@/layout";
import { SanityBlockContent } from "@/sanity-block";
import { getClient } from "@/sanity/client.server";
import { AkselTemaT, NextPageT } from "@/types";
import { Detail, Heading, Label } from "@navikt/ds-react";
import cl from "clsx";
import { Header } from "components/layout/header/Header";
import ArtikkelCard from "components/sanity-modules/cards/ArtikkelCard";
import { AkselCubeStatic } from "components/website-modules/cube";
import { PreviewSuspense } from "next-sanity/preview";
import Head from "next/head";
import Image from "next/legacy/image";
import { lazy } from "react";
import NotFotfund from "../404";
import { getAkselTema, urlFor } from "@/sanity/interface";
import { contributorsSingle, destructureBlocks } from "@/sanity/queries";

type PageProps = NextPageT<{
  tema: Omit<AkselTemaT, "ansvarlig"> & {
    ansvarlig: { title: string; roller: string[] };
  };
}>;

export const query = `{
  "tema": *[_type == "aksel_tema" && slug.current == $slug] | order(_updatedAt desc)[0]{
    ...,
    "ansvarlig": ansvarlig->{title, roller},
    seksjoner[]{
      ...,
      beskrivelse[]{
        ...,
        ${destructureBlocks}
      },
      sider[]->{
        _id,
        heading,
        _createdAt,
        _updatedAt,
        publishedAt,
        updateInfo,
        "slug": slug.current,
        "tema": tema[]->title,
        ingress,
        "contributor": ${contributorsSingle}
      }
    },
    "pictogram": pictogram.asset-> {
        url,
        altText,
    },
  }
}`;

export const getStaticPaths = async () => {
  return {
    paths: await getAkselTema().then((paths) =>
      paths.map(({ path }) => ({
        params: {
          slug: path,
        },
      }))
    ),
    fallback: "blocking",
  };
};

export const getStaticProps = async ({
  params: { slug },
  preview = false,
}: {
  params: { slug: string };
  preview?: boolean;
}): Promise<PageProps> => {
  const { tema } = await getClient().fetch(query, {
    slug,
  });

  return {
    props: {
      tema,
      slug,
      preview,
      id: tema?._id ?? null,
      title: tema?.title ?? "",
    },
    notFound: !tema && !preview,
    revalidate: 60,
  };
};

const Page = ({ tema: page }: PageProps["props"]) => {
  if (!page || !page.seksjoner || page.seksjoner.length === 0) {
    return <NotFotfund />;
  }

  const hasAnsvarlig = !!page?.ansvarlig?.title;

  const hasPages = !!page.seksjoner.find((x) => !!x.sider);

  return (
    <>
      <Head>
        <title>{`${page.title} - Aksel`}</title>
        <meta property="og:title" content={`${page.title} - Aksel`} />
        <meta name="description" content={page?.seo?.meta ?? ""} key="desc" />
        <meta
          property="og:description"
          content={page?.seo?.meta ?? ""}
          key="ogdesc"
        />
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
      <div className="bg-surface-subtle">
        <Header variant="subtle" />
        <main
          tabIndex={-1}
          id="hovedinnhold"
          className="relative min-h-[80vh] overflow-hidden focus:outline-none"
        >
          <AkselCubeStatic className="text-deepblue-300 opacity-5 " />
          <div className=" pt-20 text-center">
            <div className="dynamic-wrapper px-4 pb-6 text-center">
              <Image
                src={urlFor(page.pictogram.url).auto("format").url()}
                decoding="sync"
                width="72"
                height="72"
                layout="fixed"
                priority
                aria-hidden
                alt={page.pictogram?.altText}
              />
              <Heading
                level="1"
                size="xlarge"
                className="mt-8 hidden md:block md:text-5xl"
              >
                {page.title}
              </Heading>
              <Heading level="1" size="large" className="mt-8 block md:hidden">
                {page.title}
              </Heading>

              <div className="mt-4 flex flex-col items-center justify-between gap-8">
                <SanityBlockContent
                  blocks={page.beskrivelse}
                  noLastMargin
                  className="override-text-700 max-w-prose xl:mb-8"
                  isIngress
                />
                <div
                  className={cl(
                    "max-w relative z-10 mb-2 h-fit sm:w-96 xl:mt-[10px]",
                    { invisible: !hasAnsvarlig }
                  )}
                  aria-hidden={!hasAnsvarlig}
                >
                  <Detail as="div" size="small" className="mb-2" uppercase>
                    Ansvarlig for tema
                  </Detail>
                  <div className="grid">
                    <div>
                      <Label as="div" className="text-xlarge">
                        {page?.ansvarlig?.title
                          ? abbrName(page?.ansvarlig?.title)
                          : ""}
                      </Label>
                      {page?.ansvarlig?.roller?.length > 0 ? (
                        <div className="text-medium mt-[2px]">
                          {page?.ansvarlig?.roller.join(", ")}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative px-4 pt-8 pb-24 md:pt-16 xl:pt-8 ">
            {hasPages ? (
              <div className="dynamic-wrapper grid gap-20">
                {page.seksjoner.map((seksjon) =>
                  seksjon?.sider ? (
                    <div key={seksjon._key}>
                      <Heading level="2" size="medium">
                        {seksjon.title}
                      </Heading>
                      {seksjon.beskrivelse && (
                        <div className="max-w-prose">
                          <SanityBlockContent
                            blocks={seksjon.beskrivelse}
                            noLastMargin
                          />
                        </div>
                      )}
                      <div className="card-grid-3-1 mt-6">
                        {seksjon?.sider?.map((x) => (
                          <ArtikkelCard
                            {...x}
                            level="3"
                            source={page?.slug?.current}
                            key={x._id}
                            variant="god-praksis"
                          />
                        ))}
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            ) : (
              <div className="dynamic-wrapper mb-20">
                <Heading level="2" size="medium">
                  Fant ingen artikler her enda...
                </Heading>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

const WithPreview = lazy(() => import("../../components/WithPreview"));

const Wrapper = (props: any) => {
  if (props?.preview) {
    return (
      <PreviewSuspense fallback={<Page {...props} />}>
        <WithPreview
          comp={Page}
          query={query}
          props={props}
          params={{
            slug: props?.slug,
          }}
        />
      </PreviewSuspense>
    );
  }

  return <Page {...props} />;
};

export default Wrapper;
