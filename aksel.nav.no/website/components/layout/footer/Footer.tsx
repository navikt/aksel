import { BodyShort, Heading, Link } from "@navikt/ds-react";
import { FigmaIcon, GithubIcon, SlackIcon } from "components/assets";
import Logo from "components/assets/Logo";
import { logNav } from "components/website-modules/utils/amplitude";
import { EditButton } from "../..";
import FooterForm from "./FooterForm";

const Footer = () => {
  return (
    <footer
      id="aksel-footer"
      data-hj-suppress
      data-theme="dark"
      className="toc-ignore text-text-on-inverted bg-deepblue-800 relative flex w-full justify-center"
    >
      <div className="relative z-10 mx-auto grid w-full max-w-screen-2xl gap-12 px-4 pt-12 pb-16 md:grid-cols-2 md:px-6 lg:grid-cols-4 xl:grid-cols-5 xl:gap-6">
        <LogoBlock />
        <Snarveier />
        <SideLenker />
        <Kontakt />
        <FooterForm />
      </div>

      <EditButton />
    </footer>
  );
};

function LogoBlock() {
  return (
    <div>
      <Logo className="fill-white" />
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
        <FooterLink href="/god-praksis/artikler/om-aksel">
          Hva er Aksel?
        </FooterLink>
        <FooterLink href="/god-praksis/artikler/skriv-for-aksel">
          Skriv for Aksel
        </FooterLink>
        <FooterLink href="/prinsipper/brukeropplevelse">
          Prinsipper for brukeropplevelse
        </FooterLink>
        <FooterLink href="/prinsipper/brukeropplevelse">
          Prinsipper for brukeropplevelse
        </FooterLink>
        <FooterLink href="https://identitet.nav.no/">Identitet</FooterLink>
        <FooterLink href="https://sikkerhet.nav.no/">
          Security Playbook
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
        <FooterLink href="/side/personvernerklaering">
          Personvernserklæring
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
        className="text-text-on-inverted focus:shadow-focus focus:text-text-default flex w-fit items-center gap-1 no-underline hover:underline focus:bg-blue-200 focus:shadow-blue-200"
        href={href}
        onClick={(e) =>
          logNav(
            "footer",
            window.location.pathname,
            e.currentTarget.getAttribute("href")
          )
        }
      >
        {children}
      </Link>
    </li>
  );
}

export default Footer;
