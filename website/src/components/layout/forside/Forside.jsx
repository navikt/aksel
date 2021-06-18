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
        Verktøykassen er en samling ressurser fra ulike fagdisipliner, som
        sammen hjelper oss med å skape bedre, universelt tilgjengelige og mer
        sammenhengende brukeropplevelser i NAV.
      </Ingress>
    </div>

    <nav className="card__wrapper" aria-label="Hovedmeny">
      <ol className="card__grid">
        <li>
          <Card
            content="Consectetur ad non dolore ipsum velit aute consectetur consequat ad."
            title="Brand"
            link="https://identitet.nav.no/"
            icon={<Star focusable="false" />}
          />
        </li>
        <li>
          <Card
            content="Elit quis proident aliquip sunt fugiat."
            title="Designsystem"
            link="/designsystem"
            icon={
              <Facilitet focusable="false" className="icon-facilitet--align" />
            }
          />
        </li>
        <li>
          <Card
            content="Tjenester til befolkningen må fungere for alle som trenger dem."
            title="Universell utforming"
            link="https://navikt.github.io/uu/"
            icon={<HandsHeart focusable="false" />}
          />
        </li>
        <li>
          <Card
            content="Ad minim id nulla labore cillum laborum non ipsum incididunt in eiusmod."
            title="God praksis"
            link="/god-praksis"
            icon={<Like focusable="false" />}
          />
        </li>
      </ol>
    </nav>
  </div>
);

export default Forside;
