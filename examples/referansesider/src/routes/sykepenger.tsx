import { ReactNode, createFileRoute } from "@tanstack/react-router";
import styled from "styled-components";
import { twMerge } from "tailwind-merge";
import * as tokens from "@navikt/ds-tokens/dist/tokens";
import ArrowDownRightIcon from "../assets/ArrowDownRightIcon";
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

const Link = styled.a`
  color: ${tokens.ABlue600};
  text-decoration: underline;
  &:hover {
    text-decoration: none;
  }
`;

const PlainText = ({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) => {
  return <p className={twMerge(className, `mb-9`)}>{children}</p>;
};

const PinkList = () => {
  return (
    <div>
      <h2 id="heading-page-navigation-menu-:R8mm:">Innhold på siden</h2>
      <ul aria-labelledby="heading-page-navigation-menu-:R8mm:">
        <li>
          <Link className="flex flex-row items-center" href="#hvem">
            <ArrowDownRightIcon
              colorStroke="stroke-[#0056b4]"
              colorFill="fill-[#0056b4]"
            />
            <span>Hvem kan få?</span>
          </Link>
        </li>
        <li>
          <a href="#hva">
            <span>Hva kan du få?</span>
          </a>
        </li>
        <li>
          <a href="#sok">
            <span>Søke, ettersende eller klage</span>
          </a>
        </li>
        <li>
          <a href="#har">
            <span>Når du har sykepenger</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

const Component = () => {
  return (
    <>
      <Page>
        <FancyHeader />
        <PlainText className="my-6">
          Det finnes også informasjon om sykepenger til{" "}
          <Link href="#">arbeidsgivere</Link> og{" "}
          <Link href="#">leger og tannleger eller andre behandlere</Link>.
        </PlainText>
        <PinkList />
      </Page>
    </>
  );
};

export const Route = createFileRoute("/sykepenger")({ component: Component });
