import dynamic from "next/dynamic";
import { Box, Heading, Page, VStack } from "@navikt/ds-react";
import Footer from "@/layout/footer/Footer";
import { ChipData, GpEntryPageProps } from "@/layout/god-praksis-page/types";
import useInitialState from "@/layout/god-praksis-page/useInitialState";
import Header from "@/layout/header/Header";
import ChipNav from "./chips/ChipNav";
import Hero from "./hero/Hero";

const ArticleList = dynamic(() => import("./articles/ArticleList"), {
  ssr: false,
});

export type ChipsRenderData = { title: string; count: number }[];

const countUniques = (
  lens: "innholdstype-title" | "undertema-title",
  chipDatas: ChipData
): ChipsRenderData => {
  console.log({ lens, chipDatas });
  const map = new Map<string, number>();
  for (const entry of chipDatas) {
    const count = map.get(entry[lens]) || 0;
    map.set(entry[lens], count + 1);
  }
  const chipData = [];
  for (const [key, value] of map.entries()) {
    chipData.push({ title: key, count: value });
  }
  return chipData;
};

function GodPraksisPage(props: GpEntryPageProps) {
  const { initialData } = useInitialState(props.initialArticles);

  console.log("#### GodPraksisPage ####");
  console.log({ chipsDataAll: props.chipsDataAll });

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
                    data={countUniques("undertema-title", props.chipsDataAll)}
                  />
                )}
                <ChipNav
                  type="innholdstype"
                  data={countUniques("innholdstype-title", props.chipsDataAll)}
                />
              </VStack>
            </VStack>
            <div>
              <Heading level="2" size="medium" className="text-aksel-heading">
                Siste
              </Heading>
              <ArticleList initialArticles={initialData} />
            </div>
          </VStack>
        </Page.Block>
      </Box>
    </Page>
  );
}

export default GodPraksisPage;
