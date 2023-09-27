import { Button, Modal, TextField } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";
import { useRef } from "react";

const Example = () => {
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <div className="py-12">
      <Button onClick={() => ref.current?.showModal()}>Åpne modal</Button>

      <Modal ref={ref} header={{ heading: "Skjema" }} width={400}>
        <Modal.Body>
          <form method="dialog" id="skjema" onSubmit={() => alert("onSubmit")}>
            <TextField label="Har du noen tilbakemeldinger?" />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button form="skjema">Send</Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => ref.current?.close()}
          >
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 4,
  desc: 'Det er ikke støtte for å ha <form> som direkte barn av <Modal>. Legg <form> enten rundt hele modalen eller inni <Modal.Body>. Sistnevnte gjør det mulig å sette method="dialog", som gjør at modalen lukkes ved submit.',
};
