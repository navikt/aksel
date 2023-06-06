import ReactDOM from "react-dom/client";
import {
  Provider,
  Button,
  Checkbox,
  CheckboxGroup,
  Modal,
  Tooltip,
  UNSAFE_DatePicker,
  UNSAFE_useDatepicker,
} from "@navikt/ds-react";
import styles from "@navikt/ds-css/dist/index.css?inline";
import React, { useState } from "react";

class CustomComponent extends HTMLElement {
  connectedCallback() {
    const rootElement = document.createElement("div");
    const appElement = document.createElement("div");
    rootElement.appendChild(appElement);
    this.attachShadow({ mode: "open" }).appendChild(rootElement);

    ReactDOM.createRoot(appElement).render(
      <Provider rootElement={rootElement} appElement={appElement}>
        <style>{styles}</style>
        <DateWrapper />
      </Provider>
    );
  }
}

const DateWrapper = () => {
  const { datepickerProps, inputProps, selectedDay } = UNSAFE_useDatepicker({
    fromDate: new Date("Aug 23 2019"),
    onDateChange: console.log,
  });

  return (
    <div className="min-h-96">
      <UNSAFE_DatePicker {...datepickerProps}>
        <UNSAFE_DatePicker.Input {...inputProps} label="Velg dato" />
      </UNSAFE_DatePicker>
      <div className="pt-4">{selectedDay && selectedDay.toDateString()}</div>
    </div>
  );
};

window.customElements.define("custom-opencomponent", CustomComponent);
