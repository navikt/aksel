import React, { useEffect, useRef } from "react";
import { ExternalLinkIcon } from "@navikt/aksel-icons";
import { Link } from "../link";
import { VStack } from "../primitives/stack";
import { BodyLong, BodyShort, Heading } from "../typography";
import { renderStoriesForChromatic } from "../utils/renderStoriesForChromatic";
import Lookup from "./Lookup";

export default {
  title: "ds-react/Lookup",
  component: Lookup,
  parameters: {
    chromatic: { disable: true },
  },
};

export const Default = () => {
  return (
    <Lookup word="Lookup">
      A text explanation of the lookup word. This is an example of a lookup
      component.
    </Lookup>
  );
};

export const Open = () => {
  const ref = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    ref.current?.click();
  }, []);

  return (
    <Lookup word="Lookup" ref={ref}>
      A text explanation of the lookup word. This is an example of a lookup
      component.
    </Lookup>
  );
};

export const WithinASentence = () => {
  return (
    <BodyLong>
      This is an example of a{" "}
      <Lookup word="lookup">A text explanation of the lookup word.</Lookup>{" "}
      within a sentence.
    </BodyLong>
  );
};

export const WithLink = () => {
  return (
    <BodyLong>
      This is an example of a{" "}
      <Lookup word="lookup word">
        <BodyLong>A longer text that explains the lookup word.</BodyLong>
        <Link
          href="https://www.nav.no"
          target="_blank"
          rel="noreferrer noopener"
        >
          See further details <ExternalLinkIcon />
        </Link>
      </Lookup>{" "}
      within a sentence.
    </BodyLong>
  );
};

export const VeryLongWord = () => {
  return (
    <BodyLong style={{ maxWidth: "400px" }}>
      This is an example of a{" "}
      <Lookup word="lookup word that is very very long and it never stops and keeps going">
        <BodyLong>A longer text that explains the lookup word.</BodyLong>
      </Lookup>{" "}
      within a sentence.
    </BodyLong>
  );
};

export const ButtonsBeforeAndAfter = () => {
  return (
    <div>
      <button>Before button</button>
      <BodyLong>
        This is an example of a{" "}
        <Lookup word="lookup word">
          <BodyLong>A longer text that explains the lookup word.</BodyLong>
        </Lookup>{" "}
        within a sentence.
      </BodyLong>
      <button>After button</button>
    </div>
  );
};

export const BodyTextSizes = () => {
  return (
    <VStack gap="space-32">
      <BodyShort size="small">
        Size small (16px) text with a{" "}
        <Lookup word="lookup">A text explanation of the lookup word.</Lookup>
      </BodyShort>
      <BodyShort>
        Size medium (18px) text with a{" "}
        <Lookup word="lookup">A text explanation of the lookup word.</Lookup>
      </BodyShort>
      <BodyShort size="large">
        Size large (20px) text with a{" "}
        <Lookup word="lookup">A text explanation of the lookup word.</Lookup>
      </BodyShort>
    </VStack>
  );
};

export const HeadingTextSizes = () => {
  return (
    <VStack gap="space-32">
      <Heading size="xlarge">
        Heading size xlarge with a{" "}
        <Lookup word="lookup">A text explanation of the lookup word.</Lookup>
      </Heading>
      <Heading size="large">
        Heading size large with a{" "}
        <Lookup word="lookup">A text explanation of the lookup word.</Lookup>
      </Heading>
      <Heading size="medium">
        Heading size medium with a{" "}
        <Lookup word="lookup">A text explanation of the lookup word.</Lookup>
      </Heading>
      <Heading size="small">
        Heading size small with a{" "}
        <Lookup word="lookup">A text explanation of the lookup word.</Lookup>
      </Heading>
      <Heading size="xsmall">
        Heading size xsmall with a{" "}
        <Lookup word="lookup">A text explanation of the lookup word.</Lookup>
      </Heading>
    </VStack>
  );
};

export const Chromatic = renderStoriesForChromatic({
  Default,
  Open,
  WithinASentence,
  WithLink,
  VeryLongWord,
  BodyTextSizes,
  HeadingTextSizes,
  ButtonsBeforeAndAfter,
});
