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
  Provider,
  Tooltip,
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
        <CheckboxGroup legend="Legend" defaultValue={["tekst2"]}>
          <Checkbox value="tekst">Checkboxtekst</Checkbox>
          <Checkbox value="tekst2">Checkboxtekst</Checkbox>
        </CheckboxGroup>
        <Tooltip content="Skriv ut dokument">
          <Button>Tooltip</Button>
        </Tooltip>
        <ModalWrapper />
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
      <Modal portal open={isOpen} onClose={() => setIsOpen(false)}>
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

window.customElements.define("custom-component", CustomComponent);
