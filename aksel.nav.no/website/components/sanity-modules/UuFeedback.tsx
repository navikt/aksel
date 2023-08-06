import { FeedbackT } from "@/types";
import { IdContext } from "@/utils";
import { Button, Heading, Textarea } from "@navikt/ds-react";
import cl from "clsx";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

export const UuFeedback = ({ node }: { node: { vis: boolean } }) => {
  const [textValue, setTextValue] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const idCtx = useContext(IdContext);
  const { asPath, basePath } = useRouter();

  if (!node?.vis) {
    return null;
  }

  const fetchFeedback = () => {
    const body: FeedbackT = {
      message: textValue,
      url: `${basePath}${asPath}`,
      type: "uu",
      docId: idCtx?.id,
    };

    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify(body),
    });
  };

  const handleSend = (e) => {
    e.preventDefault();

    if (textValue === "") {
      setErrorMsg(
        "Tilbakemeldingen kan ikke være tom. Legg til tekst i feltet."
      );
      return;
    }
    setErrorMsg(null);
    setSent(true);
    fetchFeedback();
    setTextValue("");
  };

  return (
    <div className="my-8">
      {!sent && (
        <form
          className={cl(
            "animate-fadeIn mt-4 flex w-full max-w-sm flex-col gap-4"
          )}
        >
          <Textarea
            error={errorMsg}
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            maxLength={600}
            minRows={3}
            label="Tilbakemelding"
            description="Ikke skriv inn navn eller andre personopplysninger"
            autoComplete="off"
          />
          <Button className="mr-auto" onClick={handleSend}>
            Send inn tilbakemelding
          </Button>
        </form>
      )}
      <div aria-live="polite">
        {sent && (
          <>
            <Heading size="small" as="p" className="mt-8">
              Takk for tilbakemeldingen!
            </Heading>
          </>
        )}
      </div>
    </div>
  );
};
