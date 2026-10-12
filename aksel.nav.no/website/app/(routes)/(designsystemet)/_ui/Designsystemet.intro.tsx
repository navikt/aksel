import { Heading, VStack } from "@navikt/ds-react";
import type { KOMPONENT_BY_SLUG_QUERY_RESULT } from "@/app/_sanity/query-types";
import { MarkdownText } from "@/app/_ui/typography/MarkdownText";
import { WebsiteList, WebsiteListItem } from "@/app/_ui/typography/WebsiteList";

function DesignsystemetKomponentIntro({
  data,
}: {
  data: KOMPONENT_BY_SLUG_QUERY_RESULT;
}) {
  const useFor = data?.intro?.brukes_til ?? [];
  const avoidUseFor = data?.intro?.brukes_ikke_til ?? [];
  const internal = data?.status?.internal;

  const showUseFor = internal || useFor.length > 0;
  const showAvoidUseFor = avoidUseFor.length > 0;

  if (!showUseFor && !showAvoidUseFor) {
    return null;
  }

  return (
    <VStack gap="space-24" marginBlock="space-0 space-28">
      {showUseFor && (
        <div>
          <Heading size="small" level="2" spacing>
            Egnet til:
          </Heading>

          <WebsiteList as="ul">
            {internal && (
              <WebsiteListItem icon>Bruk på interne flater</WebsiteListItem>
            )}
            {useFor.map((x) => (
              <WebsiteListItem icon key={x}>
                <MarkdownText>{x}</MarkdownText>
              </WebsiteListItem>
            ))}
          </WebsiteList>
        </div>
      )}
      {showAvoidUseFor && (
        <div>
          <Heading size="small" level="2" spacing>
            Uegnet til:
          </Heading>
          <WebsiteList as="ul">
            {avoidUseFor.map((x) => (
              <WebsiteListItem icon key={x}>
                <MarkdownText>{x}</MarkdownText>
              </WebsiteListItem>
            ))}
          </WebsiteList>
        </div>
      )}
    </VStack>
  );
}

export { DesignsystemetKomponentIntro };
