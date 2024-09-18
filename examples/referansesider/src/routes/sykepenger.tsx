import { ReactNode, createFileRoute } from "@tanstack/react-router";
import clsx from "clsx";
import styled from "styled-components";
import { twMerge } from "tailwind-merge";
import * as tokens from "@navikt/ds-tokens/dist/tokens";
import ArrowDownRightIcon from "../assets/ArrowDownRightIcon";
import ChevronDownIcon from "../assets/ChevronDownIcon";
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

const Accordion = () => {
  return (
    <details className="group/details text-xl">
      <summary className="flex gap-2 items-center group/summary hover:bg-blue-100 p-3 rounded border-opacity-0 border-x-black border">
        <div className="bg-blue-100 group-hover/summary:bg-[#0056b4] w-5 h-5 rounded-lg">
          <ChevronDownIcon
            className={clsx([
              "w-5 h-5",
              "group-open/details:-rotate-180",
              "stroke-[#0056b4] fill-[#0056b4]",
              "group-hover/summary:fill-white group-hover/summary:stroke-white",
            ])}
          />
        </div>
        <span className="text-[#0056b4]">Arbeidstaker</span>
      </summary>
      <div>
        <p>
          For å ha rett til sykepenger fra NAV må du ha jobbet minst fire uker
          rett før du ble sykmeldt. Du må også ha en årsinntekt som tilsvarer
          femti prosent av grunnbeløpet i folketrygden, det vil si 62&nbsp;014
          kroner. For å beregne årsinntekten din bruker NAV gjennomsnittet av de
          tre siste månedene.
        </p>{" "}
        <p>Det samme gjelder hvis du kombinerer arbeid med uføretrygd.</p>{" "}
        <h4>Hvis du er kronisk syk eller gravid</h4>{" "}
        <p>
          Har du en&nbsp;langvarig eller kronisk sykdom&nbsp;som kan føre til
          hyppige sykefravær?&nbsp;Eller er du sykmeldt på grunn av årsaker som
          henger sammen med graviditeten?
        </p>{" "}
        <p>
          Vanligvis utbetaler arbeidsgiveren din sykepengene for de første 16
          dagene du er syk. Dette kalles arbeidsgiverperioden.
        </p>{" "}
        <p>
          Hvis du har hyppige og/eller uforutsigbare sykefravær, kan du eller
          arbeidsgiveren din søke om at NAV dekker sykepengene arbeidsgiveren
          har utbetalt i arbeidsgiverperioden.
        </p>{" "}
        <div>
          <Link href="#">
            <div>Dekking av sykepenger i arbeidsgiverperioden</div>
          </Link>
        </div>{" "}
        <h4>Hvis du er arbeidstaker på skip</h4>{" "}
        <p>
          Sykepenger for arbeidstakere på skip beregnes i hovedsak på samme måte
          som for arbeidstakere, men det er i tillegg noen særskilte regler for
          deg som jobber på skip&nbsp;i utenriksfart som er registrert i Norsk
          internasjonalt skipsregister (NIS).
        </p>{" "}
        <ul>
          {" "}
          <li>
            Du kan få sykepenger fra den dagen arbeidsgiveren din har fått
            beskjed om at du er syk, derfor må du gi beskjed til arbeidsgiveren
            din så snart som mulig.&nbsp;Du&nbsp;leverer enten&nbsp;
            <Link href="#">egenmelding</Link>
            &nbsp;eller sykmelding. Hvis du er syk ut over egenmeldingsdagene,
            må du kontakte lege.
          </li>{" "}
          <li>
            Du kan få sykepenger hvis du er&nbsp;arbeidsufør
            som&nbsp;arbeidstaker&nbsp;på skip, selv om du er frisk nok til å
            jobbe i et annet yrke.
          </li>{" "}
          <li>
            Du har rett til sykepenger selv om du har vært i arbeid i mindre enn
            fire uker.
          </li>{" "}
          <li>
            Det har betydning for sykepengene hvilket&nbsp;flagg skipet seiler
            under når du blir sykmeldt.&nbsp;Les mer om sykepenger innenfor og
            utenfor EU/EØS-området.
          </li>{" "}
          <li>
            Hvis du er ansatt på turistskip innen hotell- og
            restaurantvirksomhet, er du ikke medlem i folketrygden, og har
            dermed ikke rett til sykepenger.
          </li>{" "}
        </ul>{" "}
        <h4>Tilkallingsvikar</h4>{" "}
        <p>
          Du kan ha rett til sykepenger, men det avhenger blant annet på hvor
          mye og ofte du har jobbet før du ble sykmeldt.
        </p>{" "}
        <p>Hvis du er tilkallingsvikar, er det viktig å avgjøre om</p>{" "}
        <ul>
          {" "}
          <li>
            du oppfyller kravet til opptjeningstid hvis du bare har jobbet noen
            vakter av og på i en periode.
          </li>{" "}
          <li>
            du kan sies å tape pensjonsgivende inntekt hvis du ikke har avtalt
            noen vakter med arbeidsgiveren din framover.
          </li>{" "}
        </ul>{" "}
        <h4>Hvis du er mellom 67 og 70 år</h4>{" "}
        <p>
          Du kan få sykepenger fra NAV i opptil 60 dager hvis gjennomsnittet av
          inntekten din de siste 3 månedene før du ble syk omgjort til
          årsinntekt overstiger 248&nbsp;056 kroner (2 ganger grunnbeløpet i
          folketrygden). Dette gjelder hvis du er mellom 67 og 70 år, uavhengig
          av om du har tatt ut alderspensjon.
        </p>{" "}
        <p>
          60-dagersregelen gjelder fra og med dagen etter du fylte 67 år og til
          og med dagen før&nbsp;du fyller 70 år. Hvis du har fylt 70 år, har du
          ikke rett til sykepenger.
        </p>{" "}
        <h4>Friskmelding til arbeidsformidling</h4>{" "}
        <p>
          Hvis alle muligheter for å komme tilbake til arbeidsplassen din er
          forsøkt, kan du få <Link href="#">sykepenger i inntil 12 uker</Link>{" "}
          mens du søker ny jobb.
        </p>{" "}
        <div>
          <Link href="#">
            <div>Friskmelding til arbeidsformidling</div>
          </Link>
        </div>{" "}
        <h4>Dette gjør du når du blir syk</h4>{" "}
        <p>
          Du kan få sykepenger fra den dagen arbeidsgiveren din har fått beskjed
          om at du er syk, derfor må du gi beskjed til arbeidsgiveren din så
          snart som mulig. Du leverer enten egenmelding eller sykmelding.
        </p>{" "}
        <p>
          Hvis du er syk lenger enn egenmeldingsdagene, må du kontakte lege.
        </p>{" "}
      </div>
    </details>
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
        <Accordion />
      </Page>
    </>
  );
};

export const Route = createFileRoute("/sykepenger")({ component: Component });
