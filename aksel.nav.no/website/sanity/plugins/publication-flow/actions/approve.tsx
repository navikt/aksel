import { differenceInMonths, format } from "date-fns";
import { useState } from "react";
import {
  DocumentActionDescription,
  DocumentActionProps,
  SanityDocument,
  useDocumentOperation,
} from "sanity";
import { SealCheckmarkIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import { Oppdateringsvarsel } from "../../../schema/documents/presets/oppdateringsvarsel";
import { QualityCheckContent } from "./focusAction";

export const createWrappedApproveAction = () => {
  const WrappedApprove = (
    props: DocumentActionProps,
  ): DocumentActionDescription | null => {
    const { patch, publish } = useDocumentOperation(props.id, props.type);
    const [dialogOpen, setDialogOpen] = useState(false);

    if (!props.published) {
      return null;
    }

    const verifiedDocument = props.published as
      | (SanityDocument & Oppdateringsvarsel)
      | null;

    const lastVerified = verifiedDocument.updateInfo?.lastVerified;

    const verifyContent = () => {
      patch.execute(
        [
          {
            set: {
              updateInfo: {
                lastVerified: format(new Date(), "yyyy-MM-dd"),
              },
            },
          },
        ],
        props.published ?? {},
      );
    };

    const verifiedStatus =
      differenceInMonths(new Date(), new Date(lastVerified)) < 6
        ? "pre"
        : "post";

    return {
      label: "Godkjenn innhold",
      onHandle: () => {
        setDialogOpen(true);
      },
      icon: SealCheckmarkIcon,
      tone: "positive",
      dialog: dialogOpen && {
        type: "dialog",
        header: "Kvalitetssjekk før publisering",
        onClose: () => setDialogOpen(false),
        content: (
          <>
            <QualityCheckContent type={`${verifiedStatus}Verify`} />
            <div className="flex justify-end gap-4">
              <Button variant="tertiary" onClick={() => setDialogOpen(false)}>
                Nei, avbryt
              </Button>
              <Button
                onClick={() => {
                  verifyContent();
                  publish.execute();
                  props.onComplete();
                  setDialogOpen(false);
                }}
              >
                Ja, godkjenn
              </Button>
            </div>
          </>
        ),
      },
    };
  };

  return WrappedApprove;
};
