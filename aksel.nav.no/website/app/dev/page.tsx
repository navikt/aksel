import { groq } from "next-sanity";
import {
  Page as AkselPage,
  BodyLong,
  BoxNew,
  HGrid,
  Heading,
  VStack,
} from "@navikt/ds-react";
import { PageBlock } from "@navikt/ds-react/Page";
import { getClient } from "@/sanity/client.server";
import Footer from "../_ui/footer/Footer";
import { Header } from "../_ui/header/Header";
import GpFrontpageCard from "./_ui/GpFrontpageCard";
import { Hero } from "./_ui/Hero";
import styles from "./_ui/landingpage.module.css";

const temaQuery = groq`*[_type == "gp.tema"] | order(lower(title))`;

export const generateStaticParams = async () => {
  const client = getClient();

  const [tema] = await Promise.all([
    //   client.fetch(pageDataQuery),
    //   client.fetch(blockQuery),
    client.fetch(temaQuery),
  ]);

  // console.log({ tema });

  return {
    props: tema,
  };
};

const Page = ({ page, blocks, tema }) => {
  return (
    <>
      <Header />
      <AkselPage
        footer={<Footer />}
        footerPosition="belowFold"
        contentBlockPadding="none"
        className={styles.akselPage}
      >
        <div className={styles.heroLinearBG} />
        <main tabIndex={-1} id="hovedinnhold" className={styles.frontPage}>
          <div className={styles.mainBanner}>
            <a href="/darkside" target="_blank">
              Vi trenger testere fra team i Nav for darkmode og theming!
            </a>
          </div>

          <Hero />

          <BoxNew className={styles.godPraksis}>
            {/* God praksis */}
            <PageBlock width="2xl" gutters>
              <HGrid className={styles.godPraksisCard} columns="1fr" gap="16">
                <BoxNew
                  background="default"
                  borderWidth="1"
                  borderColor="neutral-subtleA"
                  borderRadius="xlarge"
                  paddingBlock={{ xs: "space-48" }}
                  paddingInline={{ xs: "space-16", sm: "space-48" }}
                >
                  <VStack gap="12">
                    <BoxNew paddingInline={{ xs: "2", sm: "6" }}>
                      <Heading
                        level="2"
                        size="xlarge"
                        className="text-deepblue-700"
                        spacing
                      >
                        God praksis
                      </Heading>
                      <BodyLong size="large" className="max-w-3xl">
                        {page?.god_praksis_intro ??
                          "Alle som jobber med produktutvikling i Nav sitter på kunnskap og erfaring som er nyttig for andre. Derfor deler vi god praksis med hverandre her."}
                      </BodyLong>
                    </BoxNew>

                    <ul className="grid gap-x-8 md:grid-cols-2 xl:grid-cols-3">
                      {tema?.map((t) => (
                        <GpFrontpageCard
                          key={t.title}
                          href={`/god-praksis/${t.slug.current}`}
                          image={t.pictogram}
                        >
                          {t.title}
                        </GpFrontpageCard>
                      ))}
                    </ul>
                  </VStack>
                </BoxNew>
                {blocks && (
                  <BoxNew paddingInline={{ xs: "2", lg: "18" }}>
                    {/*
                  <FrontpageBlock blocks={blocks} />
                  */}
                  </BoxNew>
                )}
              </HGrid>
            </PageBlock>
          </BoxNew>
        </main>
      </AkselPage>
    </>
  );
};

export default Page;
