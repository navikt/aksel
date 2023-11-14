import { FigmaIcon, GithubIcon, SlackIcon } from "@/assets/Icons";
import AkselLogo from "@/assets/Logo";
import { amplitudeLogNavigation } from "@/logging";
import { BodyShort, Box, HGrid, Heading, Link, Page } from "@navikt/ds-react";
import dynamic from "next/dynamic";

export const EditButton = dynamic(() => import("@/web/EditButton"), {
  ssr: false,
});

const Footer = () => {
  return (
    <Box
      as="footer"
      data-theme="dark"
      id="aksel-footer"
      className="text-text-on-inverted relative"
      background="surface-alt-3-strong"
      paddingBlock="12 16"
    >
      <Page.Block width="2xl" gutters>
        <HGrid columns={{ xs: 1, md: 2, lg: 4 }} gap={{ xs: "12", xl: "6" }}>
          <LogoBlock />
          <Snarveier />
          <SideLenker />
          <Kontakt />
        </HGrid>

        <EditButton />
      </Page.Block>
    </Box>
  );
};

function LogoBlock() {
  return (
    <div>
      <AkselLogo className="fill-white" />
      <p className="mt-4">&copy; {new Date().getFullYear()} NAV</p>
      <p>Arbeids- og velferdsetaten</p>
    </div>
  );
}

function Snarveier() {
  return (
    <div>
      <Heading level="2" size="xsmall">
        Snarveier
      </Heading>
      <BodyShort as="ul" className="mt-3 grid gap-3">
        <FooterLink href="/god-praksis/artikler/skriv-for-aksel">
          Skriv for Aksel
        </FooterLink>
        <FooterLink href="/prinsipper/brukeropplevelse">
          Prinsipper for brukeropplevelse
        </FooterLink>
        {/* <FooterLink href="https://identitet.nav.no/">Identitet</FooterLink> */}
        <FooterLink href="https://sikkerhet.nav.no/">
          Security Playbook
        </FooterLink>
        <FooterLink href="https://etterlevelse.intern.nav.no/">
          Etterlevelse
        </FooterLink>
      </BodyShort>
    </div>
  );
}

function Kontakt() {
  return (
    <div>
      <Heading level="2" size="xsmall">
        Finn oss
      </Heading>
      <BodyShort as="ul" className="mt-3 grid gap-3">
        <FooterLink href="https://www.figma.com/@nav_aksel">
          <FigmaIcon />
          Figma
        </FooterLink>
        <FooterLink href="https://github.com/navikt/aksel">
          <GithubIcon />
          Github
        </FooterLink>
        <FooterLink href="https://nav-it.slack.com/archives/C7NE7A8UF">
          <SlackIcon />
          Slack
        </FooterLink>
      </BodyShort>
    </div>
  );
}
function SideLenker() {
  return (
    <div>
      <Heading level="2" size="xsmall">
        Om nettstedet
      </Heading>
      <BodyShort as="ul" className="mt-3 grid gap-3">
        <FooterLink href="/god-praksis/artikler/om-aksel">
          Hva er Aksel?
        </FooterLink>
        <FooterLink href="/side/personvernerklaering">
          Personvernerklæring
        </FooterLink>
        <FooterLink href="/side/tilgjengelighetserklaring-for-aksel">
          Tilgjengelighetserklæring
        </FooterLink>
      </BodyShort>
    </div>
  );
}

function FooterLink({ children, href }) {
  return (
    <li>
      <Link
        className="text-text-on-inverted focus:shadow-focus focus:text-text-default flex w-fit items-center gap-1 underline hover:no-underline focus:bg-blue-200 focus:shadow-blue-200"
        href={href}
        onClick={(e) =>
          amplitudeLogNavigation("footer", e.currentTarget.getAttribute("href"))
        }
      >
        {children}
      </Link>
    </li>
  );
}

export default Footer;
