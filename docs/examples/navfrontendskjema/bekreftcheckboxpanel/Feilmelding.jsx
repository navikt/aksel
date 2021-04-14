import React, { useState } from "react";
import { BekreftCheckboksPanel } from "nav-frontend-skjema";

const BekreftCheckboksPanelExample = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <BekreftCheckboksPanel
      label="Jeg bekrefter at opplysningene jeg har gitt, er riktige og fullstendige"
      checked={isChecked}
      onChange={(e) => setIsChecked(e.target.checked)}
      feil={!isChecked && "Du må bekrefte dette før du kan sende inn søknaden."}
    >
      Jeg vet at jeg kan miste retten til sykepenger hvis opplysningene jeg gir,
      ikke er riktige eller fullstendige.
    </BekreftCheckboksPanel>
  );
};

export default BekreftCheckboksPanelExample;
