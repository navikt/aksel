import { useState } from "react";
import { CheckmarkIcon, FilesIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import type { FeedbackT } from "./feedback";
import { toSlackHtml } from "./format-slack-message";

type CopyForSlackButtonProps = {
  text: string;
  onFeedback: (feedback: FeedbackT) => void;
};

export const CopyForSlackButton = ({
  text,
  onFeedback,
}: CopyForSlackButtonProps) => {
  const [copied, setCopied] = useState(false);

  const copyAsRichText = async () => {
    onFeedback(null);
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([toSlackHtml(text)], { type: "text/html" }),
          "text/plain": new Blob([text], { type: "text/plain" }),
        }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      onFeedback({
        status: "success",
        message: "Kopiert. Lim inn teksten i Slack.",
      });
    } catch {
      // Some browsers don't support ClipboardItem or deny rich-text write
      try {
        await navigator.clipboard.writeText(text);
        onFeedback({
          status: "warning",
          message:
            "Kopierte som ren tekst. Lenkene blir ikke klikkbare i Slack.",
        });
      } catch {
        onFeedback({
          status: "error",
          message: "Klarte ikke å kopiere. Kopier teksten manuelt.",
        });
      }
    }
  };

  /* Only the icon changes, so the button keeps its width */
  return (
    <Button
      variant="secondary"
      size="small"
      icon={copied ? <CheckmarkIcon aria-hidden /> : <FilesIcon aria-hidden />}
      onClick={copyAsRichText}
      disabled={!text}
    >
      Kopier tekst
    </Button>
  );
};
