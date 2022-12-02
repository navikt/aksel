import {
  DsCard,
  DsFrontpageFooterIllustration,
  DsFrontpageIllustration,
  PagePropsContext,
} from "@/components";
import { DsHeader, Footer } from "@/layout";
import { DsFrontPageCardT, dsFrontpageQuery, SanityT } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { getClient } from "@/sanity-client";
import { BodyLong, Heading } from "@navikt/ds-react";
import { PreviewSuspense } from "next-sanity/preview";
import Head from "next/head";
import { lazy } from "react";

const Page = ({
  page,
  navigation,
  ...rest
}: {
  page: SanityT.Schema.ds_frontpage;
  navigation: SanityT.Schema.ds_navigation;
  preview: boolean;
}): JSX.Element => {
  return (
    <>
      <Head>
        <title>Designsystemet</title>
        <meta property="og:title" content="Designsystemet NAV" />
        <meta
          name="description"
          content="Designsystemet til NAV gjør det enklere å lage produkter."
        />
      </Head>
      <PagePropsContext.Provider
        value={{
          pageProps: {
            ...rest,
            page,
            navigation,
            activeHeading: null,
          },
        }}
      >
        <DsHeader />

        <main
          tabIndex={-1}
          id="hovedinnhold"
          className="bg-surface-subtle relative flex justify-center focus:outline-none"
        >
          <div className="min-h-screen-header flex w-full flex-col items-center">
            <div className="bg-bg-default relative flex w-full justify-center">
              <div className="flex w-full max-w-screen-2xl">
                <div className="xs:block xs:h-[240px] xs:py-16 xs:px-12 flex w-full max-w-[calc(1440px_-_624px)] flex-col items-center py-12 px-4">
                  <Heading spacing level="1" size="xlarge">
                    Designsystemet
                  </Heading>
                  <BodyLong>Gjør det enkelt å lage produkter i NAV</BodyLong>
                </div>
                <DsFrontpageIllustration className="hidden h-[240px] w-[624px] shrink-0 lg:block" />
              </div>
            </div>

            <div className="bg-surface-subtle flex w-full max-w-screen-2xl flex-col flex-wrap">
              <div className="reduced-spacing xs:w-full xs:px-12 xs:py-6 mx-auto w-[90%] py-12">
                {page?.body && <SanityBlockContent blocks={page?.body} />}
              </div>
              <div className="xs:justify-start xs:px-12 xs:pb-16 flex flex-wrap justify-center gap-6 px-4 pt-0 pb-12">
                {page?.cards &&
                  page?.cards.map((card) => {
                    return (
                      <DsCard
                        key={card._key}
                        node={card as unknown as DsFrontPageCardT}
                        tag={true}
                      />
                    );
                  })}
              </div>
            </div>
            <DsFrontpageFooterIllustration className="flex h-full w-full md:hidden" />
          </div>
        </main>
        <Footer variant="ds" />
      </PagePropsContext.Provider>
    </>
  );
};

const WithPreview = lazy(() => import("../../components/WithPreview"));

const Wrapper = (props: any): JSX.Element => {
  if (props?.preview) {
    return (
      <PreviewSuspense fallback={<Page {...props} />}>
        <WithPreview comp={Page} query={dsFrontpageQuery} />
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
  const { page, navigation } = await getClient().fetch(dsFrontpageQuery);

  return {
    props: {
      page: page,
      slug: "/designsystem",
      navigation: navigation,
      preview,
    },
    revalidate: 60,
  };
};
