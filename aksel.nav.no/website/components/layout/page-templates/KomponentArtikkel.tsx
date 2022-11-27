import { SanityT } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { ExternalLink } from "@navikt/ds-icons";
import { BodyLong, BodyShort, Heading } from "@navikt/ds-react";
import IntroSeksjon from "components/sanity-modules/IntroSeksjon";
import Head from "next/head";
import { dateStr, Feedback, TableOfContents } from "../..";

const kodepakker = {
  "ds-react": {
    title: "@navikt/ds-react",
    git: "https://github.com/navikt/nav-frontend-moduler/tree/master/%40navikt/core",
  },
  "ds-css": {
    title: "@navikt/ds-css",
    git: "https://github.com/navikt/nav-frontend-moduler/tree/master/%40navikt/core",
  },
  "ds-react-internal": {
    title: "@navikt/ds-react-internal",
    git: "https://github.com/navikt/nav-frontend-moduler/tree/master/%40navikt/internal",
  },
  "ds-css-internal": {
    title: "@navikt/ds-css-internal",
    git: "https://github.com/navikt/nav-frontend-moduler/tree/master/%40navikt/internal",
  },
  "ds-icons": {
    title: "@navikt/ds-reaciconst",
    git: "https://github.com/navikt/nav-frontend-moduler/tree/master/%40navikt/core",
  },
  "ds-tokens": {
    title: "@navikt/ds-tokens",
    git: "https://github.com/navikt/nav-frontend-moduler/tree/master/%40navikt/core",
  },
  "ds-tailwind": {
    title: "@navikt/ds-tailwind",
    git: "https://github.com/navikt/nav-frontend-moduler/tree/master/%40navikt/core",
  },
};

const KomponentArtikkelTemplate = ({
  data,
  title,
}: {
  data: SanityT.Schema.komponent_artikkel;
  title: string;
}): JSX.Element => {
  const pack = data?.kodepakker?.length > 0 && kodepakker[data?.kodepakker[0]];

  return (
    <>
      <Head>
        <title>{data?.heading ? `${data?.heading} - ${title}` : title}</title>
        <meta
          property="og:title"
          content={`${data.heading} - Designsystemet`}
        />
      </Head>

      <div className="content-box">
        <div className="pt-8">
          <div className="flex flex-wrap gap-2"></div>
          <Heading
            size="xlarge"
            level="1"
            spacing
            className="algolia-index-lvl1 flex flex-wrap items-center gap-4"
          >
            {data.heading}
          </Heading>
          <BodyShort
            as="div"
            size="small"
            className="mb-4 flex flex-wrap items-center justify-start gap-x-4 gap-y-3"
          >
            <BodyShort
              size="small"
              as="span"
              className="text-text-subtle flex items-center"
            >
              {`Oppdatert ${dateStr(data._updatedAt)}`}
            </BodyShort>
          </BodyShort>
          <BodyShort
            as="span"
            size="small"
            className="text-text-subtle flex gap-4"
          >
            {pack && (
              <>
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  href={`https://yarnpkg.com/package/${pack.title}`}
                  className="hover:text-text-default focus:text-text-on-inverted focus:shadow-focus flex items-center gap-1 underline hover:no-underline focus:bg-blue-800 focus:no-underline focus:outline-none"
                >
                  Yarn
                  <ExternalLink title="Gå til yarn pakke" />
                </a>
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  href={pack.git}
                  className="hover:text-text-default focus:text-text-on-inverted focus:shadow-focus flex items-center gap-1 underline hover:no-underline focus:bg-blue-800 focus:no-underline focus:outline-none"
                >
                  Kode
                  <ExternalLink title="Gå til github-kode" />
                </a>
              </>
            )}

            {data.figma_link && (
              <a
                target="_blank"
                rel="noreferrer noopener"
                href={data.figma_link}
                className="hover:text-text-default focus:text-text-on-inverted focus:shadow-focus flex items-center gap-1 underline hover:no-underline focus:bg-blue-800 focus:no-underline focus:outline-none"
              >
                Figma
                <ExternalLink title="Åpne i Figma" />
              </a>
            )}
          </BodyShort>
        </div>
      </div>
      <div className="relative flex max-w-full md:max-w-7xl">
        <TableOfContents
          changedState={data["content"] ?? data["bruk_tab"]}
          hideToc={false}
        />
        <div className="content-box">
          <div className="mt-12">
            {data?.status && data.status?.tag === "beta" && (
              <div className="mb-7 rounded bg-purple-50 p-4">
                <Heading level="2" size="small" spacing>
                  Beta
                </Heading>
                <BodyLong className="override-text-no-max mb-2">
                  Komponenten er under utvikling. Dette kan medføre
                  breaking-changes i patch/minor versjon av kodepakker. Teamet
                  ditt må selv ta stilling til om dere ønsker å bruke denne i
                  produksjon.
                </BodyLong>
                <BodyLong className="override-text-no-max">
                  Har du innspill eller funnet en bug? Send oss en melding her
                  eller på slack! Beta-versjon er ment for rask iterering, så
                  alle innspill hjelper.
                </BodyLong>
              </div>
            )}
            <IntroSeksjon node={data.intro} />
            <SanityBlockContent blocks={data["content"] ?? data["bruk_tab"]} />
          </div>
          <Feedback docId={data?._id} docType={data?._type} />
        </div>
      </div>
    </>
  );
};

export default KomponentArtikkelTemplate;
