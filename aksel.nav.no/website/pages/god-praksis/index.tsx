import { GetStaticProps } from "next/types";
import { SparklesIcon } from "@navikt/aksel-icons";
import { Heading } from "@navikt/ds-react";
import ArtikkelCard from "@/cms/cards/ArtikkelCard";
import GodPraksisCard from "@/cms/cards/GodPraksisCard";
import { PagePreview } from "@/draftmode/PagePreview";
import { getDraftClient } from "@/draftmode/client";
import { draftmodeToken, viewerToken } from "@/draftmode/token";
import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";
import { SanityBlockContent } from "@/sanity-block";
import { destructureBlocks } from "@/sanity/queries";
import {
  AkselGodPraksisDocT,
  AkselGodPraksisLandingPageDocT,
  AkselTemaT,
  NextPageT,
  ResolveContributorsT,
  ResolveSlugT,
  ResolveTemaT,
} from "@/types";
import { AkselCubeStatic } from "@/web/aksel-cube/AkselCube";
import { SEO } from "@/web/seo/SEO";

type PageProps = NextPageT<{
  page: AkselGodPraksisLandingPageDocT;
  temaer: AkselTemaT[];
  resent: ResolveTemaT<
    ResolveContributorsT<ResolveSlugT<AkselGodPraksisDocT>>
  >[];
}>;

const Page = ({ temaer, page, resent }: PageProps["props"]) => {
  const filteredTemas = temaer.filter((x) => x.refCount > 0);
  return (
    <>
      <SEO
        title="God praksis"
        description={page?.seo?.meta}
        image={page?.seo?.image}
      />

      <div className="relative overflow-hidden bg-surface-subtle">
        <Header variant="transparent" />
        <main tabIndex={-1} id="hovedinnhold" className=" focus:outline-none">
          <div className="mx-auto mb-40 grid w-full max-w-screen-2xl px-4 pt-20 sm:px-6">
            <Heading
              level="1"
              size="xlarge"
              className="mb-4 text-5xl text-deepblue-800"
            >
              God praksis
            </Heading>
            {page.intro && <SanityBlockContent isIngress blocks={page.intro} />}
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
                className="flex items-center gap-2 text-deepblue-800"
              >
                <SparklesIcon aria-hidden className="shrink-0" /> Nyeste
                artikler
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
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export const query = `*[_type == "godpraksis_landingsside"][0]{
  "page": {
    ...,
    intro[]{
      ...,
      ${destructureBlocks}
    }
  },
  "temaer": *[_type == "aksel_tema" && defined(seksjoner[].sider[])]{
    ...,
    "refCount": count(*[_type == "aksel_artikkel" && !(_id in path("drafts.**")) && references(^._id)])
  },
  "resent": *[_type == "aksel_artikkel" && defined(publishedAt)] | order(publishedAt desc)[0...9]{
    _id,
    heading,
    _createdAt,
    _updatedAt,
    publishedAt,
    "slug": slug.current,
    "tema": tema[]->title,
    ingress,
  }
}`;

export const getStaticProps: GetStaticProps = async ({
  draftMode = false,
}): Promise<PageProps> => {
  const client = getDraftClient({
    draftMode,
    token: draftMode ? draftmodeToken : viewerToken,
  });

  const { temaer, page, resent } = await client.fetch(query);

  return {
    props: {
      page,
      temaer,
      resent,
      slug: "/god-praksis",
      title: "Forside God praksis",
      id: page?._id ?? "",
      draftMode,
      token: draftMode ? draftmodeToken : "",
    },
    notFound: !temaer,
    revalidate: 60,
  };
};

export default function GodPraksisFrontpage(props: PageProps["props"]) {
  return props.draftMode ? (
    <PagePreview query={query} props={props}>
      {(_props) => <Page {..._props} />}
    </PagePreview>
  ) : (
    <Page {...props} />
  );
}
