import { useState } from "react";
import { BodyLong, Button, Dialog, Skeleton } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [data, setData] = useState<{ name: string; email: string } | null>(
    null,
  );

  const openDialog = (id: string) => {
    setSelectedId(id);
    /* Simulerer datahenting */
    setTimeout(() => {
      setData({ name: "Ola Nordmann", email: "ola@example.com" });
    }, 1000);
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
        aria-controls={open ? "dialog-popup-example" : undefined}
      >
        Vis brukerdetaljer
      </Button>

      <Dialog
        open={selectedId !== null}
        onOpenChange={(newOpen) => !newOpen && setSelectedId(null)}
        onOpenChangeComplete={handleOpenChangeComplete}
      >
        <Dialog.Popup id="dialog-popup-example">
          <Dialog.Header>
            <Dialog.Title>Brukerdetaljer</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            {data ? (
              <>
                <BodyLong>Navn: {data.name}</BodyLong>
                <BodyLong>E-post: {data.email}</BodyLong>
              </>
            ) : (
              <>
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width="80%" />
              </>
            )}
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.CloseTrigger>
              <Button>Lukk</Button>
            </Dialog.CloseTrigger>
          </Dialog.Footer>
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
  index: 14,
  desc: "Åpne dialogen og last inn innholdet asynkront istedenfor å vente til alt innhold er klart. Dette kan forbedre brukeropplevelsen da siden føles raskere.",
};
