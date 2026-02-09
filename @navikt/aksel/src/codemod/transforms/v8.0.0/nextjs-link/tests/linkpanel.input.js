import NextLink from "next/link";
import { LinkPanel, BodyShort } from "@navikt/ds-react";

const Example = ({ sykmelding, sykmeldingPeriod }) => {
  return (
    <NextLink href={`/sykmelding/${sykmelding.id}`} passHref legacyBehavior>
      <LinkPanel border>
        <div className="flex gap-3">
          <div className="grow">
            <BodyShort>{sykmeldingPeriod}</BodyShort>
            <BodyShort size="large" className="font-semibold">
              Sykmelding
            </BodyShort>
          </div>
        </div>
      </LinkPanel>
    </NextLink>
  );
};
