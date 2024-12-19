import dynamic from "next/dynamic";
import { Box, HGrid, Page, VStack } from "@navikt/ds-react";
import { FigmaIcon, GithubIcon, SlackIcon } from "@/assets/Icons";
import AkselLogo from "@/assets/Logo";
import LinkBlock from "./parts/LinkBlock";

export const EditButton = dynamic(() => import("@/web/EditButton"), {
  ssr: false,
});

const Footer = () => {
  return (
    <Box
      as="footer"
      data-theme="dark"
      id="aksel-footer"
      className="relative"
      background="surface-alt-3-strong"
      paddingBlock="12 16"
    >
      <EditButton />
      <Page.Block width="2xl" gutters>
        <HGrid columns={{ xs: 1, md: 2, lg: 4 }} gap={{ xs: "12", xl: "6" }}>
          <VStack gap="4">
            <AkselLogo className="fill-white" />
            <div>
              <p>&copy; {new Date().getFullYear()} Nav</p>
              <p>Arbeids- og velferdsetaten</p>
            </div>
          </VStack>
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
                url: "/side/personvernerklaering",
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
        </HGrid>
      </Page.Block>
    </Box>
  );
};

export default Footer;
