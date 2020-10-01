import React from "react";

import { Systemtittel } from "NavFrontendModules/nav-frontend-typografi";
import Panel from "NavFrontendModules/nav-frontend-paneler";

import "./styles.less";

const NotFoundPage = () => (
  <article className="mainContent templatesWrapper">
    <section className="content">
      <Panel border id="not-found-panel">
        <Systemtittel>404: Siden finnes ikke</Systemtittel>
        <p>
          Hvis det burde være noe her så setter vi pris på om du gir oss
          beskjed.
        </p>
      </Panel>
    </section>
  </article>
);

export default NotFoundPage;
