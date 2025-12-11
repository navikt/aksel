import { useRef } from "react";
import { BodyLong, Button, Dialog, TextField } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const hasUnsavedChangesRef = useRef(false);

  const handleOpenChange = (nextOpen: boolean, event?: Event) => {
    if (!nextOpen && hasUnsavedChangesRef.current) {
      const confirmClose = window.confirm(
        "Du har ulagrede endringer. Er du sikker på at du vil lukke?",
      );
      if (!confirmClose) {
        event?.preventDefault();
      }
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <Dialog.Trigger>
        <Button>Åpne dialog</Button>
      </Dialog.Trigger>
      <Dialog.Popup>
        <Dialog.Header>
          <Dialog.Title>Skjema med ulagrede endringer</Dialog.Title>
        </Dialog.Header>
        <Dialog.Body>
          <BodyLong spacing>
            Skriv noe i feltet nedenfor og prøv å lukke dialogen. Du vil bli
            spurt om bekreftelse før dialogen lukkes.
          </BodyLong>
          <TextField
            label="Navn"
            onChange={(e) => {
              hasUnsavedChangesRef.current = e.target.value.length > 0;
            }}
          />
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.CloseTrigger>
            <Button
              onClick={() => {
                // Save changes
                hasUnsavedChangesRef.current = false;
              }}
            >
              Lagre
            </Button>
          </Dialog.CloseTrigger>
          <Dialog.CloseTrigger>
            <Button variant="secondary">Avbryt</Button>
          </Dialog.CloseTrigger>
        </Dialog.Footer>
      </Dialog.Popup>
    </Dialog>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 9,
  desc: "Ved `onOpenChange` kan du forhindre at dialogen lukkes basert på logikk.",
};
