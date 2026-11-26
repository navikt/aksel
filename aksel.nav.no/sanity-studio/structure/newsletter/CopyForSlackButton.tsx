import { useState } from "react";
import { CheckmarkIcon, FilesIcon } from "@navikt/aksel-icons";
import { Button, InlineMessage } from "@navikt/ds-react";
import { toSlackHtml } from "./format-slack-message";

export const CopyForSlackButton = ({ text }: { text: string }) => {
  const [copyStatus, setCopyStatus] = useState<
    "idle" | "copied" | "copiedAsPlainText" | "error"
  >("idle");

  const copyAsRichText = async () => {
    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([toSlackHtml(text)], { type: "text/html" }),
          "text/plain": new Blob([text], { type: "text/plain" }),
        }),
      ]);
      setCopyStatus("copied");
      setTimeout(() => setCopyStatus("idle"), 2000);
    } catch {
      // Some browsers don't support ClipboardItem or deny rich-text write
      try {
        await navigator.clipboard.writeText(text);
        setCopyStatus("copiedAsPlainText");
      } catch {
        setCopyStatus("error");
      }
    }
  };

  return (
    <>
      <Button
        variant="secondary"
        size="small"
        icon={
          copyStatus === "copied" ? (
            <CheckmarkIcon aria-hidden />
          ) : (
            <FilesIcon aria-hidden />
          )
        }
        onClick={copyAsRichText}
        disabled={!text}
      >
        {copyStatus === "copied" ? "Kopiert!" : "Kopier tekst"}
      </Button>
      {copyStatus === "copiedAsPlainText" && (
        <InlineMessage status="warning">
          Kopierte som ren tekst. Lenkene blir ikke klikkbare i Slack.
        </InlineMessage>
      )}
      {copyStatus === "error" && (
        <InlineMessage status="error">
          Klarte ikke å kopiere. Kopier teksten manuelt.
        </InlineMessage>
      )}
    </>
  );
};
