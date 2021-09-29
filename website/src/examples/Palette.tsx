import React, { useEffect, useState } from "react";

import Alertstripe from "nav-frontend-alertstriper";
import {
  Systemtittel,
  Undertittel,
  Ingress,
  Undertekst,
  Normaltekst,
} from "nav-frontend-typografi";

import Modal from "nav-frontend-modal";
import vars from "nav-frontend-core";

import ColorSample from "../components/colors/ColorSample";
import ColorPalette from "../components/colors/ColorPalette";
import ContrastSample from "../components/colors/ContrastSample";

const Palette = () => {
  const [activeColor, setActiveColor] = useState(undefined);

  useEffect(() => {
    Modal.setAppElement(".mainWrapper");
  }, []);

  const renderModalContent = () => (
    <div id="color-modal">
      <Systemtittel>{activeColor.name}</Systemtittel>
      <div
        className="color-banner"
        style={{ background: activeColor.color.hex() }}
      />
      <section className="section">
        <Undertittel>Fargeverdier</Undertittel>
        <div className="color-values">
          <div className="color-value-pair">
            <Undertekst>Hex:</Undertekst>
            <span>{activeColor.color.hex()}</span>
          </div>
          <div className="color-value-pair">
            <Undertekst>RGB:</Undertekst>
            <span>{`${activeColor.color
              .rgb()
              .round()
              .array()
              .join(", ")}`}</span>
          </div>
          <div className="color-value-pair">
            <Undertekst>CMYK:</Undertekst>
            <span>{`${activeColor.color
              .cmyk()
              .round()
              .array()
              .join(", ")}`}</span>
          </div>
          <div className="color-value-pair">
            <Undertekst>HSL:</Undertekst>
            <span>{`${activeColor.color
              .hsl()
              .round()
              .array()
              .join(", ")}`}</span>
          </div>
        </div>
      </section>
      <section className="section">
        <Undertittel>Kontrast</Undertittel>
        <ContrastSample
          label="Mot svart:"
          foreground={vars.navMorkGra}
          background={activeColor.color.hex()}
        />
        <ContrastSample
          label="Mot hvit:"
          foreground={vars.white}
          background={activeColor.color.hex()}
        />
        <ContrastSample
          label="Mot lys grå:"
          foreground={vars.navLysGra}
          background={activeColor.color.hex()}
        />
        <ContrastSample
          label="Mot NAV blå:"
          foreground={vars.navBla}
          background={activeColor.color.hex()}
        />
      </section>
    </div>
  );

  return (
    <React.Fragment>
      <Modal
        className="color-modal-outer"
        contentLabel="Beskrivelse av farge"
        isOpen={activeColor !== undefined}
        onRequestClose={() => setActiveColor(undefined)}
        closeButton
      >
        {activeColor && renderModalContent()}
      </Modal>

      <section className="section">
        <Systemtittel id="hovedfarger">Hovedfarger</Systemtittel>
        <Normaltekst>
          NAV har en fargepalett der rødt og grått er de førende fargene.
        </Normaltekst>

        <div className="color-group">
          <ColorSample
            name="@navRod"
            color={vars.navRod}
            onClick={(color) => setActiveColor(color)}
          />
        </div>

        <div className="color-group">
          <ColorSample
            name="@navMorkGra"
            color={vars.navMorkGra}
            onClick={(color) => setActiveColor(color)}
          />
          <ColorSample
            name="@navGra80"
            color={vars.navGra80}
            onClick={(color) => setActiveColor(color)}
          />
          <ColorSample
            name="@navGra60"
            color={vars.navGra60}
            onClick={(color) => setActiveColor(color)}
          />
          <ColorSample
            name="@navGra40"
            color={vars.navGra40}
            onClick={(color) => setActiveColor(color)}
          />
          <ColorSample
            name="@navGra20"
            color={vars.navGra20}
            onClick={(color) => setActiveColor(color)}
          />
          <ColorSample
            name="@navLysGra"
            color={vars.navLysGra}
            onClick={(color) => setActiveColor(color)}
          />
        </div>
      </section>
      <section className="section">
        <Systemtittel id="bakgrunnsFarger">Bakgrunnsfarger</Systemtittel>
        <Alertstripe type="info">
          Vi ønsker at alle sider skal forholde seg til disse bakgrunnsfargene
          da dette fører til et mer helhetlig design for NAVs løsninger.
        </Alertstripe>
        <div className="color-group color-group--dark">
          <ColorSample
            name="@navGraBakgrunn"
            color={vars.navGraBakgrunn}
            onClick={(color) => setActiveColor(color)}
          />
          <ColorSample
            name="@navBakgrunn"
            color={vars.navBakgrunn}
            onClick={(color) => setActiveColor(color)}
          />
          <div className="color-description">
            <p>
              @navGraBakgrunn er ment til bruk på søknadssider.
              <br />
              @navBakgrunn er ment til bruk på informasjonssider.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <Systemtittel id="systemfarger">Systemfarger</Systemtittel>
        <Alertstripe type="info">
          Dette er farger som hovedsakelig er reservert for spesifikke
          funksjoner i systemet. Man bør unngå å bruke akkurat disse fargene til
          dekor eller pynt.
        </Alertstripe>
        <div className="color-group">
          <Ingress>Interaksjonsfarge</Ingress>
          <ColorSample
            name="@navBla"
            color={vars.navBla}
            onClick={(color) => setActiveColor(color)}
          />
          <div className="color-description">
            <p>
              Denne fargen er reservert av systemet for å indikere
              interaktivitet. Den brukes som tekstfarge på lenker, border- og
              bakgrunnsfarge på knapper og andre klikkbare elementer, og som
              fyll på klikkbare ikoner.
            </p>
          </div>
        </div>
        <div className="color-group">
          <Ingress>Fokusfarge</Ingress>
          <ColorSample
            name="@fokusFarge"
            color={vars.fokusFarge}
            onClick={(color) => setActiveColor(color)}
          />
          <div className="color-description">
            <p>
              Denne fargen er reservert av systemet for å indikere fokus.
              Interaktive elementer som får fokus blir vanligvis markert med en
              3px tykk outline med denne fargen.
            </p>
          </div>
        </div>
        <div className="color-group">
          <Ingress>Feedback: suksess</Ingress>
          <ColorSample
            name="@navGronn"
            color={vars.navGronn}
            onClick={(color) => setActiveColor(color)}
          />
          <ColorSample
            name="@navGronnLighten60"
            color={vars.navGronnLighten60}
            onClick={(color) => setActiveColor(color)}
          />
          <div className="color-description">
            <p>
              Disse fargene er reservert av systemet for å indikere positiv
              feedback, f.eks. som et resultat av en vellykket hendelse.
            </p>
          </div>
        </div>
        <div className="color-group">
          <Ingress>Feedback: feilmelding</Ingress>
          <ColorSample
            name="@redError"
            color={vars.redError}
            onClick={(color) => setActiveColor(color)}
          />
          <ColorSample
            name="@pinkErrorBg"
            color={vars.pinkErrorBg}
            onClick={(color) => setActiveColor(color)}
          />
          <div className="color-description">
            <p>
              Disse fargene er reservert av systemet for å indikere negativ
              feedback, f.eks. som et resultat av en mislykket hendelse.
            </p>
          </div>
        </div>
        <div className="color-group">
          <Ingress>Feedback: advarsel</Ingress>
          <ColorSample
            name="@navOransje"
            color={vars.navOransje}
            onClick={(color) => setActiveColor(color)}
          />
          <ColorSample
            name="@navOransjeLighten60"
            color={vars.navOransjeLighten60}
            onClick={(color) => setActiveColor(color)}
          />
          <div className="color-description">
            <p>
              Denne fargen er reservert av systemet for å gi forberedende
              feedback, f.eks. som en advarsel om at noe uønsket eller
              uforutsett kan forekomme.
            </p>
          </div>
        </div>
      </section>

      <section className="section full">
        <Systemtittel id="hele-paletten">Hele paletten</Systemtittel>
        <ColorPalette onClick={(color) => setActiveColor(color)} />
      </section>
    </React.Fragment>
  );
};

export default Palette;
