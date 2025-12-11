import { BodyLong, Button, Dialog } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <div>
      <Dialog>
        <Dialog.Trigger>
          <Button>Åpne dialog</Button>
        </Dialog.Trigger>
        <Dialog.Popup closeOnOutsideClick={false}>
          <Dialog.Header>
            <Dialog.Title>Klikk utenfor er deaktivert</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <BodyLong>
              Denne dialogen lukkes ikke når du klikker utenfor. Du må bruke
              lukkeknappen eller trykke Escape for å lukke den.
            </BodyLong>
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
  index: 13,
  desc: "Dialoger med viktige handlinger bør ikke kunne lukkes ved klikk utenfor. Eksempler på dette er alertdialoger eller skjemaer der brukeren kan miste data.",
};
