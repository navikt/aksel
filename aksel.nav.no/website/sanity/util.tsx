import { InlineCode } from "@/sanity-block";
import { ExternalLink } from "@navikt/ds-icons";
import { BodyLong, Heading, Link } from "@navikt/ds-react";
import { KBD } from "@sanity/ui";
import NextLink from "next/link";
import { Role } from "sanity";

export const toPlainText = (blocks) => {
  if (!blocks || blocks.length === 0) {
    return "";
  }

  return blocks
    .map((block) => {
      if (block._type !== "block" || !block.children) {
        return "";
      }

      return block.children.map((child) => child.text).join("");
    })
    .join("\n\n");
};

export const getTemplates = (roles: Role[]) => {
  const templates = {
    profil: [
      {
        title: "Profilside",
        id: "profilRole",
        templateId: "editor",
        subtitle: "(Kan bare ha 1 profilside)",
      },
    ],
    god_praksis_forfatter: [
      {
        title: "God praksis artikkel",
        id: "godPraksisForfatterRole",
        templateId: "aksel_artikkel",
        subtitle: "Fagartikkel",
      },
    ],
    tema_ansvarlig: [
      {
        title: "God praksis tema",
        id: "temaAnsvarligRole",
        templateId: "aksel_tema",
        subtitle: "Nytt god-praksis tema",
      },
    ],
    blogger: [
      {
        title: "Bloggpost",
        id: "bloggerRole",
        templateId: "aksel_blogg",
      },
    ],
    grunnleggende: [
      {
        title: "Grunnleggende artikkel",
        id: "grunnleggendeRole",
        templateId: "ds_artikkel",
        subtitle: "Guider og dokumentasjon for designsystemet",
      },
    ],
    komponenter: [
      {
        title: "Komponent artikkel",
        id: "komponenterRole",
        templateId: "komponent_artikkel",
        subtitle: "Dokumentasjon for designsystemet",
      },
    ],
    prinsipper: [
      {
        title: "Prinsipp artikkel",
        id: "prinsippereRole",
        templateId: "aksel_prinsipp",
      },
    ],
  };
  return Object.values(templates).flat();
  /* return [
    ...roles
      .map((role) => {
        if (templates[role.name.replaceAll("-", "_")]) {
          return templates[role.name.replaceAll("-", "_")];
        }
        return [];
      })
      .flat(),
  ]; */
};

export const serializers = {
  types: {
    block: ({ node, children }) => {
      const style = node.style;
      if (children && children.length === 1 && children[0] === "") return null;

      const textProps = { children };
      switch (style) {
        case "normal":
          return <BodyLong size="medium" spacing {...textProps} />;
        case "h2":
          return (
            <Heading
              className="algolia-index-lvl3 max-w-text mt-8 scroll-mt-20 focus:outline-none"
              spacing
              level="2"
              size="medium"
              tabIndex={-1}
              id={`h${node._key}`}
              {...textProps}
            />
          );
        case "h3":
          return (
            <Heading
              className="algolia-index-lvl3 max-w-text mt-8 scroll-mt-20 first:mt-0 focus:outline-none group-first:mt-0"
              spacing
              level="3"
              size="small"
              tabIndex={-1}
              id={`h${node._key}`}
              {...textProps}
            />
          );
        case "h4":
          return (
            <Heading
              className="algolia-index-lvl4 max-w-text mt-6"
              spacing
              level="4"
              size="xsmall"
              {...textProps}
            />
          );
        default:
          return (
            <BodyLong
              size="medium"
              spacing
              {...textProps}
              className="algolia-index-body max-w-text"
            />
          );
      }
    },
  },
  list: (props: any) => {
    if (props?.type === "number") {
      return (
        <ol
          type="1"
          className="aksel-list-ol list-margin max-w-text mb-7 list-decimal"
        >
          {props.children}
        </ol>
      );
    }
    return (
      <ul className="aksel-list-ul list-margin max-w-text relative mb-7 list-disc">
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
          <NextLink href={href} passHref legacyBehavior>
            <Link className="inline">{children}</Link>
          </NextLink>
        );
      }
      return blank ? (
        <Link href={href} target="_blank" rel="noreferrer noopener">
          {children} <ExternalLink title="åpner lenken i ny fane" />
        </Link>
      ) : (
        <NextLink href={href} passHref legacyBehavior>
          <Link className="inline">{children}</Link>
        </NextLink>
      );
    },
    internalLink: ({ mark, children }: { mark: any; children: any }) => {
      const { slug = {} } = mark;

      if (!slug || !slug.current) return children;

      const href = `/${slug?.current}`;
      return (
        <NextLink href={href} passHref legacyBehavior>
          <Link>{children}</Link>
        </NextLink>
      );
    },
  },
};
