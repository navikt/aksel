import { Box, Page, VStack } from "@navikt/ds-react";
import Footer from "@/layout/footer/Footer";
import { GpEntryPageProps } from "@/layout/god-praksis-page/types";
import Header from "@/layout/header/Header";
import ArticleList from "./articles/ArticleList";
import ChipNav from "./chips/ChipNav";
import Hero from "./hero/Hero";

function GodPraksisPage(props: GpEntryPageProps) {
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
              <VStack gap="4">
                {props.tema && (
                  <ChipNav
                    type="undertema"
                    options={props.tema.undertema.map((ut) => ut.title)}
                  />
                )}
                <ChipNav
                  type="innholdstype"
                  options={props.innholdstype.map((i) => i.title)}
                />
              </VStack>
            </VStack>
            <ArticleList views={props.views} />
          </VStack>
        </Page.Block>
      </Box>
    </Page>
  );
}

export default GodPraksisPage;
