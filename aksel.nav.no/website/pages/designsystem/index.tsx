import {
  DsCard,
  DsFrontpageFooterIllustration,
  DsFrontpageIllustration,
  PagePropsContext,
} from "@/components";
import { DsHeader, Footer } from "@/layout";
import {
  DsFrontPageCardT,
  dsFrontpageQuery,
  SanityT,
  usePreviewSubscription,
} from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { getClient } from "@/sanity-client";
import { BodyLong, Heading } from "@navikt/ds-react";
import Head from "next/head";

const Page = (props: {
  page: SanityT.Schema.ds_frontpage;
  navigation: SanityT.Schema.ds_navigation;
  preview: boolean;
}): JSX.Element => {
  const {
    data: { page, navigation },
  } = usePreviewSubscription(dsFrontpageQuery, {
    initialData: props,
    enabled: props?.preview,
  });

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
            ...props,
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
          className="relative flex justify-center bg-component-background-alternate focus:outline-none"
        >
          <div className="flex min-h-screen-header w-full flex-col items-center">
            <div className="relative flex w-full justify-center bg-canvas-background-light">
              <div className="flex w-full max-w-screen-2xl">
                <div className="flex w-full max-w-[calc(1440px_-_624px)] flex-col items-center py-12 px-4 xs:block xs:h-[240px] xs:py-16 xs:px-12">
                  <Heading spacing level="1" size="xlarge">
                    Designsystemet
                  </Heading>
                  <BodyLong>Gjør det enkelt å lage produkter i NAV</BodyLong>
                </div>
                <DsFrontpageIllustration className="hidden h-[240px] w-[624px] shrink-0 lg:block" />
              </div>
            </div>

            <div className="flex w-full max-w-screen-2xl flex-col flex-wrap bg-component-background-alternate">
              <div className="reduced-spacing mx-auto w-[90%] py-12 xs:w-full xs:px-12 xs:py-6">
                {page?.body && <SanityBlockContent blocks={page?.body} />}
              </div>
              <div className="flex flex-wrap justify-center gap-6 px-4 pt-0 pb-12 xs:justify-start xs:px-12 xs:pb-16">
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

export default Page;
