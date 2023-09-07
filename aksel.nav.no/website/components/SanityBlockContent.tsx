import { BodyLong, Detail, Heading, Link } from "@navikt/ds-react";

import {
  PortableText,
  PortableTextMarkComponentProps,
  PortableTextReactComponents,
} from "@portabletext/react";

import ExpansionCard from "components/sanity-modules/ExpansionCard";
import InnholdsKort from "components/sanity-modules/cards/InnholdsKort";
import { InlineCode } from "components/website-modules/InlineCode";
import { KBD } from "components/website-modules/KBD";
import NextLink from "next/link";
import { createContext, useContext } from "react";
import {
  Accordion,
  Alert,
  Bilde,
  CodeExamples,
  DoDont,
  LevelTwoHeading,
  PropsSeksjon,
  RelatertInnhold,
  SideModul,
  Snippet,
  Tabell,
  TastaturModul,
  Tips,
  TokenTable,
  UuFeedback,
  Video,
  logNav,
} from ".";

const serializers: Partial<PortableTextReactComponents> = {
  types: {
    /* V2 content structure */
    relatert_innhold: ({ value }) => <RelatertInnhold node={value} />,
    innholdskort: ({ value }) => <InnholdsKort node={value} />,
    tastatur_modul: ({ value }) => <TastaturModul node={value} />,
    riktekst_blokk: ({ value }) => <SanityBlockContent blocks={value.body} />,
    do_dont: ({ value }) => <DoDont node={value} />,
    bilde: ({ value }) => <Bilde node={value} />,
    alert: ({ value }) => <Alert node={value} />,
    expansioncard: ({ value }) => <ExpansionCard node={value} />,
    kode: ({ value }) => <Snippet node={value} />,
    tabell_v2: ({ value }) => <Tabell node={value} />,
    accordion: ({ value }) => <Accordion node={value} />,
    props_seksjon: ({ value }) => <PropsSeksjon node={value} />,
    spesial_seksjon: ({ value }) => <SideModul node={value} />,
    token_kategori: ({ value }) => <TokenTable node={value} />,
    video: ({ value }) => <Video node={value} />,
    tips: ({ value }) => <Tips node={value} />,
    kode_eksempler: ({ value }) => <CodeExamples node={value} />,
    uufeedback: ({ value }) => <UuFeedback node={value} />,
  },
  block: ({ value, children }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const context: BlockContextT = useContext(BlockContext);
    const style = value.style;
    /* if (children && children.length === 1 && children[0] === "") return null; */

    const textProps = { children };
    switch (style) {
      case "normal":
        return context?.isIngress ? (
          <BodyLong size="large" spacing {...textProps} className="last:mb-0" />
        ) : (
          <BodyLong spacing {...textProps} className="last:mb-0" />
        );

      case "detail":
        return <Detail spacing {...textProps} />;
      case "h2":
        return <LevelTwoHeading {...textProps} id={`h${value._key}`} />;
      case "h3":
        return (
          <Heading
            className="max-w-text text-deepblue-800 mt-8 scroll-mt-20 focus:outline-none"
            spacing
            level="3"
            size="medium"
            tabIndex={-1}
            id={`h${value._key}`}
            {...textProps}
          />
        );
      case "h4":
        return (
          <Heading
            className="max-w-text text-deepblue-800 mt-6"
            spacing
            level="4"
            size="small"
            id={`h${value._key}`}
            {...textProps}
          />
        );
      case "ingress":
        return (
          <BodyLong size="large" spacing className="max-w-text">
            {children}
          </BodyLong>
        );
      default:
        return <BodyLong spacing {...textProps} className="max-w-text" />;
    }
  },
  list: (props: any) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    if (props?.type === "number") {
      return (
        <ol
          type="1"
          className="aksel-list-ol list-margin max-w-text mb-7 list-decimal last:mb-0"
        >
          {props.children}
        </ol>
      );
    }
    return (
      <ul className="aksel-list-ul list-margin max-w-text relative mb-7 list-disc last:mb-0">
        {props.children}
      </ul>
    );
  },
  listItem: (props: any) => {
    return (
      <BodyLong
        as="li"
        className="mb-3 ml-5 max-w-[calc(theme(spacing.text)_-_1em)]"
      >
        {props.children}
      </BodyLong>
    );
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
          href={href}
          inlineText
          onClick={(e) =>
            logNav(
              "link",
              window.location.pathname,
              e.currentTarget.getAttribute("href")
            )
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
            logNav(
              "link",
              window.location.pathname,
              e.currentTarget.getAttribute("href")
            )
          }
        >
          {text}
        </Link>
      );
    },
  },
};

export type BlockContextT = {
  isIngress?: boolean;
};

export const BlockContext = createContext<BlockContextT>({
  isIngress: false,
});

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
    <BlockContext.Provider
      value={{
        isIngress,
      }}
    >
      <div className={className}>
        <PortableText value={blocks ?? []} components={serializers} />
      </div>
    </BlockContext.Provider>
  );
};
