import { Heading, VStack } from "@navikt/ds-react";
import { KOMPONENT_BY_SLUG_QUERYResult } from "@/app/_sanity/query-types";
import { MarkdownText } from "@/app/_ui/typography/MarkdownText";
import { WebsiteList, WebsiteListItem } from "@/app/_ui/typography/WebsiteList";

function DesignsystemetKomponentIntro({
  data,
}: {
  data: KOMPONENT_BY_SLUG_QUERYResult;
}) {
  const useFor = data?.intro?.brukes_til;
  const avoidUseFor = data?.intro?.brukes_ikke_til;

  if (!useFor && !avoidUseFor) {
    return null;
  }

  const internal = data?.status?.internal;

  return (
    <VStack gap="space-24" marginBlock="0 space-28">
      {useFor && (
        <div>
          <Heading size="small" level="3" spacing>
            Egnet til:
          </Heading>

          <WebsiteList as="ul">
            {internal && (
              <WebsiteListItem icon>Bruk på interne flater</WebsiteListItem>
            )}
            {data?.intro?.brukes_til?.map((x) => (
              <WebsiteListItem icon key={x}>
                <MarkdownText>{x}</MarkdownText>
              </WebsiteListItem>
            ))}
          </WebsiteList>
        </div>
      )}
      {avoidUseFor && (
        <div>
          <Heading size="small" level="3" spacing>
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
