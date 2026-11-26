import { useState } from "react";
import { PaperplaneIcon } from "@navikt/aksel-icons";
import { BodyLong, Button, Modal } from "@navikt/ds-react";
import type { FeedbackT } from "./feedback";
import { toSlackMrkdwn } from "./format-slack-message";

/* The website route only exists when the Studio runs inside the website (/admin, /admin-dev) */
const postToSlack = async (text: string) => {
  try {
    const response = await fetch("/api/newsletter/slack", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: toSlackMrkdwn(text) }),
    });
    return response.ok;
  } catch {
    return false;
  }
};

type PostToSlackButtonProps = {
  text: string;
  onFeedback: (feedback: FeedbackT) => void;
};

export const PostToSlackButton = ({
  text,
  onFeedback,
}: PostToSlackButtonProps) => {
  const [open, setOpen] = useState(false);
  const [posting, setPosting] = useState(false);

  const post = async () => {
    setPosting(true);
    const posted = await postToSlack(text);
    setPosting(false);
    setOpen(false);
    onFeedback(
      posted
        ? { status: "success", message: "Sendt til Slack." }
        : { status: "error", message: "Klarte ikke å sende til Slack." },
    );
  };

  return (
    <>
      <Button
        variant="primary"
        size="small"
        icon={<PaperplaneIcon aria-hidden />}
        onClick={() => {
          onFeedback(null);
          setOpen(true);
        }}
        disabled={!text || posting}
      >
        Send til Slack
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        header={{ heading: "Post til Slack?" }}
        width="small"
      >
        <Modal.Body>
          <BodyLong>
            {posting
              ? "Meldingen sendes til Slack. Sendingen fortsetter selv om du lukker vinduet."
              : "Aksel-boten (@aksel3) er klar til å sende meldingen til Slack."}
          </BodyLong>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" onClick={post} loading={posting}>
            Send
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setOpen(false)}
          >
            {posting ? "Lukk" : "Avbryt"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
