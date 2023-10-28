import { amplitudeLogNavigation } from "@/logging";
import { BodyLong, Detail, Heading, Link } from "@navikt/ds-react";
import {
  PortableText,
  PortableTextMarkComponentProps,
  PortableTextReactComponents,
} from "@portabletext/react";
import cl from "clsx";
import Accordion from "components/sanity-modules/accordion/Accordion";
import Alert from "components/sanity-modules/alert/Alert";
import Bilde from "components/sanity-modules/bilde/Bilde";
import InnholdsKort from "components/sanity-modules/cards/InnholdsKort";
import CodeExamples from "components/sanity-modules/code-examples/CodeExamples";
import SnippetLazy from "components/sanity-modules/code-snippet/SnippetLazy";
import DoDont from "components/sanity-modules/do-dont/DoDont";
import ExpansionCard from "components/sanity-modules/expansioncard/ExpansionCard";
import PropsSeksjon from "components/sanity-modules/props/PropsSeksjon";
import SideModul from "components/sanity-modules/side-modul/SideModul";
import Tabell from "components/sanity-modules/tabell/Tabell";
import TastaturModul from "components/sanity-modules/tastatur-tabell/TastaturTabell";
import Tips from "components/sanity-modules/tips/Tips";
import TokenTable from "components/sanity-modules/token-tabell/TokenTable";
import Video from "components/sanity-modules/video/Video";
import { InlineCode } from "components/website-modules/InlineCode";
import { KBD } from "components/website-modules/KBD";
import NextLink from "next/link";
import { Children } from "react";
import { RelatertInnhold } from ".";

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
    bullet: ({ children }) => (
      <ul className="aksel-list-ul list-margin max-w-text relative mb-7 list-disc last:mb-0">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol
        type="1"
        className="aksel-list-ol list-margin max-w-text mb-7 list-decimal last:mb-0"
      >
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <BodyLong
        as="li"
        className="mb-3 ml-5 max-w-[calc(theme(spacing.text)_-_1em)]"
      >
        {children}
      </BodyLong>
    ),
    number: ({ children }) => (
      <BodyLong
        as="li"
        className="mb-3 ml-5 max-w-[calc(theme(spacing.text)_-_1em)]"
      >
        {children}
      </BodyLong>
    ),
  },
  marks: {
    kbd: ({ text }) => <KBD>{text}</KBD>,
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
        isIngress && "aksel-block-ingress group/ingress"
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
          id={`h${value._key}`}
          level="2"
          size="large"
          className="max-w-text text-deepblue-800 mb-4 mt-12 scroll-mt-20 first-of-type:mt-0 focus:outline-none"
        >
          {children}
        </Heading>
      );
    case "h3":
      return (
        <Heading
          className="max-w-text text-deepblue-800 mt-8 scroll-mt-20 focus:outline-none"
          spacing
          level="3"
          size="medium"
          tabIndex={-1}
          id={`h${value._key}`}
        >
          {children}
        </Heading>
      );
    case "h4":
      return (
        <Heading
          className="max-w-text text-deepblue-800 mt-6"
          spacing
          level="4"
          size="small"
          id={`h${value._key}`}
        >
          {children}
        </Heading>
      );

    default:
      return (
        <BodyLong
          spacing
          className="last:mb-0 group-[.aksel-block-ingress]/ingress:text-xl"
        >
          {children}
        </BodyLong>
      );
  }
}
