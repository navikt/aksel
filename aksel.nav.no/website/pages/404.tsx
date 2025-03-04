import { useEffect } from "react";
import { BugIcon } from "@navikt/aksel-icons";
import {
  BodyShort,
  Box,
  Heading,
  Link,
  List,
  Page,
  VStack,
} from "@navikt/ds-react";
import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";

export default function NotFound() {
  useEffect(() => {
    umami.track("404", { url: window.location.pathname });
  }, []);

  return (
    <Page data-aksel-template="404-v2" footer={<Footer />} className="vk-error">
      <Header />
      <Page.Block as="main" width="xl" gutters>
        <Box paddingBlock="20 16">
          <VStack gap="16">
            <VStack gap="12" align="start">
              <div>
                <Heading level="1" size="large" spacing>
                  Beklager, vi fant ikke siden
                </Heading>
                <BodyShort>
                  Denne siden kan være slettet eller flyttet, eller det er en
                  feil i lenken.
                </BodyShort>
                <List>
                  <List.Item>Bruk gjerne søket eller menyen</List.Item>
                  <List.Item>
                    <Link href="/">Gå til forsiden</Link>
                  </List.Item>
                </List>
              </div>
              <Link href="https://github.com/navikt/aksel/issues/new?assignees=&labels=bug+%F0%9F%90%9B&projects=&template=bug-report.md&title=[Aksel.nav.no%20-%20404]">
                <BugIcon aria-hidden />
                Meld gjerne fra om at lenken ikke virker
              </Link>
            </VStack>

            <div>
              <Heading level="2" size="large" spacing>
                Page not found
              </Heading>
              <BodyShort spacing>
                The page you requested cannot be found.
              </BodyShort>
              <BodyShort>
                Go to the <Link href="/">front page</Link>, or use one of the
                links in the menu.
              </BodyShort>
            </div>
          </VStack>
        </Box>
      </Page.Block>
    </Page>
  );
}
