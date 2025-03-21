import { PortableTextBlock } from "next-sanity";
import { Detail, HStack, Heading, Link, Tag } from "@navikt/ds-react";

/* @ts-expect-error Workspace is unable to resolve these imports */
import { List, ListItem } from "@navikt/ds-react/List";
import { KOMPONENT_BY_SLUG_QUERYResult } from "@/app/_sanity/query-types";
import { CustomPortableText } from "@/app/_ui/portable-text/CustomPortableText";
import { getStatusTag } from "@/app/_ui/theme-config";
import { MarkdownText } from "@/app/_ui/typography/MarkdownText";
import { FigmaIcon, GithubIcon } from "@/assets/Icons";
import { dateStr } from "@/utils";
import styles from "./Designsystemet.module.css";

type DesignsystemetPageLayoutT = {
  children: React.ReactNode;
  layout?: "with-toc";
};

function DesignsystemetPageLayout({
  children,
  layout,
}: DesignsystemetPageLayoutT) {
  return (
    <main
      id="hovedinnhold"
      className={styles.pageLayoutMain}
      data-layout={layout}
    >
      {children}
    </main>
  );
}

type DesignsystemetPageT = {
  data: KOMPONENT_BY_SLUG_QUERYResult;
};

async function DesignsystemetPageHeader({ data }: DesignsystemetPageT) {
  /* TODO: refactor dateStr to appdir */
  const publishDate = await dateStr(data?._updatedAt ?? data?._createdAt ?? "");

  const statusTag = getStatusTag(data?.status?.tag);

  return (
    <div>
      <Heading level="1" size="xlarge" className={styles.pageHeaderHeading}>
        {data?.heading}
      </Heading>
      <CustomPortableText
        value={data?.intro?.body as PortableTextBlock[]}
        typoConfig={{
          type: "short",
          size: "large",
        }}
      />
      <HStack gap="space-16" align="center" marginBlock="space-24 0">
        {statusTag && (
          <Tag
            variant="info"
            size="xsmall"
            data-color-role={statusTag.colorRole}
          >
            {statusTag.text}
          </Tag>
        )}
        {publishDate && (
          <Detail as="span" textColor="subtle">
            {publishDate}
          </Detail>
        )}
      </HStack>
      <KomponentLinks data={data} />
      {/* TODO: thumbnail */}
      <KomponentIntro data={data} />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function DesignsystemetPage(props: DesignsystemetPageT) {
  return <div>123</div>;
}

const GITHUB_CONFIG = {
  "ds-react": {
    title: "@navikt/ds-react",
    git: "https://github.com/navikt/aksel/tree/main/%40navikt/core/react",
    changelog:
      "https://github.com/navikt/aksel/blob/main/%40navikt/core/react/CHANGELOG.md",
  },
  "ds-css": {
    title: "@navikt/ds-css",
    git: "https://github.com/navikt/aksel/tree/main/%40navikt/core/css",
    changelog:
      "https://github.com/navikt/aksel/blob/main/%40navikt/core/css/CHANGELOG.md",
  },
  "ds-tokens": {
    title: "@navikt/ds-tokens",
    git: "https://github.com/navikt/aksel/tree/main/%40navikt/core/tokens",
    changelog:
      "https://github.com/navikt/aksel/blob/main/%40navikt/core/tokens/CHANGELOG.md",
  },
  "ds-tailwind": {
    title: "@navikt/ds-tailwind",
    git: "https://github.com/navikt/aksel/tree/main/%40navikt/core/tailwind",
    changelog:
      "https://github.com/navikt/aksel/blob/main/%40navikt/core/tailwind/CHANGELOG.md",
  },
} as const;

function KomponentLinks({ data }: { data: KOMPONENT_BY_SLUG_QUERYResult }) {
  const pack = data?.kodepakker?.[0];
  const gitConfig = pack ? GITHUB_CONFIG[pack] ?? null : null;

  if (!(gitConfig || data?.figma_link)) {
    return null;
  }

  return (
    <HStack gap="space-16" align="center" marginBlock="space-16 0">
      {gitConfig && (
        <Link
          target="_blank"
          rel="noreferrer noopener"
          href={gitConfig.git}
          data-umami-event="navigere"
          data-umami-event-url={gitConfig.git}
          variant="subtle"
        >
          <GithubIcon /> Github
        </Link>
      )}
      {data?.figma_link && (
        <Link
          target="_blank"
          rel="noreferrer noopener"
          href={data.figma_link}
          data-umami-event="navigere"
          data-umami-event-url={data.figma_link}
          variant="subtle"
        >
          <FigmaIcon /> Figma
        </Link>
      )}
    </HStack>
  );
}

function KomponentIntro({ data }: { data: KOMPONENT_BY_SLUG_QUERYResult }) {
  return (
    <div className="mt-7 space-y-6">
      <List title="Egnet til:">
        {/* {internal && <ListItem icon>Bruk på interne flater</ListItem>} */}
        {data?.intro?.brukes_til?.map((x) => (
          <ListItem icon key={x}>
            <MarkdownText>{x}</MarkdownText>
          </ListItem>
        ))}
      </List>
      {data?.intro?.brukes_ikke_til && (
        <List title="Uegnet til:">
          {data?.intro?.brukes_ikke_til.map((x) => (
            <ListItem icon key={x}>
              <MarkdownText>{x}</MarkdownText>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}

export {
  DesignsystemetPage,
  DesignsystemetPageHeader,
  DesignsystemetPageLayout,
};
