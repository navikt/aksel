import { format } from "date-fns";
import { useState } from "react";
import { DocumentActionComponent, useDocumentOperation } from "sanity";
import { Button } from "@navikt/ds-react";

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
        content: (
          <>
            <div className="flex justify-end gap-4">
              <Button variant="tertiary" onClick={toggleDialog}>
                Avbryt publisering
              </Button>
              <Button onClick={publishDocument}>
                Godkjenn og publiser innhold
              </Button>
            </div>
          </>
        ),
      },
    };
  };
}
