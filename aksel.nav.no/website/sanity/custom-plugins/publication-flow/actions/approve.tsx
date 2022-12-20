import { Button } from "@navikt/ds-react";
import { differenceInMonths, format } from "date-fns";
import { useState } from "react";
import {
  DocumentActionDescription,
  DocumentActionProps,
  useDocumentOperation,
} from "sanity";

import { PublishIcon } from "@sanity/icons";
import { QualityCheckContent } from "./focusAction";

export const createWrappedApproveAction = () => {
  const WrappedApprove = (
    props: DocumentActionProps
  ): DocumentActionDescription | null => {
    const { patch, publish } = useDocumentOperation(props.id, props.type);
    const [dialogOpen, setDialogOpen] = useState(false);
    const lastVerified = props.published?.updateInfo?.["lastVerified"];
    if (!props.published) {
      return null;
    }

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
        props.published
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
      icon: PublishIcon,
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
