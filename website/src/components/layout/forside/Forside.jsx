import React from "react";
import { Ingress, Sidetittel } from "nav-frontend-typografi";
import Card from "../../card/Card";
import { Star, Facilitet, HandsHeart, Like } from "@navikt/ds-icons";
import { NAVLogoDark } from "../../assets/images/svg";
import "./styles.less";
/* import Lenke from "nav-frontend-lenker"; */

const Forside = ({ ...props }) => (
  <div className="forside__wrapper">
    <div className="forside__intro">
      <div className="forside__logo-wrapper">
        <NAVLogoDark className="forside__logo" />
        {/* <span className="forside__logo-links">
          <Lenke href="#">Noe info</Lenke>
          <Lenke href="#">Noe annet</Lenke>
        </span>
       */}
      </div>
      <Sidetittel>Verktøykassen</Sidetittel>
      <Ingress>
        En samling ressurser fra ulike fagdisipliner, som sammen hjelper oss med
        å skape bedre, universelt tilgjengelige og sammenhengende produkter i
        NAV.
      </Ingress>
    </div>

    <nav className="card__wrapper" aria-label="Hovedmeny">
      <ol className="card__grid">
        <li>
          <Card
            content="Brand og visuell profil basert på vår visjon og våre verdier."
            title="Brand"
            link="https://identitet.nav.no/"
            icon={<Star focusable="false" />}
          />
        </li>
        <li>
          <Card
            content="Gjør det enklere å lage produkter i NAV."
            title="Designsystem"
            link="/designsystem"
            icon={
              <Facilitet focusable="false" className="icon-facilitet--align" />
            }
          />
        </li>
        <li>
          <Card
            content="Tjenester til brukerne må fungere for alle."
            title="Universell utforming"
            link="https://navikt.github.io/uu/"
            icon={<HandsHeart focusable="false" />}
          />
        </li>
        <li>
          <Card
            content="Metoder og prinsipper for tverrfaglig produktutvikling."
            title="God praksis"
            link="/god-praksis"
            icon={<Like focusable="false" />}
          />
        </li>
        <li>
          <Card
            content={
              <>
                <p>Hvordan vi utvikler sikker software i NAV.</p>
                <p>(Krever GitHub bruker i navikt org)</p>
              </>
            }
            title="Security Champions Playbook"
            link="https://improved-train-2f244007.pages.github.io/"
            icon={<HandsHeart focusable="false" />}
          />
        </li>
      </ol>
    </nav>
  </div>
);

export default Forside;
