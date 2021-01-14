import React from "react";
import Header from "../src/index";

export default {
  title: "@navikt/header",
  component: Header,
};

export const All = () => {
  return (
    <div>
      <h1>Enkel</h1>
      <Header
        title="Ola Normann"
        user={{ name: "Ola Normann", ident: "D12345" }}
      />

      <h1>Med children</h1>
      <Header
        title="Ola Normann"
        user={{ name: "Ola Normann", ident: "D12345" }}
      >
        <input placeholder="søkefelt" />
        <button>Button</button>
        <h3 style={{ color: "#fff" }}>
          Lorem et elit aliquip laborum quis proident.
        </h3>
      </Header>
    </div>
  );
};
