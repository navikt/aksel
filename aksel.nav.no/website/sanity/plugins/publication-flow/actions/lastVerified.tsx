import { format } from "date-fns";
import { useState } from "react";
import { DocumentActionComponent, useDocumentOperation } from "sanity";
import { Button, Heading, List, Stack } from "@navikt/ds-react";

/**
 * Adds "lastVerified" to the document's on first publish, and updates it on subsequent publishes.
 * Includes a dialog for the user to confirm the publish action.
 * This is useful for documents that require a quality check before publishing.
 */
export function setLastVerified(
  originalAction: DocumentActionComponent,
): DocumentActionComponent {
  return (props) => {
    const originalResult = originalAction(props);

    const { patch } = useDocumentOperation(props.id, props.type);

    const [isDialogOpen, setDialogOpen] = useState(false);

    const toggleDialog = () => setDialogOpen((isOpen) => !isOpen);

    if (!originalResult) {
      return null;
    }

    const publishDocument = () => {
      toggleDialog();
      patch.execute([
        {
          set: {
            updateInfo: {
              lastVerified: format(new Date(), "yyyy-MM-dd"),
            },
          },
        },
        { setIfMissing: { publishedAt: new Date().toISOString() } },
      ]);
      originalResult?.onHandle?.();
    };

    return {
      ...originalResult,
      label: props.published
        ? "Godkjenn og publiser innhold"
        : originalResult.label,
      onHandle: toggleDialog,
      dialog: isDialogOpen && {
        header: "Kvalitetssjekk før publisering",
        onClose: toggleDialog,
        footer: (
          <Stack justify="end" gap="4">
            <Button variant="tertiary" onClick={toggleDialog}>
              Nei, jeg vil endre noe først
            </Button>
            <Button onClick={publishDocument}>
              Godkjenn og publiser innhold
            </Button>
          </Stack>
        ),
        content: props.published ? (
          <>
            <AfterPublish />
            <BeforePublish title="Huskeliste" />
          </>
        ) : (
          <BeforePublish />
        ),
      },
    };
  };
}

function BeforePublish({
  title = "Før første publisering, har du husket dette?",
}: {
  title?: string;
}) {
  return (
    <div>
      <Heading level="2" size="medium" spacing>
        {title}
      </Heading>
      <List>
        <List.Item>Brukt riktig overskriftsnivå?</List.Item>
        <List.Item>
          Brukt et aktivt og forståelig språk? Og ellers skrevet i tråd med slik
          vi skriver på Aksel?
        </List.Item>
        <List.Item>Fått noen til å lese over teksten din?</List.Item>
        <List.Item>
          Gitt leseren relevante veier videre til annet innhold, og skrevet gode
          lenketekster?
        </List.Item>
        <List.Item>
          Sørget for at det ikke ligger noe taushetsbelagt informasjon i
          artikkelen?
        </List.Item>
      </List>
    </div>
  );
}

function AfterPublish() {
  return (
    <div>
      <Heading level="2" size="medium" spacing>
        Før du godkjenner innholdet på nytt, har du vurdert dette?
      </Heading>
      <List>
        <List.Item>
          Er artikkelen fortsatt relevant for produktteam i NAV?
        </List.Item>
        <List.Item>
          Har du oppdatert artikkelen dersom det er behov for det?
        </List.Item>
        <List.Item>Er lenkene fortsatt relevante?</List.Item>
        <List.Item>
          Har det blitt publisert noe nytt på Aksel som denne artikkelen bør
          lenke til?
        </List.Item>
      </List>
    </div>
  );
}
