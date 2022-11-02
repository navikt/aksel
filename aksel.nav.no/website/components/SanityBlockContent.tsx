import { ExternalLink } from "@navikt/ds-icons";
import { BodyLong, Detail, Heading, Ingress, Link } from "@navikt/ds-react";
import BlockContent from "@sanity/block-content-to-react";
import cl from "classnames";
import NextLink from "next/link";
import React, { createContext, useContext } from "react";
import {
  Accordion,
  Alert,
  Bilde,
  CodeExamples,
  DoDont,
  InnholdsKort,
  Kode,
  LevelTwoHeading,
  PropsSeksjon,
  RelatertInnhold,
  SpesialSeksjon,
  Tabell,
  TastaturModul,
  Tips,
  TokensSeksjon,
  Video,
} from ".";

export const InlineCode = (props: React.HTMLAttributes<HTMLElement>) => (
  <code className="inline-code" {...props} />
);

export const KBD = (props: React.HTMLAttributes<HTMLElement>) => (
  <kbd className="inline-kbd" {...props} />
);

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
    kode: ({ node }) => <Kode node={node} />,
    tabell: ({ node }) => <Tabell node={node} />,
    accordion: ({ node }) => <Accordion node={node} />,
    props_seksjon: ({ node }) => <PropsSeksjon node={node} />,
    spesial_seksjon: ({ node }) => <SpesialSeksjon node={node} />,
    video: ({ node }) => <Video node={node} />,
    tokens: ({ node }) => <TokensSeksjon node={node} />,
    tips: ({ node }) => <Tips node={node} />,
    kode_eksempler: ({ node }) => <CodeExamples node={node} />,

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
              className={cl("algolia-index-body", {
                "last:mb-0": context.noLastMargin,
              })}
            />
          ) : (
            <BodyLong
              size={context.size}
              spacing
              {...textProps}
              className={cl("algolia-index-body", {
                "last:mb-0": context.noLastMargin,
              })}
            />
          );

        case "detail":
          return (
            <Detail
              spacing
              size="small"
              {...textProps}
              className="algolia-index-detail"
            />
          );
        case "h2":
          return <LevelTwoHeading {...textProps} id={`h${node._key}`} />;
        case "h3":
          return (
            <Heading
              className="algolia-index-lvl3 mt-8 max-w-text scroll-mt-20 focus:outline-none"
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
              className="algolia-index-lvl4 mt-6 max-w-text"
              spacing
              level="4"
              size="small"
              {...textProps}
            />
          );
        case "ingress":
          return (
            <Ingress spacing className="algolia-index-ingress max-w-text">
              {children}
            </Ingress>
          );
        default:
          return (
            <BodyLong
              size={context.size}
              spacing
              {...textProps}
              className="algolia-index-body max-w-text"
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
            "aksel-list-ol list-margin mb-7 max-w-text list-decimal",
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
          "aksel-list-ul list-margin relative mb-7 max-w-text list-disc",
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
        className="ml-5 mb-3 max-w-[calc(theme(spacing.text)_-_1em)]"
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
      if (href && href.startsWith("mailto:")) {
        return (
          <NextLink href={href} passHref>
            <Link className="inline">{children}</Link>
          </NextLink>
        );
      }
      return blank ? (
        <Link href={href} target="_blank" rel="noreferrer noopener">
          {children} <ExternalLink title="åpner lenken i ny fane" />
        </Link>
      ) : (
        <NextLink href={href} passHref>
          <Link className="inline">{children}</Link>
        </NextLink>
      );
    },
    internalLink: ({ mark, children }: { mark: any; children: any }) => {
      const { slug = {} } = mark;
      if (!slug || !slug.current) return children;

      const href = `/${slug?.current}`;
      return (
        <NextLink href={href} passHref>
          <Link>{children}</Link>
        </NextLink>
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
