import { createFileRoute } from "@tanstack/react-router";
import styled from "styled-components";
import * as tokens from "@navikt/ds-tokens/dist/tokens";
import SykepengerIkon from "../assets/SykepengerIkon";
import { Page } from "../components/Page";

const Detail = styled.span`
  color: ${tokens.AGray500};
  font-size: 20px;
  font-variant-caps: all-small-caps;
`;

const Header = styled.h1`
  color: ${tokens.ARed600};
  font-size: 48px;
  font-weight: ${tokens.AFontWeightBold};
  margin-bottom: 1rem;
`;

const InfoSummary = styled.span`
  font-size: 22px;
`;

const FancyHeader = () => {
  return (
    <>
      <Detail>PENGESTØTTE — FOR ARBEIDSGIVERE</Detail>
      <Header>Sykepenger</Header>
      <InfoSummary>
        Erstatter inntekten din når du ikke kan jobbe på grunn av sykdom eller
        skade.
      </InfoSummary>
      <SykepengerIkon className="-translate-x-32 translate-y-1" />
    </>
  );
};

const Component = () => {
  return (
    <>
      <Page>
        <FancyHeader />
      </Page>
    </>
  );
};

export const Route = createFileRoute("/sykepenger")({ component: Component });
