"use client";

import { format } from "date-fns";
import { useState } from "react";
import {
  DocumentActionComponent,
  DocumentActionsContext,
  InsufficientPermissionsMessage,
  useCurrentUser,
  useDocumentOperation,
  useDocumentPairPermissions,
} from "sanity";
import { SealCheckmarkIcon } from "@navikt/aksel-icons";
import { Button, Heading, List, Stack } from "@navikt/ds-react";
import { SANITY_API_VERSION } from "@/sanity/config";

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

export function setLastVerifiedWithoutPublish(
  context: DocumentActionsContext,
): DocumentActionComponent {
  return (props) => {
    const client = context.getClient({ apiVersion: SANITY_API_VERSION });

    const currentUser = useCurrentUser();

    const [permissions, isPermissionsLoading] = useDocumentPairPermissions({
      id: props.id,
      type: props.type,
      permission: "publish",
    });

    const [isDialogOpen, setDialogOpen] = useState(false);

    if (!props.published) {
      return null;
    }

    const toggleDialog = () => setDialogOpen((isOpen) => !isOpen);

    const update = async () => {
      toggleDialog();

      if (!props.published) {
        return null;
      }

      await client
        .patch(props.published._id)
        .set({
          updateInfo: {
            lastVerified: format(new Date(), "yyyy-MM-dd"),
          },
        })
        .commit();

      if (props.draft) {
        await client
          .patch(props.draft._id)
          .set({
            updateInfo: {
              lastVerified: format(new Date(), "yyyy-MM-dd"),
            },
          })
          .commit();
      }

      props.onComplete();
    };

    if (!isPermissionsLoading && !permissions?.granted) {
      return {
        tone: "default",
        label: "Godkjenn innhold uten å publisere",
        title: (
          <InsufficientPermissionsMessage
            context="publish-document"
            currentUser={currentUser}
          />
        ),
        disabled: true,
      };
    }

    return {
      disabled: isPermissionsLoading,
      label: "Godkjenn innhold uten å publisere",
      onHandle: toggleDialog,
      icon: () => <SealCheckmarkIcon data-sanity-icon aria-hidden />,
      dialog: isDialogOpen && {
        header: "Kvalitetssjekk før publisering",
        onClose: toggleDialog,
        footer: (
          <Stack justify="end" gap="4">
            <Button variant="tertiary" onClick={toggleDialog}>
              Nei, jeg vil endre noe først
            </Button>
            <Button onClick={update}>Oppdatert godkjent dato</Button>
          </Stack>
        ),
        content: (
          <>
            <AfterPublish />
            <BeforePublish title="Huskeliste" />
          </>
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
          Er artikkelen fortsatt relevant for produktteam i Nav?
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
