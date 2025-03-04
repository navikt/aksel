import { useEffect, useState } from "react";
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

function ErrorPage({ statusCode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    umami.track(statusCode, { url: window.location.pathname });
    setIsClient(true);
  }, [statusCode]);

  return (
    <Page data-aksel-template="500-v2" footer={<Footer />} className="vk-error">
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
                    vente noen minutter og{" "}
                    <Link href="#" onClick={() => location.reload()}>
                      laste siden på nytt
                    </Link>
                  </List.Item>
                  <List.Item>
                    {isClient && history.length > 1 ? (
                      <Link href="#" onClick={() => history.back()}>
                        gå tilbake til forrige side
                      </Link>
                    ) : (
                      "gå tilbake til forrige side"
                    )}
                  </List.Item>
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
              <BodyShort spacing>
                This was caused by a technical fault on our servers. Please
                refresh this page or try again in a few minutes.{" "}
              </BodyShort>
              <BodyShort>
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
