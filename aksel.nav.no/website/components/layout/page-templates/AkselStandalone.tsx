import { Feedback, TableOfContents } from "@/components";
import { SanityT } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { Heading } from "@navikt/ds-react";
import Head from "next/head";
import Script from "next/script";
import Footer from "../footer/Footer";
import AkselHeader from "../header/AkselHeader";

const AkselStandaloneTemplate = ({
  data,
  title,
}: {
  data: SanityT.Schema.aksel_standalone;
  title: string;
}): JSX.Element => {
  if (!data.content || !data.heading) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{`${data?.heading} - ${title}`}</title>
        <meta
          property="og:title"
          content={`${data?.heading} - ${title}`}
          key="ogtitle"
        />
      </Head>
      <Script src="https://in2.taskanalytics.com/tm.js"></Script>
      <Script id="task-analytics" nonce="4e1aa203a32e">
        {`window.TA = window.TA||function(){(TA.q=TA.q||[]).push(arguments);};
          window.TA('start', '03346')`}
      </Script>
      <AkselHeader variant="artikkel" />
      <main
        tabIndex={-1}
        id="hovedinnhold"
        className="aksel-artikkel xs:pb-32 bg-gray-50 pt-[8vw] pb-16 focus:outline-none"
      >
        <div className="px-4">
          <div className="dynamic-wrapper-prose">
            <Heading
              level="1"
              size="xlarge"
              className="algolia-index-lvl1 mt-1"
            >
              {data.heading}
            </Heading>
          </div>
        </div>
        <div className="mt-12">
          <TableOfContents changedState={data?.content ?? []} hideToc />
          <div className="mt-8 px-4">
            <SanityBlockContent
              className="dynamic-wrapper-prose"
              blocks={data?.content ?? []}
              variant="aksel"
            />
          </div>
        </div>
        <div className="mt-16 px-4">
          <div className="dynamic-wrapper-prose border-t border-gray-300 pt-8">
            <Feedback
              akselFeedback
              text="siden"
              docId={data?._id}
              docType={data?._type}
            />
          </div>
        </div>
      </main>
      <Footer variant="aksel" />
    </>
  );
};

export default AkselStandaloneTemplate;
