import {
  PortableTextBlockComponent,
  type PortableTextComponents,
} from "next-sanity";
import { Children } from "react";
import { BodyLong, BodyShort, Detail, Heading } from "@navikt/ds-react";
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
  return {
    block,
    unknownBlockStyle: ({ children }) =>
      withSanitizedBlock(<BodyShort spacing>{children}</BodyShort>),
  };
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
