import React from "react";
import { Link } from "gatsby";

import { LenkepanelBase } from "nav-frontend-lenkepanel";
import { Systemtittel } from "nav-frontend-typografi";

import "./styles.less";

const GetStartedPage = ({ ...props }) => (
  <div className="grid">
    <LenkepanelBase
      linkCreator={(props) => (
        <Link className="lenkepanel lenkepanel--border" to={props.href}>
          {props.children}
        </Link>
      )}
      href="/components"
      border
    >
      <div>
        <Systemtittel>Komponenter</Systemtittel>
        <p>Se forhåndsvisninger og kode-eksempler for alle våre komponenter.</p>
      </div>
    </LenkepanelBase>
    <LenkepanelBase
      linkCreator={(props) => (
        <Link className="lenkepanel lenkepanel--border" to={props.href}>
          {props.children}
        </Link>
      )}
      href="/resources/icons"
      border
    >
      <div>
        <Systemtittel>Ikoner</Systemtittel>
        <p>NAV sine egne ikoner tilgjengelig i SVG og React.</p>
      </div>
    </LenkepanelBase>
    <LenkepanelBase
      linkCreator={(props) => (
        <Link className="lenkepanel lenkepanel--border" to={props.href}>
          {props.children}
        </Link>
      )}
      href="/resources/new-project"
      border
    >
      <div>
        <Systemtittel>Start et nytt prosjekt</Systemtittel>
        <p>
          Her finner du veiledning for hvordan du går frem for å starte et nytt
          prosjekt som bruker Designsystemet.
        </p>
      </div>
    </LenkepanelBase>
    <LenkepanelBase
      href="https://github.com/navikt/nav-frontend-moduler/"
      border
    >
      <div>
        <Systemtittel>Bidra med kode</Systemtittel>
        <p>
          Designsystemet er 100% open source på Github og vi setter alltid pris
          på hjelp og bidrag utenfra.
        </p>
      </div>
    </LenkepanelBase>
  </div>
);

export default GetStartedPage;
