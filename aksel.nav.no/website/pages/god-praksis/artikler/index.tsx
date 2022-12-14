import Footer from "components/layout/footer/Footer";
import { Header } from "components/layout/header/Header";
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
          <div>Innhold</div>
        </main>
        <Footer />
      </div>
    </>
  );
};
export default Artikler;
