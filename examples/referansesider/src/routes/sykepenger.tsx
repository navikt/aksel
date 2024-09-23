import { ReactNode, createFileRoute } from "@tanstack/react-router";
import clsx from "clsx";
import styled from "styled-components";
import { twMerge } from "tailwind-merge";
import * as tokens from "@navikt/ds-tokens/dist/darkside/tokens";
import ArrowDownRightIcon from "../assets/ArrowDownRightIcon";
import ArrowRightIcon from "../assets/ArrowRightIcon";
import ChevronDownIcon from "../assets/ChevronDownIcon";
import SykepengerIcon from "../assets/SykepengerIcon";
import { Dekoratoren } from "../components/Dekoratoren";
import { Link } from "../components/Link";
import { Page } from "../components/Page";

const Detail = styled.span`
  color: ${tokens.TextSubtle};
  font-size: 20px;
  font-weight: 300;
  font-variant-caps: all-small-caps;
`;

const Header1 = styled.h1`
  position: relative;
  color: ${tokens.BrandOne900};
  font-size: 48px;
  font-weight: 400;
  margin-bottom: 1rem;
`;

const Header2 = styled.h1`
  position: relative;
  color: ${tokens.BrandOne900};
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 1rem;
  margin-top: 5rem;
  &::before {
    background-color: #99185e;
    opacity: 0.4;
    content: "";
    height: 7px;
    left: 0;
    position: absolute;
    top: calc(var(--a-spacing-4) * -1);
    width: 40px;
  }
`;

const Header3 = styled.h3`
  position: relative;
  color: ${tokens.TextDefault};
  font-size: 24px;
  font-weight: 650;
  margin-bottom: 1rem;
`;

const Header4 = styled.h4`
  position: relative;
  color: ${tokens.TextDefault};
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 0.5rem;
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

const ArrowLink = ({
  children,
  ...rest
}: {
  children: ReactNode;
  href?: string;
}) => {
  return (
    <Link
      className="flex flex-row gap-2 items-center text-xl no-underline hover:underline"
      inverted
      {...rest}
    >
      <ArrowDownRightIcon
        colorStroke="stroke-[#0056b4]"
        colorFill="fill-[#0056b4]"
      />
      {children}
    </Link>
  );
};

const PillLink = ({ children }: { children: ReactNode }) => {
  const _anchor = styled.a`
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
      background-color: ${tokens.BrandOne900};
    }
  `;

  return (
    <_anchor
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
    </_anchor>
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

const LinkList = ({
  title,
  children,
  borderTop = false,
}: {
  title: string;
  children: ReactNode;
  borderTop?: boolean;
}) => {
  return (
    <div
      className={clsx("bg-[#fef5ef] px-5 py-4 mb-4", {
        ["border-t-[#99185e] border-t-[5px]"]: borderTop,
      })}
    >
      <h2 className="mb-4 text-xl font-bold" id="heading-page-navigation-menu">
        {title}
      </h2>
      <ul
        className="flex flex-col gap-3"
        aria-labelledby="heading-page-navigation-menu"
      >
        {children}
      </ul>
    </div>
  );
};

const PlainList = ({ children }: { children: ReactNode }) => {
  const _list = styled.ul`
    & li::marker {
      color: ${tokens.BrandOne900};
    }
  `;

  return (
    <_list className="text-xl list-disc list-outside flex flex-col gap-3 ml-8 mb-9">
      {children}
    </_list>
  );
};

const PlainOrderedList = ({ children }: { children: ReactNode }) => {
  const _list = styled.ol`
    & li::marker {
      font-weight: 800;
      color: ${tokens.BrandOne900};
    }
    & li {
      padding-left: 4px;
    }
  `;

  return (
    <_list className="text-xl list-decimal list-outside flex flex-col gap-3 ml-8 mb-9">
      {children}
    </_list>
  );
};

const AccordionItem = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <details className="group/details text-xl">
      <summary
        className={clsx(
          "group/summary",
          "flex gap-2 items-center",
          "group-open/details:border-b-0 group-open/details:mb-4",
          "hover:bg-blue-100 hover:cursor-pointer p-3 rounded",
          "sticky top-0 z-10",
          "focus:z-20",
          "bg-white",
          "border-opacity-0 border-x-black border",
        )}
      >
        <div className="bg-blue-100 group-hover/summary:bg-[#0056b4] w-5 h-5 rounded-lg">
          <ChevronDownIcon
            className={clsx([
              "group-open/details:-rotate-180",
              "group-hover/summary:fill-white group-hover/summary:stroke-white",
              "transition-transform",
              "w-5 h-5",
              "stroke-[#0056b4] fill-[#0056b4]",
            ])}
          />
        </div>
        <span className="text-[#0056b4]">{title}</span>
      </summary>
      <div className="border-l-[0.125rem] border-l-[#aaa] ml-[1.35rem] mr-12 pl-5 pt-3">
        {children}
      </div>
    </details>
  );
};

const Accordion = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

const MiniCard = ({
  title,
  subtitle,
  href = "#",
}: {
  title: string;
  subtitle: string;
  href?: string;
}) => {
  const _subtitle = styled.span`
    font-variant-caps: all-small-caps;
    font-size: 20px;
    color: ${tokens.TextSubtle};
  `;

  const _title = styled.span`
    font-size: 20px;
    font-weight: 600;
    text-decoration-thickness: 3px;
    color: ${tokens.Accent900};
  `;

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
        <_title className="group-hover:underline">{title}</_title>
        <_subtitle>{subtitle}</_subtitle>
      </div>
      <ArrowRightIcon colorFill="fill-gray-500" colorStroke="stroke-gray-500" />
    </a>
  );
};

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
        <ChevronDownIcon
          className={clsx([
            "group-open/details:-rotate-180",
            "transition-transform",
            "w-5 h-5",
            "stroke-[#0056b4] fill-[#0056b4]",
          ])}
        />
        <span className="text-[#0056b4]">{title}</span>
      </summary>
      <div className="border-l-[0.125rem] border-l-[#aaa] ml-[1.35rem] mr-12 pl-5 pt-3">
        {children}
      </div>
    </details>
  );
};

const Button = styled.button`
  display: inline-block;
  color: ${tokens.Accent900};
  border: 2px solid ${tokens.Accent900};
  font-size: 20px;
  border-radius: 4px;
  padding-inline: 1rem;
  padding-block: 0.4rem;
  width: fit-content;
  &:hover {
    background-color: ${tokens.Accent200};
  }
`;

const Component = () => {
  return (
    <Dekoratoren>
      <Page>
        <FancyHeader />
        <PlainText className="my-6 text-lg">
          Det finnes også informasjon om sykepenger til{" "}
          <Link>arbeidsgivere</Link> og{" "}
          <Link>leger og tannleger eller andre behandlere</Link>.
        </PlainText>
        <LinkList title="Innhold på siden" borderTop>
          <li>
            <ArrowLink href="#hvem">
              <span>Hvem kan få?</span>
            </ArrowLink>
          </li>
          <li>
            <ArrowLink href="#hva">
              <span>Hva kan du få?</span>
            </ArrowLink>
          </li>
          <li>
            <ArrowLink href="#sok">
              <span>Søke, ettersende eller klage</span>
            </ArrowLink>
          </li>
          <li>
            <ArrowLink href="#har">
              <span>Når du har sykepenger</span>
            </ArrowLink>
          </li>
        </LinkList>
        <Header2 id="hvem">Hvem kan få?</Header2>
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
        <Accordion>
          <AccordionItem title="Arbeidstaker">
            <PlainText>
              For å ha rett til sykepenger fra NAV må du ha jobbet minst fire
              uker rett før du ble sykmeldt. Du må også ha en årsinntekt som
              tilsvarer femti prosent av grunnbeløpet i folketrygden, det vil si
              62&nbsp;014 kroner. For å beregne årsinntekten din bruker NAV
              gjennomsnittet av de tre siste månedene.
            </PlainText>{" "}
            <PlainText>
              Det samme gjelder hvis du kombinerer arbeid med uføretrygd.
            </PlainText>{" "}
            <Header4>Hvis du er kronisk syk eller gravid</Header4>{" "}
            <PlainText>
              Har du en&nbsp;langvarig eller kronisk sykdom&nbsp;som kan føre
              til hyppige sykefravær?&nbsp;Eller er du sykmeldt på grunn av
              årsaker som henger sammen med graviditeten?
            </PlainText>{" "}
            <PlainText>
              Vanligvis utbetaler arbeidsgiveren din sykepengene for de første
              16 dagene du er syk. Dette kalles arbeidsgiverperioden.
            </PlainText>{" "}
            <PlainText>
              Hvis du har hyppige og/eller uforutsigbare sykefravær, kan du
              eller arbeidsgiveren din søke om at NAV dekker sykepengene
              arbeidsgiveren har utbetalt i arbeidsgiverperioden.
            </PlainText>{" "}
            <PillLink>Dekking av sykepenger i arbeidsgiverperioden</PillLink>
            <Header4>Hvis du er arbeidstaker på skip</Header4>{" "}
            <PlainText>
              Sykepenger for arbeidstakere på skip beregnes i hovedsak på samme
              måte som for arbeidstakere, men det er i tillegg noen særskilte
              regler for deg som jobber på skip&nbsp;i utenriksfart som er
              registrert i Norsk internasjonalt skipsregister (NIS).
            </PlainText>{" "}
            <PlainList>
              <li>
                Du kan få sykepenger fra den dagen arbeidsgiveren din har fått
                beskjed om at du er syk, derfor må du gi beskjed til
                arbeidsgiveren din så snart som mulig.&nbsp;Du&nbsp;leverer
                enten&nbsp;
                <Link>egenmelding</Link>
                &nbsp;eller sykmelding. Hvis du er syk ut over
                egenmeldingsdagene, må du kontakte lege.
              </li>{" "}
              <li>
                Du kan få sykepenger hvis du er&nbsp;arbeidsufør
                som&nbsp;arbeidstaker&nbsp;på skip, selv om du er frisk nok til
                å jobbe i et annet yrke.
              </li>{" "}
              <li>
                Du har rett til sykepenger selv om du har vært i arbeid i mindre
                enn fire uker.
              </li>{" "}
              <li>
                Det har betydning for sykepengene hvilket&nbsp;flagg skipet
                seiler under når du blir sykmeldt.&nbsp;Les mer om sykepenger
                innenfor og utenfor EU/EØS-området.
              </li>{" "}
              <li>
                Hvis du er ansatt på turistskip innen hotell- og
                restaurantvirksomhet, er du ikke medlem i folketrygden, og har
                dermed ikke rett til sykepenger.
              </li>{" "}
            </PlainList>{" "}
            <Header4>Tilkallingsvikar</Header4>{" "}
            <PlainText>
              Du kan ha rett til sykepenger, men det avhenger blant annet på
              hvor mye og ofte du har jobbet før du ble sykmeldt.
            </PlainText>{" "}
            <PlainText>
              Hvis du er tilkallingsvikar, er det viktig å avgjøre om
            </PlainText>{" "}
            <PlainList>
              {" "}
              <li>
                du oppfyller kravet til opptjeningstid hvis du bare har jobbet
                noen vakter av og på i en periode.
              </li>{" "}
              <li>
                du kan sies å tape pensjonsgivende inntekt hvis du ikke har
                avtalt noen vakter med arbeidsgiveren din framover.
              </li>{" "}
            </PlainList>{" "}
            <Header4>Hvis du er mellom 67 og 70 år</Header4>{" "}
            <PlainText>
              Du kan få sykepenger fra NAV i opptil 60 dager hvis gjennomsnittet
              av inntekten din de siste 3 månedene før du ble syk omgjort til
              årsinntekt overstiger 248&nbsp;056 kroner (2 ganger grunnbeløpet i
              folketrygden). Dette gjelder hvis du er mellom 67 og 70 år,
              uavhengig av om du har tatt ut alderspensjon.
            </PlainText>{" "}
            <PlainText>
              60-dagersregelen gjelder fra og med dagen etter du fylte 67 år og
              til og med dagen før&nbsp;du fyller 70 år. Hvis du har fylt 70 år,
              har du ikke rett til sykepenger.
            </PlainText>{" "}
            <Header4>Friskmelding til arbeidsformidling</Header4>{" "}
            <PlainText>
              Hvis alle muligheter for å komme tilbake til arbeidsplassen din er
              forsøkt, kan du få <Link>sykepenger i inntil 12 uker</Link> mens
              du søker ny jobb.
            </PlainText>{" "}
            <PillLink>Friskmelding til arbeidsformidling</PillLink>
            <h4>Dette gjør du når du blir syk</h4>{" "}
            <PlainText>
              Du kan få sykepenger fra den dagen arbeidsgiveren din har fått
              beskjed om at du er syk, derfor må du gi beskjed til
              arbeidsgiveren din så snart som mulig. Du leverer enten
              egenmelding eller sykmelding.
            </PlainText>{" "}
            <PlainText>
              Hvis du er syk lenger enn egenmeldingsdagene, må du kontakte lege.
            </PlainText>{" "}
          </AccordionItem>
          <AccordionItem title="Fisker">
            <div>
              <PlainText>
                Sykepenger til deg som fisker beregnes&nbsp; på samme måte som
                for arbeidstakere og/eller selvstendig&nbsp; næringsdrivende,
                men det er noen særskilte regler for deg som er fisker på blad B
                i fiskermanntallet:
              </PlainText>{" "}
              <PlainList>
                {" "}
                <li>
                  Du har rett til sykepenger selv om du har vært i arbeid i
                  mindre enn fire uker.
                </li>{" "}
                <li>
                  Du har rett til sykepenger med full lønn opp til 6G fra første
                  sykefraværsdag.
                </li>{" "}
              </PlainList>{" "}
              <Header4>
                <strong>På lott eller hyre</strong>
              </Header4>{" "}
              <PlainText>
                Hvis du mottar lott, regnes du som&nbsp;selvstendig
                næringsdrivende.
              </PlainText>{" "}
              <PlainText>
                Hvis du har hyre, regnes du som arbeidstaker.
              </PlainText>{" "}
              <h4>Hvis du er mellom 67 og 70 år</h4>{" "}
              <PlainText>
                Du kan få sykepenger fra NAV i opptil 60 dager hvis
                gjennomsnittet av inntekten din de siste 3 månedene før du ble
                syk omgjort til årsinntekt overstiger 248&nbsp;056 kroner (2
                ganger grunnbeløpet i folketrygden). Dette gjelder hvis du er
                mellom 67 og 70 år, uavhengig av om du har tatt ut
                alderspensjon.
              </PlainText>{" "}
              <PlainText>
                60-dagersregelen gjelder fra og med dagen etter du fylte 67 år
                og til og med dagen før&nbsp;du fyller 70 år. Hvis du har fylt
                70 år, har du ikke rett til sykepenger.
              </PlainText>{" "}
            </div>
          </AccordionItem>
        </Accordion>
        <div className="flex flex-col gap-6 mb-6">
          <Header2 id="hva">Hva kan du få?</Header2>
          <LinkList title="I dette kapittelet" borderTop>
            <li>
              <ArrowLink href="#hvem">
                <span>Hvor mye kan du få?</span>
              </ArrowLink>
            </li>
            <li>
              <ArrowLink href="#hva">
                <span>Hvor lenge kan du få?</span>
              </ArrowLink>
            </li>
            <li>
              <ArrowLink href="#sok">
                <span>Reisetilskudd som alternativ til sykepenger</span>
              </ArrowLink>
            </li>
            <li>
              <ArrowLink href="#har">
                <span>Andre tilbud</span>
              </ArrowLink>
            </li>
          </LinkList>
        </div>
        <div className="mb-10">
          <Header3>Reisetilskudd som alternativ til sykepenger</Header3>
          <PlainText>
            Klarer du å jobbe, men har problemer med å reise til og fra
            arbeidsstedet? Da kan du ha rett til reisetilskudd i stedet for
            sykepenger fra 17. dag etter at du ble sykmeldt.
          </PlainText>
          <MiniCard title="Reisetilskudd" subtitle="pengestøtte" />
        </div>
        <Header3>Andre tilbud</Header3>
        <PlainText>Mer informasjon til deg som</PlainText>
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
        <Header2 id="sok">Søke, ettersende eller klage</Header2>
        <ExpandoPill title="Hvis du mangler BankId">
          <PlainText>
            Hvis du mangler BankID, ikke har legitimasjon på høyeste
            sikkerhetsnivå eller har fortrolig adresse i Folkeregisteret, må du
            bruke del D av papirsykmeldingen til å søke om sykepenger. Finn
            riktig adresse.
          </PlainText>
          <PlainText>
            Hvis du har en arbeidsgiver, må du levere del C av sykmeldingen til
            arbeidsgiveren din. Del D – søknaden – leverer du til den som skal
            utbetale sykepenger.
          </PlainText>
        </ExpandoPill>
        <Header2 id="har">Når du har sykepenger</Header2>
        <Header4>Klage på vedtak</Header4>
        <PlainText>
          I vedtaket står det hvordan du går fram hvis du skal klage, hvem du
          skal klage til og klagefrist. Hvis du har spørsmål om vedtaket, kan du
          kontakte oss.
        </PlainText>
        <div className="flex gap-2 mb-10">
          <Button>Send klage</Button>
          <Button>Ettersend dokumentasjon</Button>
        </div>
        <Header3>Reise eller flytte til utlandet</Header3>
        <PlainText>
          Hvis du vurderer å reise mens du er sykmeldt, er det noen ting du må
          sjekke på forhånd.
        </PlainText>
        <PlainOrderedList>
          <li>
            Du må sjekke med arbeidsgiveren din om reisen vil hindre planlagt
            oppfølging og aktivitet på arbeidsplassen.{" "}
          </li>
          <li>
            Du må delta aktivt for å komme tilbake i arbeid for å få sykepenger.
            Du må forsikre deg om at reisen ikke vil hindre aktiviteter du har
            avtalt med NAV. Hvis du er usikker, kan du skrive til oss fra
            nav.no.
          </li>
          <li>
            Du må sjekke med den som har sykmeldt deg om reisen vil forverre
            helsetilstanden din, og om den vil hindre planlagt behandling.
          </li>
        </PlainOrderedList>
      </Page>
    </Dekoratoren>
  );
};

export const Route = createFileRoute("/sykepenger")({ component: Component });
