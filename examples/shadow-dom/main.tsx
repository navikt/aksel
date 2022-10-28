import ReactDOM from "react-dom/client";
import {
  Provider,
  Button,
  Checkbox,
  CheckboxGroup,
  Modal,
  Tooltip,
} from "@navikt/ds-react";
import styles from "@navikt/ds-css/dist/index.css?inline";
import React, { useState } from "react";

class CustomComponent extends HTMLElement {
  connectedCallback() {
    const rootElement = document.createElement("div");
    const appElement = document.createElement("div");
    rootElement.appendChild(appElement);
    this.attachShadow({ mode: "closed" }).appendChild(rootElement);

    ReactDOM.createRoot(rootElement).render(
      <Provider rootElement={rootElement} appElement={appElement}>
        <style>{styles}</style>
        <Button>Click me!</Button>
        <CheckboxGroup legend="Legend" defaultValue={["tekst2"]}>
          <Checkbox value="tekst">Checkboxtekst</Checkbox>
          <Checkbox value="tekst2">Checkboxtekst</Checkbox>
        </CheckboxGroup>
        <ModalWrapper />
        <Tooltip content="Skriv ut dokument">
          <Button>yo!</Button>
        </Tooltip>
      </Provider>
    );
  }
}

const ModalWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open modal</Button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Content>modal content</Modal.Content>
      </Modal>
    </>
  );
};

window.customElements.define("custom-component", CustomComponent);
