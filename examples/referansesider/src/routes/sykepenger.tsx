import { createFileRoute } from "@tanstack/react-router";
import styled from "styled-components";
import * as tokens from "@navikt/ds-tokens/dist/tokens";
import SykepengerIkon from "../assets/SykepengerIkon";
import { Page } from "../components/Page";

const Detail = styled.span`
  color: ${tokens.AGray500};
  font-size: 20px;
  font-weight: 300;
  font-variant-caps: all-small-caps;
`;

const Header = styled.h1`
  color: #99185e;
  font-size: 48px;
  font-weight: ${tokens.AFontWeightBold};
  margin-bottom: 1rem;
`;

const InfoSummary = styled.span`
  font-size: 22px;
`;

const FancyHeader = () => {
  return (
    <div className="mt-16 relative">
      <SykepengerIkon
        className="-translate-x-32 translate-y-1"
        colorStroke="stroke-[#99185e]"
        colorFill="fill-[#99185e]"
      />
      <Detail>PENGESTØTTE — FOR ARBEIDSGIVERE</Detail>
      <Header>Sykepenger</Header>
      <InfoSummary>
        Erstatter inntekten din når du ikke kan jobbe på grunn av sykdom eller
        skade.
      </InfoSummary>
    </div>
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
