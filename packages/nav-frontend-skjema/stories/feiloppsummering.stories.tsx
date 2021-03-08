import React from "react";
import { Feiloppsummering } from "../src/index";
import { Meta } from "@storybook/react/types-6-0";

export default {
  title: "nav-frontend/Skjema/Feiloppsummering",
  component: Feiloppsummering,
} as Meta;

export const feiloppsummering = () => {
  return (
    <div
      style={{
        display: "grid",
        gridAutoRows: "auto",
        rowGap: "2rem",
        gridAutoColumns: "fit-content",
      }}
    >
      <Feiloppsummering
        tittel="For å gå videre må du rette opp følgende:"
        feil={[
          { skjemaelementId: "1", feilmelding: "Du må oppgi et navn" },
          { skjemaelementId: "2", feilmelding: "Du må oppgi en adresse" },
          { skjemaelementId: "3", feilmelding: "Du må oppgi et telefonnummer" },
        ]}
      />
    </div>
  );
};
