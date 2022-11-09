import { Button, Heading, Label, Textarea } from "@navikt/ds-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import isEmpty from "validator/lib/isEmpty";

const FooterForm = () => {
  const [contactForm, setContactForm] = useState({
    content: "",
    hasWritten: false,
  });

  const [contentError, setContentError] = useState({ content: "" });
  const [sent, setSent] = useState({ status: false });

  const { asPath, basePath } = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    let fail = false;
    if (isEmpty(contactForm.content, { ignore_whitespace: true })) {
      setContentError({
        ...contentError,
        content: "Melding kan ikke være tom. Fyll inn meldingen.",
      });
      fail = true;
    }

    if (fail) return;
    setContentError({ content: "" });

    fetch("/api/generalFeedback", {
      method: "POST",
      body: JSON.stringify({
        message: contactForm.content,
        url: `${basePath}${asPath}`,
      }),
    });

    setSent({ status: true });
    setContactForm({ content: "", hasWritten: false });
  };

  useEffect(() => {
    setSent({ status: false });
    setContactForm({ content: "", hasWritten: false });
    setContentError({ content: "" });
  }, [asPath]);

  return (
    <>
      <div className="flex w-full max-w-md flex-col gap-8" data-theme="dark">
        {sent.status ? (
          <div>
            <Label spacing as="p">
              Meldingen er sendt til Aksel, takk for tilbakemeldingen!
            </Label>
          </div>
        ) : (
          <form onSubmit={(e) => handleSubmit(e)} className="w-full">
            <div className="mb-4 flex flex-col gap-4">
              <Heading as="legend" size="small">
                Gi en tilbakemelding
              </Heading>
              <Textarea
                className="inverted-textarea"
                error={contentError.content}
                autoComplete="off"
                label="Melding"
                value={contactForm.content}
                onChange={(e) => {
                  setContactForm({
                    ...contactForm,
                    content: e.target.value,
                    hasWritten: true,
                  });
                  e.target.value &&
                    !isEmpty(e.target.value, { ignore_whitespace: true }) &&
                    setContentError({ ...contentError, content: "" });
                }}
                description="Ikke skriv inn navn eller andre personopplysninger"
                minRows={2}
              />
            </div>
            {contactForm.hasWritten && (
              <Button className="override-primary-button-dark">
                Send melding
              </Button>
            )}
          </form>
        )}
      </div>
    </>
  );
};

export default FooterForm;
