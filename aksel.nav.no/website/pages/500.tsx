import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";
import { AmplitudeEvents, amplitude } from "@/logging";
import {
  BodyShort,
  Box,
  Heading,
  Link,
  List,
  Page,
  VStack,
} from "@navikt/ds-react";
import { useEffect } from "react";

function ErrorPage({ statusCode }) {
  useEffect(() => {
    amplitude.track(AmplitudeEvents.error, {
      side: window.location.pathname,
    });
  }, []);

  return (
    <Page data-aksel-template="500-v1" footer={<Footer />} id="vk-notFoundId">
      <Header />
      <Page.Block as="main" width="xl" gutters>
        <Box paddingBlock="20 8">
          <VStack gap="16">
            <VStack gap="12" align="start">
              <div>
                {statusCode && (
                  <BodyShort textColor="subtle" size="small">
                    Statuskode {statusCode}
                  </BodyShort>
                )}
                <Heading level="1" size="large" spacing>
                  Beklager, noe gikk galt.
                </Heading>
                <BodyShort spacing>
                  En teknisk feil på våre servere gjør at siden er
                  utilgjengelig. Dette skyldes ikke noe du gjorde.
                </BodyShort>
                <BodyShort>Du kan prøve å</BodyShort>
                <List>
                  <List.Item>
                    vente noen minutter og laste siden på nytt
                  </List.Item>
                  <List.Item>gå tilbake til forrige side</List.Item>
                </List>
                <BodyShort>
                  Hvis problemet vedvarer, kan du{" "}
                  <Link
                    href="https://github.com/navikt/aksel/issues/new?assignees=&labels=bug+%F0%9F%90%9B&projects=&template=bug-report.md&title=[Aksel.nav.no%20-%20500]"
                    target="_blank"
                  >
                    kontakte oss (åpnes i ny fane)
                  </Link>
                  .
                </BodyShort>
              </div>
            </VStack>
            <div>
              <Heading level="1" size="large" spacing>
                Something went wrong
              </Heading>
              <BodyShort>
                Please refresh this page or try again in a few minutes.{" "}
                <Link
                  target="_blank"
                  href="https://github.com/navikt/aksel/issues/new?assignees=&labels=bug+%F0%9F%90%9B&projects=&template=bug-report.md&title=[Aksel.nav.no%20-%20500]"
                >
                  Contact us (opens in new tab)
                </Link>{" "}
                if the problem persists.
              </BodyShort>
            </div>
          </VStack>
        </Box>
      </Page.Block>
    </Page>
  );
}
export default ErrorPage;
