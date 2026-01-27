"use client";

import { useEffect, useState } from "react";
import { BodyShort, Box, Heading, Link, VStack } from "@navikt/ds-react";
import { Page } from "@navikt/ds-react/Page";
import { WebsiteList, WebsiteListItem } from "@/app/_ui/typography/WebsiteList";

export default function GenericErrorPage() {
  const [hasHistory, setHasHistory] = useState(false);

  useEffect(() => {
    if (history && history.length > 1) {
      setHasHistory(true);
    }
  }, []);

  return (
    <Page.Block as="main" width="xl" gutters data-aksel-template="500-v3">
      <Box paddingBlock="space-80 space-32">
        <VStack gap="space-64">
          <VStack gap="space-48" align="start">
            <VStack gap="space-16">
              <Heading level="1" size="large" data-aksel-heading-color>
                Beklager, noe gikk galt.
              </Heading>
              <BodyShort>
                En teknisk feil på våre servere gjør at siden er utilgjengelig.
                Dette skyldes ikke noe du gjorde.
              </BodyShort>
              <BodyShort>Du kan prøve å</BodyShort>
              <div>
                <WebsiteList>
                  <WebsiteListItem icon>
                    vente noen minutter og{" "}
                    <Link
                      href="#"
                      onClick={(event) => {
                        event.preventDefault();
                        location.reload();
                      }}
                    >
                      laste siden på nytt
                    </Link>
                  </WebsiteListItem>
                  <WebsiteListItem icon>
                    {hasHistory ? (
                      <Link
                        href="#"
                        onClick={(event) => {
                          event.preventDefault();
                          history.back();
                        }}
                      >
                        gå tilbake til forrige side
                      </Link>
                    ) : (
                      "gå tilbake til forrige side"
                    )}
                  </WebsiteListItem>
                </WebsiteList>
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
          </VStack>
          <div>
            <Heading level="1" size="large" spacing data-aksel-heading-color>
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
  );
}
