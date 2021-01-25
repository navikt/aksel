import React from "react";

import Alertstripe from "nav-frontend-alertstriper";
import {
  Systemtittel,
  Undertittel,
  Ingress,
  Undertekst,
  Normaltekst,
} from "nav-frontend-typografi";

import Modal from "nav-frontend-modal";

import ColorSample from "../colors/ColorSample";
import ColorPalette from "../colors/ColorPalette";
import ContrastSample from "../colors/ContrastSample";

class Palette extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeColor: undefined,
    };
  }

  componentDidMount() {
    Modal.setAppElement(".mainWrapper");
  }
  renderModalContent = () => (
    <div id="color-modal">
      <Systemtittel>{this.state.activeColor.name}</Systemtittel>
      <div
        className="color-banner"
        style={{ background: this.state.activeColor.color.hex() }}
      />
      <section className="section">
        <Undertittel>Fargeverdier</Undertittel>
        <div className="color-values">
          <div className="color-value-pair">
            <Undertekst>Hex:</Undertekst>
            <span>{this.state.activeColor.color.hex()}</span>
          </div>
          <div className="color-value-pair">
            <Undertekst>RGB:</Undertekst>
            <span>{`${this.state.activeColor.color
              .rgb()
              .round()
              .array()
              .join(", ")}`}</span>
          </div>
          <div className="color-value-pair">
            <Undertekst>CMYK:</Undertekst>
            <span>{`${this.state.activeColor.color
              .cmyk()
              .round()
              .array()
              .join(", ")}`}</span>
          </div>
          <div className="color-value-pair">
            <Undertekst>HSL:</Undertekst>
            <span>{`${this.state.activeColor.color
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
          foreground="#3E3832"
          background={this.state.activeColor.color.hex()}
        />
        <ContrastSample
          label="Mot hvit:"
          foreground="#ffffff"
          background={this.state.activeColor.color.hex()}
        />
        <ContrastSample
          label="Mot lys grå:"
          foreground="#E9E7E7"
          background={this.state.activeColor.color.hex()}
        />
        <ContrastSample
          label="Mot NAV blå:"
          foreground="#0067C5"
          background={this.state.activeColor.color.hex()}
        />
      </section>
    </div>
  );

  render() {
    return (
      <React.Fragment>
        <Modal
          className="color-modal-outer"
          isOpen={this.state.activeColor !== undefined}
          onRequestClose={() => this.setState({ activeColor: undefined })}
          closeButton
        >
          {this.state.activeColor && this.renderModalContent()}
        </Modal>

        <section className="section">
          <Systemtittel id="hovedfarger">Hovedfarger</Systemtittel>
          <Normaltekst>
            NAV har en fargepalett der rødt og grått er de førende fargene.
          </Normaltekst>

          <div className="color-group">
            <ColorSample
              name="@navRod"
              color="#c30000"
              onClick={(color) => this.setState({ activeColor: color })}
            />
          </div>

          <div className="color-group">
            <ColorSample
              name="@navMorkGra"
              color="#3E3832"
              onClick={(color) => this.setState({ activeColor: color })}
            />
            <ColorSample
              name="@navGra80"
              color="#59514B"
              onClick={(color) => this.setState({ activeColor: color })}
            />
            <ColorSample
              name="@navGra60"
              color="#78706A"
              onClick={(color) => this.setState({ activeColor: color })}
            />
            <ColorSample
              name="@navGra40"
              color="#B7B1A9"
              onClick={(color) => this.setState({ activeColor: color })}
            />
            <ColorSample
              name="@navGra20"
              color="#C6C2BF"
              onClick={(color) => this.setState({ activeColor: color })}
            />
            <ColorSample
              name="@navLysGra"
              color="#E9E7E7"
              onClick={(color) => this.setState({ activeColor: color })}
            />
          </div>
        </section>

        <section className="section">
          <Systemtittel id="systemfarger">Systemfarger</Systemtittel>
          <Alertstripe type="info">
            Dette er farger som hovedsakelig er reservert for spesifikke
            funksjoner i systemet. Man bør unngå å bruke akkurat disse fargene
            til dekor eller pynt.
          </Alertstripe>
          <div className="color-group">
            <Ingress>Interaksjonsfarge</Ingress>
            <ColorSample
              name="@navBla"
              color="#0067c5"
              onClick={(color) => this.setState({ activeColor: color })}
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
              color="#254B6D"
              onClick={(color) => this.setState({ activeColor: color })}
            />
            <div className="color-description">
              <p>
                Denne fargen er reservert av systemet for å indikere fokus.
                Interaktive elementer som får fokus blir vanligvis markert med
                en 3px tykk outline med denne fargen.
              </p>
            </div>
          </div>
          <div className="color-group">
            <Ingress>Feedback: suksess</Ingress>
            <ColorSample
              name="@navGronn"
              color="#06893A"
              onClick={(color) => this.setState({ activeColor: color })}
            />
            <ColorSample
              name="@navGronnLighten60"
              color="#9BD0B0"
              onClick={(color) => this.setState({ activeColor: color })}
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
              color="#BA3A26"
              onClick={(color) => this.setState({ activeColor: color })}
            />
            <ColorSample
              name="@pinkErrorBg"
              color="#F3E3E3"
              onClick={(color) => this.setState({ activeColor: color })}
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
              color="#FF9100"
              onClick={(color) => this.setState({ activeColor: color })}
            />
            <ColorSample
              name="@navOransjeLighten60"
              color="#FFD399"
              onClick={(color) => this.setState({ activeColor: color })}
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
          <ColorPalette
            onClick={(color) => this.setState({ activeColor: color })}
          />
        </section>
      </React.Fragment>
    );
  }
}

export default Palette;
