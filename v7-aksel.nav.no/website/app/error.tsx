"use client";

import { ReactElement, useEffect } from "react";
import { BodyShort, Box, Heading, Link, VStack } from "@navikt/ds-react";
import { Page } from "@navikt/ds-react/Page";
import { logger } from "@navikt/next-logger";
import { WebsiteList, WebsiteListItem } from "@/app/_ui/typography/WebsiteList";

export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
}): ReactElement {
  useEffect(() => {
    logger.error(error);
  }, [error]);

  return (
    <Page data-aksel-template="500-v2" className="vk-error">
      <Page.Block as="main" width="xl" gutters>
        <Box paddingBlock="space-80 space-32">
          <VStack gap="space-64">
            <VStack gap="space-48" align="start">
              <div>
                <Heading
                  level="1"
                  size="large"
                  spacing
                  data-aksel-heading-color
                >
                  Beklager, noe gikk galt.
                </Heading>
                <BodyShort spacing>
                  En teknisk feil på våre servere gjør at siden er
                  utilgjengelig. Dette skyldes ikke noe du gjorde.
                </BodyShort>
                <BodyShort spacing>Du kan prøve å</BodyShort>
                <WebsiteList>
                  <WebsiteListItem icon>
                    vente noen minutter og{" "}
                    <Link href="#" onClick={() => location.reload()}>
                      laste siden på nytt
                    </Link>
                  </WebsiteListItem>
                  <WebsiteListItem icon>
                    {history && history.length > 1 ? (
                      <Link href="#" onClick={() => history.back()}>
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
    </Page>
  );
}
