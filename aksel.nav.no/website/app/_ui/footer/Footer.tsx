import Link from "next/link";
import { Heading } from "@navikt/ds-react";
import { FigmaIcon, GithubIcon, SlackIcon } from "@/assets/Icons";
import AkselLogo from "@/assets/Logo";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={`${styles.footer} dark`} id="aksel-footer">
      <div className={styles.footerLayout}>
        <div className={styles.footerLogo}>
          <AkselLogo />
          <div>
            <p>&copy; {new Date().getFullYear()} Nav</p>
            <p>Arbeids- og velferdsetaten</p>
          </div>
        </div>
        <LinkBlock
          heading="Snarveier"
          links={[
            {
              url: "/side/skriv-for-aksel",
              text: "Skriv for Aksel",
            },
            {
              url: "/prinsipper/brukeropplevelse",
              text: "Prinsipper for brukeropplevelse",
            },
            { url: "https://sikkerhet.nav.no/", text: "Security Playbook" },
            {
              url: "https://etterlevelse.ansatt.nav.no/",
              text: "Etterlevelse",
            },
          ]}
        />
        <LinkBlock
          heading="Om nettstedet"
          links={[
            {
              url: "/side/om-aksel",
              text: "Hva er Aksel?",
            },
            {
              url: "/personvernerklaering",
              text: "Personvernerklæring",
            },
            {
              url: "/side/tilgjengelighetserklaring-for-aksel",
              text: "Tilgjengelighetserklæring",
            },
          ]}
        />
        <LinkBlock
          heading="Finn oss"
          links={[
            {
              url: "https://www.figma.com/@nav_aksel",
              text: "Figma",
              icon: <FigmaIcon />,
            },
            {
              url: "https://github.com/navikt/aksel",
              text: "Github",
              icon: <GithubIcon />,
            },
            {
              url: "https://nav-it.slack.com/archives/C7NE7A8UF",
              text: "Slack",
              icon: <SlackIcon />,
            },
          ]}
        />
      </div>
    </footer>
  );
};

type LinkBlockPropsT = {
  heading: string;
  links: { url: string; text: string; icon?: React.ReactNode }[];
};

function LinkBlock({ heading, links }: LinkBlockPropsT) {
  return (
    <div>
      <Heading level="2" size="xsmall" spacing>
        {heading}
      </Heading>
      <ul className={styles.footerLinks}>
        {links.map((link) => (
          <li key={link.url}>
            <Link
              className={styles.footerLink}
              href={link.url}
              data-umami-event="navigere"
              data-umami-event-kilde="footer"
              prefetch={false}
            >
              {link.icon}
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Footer;
