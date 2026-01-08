import { useState } from "react";
import { Button, Dialog, TextField, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [open, setOpen] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    alert(`Sendt inn: ${JSON.stringify(data)}`);
    setOpen(false);
  };

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? "dialog-popup-example" : undefined}
      >
        Åpne skjema
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Popup id="dialog-popup-example">
          <Dialog.Header>
            <Dialog.Title>Kontaktskjema</Dialog.Title>
            <Dialog.Description>
              Fyll ut skjemaet for å kontakte oss.
            </Dialog.Description>
          </Dialog.Header>
          <Dialog.Body>
            <form id="form" onSubmit={handleSubmit}>
              <VStack gap="space-8">
                <TextField label="Navn" name="name" />
                <TextField label="E-post" name="email" type="email" />
                <TextField label="Melding" name="message" />
              </VStack>
            </form>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.CloseTrigger>
              <Button type="button" variant="secondary">
                Avbryt
              </Button>
            </Dialog.CloseTrigger>
            <Button form="form">Send inn</Button>
          </Dialog.Footer>
        </Dialog.Popup>
      </Dialog>
    </div>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { minHeight: "360px" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 5,
};
