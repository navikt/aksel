import styles from "@navikt/ds-css/dist/index.css?inline";
import { DatePicker, Provider, useDatepicker } from "@navikt/ds-react";
import React from "react";
import ReactDOM from "react-dom/client";

class CustomComponent extends HTMLElement {
  connectedCallback() {
    const rootElement = document.createElement("div");
    const appElement = document.createElement("div");
    rootElement.appendChild(appElement);
    this.attachShadow({ mode: "open" }).appendChild(rootElement);

    ReactDOM.createRoot(appElement).render(
      <Provider rootElement={rootElement}>
        <style>{styles}</style>
        <DateWrapper />
      </Provider>
    );
  }
}

const DateWrapper = () => {
  const { datepickerProps, inputProps, selectedDay } = useDatepicker({
    fromDate: new Date("Aug 23 2019"),
    onDateChange: console.log,
  });

  return (
    <div className="min-h-96">
      <DatePicker {...datepickerProps}>
        <DatePicker.Input {...inputProps} label="Velg dato" />
      </DatePicker>
      <div className="pt-4">{selectedDay && selectedDay.toDateString()}</div>
    </div>
  );
};

window.customElements.define("custom-opencomponent", CustomComponent);
