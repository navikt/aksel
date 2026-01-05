import { useRef } from "react";
import { BodyLong, Button, Dialog, Search } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Dialog>
      <Dialog.Trigger>
        <Button>Åpne dialog</Button>
      </Dialog.Trigger>
      <Dialog.Popup initialFocusTo={inputRef}>
        <Dialog.Header withClosebutton={false}>
          <Dialog.Title>Dialog med autofocus</Dialog.Title>
          <Search ref={inputRef} label="Navn" variant="simple" />
        </Dialog.Header>
        <Dialog.Body>
          <BodyLong>
            Culpa aliquip ut cupidatat laborum minim quis ex in aliqua. Qui
            incididunt dolor do ad ut. Incididunt eiusmod nostrud deserunt duis
            laborum. Proident aute culpa qui nostrud velit adipisicing minim.
          </BodyLong>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.CloseTrigger>
            <Button>Lukk</Button>
          </Dialog.CloseTrigger>
        </Dialog.Footer>
      </Dialog.Popup>
    </Dialog>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { minHeight: "360px" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 10,
  desc: "Ved å bruke `initialFocusTo` kan du angi hvilket element som skal få fokus når dialogen åpnes. Dette er nyttig for skjemaer der du vil at brukeren skal kunne begynne å skrive med en gang.",
};
