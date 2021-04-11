import React, { useState } from "react";
import { Knapp } from "nav-frontend-knapper";
import { EkspanderbartpanelBase } from "nav-frontend-ekspanderbartpanel";

const btnStyle = { marginRight: "0.5rem", marginBottom: "1rem" };

const EkspanderbartpanelEksempel = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Knapp onClick={() => setOpen(true)} style={btnStyle}>
        Åpne
      </Knapp>
      <Knapp onClick={() => setOpen(false)} style={btnStyle}>
        Lukke
      </Knapp>
      <EkspanderbartpanelBase
        tittel="Kan også klikke her"
        apen={open}
        onClick={() => setOpen((open) => !open)}
      >
        Alt innholdet ditt
      </EkspanderbartpanelBase>
    </div>
  );
};

export default EkspanderbartpanelEksempel;
