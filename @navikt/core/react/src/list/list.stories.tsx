import {
  BabyChangingRoom,
  Braille,
  Cognition,
  Refresh,
} from "@navikt/ds-icons";
import { Meta } from "@storybook/react";
import React from "react";
import { List } from "..";

export default {
  title: "ds-react/List",
  component: List,
} as Meta;

export const Default = {
  render: () => {
    return (
      <List>
        <List.Item title="Tittel på punktet">
          Beskrivelse på punktet i lista. Prøv å hold den kort og konsis.
        </List.Item>
        <List.Item title="Enda en tittel på punktet">
          Beskrivelse på punktet i lista. Prøv å hold den kort og konsis.
        </List.Item>
        <List.Item title="Siste tittel på punktet">
          Beskrivelse på punktet i lista. Prøv å hold den kort og konsis.
        </List.Item>
      </List>
    );
  },
};

export const Ordered = {
  render: () => {
    return (
      <List as="ol">
        <List.Item title="Tittel på punktet">
          Beskrivelse på punktet i lista. Prøv å hold den kort og konsis.
        </List.Item>
        <List.Item title="Enda en tittel på punktet">
          Beskrivelse på punktet i lista. Prøv å hold den kort og konsis.
        </List.Item>
        <List.Item title="Siste tittel på punktet">
          Beskrivelse på punktet i lista. Prøv å hold den kort og konsis.
        </List.Item>
      </List>
    );
  },
};

export const WithHeading = {
  render: () => {
    return (
      <List
        title="Tittel på listen 🚀"
        description="Dette er en beskrivelse på hva denne listen inneholder"
      >
        <List.Item title="Tittel på punktet">
          <p style={{ margin: "0" }}>
            Beskrivelsen på punkter er nærmere forklart <a href="/">her</a>
          </p>
        </List.Item>
        <List.Item title="Tittel på punktet">
          <p style={{ margin: "0" }}>
            Beskrivelsen på punkter er nærmere forklart <a href="/">her</a>
          </p>
        </List.Item>
        <List.Item title="Tittel på punktet">
          <p style={{ margin: "0" }}>
            Beskrivelsen på punkter er nærmere forklart <a href="/">her</a>
          </p>
        </List.Item>
      </List>
    );
  },
};

export const Icons = {
  render: () => {
    return (
      <List>
        <List.Item title="Tittel på punktet" icon={<Braille />}>
          <p style={{ margin: "0" }}>
            Beskrivelsen på punkter er nærmere forklart <a href="/">her</a>
          </p>
        </List.Item>
        <List.Item title="Tittel på punktet" icon={<Cognition />}>
          <p style={{ margin: "0" }}>
            Beskrivelsen på punkter er nærmere forklart <a href="/">her</a>
          </p>
        </List.Item>
        <List.Item icon={<BabyChangingRoom />}>
          <p style={{ margin: "0" }}>
            Beskrivelsen på punkter er nærmere forklart <a href="/">her</a>
          </p>
        </List.Item>
        <List.Item icon={<Refresh />}>
          <p style={{ margin: "0" }}>
            Beskrivelsen på punkter er nærmere forklart <a href="/">her</a>
          </p>
        </List.Item>
      </List>
    );
  },
};
