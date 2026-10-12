"use client";

import { useEffect, useState } from "react";
import { BodyShort, Box, Heading, Link, VStack } from "@navikt/ds-react";
import { Page } from "@navikt/ds-react/Page";
import { WebsiteList, WebsiteListItem } from "@/app/_ui/typography/WebsiteList";

export default function GenericErrorPage() {
  const [hasHistory, setHasHistory] = useState(false);

  useEffect(() => {
    if (history && history.length > 1) {
      setHasHistory(true); // eslint-disable-line react-hooks/set-state-in-effect
    }
  }, []);

  return (
    <Page.Block as="main" width="text" gutters data-aksel-template="500-v4">
      <Box paddingBlock="space-64 space-80">
        <VStack gap="space-64">
          <VStack gap="space-16">
            <Heading level="1" size="large" data-aksel-heading-color>
              Beklager, noe gikk galt
            </Heading>
            <VStack gap="space-24">
              <BodyShort>
                En teknisk feil på våre servere gjør at siden er utilgjengelig.
                Dette skyldes ikke noe du gjorde.
              </BodyShort>
              <VStack gap="space-12">
                <BodyShort>Du kan prøve å</BodyShort>
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
              </VStack>
              <BodyShort>
                Dersom problemet vedvarer, kan du{" "}
                <Link
                  href="https://github.com/navikt/aksel/issues/new?assignees=&labels=bug+%F0%9F%90%9B&projects=&template=bug-report.md&title=[Aksel.nav.no%20-%20500]"
                  target="_blank"
                >
                  kontakte oss (åpnes i ny fane)
                </Link>
                .
              </BodyShort>
            </VStack>
          </VStack>
          <div>
            <Heading level="2" size="large" spacing data-aksel-heading-color>
              Something went wrong
            </Heading>
            <BodyShort spacing>
              This was caused by a technical fault on our servers. Please
              refresh this page or try again in a few minutes.
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
