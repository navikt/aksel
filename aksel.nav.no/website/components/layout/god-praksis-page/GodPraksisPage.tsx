import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { Box, Heading, Page, VStack } from "@navikt/ds-react";
import Footer from "@/layout/footer/Footer";
import { GpEntryPageProps } from "@/layout/god-praksis-page/types";
import useInitialState from "@/layout/god-praksis-page/useInitialState";
import Header from "@/layout/header/Header";
import ChipNav from "./chips/ChipNav";
import Hero from "./hero/Hero";

const ArticleList = dynamic(() => import("./articles/ArticleList"), {
  ssr: false,
});

function GodPraksisPage(props: GpEntryPageProps) {
  const { initialData } = useInitialState(props.initialArticles);

  const [undertemaSelection, setUndertemaSelection] = React.useState<string>();
  const [innholdstypeSelection, setInnholdstypeSelection] =
    React.useState<string>();

  const [filteredUndertema, setFilteredUndertema] = React.useState([]);
  const [filteredInnholdstype, setFilteredInnholdstype] = React.useState([]);

  useEffect(() => {
    console.log(undertemaSelection, innholdstypeSelection);
    if (undertemaSelection) {
      setFilteredUndertema(
        props.chipsData.filter((entry) => {
          return entry["undertema-title"] === undertemaSelection;
        })
      );
    } else {
      setFilteredUndertema(props.chipsData);
    }
    if (innholdstypeSelection) {
      setFilteredInnholdstype(
        props.chipsData.filter((entry) => {
          return entry["innholdstype-title"] === innholdstypeSelection;
        })
      );
    } else {
      setFilteredInnholdstype(props.chipsData);
    }
  }, [props.chipsData, undertemaSelection, innholdstypeSelection]);

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
                    data={filteredInnholdstype}
                    setSelection={setUndertemaSelection}
                  />
                )}
                <ChipNav
                  type="innholdstype"
                  data={filteredUndertema}
                  setSelection={setInnholdstypeSelection}
                />
              </VStack>
            </VStack>
            <div>
              {initialData?.length > 0 && (
                <Heading level="2" size="medium" className="text-aksel-heading">
                  Siste
                </Heading>
              )}
              <ArticleList initialArticles={initialData} />
            </div>
          </VStack>
        </Page.Block>
      </Box>
    </Page>
  );
}

export default GodPraksisPage;
