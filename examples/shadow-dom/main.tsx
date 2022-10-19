import ReactDOM from "react-dom/client";
import { Button, Checkbox, CheckboxGroup } from "@navikt/ds-react";
import styles from "@navikt/ds-css/dist/index.css?inline";
import React from "react";

class CustomComponent extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement("span");
    this.attachShadow({ mode: "closed" }).appendChild(mountPoint);

    ReactDOM.createRoot(mountPoint).render(
      <>
        <style>{styles}</style>
        <Button>Click me!</Button>
        <CheckboxGroup legend="Legend" defaultValue={["tekst2"]}>
          <Checkbox value="tekst">Checkboxtekst</Checkbox>
          <Checkbox value="tekst2">Checkboxtekst</Checkbox>
        </CheckboxGroup>
      </>
    );
  }
}

window.customElements.define("custom-component", CustomComponent);
