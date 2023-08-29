import { BodyLong, Detail, Heading, Ingress, Link } from "@navikt/ds-react";
import BlockContent from "@sanity/block-content-to-react";
import cl from "clsx";
import InnholdsKort from "components/sanity-modules/cards/InnholdsKort";
import ExpansionCard from "components/sanity-modules/ExpansionCard";
import NextLink from "next/link";
import React, { createContext, useContext } from "react";
import {
  Accordion,
  Alert,
  Bilde,
  CodeExamples,
  DoDont,
  LevelTwoHeading,
  logNav,
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
} from ".";
import { KBD } from "components/website-modules/KBD";
import { InlineCode } from "components/website-modules/InlineCode";

const serializers = {
  types: {
    /* V2 content structure */
    relatert_innhold: ({ node }) => <RelatertInnhold node={node} />,
    innholdskort: ({ node }) => <InnholdsKort node={node} />,
    tastatur_modul: ({ node }) => <TastaturModul node={node} />,
    riktekst_blokk: ({ node }) => <SanityBlockContent blocks={node.body} />,
    do_dont: ({ node }) => <DoDont node={node} />,
    bilde: ({ node }) => <Bilde node={node} />,
    alert: ({ node }) => <Alert node={node} />,
    expansioncard: ({ node }) => <ExpansionCard node={node} />,
    kode: ({ node }) => <Snippet node={node} />,
    tabell_v2: ({ node }) => <Tabell node={node} />,
    accordion: ({ node }) => <Accordion node={node} />,
    props_seksjon: ({ node }) => <PropsSeksjon node={node} />,
    spesial_seksjon: ({ node }) => <SideModul node={node} />,
    token_kategori: ({ node }) => <TokenTable node={node} />,
    video: ({ node }) => <Video node={node} />,
    tips: ({ node }) => <Tips node={node} />,
    kode_eksempler: ({ node }) => <CodeExamples node={node} />,
    uufeedback: ({ node }) => <UuFeedback node={node} />,

    block: ({ node, children }) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const context: BlockContextT = useContext(BlockContext);
      const style = node.style;
      if (children && children.length === 1 && children[0] === "") return null;

      const textProps = { children };
      switch (style) {
        case "normal":
          return context?.isIngress ? (
            <Ingress
              spacing
              {...textProps}
              className={cl({
                "last:mb-0": context.noLastMargin,
              })}
            />
          ) : (
            <BodyLong
              size={context.size}
              spacing
              {...textProps}
              className={cl({
                "last:mb-0": context.noLastMargin,
              })}
            />
          );

        case "detail":
          return <Detail spacing {...textProps} />;
        case "h2":
          return <LevelTwoHeading {...textProps} id={`h${node._key}`} />;
        case "h3":
          return (
            <Heading
              className="max-w-text text-deepblue-800 mt-8 scroll-mt-20 focus:outline-none"
              spacing
              level="3"
              size="medium"
              tabIndex={-1}
              id={`h${node._key}`}
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
              id={`h${node._key}`}
              {...textProps}
            />
          );
        case "ingress":
          return (
            <Ingress spacing className="max-w-text">
              {children}
            </Ingress>
          );
        default:
          return (
            <BodyLong
              size={context.size}
              spacing
              {...textProps}
              className="max-w-text"
            />
          );
      }
    },
  },
  list: (props: any) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const context: BlockContextT = useContext(BlockContext);
    if (props?.type === "number") {
      return (
        <ol
          type="1"
          className={cl(
            "aksel-list-ol list-margin max-w-text mb-7 list-decimal",
            {
              "last:mb-0": context.noLastMargin,
            }
          )}
        >
          {props.children}
        </ol>
      );
    }
    return (
      <ul
        className={cl(
          "aksel-list-ul list-margin max-w-text relative mb-7 list-disc",
          {
            "last:mb-0": context.noLastMargin,
          }
        )}
      >
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
    draft_only: () => null,
    kbd: (props) => <KBD>{props.children}</KBD>,
    code: (props) => <InlineCode>{props.children}</InlineCode>,
    link: ({
      mark: { blank, href },
      children,
    }: {
      mark: any;
      children: any;
    }) => {
      if (!href) {
        return children;
      }

      const externalLink =
        href.startsWith("http") && !href.startsWith("https://aksel.nav.no/");

      return blank || externalLink ? (
        <Link
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          inlineText
          onClick={(e) =>
            logNav(
              "link",
              window.location.pathname,
              e.currentTarget.getAttribute("href")
            )
          }
        >
          {children}
        </Link>
      ) : (
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
          className="inline"
        >
          {children}
        </Link>
      );
    },
    internalLink: ({ mark, children }: { mark: any; children: any }) => {
      const { slug = {} } = mark;
      if (!slug || !slug.current) {
        return children;
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
          {children}
        </Link>
      );
    },
  },
};

export type BlockContextT = {
  size: "medium" | "small";
  noLastMargin: boolean;
  variant: "ds" | "aksel";
  isIngress?: boolean;
};

export const BlockContext = createContext<BlockContextT>({
  size: "medium",
  noLastMargin: false,
  variant: "ds",
  isIngress: false,
});

export const SanityBlockContent = ({
  blocks,
  size = "medium",
  noLastMargin = false,
  variant,
  isIngress = false,
  ...rest
}: {
  blocks: any;
  size?: "medium" | "small";
  className?: string;
  noLastMargin?: boolean;
  variant?: "ds" | "aksel";
  isIngress?: boolean;
}) => {
  const context = useContext(BlockContext);

  return (
    <BlockContext.Provider
      value={{
        size,
        noLastMargin,
        variant: variant ?? context?.variant ?? "ds",
        isIngress,
      }}
    >
      <BlockContent
        blocks={blocks ?? []}
        serializers={serializers}
        options={{ size: "small" }}
        renderContainerOnSingleChild
        {...rest}
      />
    </BlockContext.Provider>
  );
};
