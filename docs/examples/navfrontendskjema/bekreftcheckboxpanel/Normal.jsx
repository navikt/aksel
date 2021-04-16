import React, { useState } from "react";
import Lenke from "nav-frontend-lenker";
import { BekreftCheckboksPanel } from "nav-frontend-skjema";

const BekreftCheckboksPanelExample = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <BekreftCheckboksPanel
      label="Ja, jeg samtykker"
      checked={isChecked}
      onChange={(e) => setIsChecked(e.target.checked)}
    >
      For å komme videre må du gi oss lov til å hente inn og bruke opplysninger
      om deg.
      <Lenke href="#">
        Les om hvilke opplysninger vi henter og hvordan vi bruker dem.
      </Lenke>
    </BekreftCheckboksPanel>
  );
};

export default BekreftCheckboksPanelExample;
