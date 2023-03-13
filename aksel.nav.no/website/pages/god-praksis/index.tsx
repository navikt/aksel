import { Footer } from "@/layout";
import { akselTema, urlFor, SanityT } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { getClient } from "@/sanity-client";
import { Clock } from "@navikt/ds-icons";
import { Heading } from "@navikt/ds-react";
import { Header } from "components/layout/header/Header";
import ArtikkelCard from "components/sanity-modules/cards/ArtikkelCard";
import GodPraksisCard from "components/sanity-modules/cards/GodPraksisCard";
import { AkselCubeStatic } from "components/website-modules/cube";
import { ToolCard } from "components/website-modules/ToolsCard";
import { PreviewSuspense } from "next-sanity/preview";
import Head from "next/head";
import React, { lazy } from "react";
import { AkselTemaT } from "..";

interface PageProps {
  temaer: AkselTemaT[];
  resent: SanityT.Schema.aksel_artikkel &
    {
      slug: string;
      tema: string[];
      contributors?: { title?: string }[];
    }[];
  page: any;
  slug: string;
  preview: boolean;
}

const Page = ({ temaer, page, resent }: PageProps): JSX.Element => {
  const filteredTemas = temaer.filter((x) => x.refCount > 0);
  return (
    <>
      <Head>
        <title>God praksis - Aksel</title>
        <meta property="og:title" content="Temaer - Aksel" />
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
      <div className="bg-surface-subtle relative overflow-hidden">
        <Header variant="transparent" />
        <main
          tabIndex={-1}
          id="hovedinnhold"
          className=" min-h-[80vh]  focus:outline-none"
        >
          <div className="centered-layout mb-40 grid max-w-screen-2xl pt-20">
            <Heading
              level="1"
              size="xlarge"
              className="text-deepblue-800 text-5xl"
            >
              God praksis
            </Heading>
            {page.intro && (
              <SanityBlockContent
                isIngress
                className="mt-4"
                noLastMargin
                blocks={page.intro}
              />
            )}
            <AkselCubeStatic className="text-deepblue-300 opacity-5 " />
            <div>
              <ul className="card-grid-3-1 mt-20 ">
                {filteredTemas.map((t) => (
                  <GodPraksisCard key={t._id} node={t} />
                ))}
              </ul>
            </div>

            <div className="mt-24">
              <Heading
                level="2"
                size="medium"
                className="text-deepblue-800 flex items-center gap-4"
              >
                <Clock aria-hidden className="shrink-0" /> Nylige artikler
              </Heading>
              <div className="card-grid-3-1 my-6">
                {resent.map((art: any) => (
                  <ArtikkelCard
                    level="3"
                    variant="tema"
                    {...art}
                    key={art._id}
                  />
                ))}
              </div>
            </div>
            <div className="mt-20">
              <ToolCard />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

const WithPreview = lazy(() => import("../../components/WithPreview"));

const Wrapper = (props: any): JSX.Element => {
  if (props?.preview) {
    return (
      <PreviewSuspense fallback={<Page {...props} />}>
        <WithPreview comp={Page} query={akselTema} props={props} />
      </PreviewSuspense>
    );
  }

  return <Page {...props} />;
};

export default Wrapper;

export const getStaticProps = async ({
  preview = false,
}: {
  preview?: boolean;
}) => {
  const { temaer, page, resent } = await getClient().fetch(akselTema);

  return {
    props: {
      page,
      temaer,
      resent,
      slug: "/god-praksis",
      preview,
      title: "Forside God praksis",
    },
    notFound: !temaer,
    revalidate: 60,
  };
};
