import { useState } from "react";
import { PaperplaneIcon } from "@navikt/aksel-icons";
import { BodyLong, Button, InlineMessage, Link, Modal } from "@navikt/ds-react";
import { toSlackMrkdwn } from "./format-slack-message";

type PostStatusT = "idle" | "posting" | "posted" | "unauthorized" | "error";

/* The website route only exists when the Studio runs inside the website (/admin, /admin-dev) */
const postToSlack = async (text: string): Promise<PostStatusT> => {
  try {
    const response = await fetch("/api/newsletter/slack", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: toSlackMrkdwn(text) }),
    });
    if (response.status === 401) {
      return "unauthorized";
    }
    return response.ok ? "posted" : "error";
  } catch {
    return "error";
  }
};

export const PostToSlackButton = ({ text }: { text: string }) => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<PostStatusT>("idle");

  const post = async () => {
    setStatus("posting");
    setStatus(await postToSlack(text));
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="primary"
        size="small"
        icon={<PaperplaneIcon aria-hidden />}
        onClick={() => {
          setStatus("idle");
          setOpen(true);
        }}
        disabled={!text}
      >
        Post til Slack
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        header={{ heading: "Post til Slack?" }}
        width="small"
      >
        <Modal.Body>
          <BodyLong>
            Meldingen postes av Aksel-boten (@aksel3) og kan ikke trekkes
            tilbake herfra.
          </BodyLong>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" onClick={post} loading={status === "posting"}>
            Post
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setOpen(false)}
          >
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>

      {status === "posted" && (
        <InlineMessage status="success">Postet til Slack.</InlineMessage>
      )}
      {status === "unauthorized" && (
        <InlineMessage status="error">
          Du må være logget inn med Nav-bruker for å poste.{" "}
          <Link
            href={`/oauth2/login?redirect=${encodeURIComponent(window.location.pathname)}`}
          >
            Logg inn
          </Link>
        </InlineMessage>
      )}
      {status === "error" && (
        <InlineMessage status="error">
          Klarte ikke å poste til Slack.
        </InlineMessage>
      )}
    </>
  );
};
