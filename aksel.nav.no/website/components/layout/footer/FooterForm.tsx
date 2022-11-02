import {
  BodyLong,
  Button,
  Heading,
  Label,
  Textarea,
  TextField,
} from "@navikt/ds-react";
import cl from "classnames";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";

const FooterForm = () => {
  const [contactForm, setContactForm] = useState({
    content: "",
    mail: "",
    hasWritten: false,
  });

  const [contentError, setContentError] = useState({ content: "", mail: "" });
  const [sent, setSent] = useState({ status: false, hadMail: false });

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
    if (
      !isEmpty(contactForm.mail, { ignore_whitespace: true }) &&
      !isEmail(contactForm.mail)
    ) {
      setContentError({
        ...contentError,
        mail: "Email ikke gyldig.",
      });
      fail = true;
    }
    if (fail) return;
    setContentError({ content: "", mail: "" });

    fetch("/api/generalFeedback", {
      method: "POST",
      body: JSON.stringify({
        message: contactForm.content,
        user: contactForm.mail,
        url: `${basePath}${asPath}`,
      }),
    });

    setSent({ status: true, hadMail: !!contactForm?.mail });
    setContactForm({ content: "", mail: "", hasWritten: false });
  };

  useEffect(() => {
    setSent({ status: false, hadMail: false });
    setContactForm({ content: "", mail: "", hasWritten: false });
    setContentError({ content: "", mail: "" });
  }, [asPath]);

  return (
    <>
      <div className="flex w-full max-w-md flex-col gap-8" data-theme="dark">
        {sent.status ? (
          <div>
            <Label spacing as="p">
              Melding er sendt til designsystemet
            </Label>
            <BodyLong>
              {`Takk skal du ha!${
                sent.hadMail ? " Vi svarer deg så fort som mulig." : ""
              }`}
            </BodyLong>
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
                minRows={2}
              />
              {contactForm.hasWritten && (
                <TextField
                  className={cl("inverted-textfield")}
                  label="Vi svarer til e-post (valgfritt)"
                  error={contentError.mail}
                  value={contactForm.mail}
                  autoComplete="work email"
                  onChange={(e) => {
                    setContactForm({
                      ...contactForm,
                      mail: e.target.value,
                      hasWritten: true,
                    });
                    e.target.value &&
                      isEmail(e.target.value) &&
                      setContentError({ ...contentError, mail: "" });
                  }}
                />
              )}
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
