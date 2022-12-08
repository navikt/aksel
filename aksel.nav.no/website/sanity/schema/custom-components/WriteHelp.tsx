import { InlineCode, KBD } from "@/sanity-block";
import { ExternalLink } from "@navikt/ds-icons";
import { BodyLong, Heading, Link } from "@navikt/ds-react";
import BlockContent from "@sanity/block-content-to-react";
import NextLink from "next/link";
import { useClient } from "sanity";
import useSWR from "swr";

export const WriteHelp = (props) => {
  const client = useClient({ apiVersion: "2021-06-07" });
  const docType = props.schemaType?.options?.docType;
  const { data, error } = useSWR(`*[_id == "skrivehjelp"][0]`, (query) =>
    client.fetch(query)
  );

  if (error) {
    return <div>Kan ikke hente skrivehjelp...</div>;
  }

  const content = data?.[`${docType}_writeHelp`];

  console.log(content);

  return (
    <div className="flex shrink-0 items-center justify-between">
      <BlockContent
        blocks={content ?? []}
        serializers={serializers}
        options={{ size: "small" }}
        renderContainerOnSingleChild
      />
    </div>
  );
};

const serializers = {
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
              className="algolia-index-lvl3 max-w-text text-deepblue-800 mt-8 scroll-mt-20 focus:outline-none"
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
              className="algolia-index-lvl3 max-w-text text-deepblue-800 mt-8 scroll-mt-20 focus:outline-none"
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
              className="algolia-index-lvl4 max-w-text text-deepblue-800 mt-6"
              spacing
              level="4"
              size="small"
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

export default WriteHelp;
