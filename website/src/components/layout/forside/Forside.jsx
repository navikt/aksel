import React from "react";
import { Link } from "gatsby";

import { LenkepanelBase } from "nav-frontend-lenkepanel";
import { Ingress, Sidetittel, Systemtittel } from "nav-frontend-typografi";
import Card from "../../card/Card";
import "./styles.less";

const Forside = ({ ...props }) => (
  <div className="forside__wrapper">
    <div className="forside__intro">
      <Sidetittel>Forside Verktøykasse</Sidetittel>
      <Ingress>
        Deserunt nostrud magna aliquip excepteur elit est voluptate officia nisi
        dolor nostrud pariatur. Laborum incididunt veniam sunt et nulla proident
        irure irure sit duis excepteur sunt.
      </Ingress>
    </div>
    <div className="grid">
      <LenkepanelBase
        linkCreator={(props) => (
          <Link className="lenkepanel lenkepanel--border" to={props.href}>
            {props.children}
          </Link>
        )}
        href="/designsystem"
        border
      >
        <div>
          <Systemtittel>Designsystemet</Systemtittel>
          <p>
            Se forhåndsvisninger og kode-eksempler for alle våre komponenter.
          </p>
        </div>
      </LenkepanelBase>
      <Card
        content="Consectetur ad non dolore ipsum velit aute consectetur consequat ad."
        title="Brand"
        link="https://identitet.nav.no/"
      />
      <Card
        content="Elit quis proident aliquip sunt fugiat."
        title="Designsystem"
        link="/designsystem"
      />
      <Card
        content="Velit velit dolor ea eu pariatur veniam Lorem ex sit reprehenderit."
        title="Universell utforming"
        link="https://navikt.github.io/uu/"
      />
      <Card
        content="Ad minim id nulla labore cillum laborum non ipsum incididunt in eiusmod."
        title="Designsystem"
        link="/god-praksis"
      />
    </div>
  </div>
);

export default Forside;
