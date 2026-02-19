import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import styles from "@navikt/ds-css/dist/index.css?inline";
import {
  ActionMenu,
  Button,
  Checkbox,
  CheckboxGroup,
  Modal,
  Popover,
  Provider,
  Tooltip,
  UNSAFE_Combobox,
} from "@navikt/ds-react";

class CustomComponent extends HTMLElement {
  connectedCallback() {
    const rootElement = document.createElement("div");
    const appElement = document.createElement("div");
    rootElement.appendChild(appElement);
    this.attachShadow({ mode: "closed" }).appendChild(rootElement);

    ReactDOM.createRoot(appElement).render(
      <Provider rootElement={rootElement}>
        <style>{styles}</style>
        <ActionMenuDemo />
        <Button>Click me!</Button>
        <CheckboxGroup legend="CheckboxGroup legend" defaultValue={["tekst2"]}>
          <Checkbox value="tekst">Checkboxtekst</Checkbox>
          <Checkbox value="tekst2">Checkboxtekst</Checkbox>
        </CheckboxGroup>
        <Tooltip content="Skriv ut dokument">
          <Button>Tooltip</Button>
        </Tooltip>
        <ModalWrapper />
        <PopoverDemo />
        <ComboboxDemo />
        <br />
      </Provider>,
    );
  }
}

const ModalWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open modal</Button>
      <Modal
        portal
        aria-label="Demo"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Modal.Body>modal content</Modal.Body>
      </Modal>
    </>
  );
};

const ActionMenuDemo = () => {
  return (
    <ActionMenu>
      <ActionMenu.Trigger>
        <Button
          variant="secondary-neutral"
          icon={<ChevronDownIcon aria-hidden />}
          iconPosition="right"
        >
          Meny
        </Button>
      </ActionMenu.Trigger>
      <ActionMenu.Content>
        <ActionMenu.Group label="Systemer og oppslagsverk">
          <ActionMenu.Item onSelect={console.info}>A-inntekt</ActionMenu.Item>
          <ActionMenu.Item onSelect={console.info}>
            Aa-registeret
          </ActionMenu.Item>
          <ActionMenu.Item onSelect={console.info}>Gosys</ActionMenu.Item>
          <ActionMenu.Item onSelect={console.info}>
            Modia Sykefraværsoppfølging
          </ActionMenu.Item>
          <ActionMenu.Item onSelect={console.info}>
            Modia Personoversikt
          </ActionMenu.Item>
        </ActionMenu.Group>
      </ActionMenu.Content>
    </ActionMenu>
  );
};

const PopoverDemo = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [openState, setOpenState] = useState(false);

  return (
    <>
      <Button
        ref={setAnchorEl}
        onClick={() => setOpenState(!openState)}
        aria-expanded={openState}
      >
        Åpne popover
      </Button>

      <Popover
        open={openState}
        onClose={() => setOpenState(false)}
        anchorEl={anchorEl}
      >
        <Popover.Content>Innhold her!</Popover.Content>
      </Popover>
    </>
  );
};

const ComboboxDemo = () => {
  return (
    <UNSAFE_Combobox label="Hva er din favorittfrukt?" options={options} />
  );
};

const options = [
  "ananas",
  "banan",
  "bringebær",
  "drue",
  "eple",
  "grapefrukt",
  "jordbær",
  "kiwi",
  "mandarin",
  "mango",
  "pære",
  "pasjonsfrukt",
  "vannmelon",
];

window.customElements.define("custom-component", CustomComponent);
