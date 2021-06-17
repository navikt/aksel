import React from "react";
import { Link } from "gatsby";

import { LenkepanelBase } from "nav-frontend-lenkepanel";
import { Systemtittel, Ingress } from "nav-frontend-typografi";

import "./styles.less";

const Forside = ({ ...props }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      width: "100%",
    }}
  >
    <div
      style={{
        margin: "3rem auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "1100px",
      }}
    >
      <Systemtittel>Forside Verktøykasse</Systemtittel>
      <Ingress>
        Deserunt nostrud magna aliquip excepteur elit est voluptate officia nisi
        dolor nostrud pariatur. Laborum incididunt veniam sunt et nulla proident
        irure irure sit duis excepteur sunt. Incididunt aute nisi id sunt enim
        amet ut laboris eu adipisicing in fugiat fugiat minim.
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
      <LenkepanelBase href="https://identitet.nav.no/" border>
        <div>
          <Systemtittel>Branding</Systemtittel>
          <p>Branding identitet.nav.no</p>
        </div>
      </LenkepanelBase>
      <LenkepanelBase href="https://navikt.github.io/uu/" border>
        <div>
          <Systemtittel>Universell utforming</Systemtittel>
          <p>Universell utforming av NAVs digitale tjenester</p>
        </div>
      </LenkepanelBase>
    </div>
  </div>
);

export default Forside;
