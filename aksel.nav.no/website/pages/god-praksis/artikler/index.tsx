import { Heading } from "@navikt/ds-react";
import Footer from "components/layout/footer/Footer";
import { Header } from "components/layout/header/Header";
import { AkselCubeStatic } from "components/website-modules/cube";
import Head from "next/head";

const Artikler = () => {
  return (
    <>
      <Head>
        <title>Artikler - Aksel</title>
        <meta property="og:title" content="Artikler - Aksel" />
      </Head>
      <div className="bg-surface-subtle">
        <Header variant="subtle" />
        <main
          tabIndex={-1}
          id="hovedinnhold"
          className="min-h-[80vh] focus:outline-none"
        >
          <div className="centered-layout mb-40 grid max-w-screen-2xl">
            <AkselCubeStatic className="text-deepblue-300 opacity-5 " />
            <Heading
              level="1"
              size="xlarge"
              className="algolia-index-lvl1 text-deepblue-800 my-20 md:text-[3rem]"
            >
              Artikler
            </Heading>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};
export default Artikler;
