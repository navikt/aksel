import { ReactNode, createFileRoute } from "@tanstack/react-router";
import clsx from "clsx";
import styled from "styled-components";
import { twMerge } from "tailwind-merge";
import * as tokens from "@navikt/ds-tokens/dist/tokens";
import ArrowDownRightIcon from "../assets/ArrowDownRightIcon";
import SykepengerIcon from "../assets/SykepengerIcon";
import { Page } from "../components/Page";

const Detail = styled.span`
  color: ${tokens.AGray500};
  font-size: 20px;
  font-weight: 300;
  font-variant-caps: all-small-caps;
`;

const Header1 = styled.h1`
  position: relative;
  color: #99185e;
  font-size: 48px;
  font-weight: ${tokens.AFontWeightBold};
  margin-bottom: 1rem;
`;

const Header2 = styled.h1`
  position: relative;
  color: #99185e;
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 1rem;
  margin-top: 6rem;
  &::before {
    background-color: #99185e;
    opacity: 0.4;
    content: "";
    height: 7px;
    left: 0;
    position: absolute;
    top: calc(${tokens.ASpacing5} * -1);
    width: 40px;
  }
`;

const InfoSummary = styled.span`
  font-size: 22px;
`;

const FancyHeader = () => {
  return (
    <div className={clsx("mt-16 relative")}>
      <SykepengerIcon
        className="-translate-x-32 translate-y-1"
        colorStroke="stroke-[#99185e]"
        colorFill="fill-[#99185e]"
      />
      <Detail>PENGESTØTTE — FOR ARBEIDSGIVERE</Detail>
      <Header1>Sykepenger</Header1>
      <InfoSummary>
        Erstatter inntekten din når du ikke kan jobbe på grunn av sykdom eller
        skade.
      </InfoSummary>
    </div>
  );
};

const Link = styled.a<{ inverted?: boolean }>`
  color: ${tokens.ABlue600};
  text-decoration: ${(props) => (props.inverted ? "none" : "underline")};
  &:hover {
    text-decoration: ${(props) => (props.inverted ? "underline" : "none")};
  }
`;

const ArrowLink = ({ children }: { children: ReactNode }) => {
  return (
    <Link
      className="flex flex-row items-center text-xl no-underline hover:underline"
      href="#"
      inverted
    >
      <ArrowDownRightIcon
        colorStroke="stroke-[#0056b4]"
        colorFill="fill-[#0056b4]"
      />
      {children}
    </Link>
  );
};

const PlainText = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <p className={twMerge("text-xl", className, `mb-9`)}>{children}</p>;
};

const LinkList = ({ borderTop = false }: { borderTop?: boolean }) => {
  return (
    <div
      className={clsx("bg-[#fef5ef] px-5 py-4", {
        ["border-t-[#99185e] border-t-[5px]"]: borderTop,
      })}
    >
      <h2 className="mb-4 text-xl font-bold" id="heading-page-navigation-menu">
        Innhold på siden
      </h2>
      <ul
        className="flex flex-col gap-3"
        aria-labelledby="heading-page-navigation-menu"
      >
        <li>
          <ArrowLink>
            <span>Hvem kan få?</span>
          </ArrowLink>
        </li>
        <li>
          <ArrowLink>
            <span>Hva kan du få?</span>
          </ArrowLink>
        </li>
        <li>
          <ArrowLink>
            <span>Søke, ettersende eller klage</span>
          </ArrowLink>
        </li>
        <li>
          <ArrowLink>
            <span>Når du har sykepenger</span>
          </ArrowLink>
        </li>
      </ul>
    </div>
  );
};

const PlainList = ({ children }: { children: ReactNode }) => {
  return (
    <ul className="text-xl list-disc list-outside flex flex-col gap-3 ml-8 marker:text-[#99185e] mb-9">
      {children}
    </ul>
  );
};

const Component = () => {
  return (
    <>
      <Page>
        <FancyHeader />
        <PlainText className="my-6 text-lg">
          Det finnes også informasjon om sykepenger til{" "}
          <Link href="#">arbeidsgivere</Link> og{" "}
          <Link href="#">leger og tannleger eller andre behandlere</Link>.
        </PlainText>
        <LinkList borderTop />
        <Header2>Hvem kan få?</Header2>
        <PlainText>
          Du kan ha rett til sykepenger hvis du oppfyller disse generelle
          vilkårene:
        </PlainText>
        <PlainList>
          <li>
            Du er <Link>medlem av folketrygden</Link> eller er EU/EØS-borger og
            jobber i Norge.
          </li>
          <li>Du er under 70 år.</li>
          <li>
            Du har fått en sykmelding fra lege, tannlege, kiropraktor eller
            manuell terapeut.
          </li>
          <li>
            Du er minst 20 prosent sykmeldt av den totale arbeidstiden din.
          </li>
          <li>
            Arbeidet må gi pensjonsgivende inntekt, det vil si inntekt du får
            som lønn og betaler skatt av.
          </li>
        </PlainList>
        <PlainText>
          Det er NAV som avgjør om sykmeldingen gir deg rett til sykepenger. Det
          er ulike regler avhengig av hva slags arbeid du har eller hvilken
          situasjon du er i.
        </PlainText>
        <PlainText>
          Får du <Link>fosterhjemsgodtgjørelse</Link>? Da regnes du som
          frilanser. Det samme gjelder hvis du får <Link>omsorgsstønad</Link> og
          du ikke er ansatt hos en arbeidsgiver. Se egen informasjon for
          frilansere.
        </PlainText>
        <PlainText>Se hvilke regler som gjelder for deg:</PlainText>
      </Page>
    </>
  );
};

export const Route = createFileRoute("/sykepenger")({ component: Component });
