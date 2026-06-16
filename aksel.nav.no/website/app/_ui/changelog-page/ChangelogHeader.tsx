import { format } from "date-fns/format";
import { nb } from "date-fns/locale";
import { BodyShort, HStack, Heading, VStack } from "@navikt/ds-react";

type ChangelogHeaderProps = {
  heading: string;
  endringsdato: string;
  type: string;
  children?: React.ReactNode;
};

function ChangelogHeader(props: ChangelogHeaderProps) {
  const { heading, type, endringsdato, children } = props;
  return (
    <VStack gap="space-4">
      <BodyShort textColor="subtle" data-color="brand-blue" size="small">
        Endringslogg
      </BodyShort>
      <Heading
        level="1"
        size="xlarge"
        data-aksel-heading-color
        id="endringslogg-page-heading"
      >
        {heading}
      </Heading>
      <HStack gap="space-8" align="center">
        <BodyShort size="small" data-color="neutral" textColor="subtle">
          {type}
        </BodyShort>
        <BodyShort
          as="span"
          aria-hidden
          data-color="neutral"
          textColor="subtle"
        >
          •
        </BodyShort>
        <BodyShort size="small" textColor="subtle" data-color="neutral">
          {format(new Date(endringsdato || ""), "d. MMMM yyy", {
            locale: nb,
          })}
        </BodyShort>
      </HStack>
      {children}
    </VStack>
  );
}

export { ChangelogHeader };
