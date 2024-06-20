import {
  PortableText,
  PortableTextMarkComponentProps,
  PortableTextReactComponents,
} from "@portabletext/react";
import cl from "clsx";
import NextLink from "next/link";
import { Children } from "react";
import { BodyLong, Detail, Heading, Link } from "@navikt/ds-react";
import Accordion from "@/cms/accordion/Accordion";
import Alert from "@/cms/alert/Alert";
import Bilde from "@/cms/bilde/Bilde";
import InnholdsKort from "@/cms/cards/InnholdsKort";
import CodeExamples from "@/cms/code-examples/CodeExamples";
import SnippetLazy from "@/cms/code-snippet/SnippetLazy";
import DoDont from "@/cms/do-dont/DoDont";
import ExampletextBlock from "@/cms/exampletext-block/ExampletextBlock";
import ExpansionCard from "@/cms/expansioncard/ExpansionCard";
import PropsSeksjon from "@/cms/props/PropsSeksjon";
import RelatertInnhold from "@/cms/relatert-innhold/RelatertInnhold";
import SideModul from "@/cms/side-modul/SideModul";
import Tabell from "@/cms/tabell/Tabell";
import TastaturModul from "@/cms/tastatur-tabell/TastaturTabell";
import Tips from "@/cms/tips/Tips";
import TokenTable from "@/cms/token-tabell/TokenTable";
import Video from "@/cms/video/Video";
import { amplitudeLogNavigation } from "@/logging";
import InlineCode from "@/web/InlineCode";
import KBD from "@/web/KBD";
import { List, ListItem } from "@/web/List";

const serializers: Partial<PortableTextReactComponents> = {
  types: {
    relatert_innhold: ({ value }) => <RelatertInnhold node={value} />,
    innholdskort: ({ value }) => <InnholdsKort node={value} />,
    tastatur_modul: ({ value }) => <TastaturModul node={value} />,
    riktekst_blokk: ({ value }) => <SanityBlockContent blocks={value.body} />,
    do_dont: ({ value }) => <DoDont node={value} />,
    bilde: ({ value }) => <Bilde node={value} />,
    alert: ({ value }) => <Alert node={value} />,
    expansioncard: ({ value }) => <ExpansionCard node={value} />,
    kode: ({ value }) => <SnippetLazy node={value} />,
    tabell_v2: ({ value }) => <Tabell node={value} />,
    accordion: ({ value }) => <Accordion node={value} />,
    props_seksjon: ({ value }) => <PropsSeksjon node={value} />,
    spesial_seksjon: ({ value }) => <SideModul node={value} />,
    token_kategori: ({ value }) => <TokenTable node={value} />,
    video: ({ value }) => <Video node={value} />,
    tips: ({ value }) => <Tips node={value} />,
    kode_eksempler: ({ value }) => <CodeExamples node={value} />,
    exampletext_block: ({ value }) => <ExampletextBlock node={value} />,
  },
  unknownType: () => null,
  block: {
    normal: ({ children }) => (
      <SanitizedBlock type="normal">{children}</SanitizedBlock>
    ),
    detail: ({ children }) => (
      <SanitizedBlock type="detail">{children}</SanitizedBlock>
    ),
    ingress: ({ children }) => (
      <SanitizedBlock type="ingress">{children}</SanitizedBlock>
    ),
    h2: ({ children, value }) => (
      <SanitizedBlock value={value} type="h2">
        {children}
      </SanitizedBlock>
    ),
    h3: ({ children, value }) => (
      <SanitizedBlock value={value} type="h3">
        {children}
      </SanitizedBlock>
    ),
    h4: ({ children, value }) => (
      <SanitizedBlock value={value} type="h4">
        {children}
      </SanitizedBlock>
    ),
    heading4: ({ children, value }) => (
      <SanitizedBlock value={value} type="h4">
        {children}
      </SanitizedBlock>
    ),
  },
  unknownBlockStyle: ({ children }) => (
    <SanitizedBlock type="unknown">{children}</SanitizedBlock>
  ),

  list: {
    bullet: ({ children }) => <List as="ul">{children}</List>,
    number: ({ children }) => <List as="ol">{children}</List>,
  },
  listItem: {
    bullet: ({ children }) => <ListItem icon>{children}</ListItem>,
    number: ({ children }) => <ListItem>{children}</ListItem>,
  },
  marks: {
    kbd: ({ text }) => <KBD>{text}</KBD>,
    quote: ({ text }) => <q>{text}</q>,
    code: ({ text }) => <InlineCode>{text}</InlineCode>,
    link: ({ text, value: { href } }: PortableTextMarkComponentProps<any>) => {
      if (!href) {
        return <span>{text}</span>;
      }

      return (
        <Link
          as={NextLink}
          href={href}
          inlineText
          onClick={(e) =>
            amplitudeLogNavigation("link", e.currentTarget.getAttribute("href"))
          }
          {...(href.startsWith("http") &&
          !href.startsWith("https://aksel.nav.no/")
            ? { target: "_blank", rel: "noreferrer noopener" }
            : {})}
        >
          {text}
        </Link>
      );
    },
    internalLink: ({ text, value: { slug } }) => {
      if (!slug || !slug.current) {
        return <span>{text}</span>;
      }

      const href = `/${slug?.current}`;
      return (
        <Link
          as={NextLink}
          href={href}
          inlineText
          onClick={(e) =>
            amplitudeLogNavigation("link", e.currentTarget.getAttribute("href"))
          }
        >
          {text}
        </Link>
      );
    },
  },
  unknownMark: () => null,
};

export const SanityBlockContent = ({
  blocks,
  isIngress = false,
  className,
}: {
  blocks: any;
  className?: string;
  isIngress?: boolean;
}) => {
  return (
    <div
      className={cl(
        className,
        isIngress && "aksel-block-ingress group/ingress",
      )}
    >
      <PortableText
        value={blocks ?? []}
        components={serializers}
        data-test="what"
      />
    </div>
  );
};

function SanitizedBlock({
  children: _children,
  type,
  value,
}: {
  children: React.ReactNode;
  type: string;
  value?: { _key?: string };
}) {
  const children = Children.toArray(_children).filter(Boolean);

  if (children.length === 0) {
    return null;
  }

  switch (type) {
    case "normal":
      return (
        <BodyLong
          spacing
          className="last:mb-0 group-[.aksel-block-ingress]/ingress:text-xl"
        >
          {children}
        </BodyLong>
      );
    case "detail":
      return <Detail spacing>{children}</Detail>;
    case "ingress":
      return (
        <BodyLong size="large" spacing className="max-w-text">
          {children}
        </BodyLong>
      );
    case "h2":
      return (
        <Heading
          tabIndex={-1}
          id={value?._key}
          level="2"
          size="large"
          className="mb-4 mt-12 max-w-text scroll-mt-20 text-deepblue-800 first-of-type:mt-0 focus:outline-none dark:text-text-on-inverted"
        >
          {children}
        </Heading>
      );
    case "h3":
      return (
        <Heading
          className="mt-8 max-w-text scroll-mt-20 text-deepblue-800 focus:outline-none dark:text-text-on-inverted"
          spacing
          level="3"
          size="medium"
          tabIndex={-1}
          id={value?._key}
        >
          {children}
        </Heading>
      );
    case "h4":
      return (
        <Heading
          className="mt-6 max-w-text text-deepblue-800 dark:text-text-on-inverted"
          spacing
          level="4"
          size="small"
          id={value?._key}
        >
          {children}
        </Heading>
      );

    default:
      return (
        <BodyLong
          spacing
          className="last:mb-0 group-[.aksel-block-ingress]/ingress:text-xl dark:text-text-on-inverted"
        >
          {children}
        </BodyLong>
      );
  }
}
