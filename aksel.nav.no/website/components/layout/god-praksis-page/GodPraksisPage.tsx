import dynamic from "next/dynamic";
import { Box, Page, VStack } from "@navikt/ds-react";
import Footer from "@/layout/footer/Footer";
import { GpEntryPageProps } from "@/layout/god-praksis-page/types";
import useInitialState from "@/layout/god-praksis-page/useInitialState";
import Header from "@/layout/header/Header";
import Hero from "./hero/Hero";

const ArticleList = dynamic(() => import("./articles/ArticleList"), {
  ssr: false,
});

const ChipGroup = dynamic(() => import("./chips/ChipGroup"), {
  ssr: false,
});

function GodPraksisPage(props: GpEntryPageProps) {
  const { initialData } = useInitialState(props.initialArticles);

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
          <VStack gap="10">
            <VStack gap="6">
              <Hero tema={props.tema} heroNav={props.heroNav} />
              <ChipGroup data={props.chipsData} showTema={!!props.tema} />
            </VStack>
            <ArticleList initialArticles={initialData} />
          </VStack>
        </Page.Block>
      </Box>
    </Page>
  );
}

export default GodPraksisPage;
