import { BugIcon } from "@navikt/aksel-icons";
import { BodyShort, Box, Heading, Link, VStack } from "@navikt/ds-react";
import { Page, PageBlock } from "@navikt/ds-react/Page";
import Footer from "@/app/_ui/footer/Footer";
import { Header } from "@/app/_ui/header/Header";
import { WebsiteList, WebsiteListItem } from "@/app/_ui/typography/WebsiteList";

export default function NotFound() {
  return (
    <Page data-aksel-template="404-v2" footer={<Footer />} className="vk-error">
      <Header />
      <PageBlock as="main" width="xl" gutters>
        <Box paddingBlock="space-80 space-64">
          <VStack gap="space-64">
            <VStack gap="space-48" align="start">
              <div>
                <Heading
                  level="1"
                  size="large"
                  spacing
                  data-aksel-heading-color
                >
                  Beklager, vi fant ikke siden
                </Heading>
                <BodyShort spacing>
                  Denne siden kan være slettet eller flyttet, eller det er en
                  feil i lenken.
                </BodyShort>
                <WebsiteList>
                  <WebsiteListItem icon>
                    Bruk søket eller menyen
                  </WebsiteListItem>
                  <WebsiteListItem icon>
                    <Link href="/">Gå til forsiden</Link>
                  </WebsiteListItem>
                </WebsiteList>
              </div>
              <Link href="https://github.com/navikt/aksel/issues/new?assignees=&labels=bug+%F0%9F%90%9B&projects=&template=bug-report.md&title=[Aksel.nav.no%20-%20404]">
                <BugIcon aria-hidden />
                Meld gjerne fra om at lenken ikke virker
              </Link>
            </VStack>

            <div>
              <Heading level="2" size="large" spacing data-aksel-heading-color>
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
      </PageBlock>
    </Page>
  );
}
