import { Heading, VStack } from "@navikt/ds-react";
import { KOMPONENT_BY_SLUG_QUERYResult } from "@/app/_sanity/query-types";
import { List, ListItem } from "@/app/_ui/typography/List";
import { MarkdownText } from "@/app/_ui/typography/MarkdownText";

function DesignsytemetKomponentIntro({
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
    <VStack gap="space-8" marginBlock="space-28">
      {useFor && (
        <div>
          <Heading size="small" level="3">
            Egnet til:
          </Heading>

          <List as="ul">
            {internal && <ListItem icon>Bruk på interne flater</ListItem>}
            {data?.intro?.brukes_til?.map((x) => (
              <ListItem icon key={x}>
                <MarkdownText>{x}</MarkdownText>
              </ListItem>
            ))}
          </List>
        </div>
      )}
      {avoidUseFor && (
        <div>
          <Heading size="small" level="3">
            Uegnet til:
          </Heading>
          <List as="ul">
            {avoidUseFor.map((x) => (
              <ListItem icon key={x}>
                <MarkdownText>{x}</MarkdownText>
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </VStack>
  );
}

export { DesignsytemetKomponentIntro };
