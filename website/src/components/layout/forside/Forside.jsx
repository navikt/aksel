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
    <div className="card__grid">
      <Card
        content="Consectetur ad non dolore ipsum velit aute consectetur consequat ad."
        title="Brand"
        link="https://identitet.nav.no/"
        icon={<Star />}
      />
      <Card
        content="Elit quis proident aliquip sunt fugiat."
        title="Designsystem"
        link="/designsystem"
        icon={<Facilitet className="icon-facilitet--align" />}
      />
      <Card
        content="Velit velit dolor ea eu pariatur veniam Lorem ex sit reprehenderit."
        title="Universell utforming"
        link="https://navikt.github.io/uu/"
        icon={<HandsHeart />}
      />
      <Card
        content="Ad minim id nulla labore cillum laborum non ipsum incididunt in eiusmod."
        title="God praksis"
        link="/god-praksis"
        icon={<Like />}
      />
    </div>
  </div>
);

export default Forside;
