import {
  PortableTextBlockComponent,
  type PortableTextComponents,
  PortableTextMarkComponent,
} from "next-sanity";
import { Children } from "react";
import { BodyLong, BodyShort, Detail, Heading } from "@navikt/ds-react";
import { SingleCodeBlock } from "@/app/_ui/code-block/CodeBlock.single";
import { KodeEksempler } from "@/app/_ui/kode-eksempler/KodeEksempler";
import { LegacyTokenModule } from "@/app/_ui/legacy-token-module/LegacyTokenModule";
import { LegacyTokenTable } from "@/app/_ui/legacy-token-table/LegacyTokenTable";
import { Bilde } from "../bilde/Bilde";
import { DoDont } from "../do-dont/DoDont";
import { Kbd } from "../kbd/Kbd";
import { PropsSeksjon } from "../props-seksjon/PropsSeksjon";
import { RelatertInnhold } from "../relatert-innhold/RelatertInnhold";
import { TableV2 } from "../table-v2/TableV2";
import { Tips } from "../tips/Tips";
import { Code } from "../typography/Code";
import { WebsiteLink } from "../typography/WebsiteLink";
import { WebsiteList, WebsiteListItem } from "../typography/WebsiteList";
import { Video } from "../video/Video";
import { WebsiteAccordion } from "../website-accordion/WebsiteAccordion";
import { WebsiteAlert } from "../website-alert/WebsiteAlert";
import { WebsiteExpansionCard } from "../website-expansioncard/WebsiteExpansionCard";
import styles from "./CustomPortableText.module.css";

type CustomPortableTextComponentsProps = {
  typoConfig?: {
    size?: "small" | "medium" | "large";
    type: "short" | "long";
  };
};

function customPortableTextComponents({
  typoConfig,
}: CustomPortableTextComponentsProps): PortableTextComponents {
  const block = blockComponents({ typoConfig });
  const marks = marksComponents();

  return {
    types: {
      relatert_innhold: RelatertInnhold,
      do_dont: DoDont,
      bilde: Bilde,
      alert: WebsiteAlert,
      expansioncard: WebsiteExpansionCard,
      tabell_v2: TableV2,
      accordion: WebsiteAccordion,
      props_seksjon: PropsSeksjon,
      video: Video,
      tips: Tips,
      kode: SingleCodeBlock,
      kode_eksempler: KodeEksempler,
      token_kategori: LegacyTokenTable,
      spesial_seksjon: LegacyTokenModule,
    } /* satisfies Record<PortableContentTypes, any> */,
    block,
    marks,
    list: {
      bullet: ({ children }) => <WebsiteList as="ul">{children}</WebsiteList>,
      number: ({ children }) => <WebsiteList as="ol">{children}</WebsiteList>,
    },
    listItem: {
      bullet: ({ children }) => (
        <WebsiteListItem icon>{children}</WebsiteListItem>
      ),
      number: ({ children }) => <WebsiteListItem>{children}</WebsiteListItem>,
    },
    unknownBlockStyle: ({ children }) =>
      withSanitizedBlock(<BodyShort spacing>{children}</BodyShort>),
    unknownType: () => null,
    unknownMark: () => null,
  };
}

function marksComponents() {
  return {
    kbd: ({ text }) => <Kbd>{text}</Kbd>,
    quote: ({ text }) => <q>{text}</q>,
    code: ({ text }) => <Code>{text}</Code>,

    link: ({ text, value: { href } }) => {
      if (!href) {
        return <span>{text}</span>;
      }
      return <WebsiteLink href={href}>{text}</WebsiteLink>;
    },
    internalLink: ({ text, value: { slug } }) => {
      if (!slug || !slug.current) {
        return <span>{text}</span>;
      }
      return <WebsiteLink href={`/${slug.current}`}>{text}</WebsiteLink>;
    },
  } satisfies Record<string, PortableTextMarkComponent>;
}

function blockComponents({
  typoConfig = { type: "long", size: "medium" },
}: CustomPortableTextComponentsProps) {
  const BodyComponent = typoConfig.type === "short" ? BodyLong : BodyShort;

  return {
    normal: ({ children }) =>
      withSanitizedBlock(
        <BodyComponent
          spacing
          className={styles.removeSpacingForLast}
          size={typoConfig.size}
        >
          {children}
        </BodyComponent>,
      ),

    detail: ({ children }) =>
      withSanitizedBlock(<Detail spacing>{children}</Detail>),
    ingress: ({ children }) =>
      withSanitizedBlock(
        <BodyLong size="large" spacing>
          {children}
        </BodyLong>,
      ),
    h2: ({ children, value }) =>
      withSanitizedBlock(
        <Heading
          className={styles.headingElement}
          tabIndex={-1}
          id={value?._key}
          level="2"
          size="large"
          data-level="2"
        >
          {children}
        </Heading>,
      ),
    h3: ({ children, value }) =>
      withSanitizedBlock(
        <Heading
          className={styles.headingElement}
          spacing
          level="3"
          size="medium"
          tabIndex={-1}
          id={value?._key}
          data-level="3"
        >
          {children}
        </Heading>,
      ),
    h4: ({ children, value }) =>
      withSanitizedBlock(
        <Heading
          className={styles.headingElement}
          spacing
          level="4"
          size="small"
          id={value?._key}
          data-level="4"
        >
          {children}
        </Heading>,
      ),
    heading4: ({ children, value }) =>
      withSanitizedBlock(
        <Heading
          className={styles.headingElement}
          spacing
          level="4"
          size="small"
          id={value?._key}
          data-level="4"
        >
          {children}
        </Heading>,
      ),
  } satisfies Record<string, PortableTextBlockComponent>;
}

function withSanitizedBlock(node: React.ReactElement) {
  const { children } = node.props;
  const validChildren = Children.toArray(children).filter(Boolean);

  if (validChildren.length === 0) {
    return null;
  }

  return node;
}

export { customPortableTextComponents };
export type { CustomPortableTextComponentsProps };
