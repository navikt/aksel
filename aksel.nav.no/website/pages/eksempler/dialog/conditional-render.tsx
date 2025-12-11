import { useState } from "react";
import { BodyLong, Button, Dialog } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [data, setData] = useState<{ name: string; email: string } | null>(
    null,
  );

  const openDialog = (id: string) => {
    setSelectedId(id);
    setData({ name: "Ola Nordmann", email: "ola@example.com" });
  };

  const handleOpenChangeComplete = (newOpen: boolean) => {
    if (!newOpen) {
      /* Nullstill data etter at lukkanimasjonen er ferdig */
      setData(null);
    }
  };

  const open = selectedId !== null;

  return (
    <div>
      <Button
        onClick={() => openDialog("user-1")}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? "dialog-popup-controlled-example" : undefined}
      >
        Vis brukerdetaljer
      </Button>

      <Dialog
        open={open}
        onOpenChange={(newOpen) => !newOpen && setSelectedId(null)}
        onOpenChangeComplete={handleOpenChangeComplete}
      >
        <Dialog.Popup>
          {data && (
            <>
              <Dialog.Header>
                <Dialog.Title>{`${data.name}`}</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <BodyLong>Navn: {data.name}</BodyLong>
                <BodyLong>E-post: {data.email}</BodyLong>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.CloseTrigger>
                  <Button>Lukk</Button>
                </Dialog.CloseTrigger>
              </Dialog.Footer>
            </>
          )}
        </Dialog.Popup>
      </Dialog>
    </div>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 15,
  desc: "Vi anbefaler å alltid rendre dialog-elementet, siden Dialog.Popup returnerer null så lenge dialogen er lukket. Dette sikrer at animasjoner for åpning og lukking av dialogen fungerer som forventet.",
};
