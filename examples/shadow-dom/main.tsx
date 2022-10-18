import ReactDOM from "react-dom/client";
import { Button } from "@navikt/ds-react";
import styles from "@navikt/ds-css/dist/index.css?inline";

class CustomComponent extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement("span");
    this.attachShadow({ mode: "closed" }).appendChild(mountPoint);

    ReactDOM.createRoot(mountPoint).render(
      <>
        <style>{styles}</style>
        <Button>Click me!</Button>
      </>
    );
  }
}

window.customElements.define("custom-component", CustomComponent);
