import { ReactNode, createFileRoute } from "@tanstack/react-router";
import clsx from "clsx";
import { useContext } from "react";
import styled from "styled-components";
import { twMerge } from "tailwind-merge";
import {
  ArrowDownRightIcon,
  ArrowRightIcon,
  ChevronDownIcon,
} from "@navikt/aksel-icons";
import { Link } from "@navikt/ds-react";
import * as tokens from "@navikt/ds-tokens/darkside-js";
import SykepengerIcon from "../assets/SykepengerIcon";
import { Button } from "../components/Button";
import { Page } from "../components/Page";
import { ThemeProviderContext } from "../theme/ThemeContext";

const EyeBrowText = styled.span`
  color: ${tokens.TextNeutralSubtle};
  font-size: 20px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 1.2px;
  font-variant-caps: all-small-caps;
`;

const H1 = styled.h1`
  color: ${tokens.TextBrandMagenta};
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 52px;
  letter-spacing: -0.48px;
`;

const H2 = styled.h2`
  position: relative;
  color: ${tokens.TextBrandMagenta};
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 1rem;
  margin-top: 5rem;
  line-height: 40px;
  letter-spacing: -0.288px;

  &::before {
    background-color: ${tokens.BorderBrandMagentaSubtle};
    content: "";
    height: 7px;
    left: 0;
    position: absolute;
    top: calc(var(--a-spacing-4) * -1);
    width: 40px;
  }
`;

const H3 = styled.h3`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 32px;
  letter-spacing: -0.048px;
`;

const H4 = styled.h4`
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: -0.02px;
  margin-bottom: 0.5rem;
`;

const PreAmble = styled.p`
  font-size: 22px;
  font-weight: 400;
  line-height: 38.5px;
  letter-spacing: -0.029px;
`;

let PillLink: ReactNode;
{
  const ScAnchor = styled.a`
    border: 1px solid #b0b0b0;
    box-shadow:
      0 1px 3px #26262633,
      0 1px 6px #00000024,
      0 2px 8px #2626261f;
    &:hover {
      box-shadow:
        rgba(21, 60, 103, 0.316) 0px 0.855009px 2.56503px 0.434974px,
        rgba(0, 0, 0, 0.12) 0px 0.855009px 5.13005px 0px,
        rgba(38, 38, 38, 0.104) 0px 1.71002px 6.84007px 0px;
      box-shadow: 0 0 0 3px ${tokens.Accent800};
    }
    &::before {
      background-color: ${tokens.BgBrandMagentaStrong};
    }
  `;

  PillLink = ({ children }: { children: ReactNode }) => {
    return (
      <ScAnchor
        href="#"
        className={clsx(
          "mb-9 inline-flex items-center gap-1",
          "no-underline rounded-full text-[16px]",
          "px-2 py-0.5",
          "before:content before:relative before:inline-block before:rounded-full before:mx-1 before:w-2 before:h-2",
          "hover:bg-blue-100",
          "transition-all",
        )}
      >
        {children}
      </ScAnchor>
    );
  };
}

const Paragraph = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <p className={twMerge("text-xl", className, `mb-9`)}>{children}</p>;
};

let LinkList: ReactNode;
{
  const ScList = styled.div`
    background-color: ${tokens.BgBrandBeigeSoft};
    &.borderTop {
      border-top: 4px solid ${tokens.BgBrandMagentaStrong};
    }
  `;

  LinkList = ({
    title,
    links,
    borderTop = false,
  }: {
    title: string;
    links: string[];
    borderTop?: boolean;
  }) => {
    return (
      <ScList
        className={clsx("px-5 py-4 mb-4", {
          ["borderTop"]: borderTop,
        })}
      >
        <h2
          className="mb-4 text-xl font-semibold"
          id="heading-page-navigation-menu"
        >
          {title}
        </h2>
        <ul
          className="flex flex-col gap-3"
          aria-labelledby="heading-page-navigation-menu"
        >
          {links.map((link) => (
            <li key={link}>
              <Link
                className="flex gap-[6px] items-center text-xl no-underline hover:underline"
                href={`#${link}`}
              >
                <ArrowDownRightIcon aria-hidden />
                {link}
              </Link>
            </li>
          ))}
        </ul>
      </ScList>
    );
  };
}

let PlainList: ReactNode;
{
  const ScList = styled.ul`
    & li::marker {
      color: ${tokens.TextBrandMagenta};
    }
  `;

  PlainList = ({ children }: { children: ReactNode }) => {
    return (
      <ScList className="text-xl list-disc list-outside flex flex-col gap-3 ml-8 mb-9">
        {children}
      </ScList>
    );
  };
}

let PlainOrderedList: ReactNode;
{
  const ScList = styled.ol`
    & li::marker {
      font-weight: 800;
      color: ${tokens.TextBrandMagenta};
    }
    & li {
      padding-left: 4px;
    }
  `;

  PlainOrderedList = ({ children }: { children: ReactNode }) => {
    return (
      <ScList className="text-xl list-decimal list-outside flex flex-col gap-3 ml-8 mb-9">
        {children}
      </ScList>
    );
  };
}

let AccordionItem: ReactNode;
{
  const ScDetails = styled.details`
    border-top: 1px solid ${tokens.BorderNeutralSubtle};
    border-bottom: 1px solid ${tokens.BorderNeutralSubtle};

    &:hover,
    &:focus-within {
      border-top: 1px solid transparent;
      border-bottom: 1px solid transparent;
    }

    &:hover + details,
    &:focus-within + details {
      border-top: 1px solid transparent;
    }
    details:has(+ &) {
      border-bottom: 1px solid transparent;
    }

    &:hover .icon-bg {
      background-color: ${tokens.BgAccentStrongHover};
      color: ${tokens.BgDefault};
    }

    &:not(first-child) {
      margin-top: -1px;
    }
  `;

  const ScSummary = styled.summary`
    background-color: ${tokens.BgDefault};
    &:hover {
      background-color: ${tokens.BgAccentModerateHover};
    }
  `;

  const ScIconDiv = styled.div`
    background-color: ${tokens.BgAccentModerate};
  `;

  const ScTitle = styled.span`
    color: ${tokens.TextAccentSubtle};
  `;

  AccordionItem = ({
    title,
    children,
  }: {
    title: string;
    children: ReactNode;
  }) => {
    return (
      <ScDetails className="group/details text-xl">
        <ScSummary
          className={clsx(
            "flex gap-2 items-center",
            "group-open/details:border-b-0 group-open/details:mb-4",
            "hover:cursor-pointer p-3 rounded",
            "sticky top-0 z-10 focus:z-20",
          )}
        >
          {/* TODO: use tokens here */}
          <ScIconDiv className="icon-bg w-5 h-5 rounded-lg">
            <span className="w-4 h-4 block" aria-hidden="true">
              <ChevronDownIcon
                className={clsx([
                  "group-open/details:-rotate-180",
                  "transition-transform",
                  "w-5 h-5",
                ])}
              />
            </span>
          </ScIconDiv>
          <ScTitle className="text-[#0056b4]">{title}</ScTitle>
        </ScSummary>
        <div className="border-l-[0.125rem] border-l-[#aaa] ml-[1.35rem] mr-12 pl-5 pt-3">
          {children}
        </div>
      </ScDetails>
    );
  };
}

const Accordion = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

let MiniCard: ReactNode;
{
  const ScSubtitle = styled.span`
    font-variant-caps: all-small-caps;
    font-size: 20px;
    color: ${tokens.TextNeutralSubtle};
  `;

  const ScTitle = styled.span`
    font-size: 20px;
    font-weight: 600;
    text-decoration-thickness: 3px;
    color: ${tokens.Accent900};
  `;

  MiniCard = ({
    title,
    subtitle,
    href = "#",
  }: {
    title: string;
    subtitle: string;
    href?: string;
  }) => {
    return (
      <a
        href={href}
        className={clsx(
          "group",
          "flex items-center justify-between",
          "px-5 py-3 border border-gray-300 shadow-sm rounded-lg",
          "hover:bg-blue-50",
        )}
      >
        <div className="flex flex-col leading-6">
          <ScTitle className="group-hover:underline">{title}</ScTitle>
          <ScSubtitle>{subtitle}</ScSubtitle>
        </div>
        <span className="w-5 h-5 block" aria-hidden="true">
          <ArrowRightIcon className="fill-gray-500" />
        </span>
      </a>
    );
  };
}

const ExpandoPill = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <details className="group/details text-xl mb-3">
      <summary
        className={clsx(
          "inline-flex gap-2 items-center",
          "group-open/details:border-b-0 group-open/details:mb-4",
          "hover:bg-blue-200 hover:cursor-pointer py-2 pl-3 pr-5 rounded-full",
          "sticky top-0 z-10",
          "focus:z-20",
          "bg-blue-100",
          "border-opacity-0 border-x-black border",
        )}
      >
        {/* TODO: use tokens here */}
        <span className="w-4 h-4 block" aria-hidden="true">
          <ChevronDownIcon
            className={clsx([
              "group-open/details:-rotate-180",
              "transition-transform",
              "w-5 h-5",
              "text--[#0056b4]",
            ])}
          />
        </span>
        <span className="text-[#0056b4]">{title}</span>
      </summary>
      <div className="border-l-[0.125rem] border-l-[#aaa] ml-[1.35rem] mr-12 pl-5 pt-3">
        {children}
      </div>
    </details>
  );
};

export const Route = createFileRoute("/sykepenger")({
  component: SykepengerPage,
});

function SykepengerPage() {
  const theme = useContext(ThemeProviderContext);

  return (
    <Page>
      <div className="mt-16 relative">
        <div className="-translate-x-32 translate-y-1">
          <SykepengerIcon darkmode={theme.theme === "dark"} />
        </div>
        <EyeBrowText>PENGESTØTTE — FOR ARBEIDSGIVERE</EyeBrowText>
        <H1>Sykepenger</H1>
        <PreAmble>
          Erstatter inntekten din når du ikke kan jobbe på grunn av sykdom eller
          skade.
        </PreAmble>
      </div>
      <Paragraph className="my-6 text-lg">
        Det finnes også informasjon om sykepenger til{" "}
        <Link href="#">arbeidsgivere</Link> og{" "}
        <Link href="#">leger og tannleger eller andre behandlere</Link>.
      </Paragraph>
      <LinkList
        title="Innhold på siden"
        borderTop
        links={[
          "Hvem kan få?",
          "Hva kan du få?",
          "Søke, ettersende eller klage",
          "Når du har sykepenger",
        ]}
      />
      <H2 id="hvem">Hvem kan få?</H2>
      <Paragraph>
        Du kan ha rett til sykepenger hvis du oppfyller disse generelle
        vilkårene:
      </Paragraph>
      <PlainList>
        <li>
          Du er <Link href="#">medlem av folketrygden</Link> eller er
          EU/EØS-borger og jobber i Norge.
        </li>
        <li>Du er under 70 år.</li>
        <li>
          Du har fått en sykmelding fra lege, tannlege, kiropraktor eller
          manuell terapeut.
        </li>
        <li>Du er minst 20 prosent sykmeldt av den totale arbeidstiden din.</li>
        <li>
          Arbeidet må gi pensjonsgivende inntekt, det vil si inntekt du får som
          lønn og betaler skatt av.
        </li>
      </PlainList>
      <Paragraph>
        Det er Nav som avgjør om sykmeldingen gir deg rett til sykepenger. Det
        er ulike regler avhengig av hva slags arbeid du har eller hvilken
        situasjon du er i.
      </Paragraph>
      <Paragraph>
        Får du <Link href="#">fosterhjemsgodtgjørelse</Link>? Da regnes du som
        frilanser. Det samme gjelder hvis du får{" "}
        <Link href="#">omsorgsstønad</Link> og du ikke er ansatt hos en
        arbeidsgiver. Se egen informasjon for frilansere.
      </Paragraph>
      <Paragraph>Se hvilke regler som gjelder for deg:</Paragraph>
      <Accordion>
        <AccordionItem title="Arbeidstaker">
          <Paragraph>
            For å ha rett til sykepenger fra Nav må du ha jobbet minst fire uker
            rett før du ble sykmeldt. Du må også ha en årsinntekt som tilsvarer
            femti prosent av grunnbeløpet i folketrygden, det vil si 62&nbsp;014
            kroner. For å beregne årsinntekten din bruker Nav gjennomsnittet av
            de tre siste månedene.
          </Paragraph>{" "}
          <Paragraph>
            Det samme gjelder hvis du kombinerer arbeid med uføretrygd.
          </Paragraph>{" "}
          <H4>Hvis du er kronisk syk eller gravid</H4>{" "}
          <Paragraph>
            Har du en&nbsp;langvarig eller kronisk sykdom&nbsp;som kan føre til
            hyppige sykefravær?&nbsp;Eller er du sykmeldt på grunn av årsaker
            som henger sammen med graviditeten?
          </Paragraph>{" "}
          <Paragraph>
            Vanligvis utbetaler arbeidsgiveren din sykepengene for de første 16
            dagene du er syk. Dette kalles arbeidsgiverperioden.
          </Paragraph>{" "}
          <Paragraph>
            Hvis du har hyppige og/eller uforutsigbare sykefravær, kan du eller
            arbeidsgiveren din søke om at Nav dekker sykepengene arbeidsgiveren
            har utbetalt i arbeidsgiverperioden.
          </Paragraph>{" "}
          <PillLink>Dekking av sykepenger i arbeidsgiverperioden</PillLink>
          <H4>Hvis du er arbeidstaker på skip</H4>{" "}
          <Paragraph>
            Sykepenger for arbeidstakere på skip beregnes i hovedsak på samme
            måte som for arbeidstakere, men det er i tillegg noen særskilte
            regler for deg som jobber på skip&nbsp;i utenriksfart som er
            registrert i Norsk internasjonalt skipsregister (NIS).
          </Paragraph>{" "}
          <PlainList>
            <li>
              Du kan få sykepenger fra den dagen arbeidsgiveren din har fått
              beskjed om at du er syk, derfor må du gi beskjed til
              arbeidsgiveren din så snart som mulig.&nbsp;Du&nbsp;leverer
              enten&nbsp;
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
              Du har rett til sykepenger selv om du har vært i arbeid i mindre
              enn fire uker.
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
          </PlainList>{" "}
          <H4>Tilkallingsvikar</H4>{" "}
          <Paragraph>
            Du kan ha rett til sykepenger, men det avhenger blant annet på hvor
            mye og ofte du har jobbet før du ble sykmeldt.
          </Paragraph>{" "}
          <Paragraph>
            Hvis du er tilkallingsvikar, er det viktig å avgjøre om
          </Paragraph>{" "}
          <PlainList>
            {" "}
            <li>
              du oppfyller kravet til opptjeningstid hvis du bare har jobbet
              noen vakter av og på i en periode.
            </li>{" "}
            <li>
              du kan sies å tape pensjonsgivende inntekt hvis du ikke har avtalt
              noen vakter med arbeidsgiveren din framover.
            </li>{" "}
          </PlainList>{" "}
          <H4>Hvis du er mellom 67 og 70 år</H4>{" "}
          <Paragraph>
            Du kan få sykepenger fra Nav i opptil 60 dager hvis gjennomsnittet
            av inntekten din de siste 3 månedene før du ble syk omgjort til
            årsinntekt overstiger 248&nbsp;056 kroner (2 ganger grunnbeløpet i
            folketrygden). Dette gjelder hvis du er mellom 67 og 70 år,
            uavhengig av om du har tatt ut alderspensjon.
          </Paragraph>{" "}
          <Paragraph>
            60-dagersregelen gjelder fra og med dagen etter du fylte 67 år og
            til og med dagen før&nbsp;du fyller 70 år. Hvis du har fylt 70 år,
            har du ikke rett til sykepenger.
          </Paragraph>{" "}
          <H4>Friskmelding til arbeidsformidling</H4>{" "}
          <Paragraph>
            Hvis alle muligheter for å komme tilbake til arbeidsplassen din er
            forsøkt, kan du få <Link href="#">sykepenger i inntil 12 uker</Link>{" "}
            mens du søker ny jobb.
          </Paragraph>{" "}
          <PillLink>Friskmelding til arbeidsformidling</PillLink>
          <h4>Dette gjør du når du blir syk</h4>{" "}
          <Paragraph>
            Du kan få sykepenger fra den dagen arbeidsgiveren din har fått
            beskjed om at du er syk, derfor må du gi beskjed til arbeidsgiveren
            din så snart som mulig. Du leverer enten egenmelding eller
            sykmelding.
          </Paragraph>{" "}
          <Paragraph>
            Hvis du er syk lenger enn egenmeldingsdagene, må du kontakte lege.
          </Paragraph>{" "}
        </AccordionItem>
        <AccordionItem title="Fisker">
          <div>
            <Paragraph>
              Sykepenger til deg som fisker beregnes&nbsp; på samme måte som for
              arbeidstakere og/eller selvstendig&nbsp; næringsdrivende, men det
              er noen særskilte regler for deg som er fisker på blad B i
              fiskermanntallet:
            </Paragraph>{" "}
            <PlainList>
              {" "}
              <li>
                Du har rett til sykepenger selv om du har vært i arbeid i mindre
                enn fire uker.
              </li>{" "}
              <li>
                Du har rett til sykepenger med full lønn opp til 6G fra første
                sykefraværsdag.
              </li>{" "}
            </PlainList>{" "}
            <H4>
              <strong>På lott eller hyre</strong>
            </H4>{" "}
            <Paragraph>
              Hvis du mottar lott, regnes du som&nbsp;selvstendig
              næringsdrivende.
            </Paragraph>{" "}
            <Paragraph>Hvis du har hyre, regnes du som arbeidstaker.</Paragraph>{" "}
            <h4>Hvis du er mellom 67 og 70 år</h4>{" "}
            <Paragraph>
              Du kan få sykepenger fra Nav i opptil 60 dager hvis gjennomsnittet
              av inntekten din de siste 3 månedene før du ble syk omgjort til
              årsinntekt overstiger 248&nbsp;056 kroner (2 ganger grunnbeløpet i
              folketrygden). Dette gjelder hvis du er mellom 67 og 70 år,
              uavhengig av om du har tatt ut alderspensjon.
            </Paragraph>{" "}
            <Paragraph>
              60-dagersregelen gjelder fra og med dagen etter du fylte 67 år og
              til og med dagen før&nbsp;du fyller 70 år. Hvis du har fylt 70 år,
              har du ikke rett til sykepenger.
            </Paragraph>{" "}
          </div>
        </AccordionItem>
      </Accordion>
      <div className="flex flex-col gap-6 mb-6">
        <H2 id="hva">Hva kan du få?</H2>
        <LinkList
          title="I dette kapittelet"
          links={[
            "Hvor mye kan du få?",
            "Hvor lenge kan du få?",
            "Reisetilskudd som alternativ til sykepenger",
            "Andre tilbud",
          ]}
        />
      </div>
      <div className="mb-10">
        <H3>Reisetilskudd som alternativ til sykepenger</H3>
        <Paragraph>
          Klarer du å jobbe, men har problemer med å reise til og fra
          arbeidsstedet? Da kan du ha rett til reisetilskudd i stedet for
          sykepenger fra 17. dag etter at du ble sykmeldt.
        </Paragraph>
        <MiniCard title="Reisetilskudd" subtitle="pengestøtte" />
      </div>
      <H3>Andre tilbud</H3>
      <Paragraph>Mer informasjon til deg som</Paragraph>
      <div className="flex flex-col gap-4">
        <MiniCard
          title="Har blitt sykmeldt"
          subtitle="Dette kan du ha rett til"
        />
        <MiniCard
          title="Har vært syk eller skadet lenge"
          subtitle="Dette kan du ha rett til"
        />
        <MiniCard
          title="Kan bare jobbe noe på grunn av langvarig sykdom eller skade"
          subtitle="Dette kan du ha rett til"
        />
        <MiniCard
          title="Har blitt skadet under arbeid, undervisning, rednings- eller militærtjeneste"
          subtitle="Dette kan du ha rett til"
        />
      </div>
      <H2 id="sok">Søke, ettersende eller klage</H2>
      <ExpandoPill title="Hvis du mangler BankId">
        <Paragraph>
          Hvis du mangler BankID, ikke har legitimasjon på høyeste
          sikkerhetsnivå eller har fortrolig adresse i Folkeregisteret, må du
          bruke del D av papirsykmeldingen til å søke om sykepenger. Finn riktig
          adresse.
        </Paragraph>
        <Paragraph>
          Hvis du har en arbeidsgiver, må du levere del C av sykmeldingen til
          arbeidsgiveren din. Del D – søknaden – leverer du til den som skal
          utbetale sykepenger.
        </Paragraph>
      </ExpandoPill>
      <H2 id="har">Når du har sykepenger</H2>
      <H4>Klage på vedtak</H4>
      <Paragraph>
        I vedtaket står det hvordan du går fram hvis du skal klage, hvem du skal
        klage til og klagefrist. Hvis du har spørsmål om vedtaket, kan du
        kontakte oss.
      </Paragraph>
      <div className="flex gap-2 mb-10">
        <Button variant="secondary">Send klage</Button>
        <Button variant="secondary">Ettersend dokumentasjon</Button>
      </div>
      <H3>Reise eller flytte til utlandet</H3>
      <Paragraph>
        Hvis du vurderer å reise mens du er sykmeldt, er det noen ting du må
        sjekke på forhånd.
      </Paragraph>
      <PlainOrderedList>
        <li>
          Du må sjekke med arbeidsgiveren din om reisen vil hindre planlagt
          oppfølging og aktivitet på arbeidsplassen.{" "}
        </li>
        <li>
          Du må delta aktivt for å komme tilbake i arbeid for å få sykepenger.
          Du må forsikre deg om at reisen ikke vil hindre aktiviteter du har
          avtalt med Nav. Hvis du er usikker, kan du skrive til oss fra nav.no.
        </li>
        <li>
          Du må sjekke med den som har sykmeldt deg om reisen vil forverre
          helsetilstanden din, og om den vil hindre planlagt behandling.
        </li>
      </PlainOrderedList>
      <p>hello</p>
    </Page>
  );
}
