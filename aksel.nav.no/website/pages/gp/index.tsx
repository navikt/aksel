import { GetStaticProps } from "next/types";
import { Suspense, lazy } from "react";
import { ArrowRightIcon } from "@navikt/aksel-icons";
import {
  BodyLong,
  Box,
  Button,
  Chips,
  HStack,
  Heading,
  Label,
  Page,
} from "@navikt/ds-react";
import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";
import { NextPageT } from "@/types";

type PageProps = NextPageT<{
  /* page: AkselGodPraksisLandingPageDocT;
  temaer: Array<AkselTemaT>; */
}>;

const query = ``;

export const getStaticProps: GetStaticProps = async ({
  preview = false,
}): Promise<PageProps> => {
  /* const { temaer, page, resent } = await getClient().fetch(query); */

  return {
    props: {
      slug: "/gp",
      preview,
      title: "Forside God praksis",
      id: "",
    },
    notFound: false,
    revalidate: 60,
  };
};

const GodPraksisPage = (/* props: PageProps["props"] */) => {
  return (
    /* TODO: Add surface-subtle to page-component props */
    <Page
      footer={<Footer />}
      footerPosition="belowFold"
      className="bg-surface-subtle"
    >
      <Header variant="subtle" />
      <Box paddingBlock="10">
        <Page.Block width="xl" gutters>
          {/* Hero */}
          <Box
            background="surface-alt-3-subtle"
            borderRadius="large"
            paddingInline="10"
            paddingBlock="10 6"
            className="bg-gradient-to-tr from-deepblue-200 via-deepblue-100 to-deepblue-100"
          >
            <Heading level="1" size="xlarge" className="text-aksel-heading">
              Alle tema
            </Heading>
            <BodyLong>
              Alle som jobber med produktutvikling i NAV sitter på kunnskap og
              erfaring som er nyttig for andre. Derfor deler vi god praksis med
              hverandre her.
            </BodyLong>
          </Box>
          {/* Chips */}
          <Box paddingBlock="6 0">
            <HStack gap="2" align="center">
              <Label as="p" className="text-aksel-heading">
                Innholdstyper:
              </Label>
              <Chips>
                <Chips.Toggle variant="neutral" checkmark={false}>
                  Metode
                </Chips.Toggle>
                <Chips.Toggle variant="neutral" checkmark={false}>
                  Teori
                </Chips.Toggle>
                <Chips.Toggle variant="neutral" checkmark={false}>
                  Verktøy
                </Chips.Toggle>
                <Chips.Toggle variant="neutral" checkmark={false}>
                  Strategi
                </Chips.Toggle>
                <Chips.Toggle variant="neutral" checkmark={false}>
                  Prinsipp
                </Chips.Toggle>
              </Chips>
            </HStack>
          </Box>
          {/* Siste artikler */}
          <Box paddingBlock="10 0">
            <HStack justify="space-between">
              <Heading level="2" size="medium" className="text-aksel-heading">
                Siste
              </Heading>
              <Button
                variant="tertiary-neutral"
                size="small"
                icon={<ArrowRightIcon aria-hidden />}
                iconPosition="right"
              >
                Se alle
              </Button>
            </HStack>
            <Box paddingBlock="5 0">
              <div>card</div>
              <div>card</div>
              <div>card</div>
              <div>card</div>
            </Box>
          </Box>
        </Page.Block>
      </Box>
    </Page>
  );

  return (
    <>
      {/* <SEO
        title="God praksis"
        description={page?.seo?.meta}
        image={page?.seo?.image}
      /> */}

      <div className="bg-surface-subtle relative overflow-hidden">
        <Header variant="transparent" />
        <main tabIndex={-1} id="hovedinnhold" className=" focus:outline-none">
          <div className="mx-auto mb-40 grid w-full max-w-screen-2xl px-4 pt-20 sm:px-6">
            <Heading
              level="1"
              size="xlarge"
              className="text-deepblue-800 mb-4 text-5xl"
            >
              God praksis
            </Heading>
            {/* {page.intro && <SanityBlockContent isIngress blocks={page.intro} />} */}
          </div>
        </main>
      </div>
    </>
  );
};

const WithPreview = lazy(() => import("@/preview"));

const Wrapper = (props: any) => {
  if (props?.preview) {
    return (
      <Suspense fallback={<GodPraksisPage {...props} />}>
        <WithPreview comp={GodPraksisPage} query={query} props={props} />
      </Suspense>
    );
  }

  return <GodPraksisPage {...props} />;
};

export default Wrapper;
