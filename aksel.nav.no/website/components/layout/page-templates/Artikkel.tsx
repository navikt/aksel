import { SanityT } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { BodyShort, Heading } from "@navikt/ds-react";
import cl from "classnames";
import Head from "next/head";
import { dateStr, Feedback, TableOfContents } from "../..";

const ArtikkelTemplate = ({
  data,
  title,
}: {
  data: SanityT.Schema.ds_artikkel;
  title: string;
}): JSX.Element => {
  if (!data.content || !data.heading) {
    return null;
  }

  const layout = cl({
    "content-box--full": data.layout === "full",
    "content-box": data.layout !== "full",
  });

  return (
    <>
      <Head>
        {data.heading && (
          <>
            <title>{`${data.heading} - ${title}`}</title>
            <meta property="og:title" content={`${data.heading} - ${title}`} />
          </>
        )}
      </Head>
      <div className="content-box">
        <div className="pt-8 pb-6">
          <Heading
            size="xlarge"
            level="1"
            spacing
            className="algolia-index-lvl1"
          >
            {data.heading}
          </Heading>

          <BodyShort
            size="small"
            as="span"
            className="flex items-center text-text-muted"
          >
            {`Oppdatert ${dateStr(data._updatedAt)}`}
          </BodyShort>
        </div>
      </div>
      <div className="relative flex max-w-full md:max-w-7xl">
        <TableOfContents changedState={data.content} hideToc={false} />
        <div className={layout}>
          <SanityBlockContent className="mt-12" blocks={data.content} />
          <Feedback docId={data?._id} docType={data?._type} />
        </div>
      </div>
    </>
  );
};

export default ArtikkelTemplate;
