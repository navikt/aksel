import * as cls from "classnames";
import Lenkepanel from "nav-frontend-lenkepanel";
import { Normaltekst, Undertittel } from "nav-frontend-typografi";
import React, { useEffect, useState } from "react";
import { FigmaIcon, GithubLogo } from "../../../components/assets/svg";
import { Download } from "@navikt/ds-icons";
import "./styles.less";

const IconSidebar = () => {
  return (
    <div className="iconSidebar__links">
      <Undertittel>Nedlastning</Undertittel>
      <a
        style={{ cursor: "pointer" }}
        className="lenkepanel lenkepanel--border resource-link iconSidebar__linkPanels"
        href="/NAV-ikonpakke-png.zip"
        aria-label="Last ned alle ikoner i png format"
      >
        <Undertittel>
          NAV-ikonpakke-png{" "}
          <Normaltekst>
            128px og 256px er ment for digitale presentasjoner
          </Normaltekst>
        </Undertittel>
        <span className="iconSidebar__save">
          <Download />
        </span>
      </a>
      <a
        style={{ cursor: "pointer" }}
        className="lenkepanel lenkepanel--border resource-link iconSidebar__linkPanels"
        href="/NAV-ikonpakke-svg.zip"
        aria-label="Last ned alle ikoner i png format"
      >
        <Undertittel>NAV-ikonpakke-svg</Undertittel>
        <span className="iconSidebar__save">
          <Download />
        </span>
      </a>
      <Undertittel className="iconPage__headlines iconPage__linkHeadlines">
        Ressurser
      </Undertittel>
      <Lenkepanel
        className="resource-link iconSidebar__linkPanels"
        href="https://www.figma.com/proto/UmEVH3pZ71uJPsSz9ilP3Y/NAV-ikoner-2.1-Figma-i-test?node-id=241%3A696&scaling=min-zoom"
        border
        tittelProps="undertittel"
      >
        <FigmaIcon focusable={false} />
        Ikonbibliotek i Figma (Nytt)
      </Lenkepanel>

      <Lenkepanel
        className="resource-link iconSidebar__linkPanels"
        href="https://www.figma.com/file/3AjAxeQP4uMFgqSazKXxOh/NAV-Ikonbiblioteket-Streamline"
        border
        tittelProps="undertittel"
      >
        <FigmaIcon focusable={false} />
        Streamline-ikoner i Figma (utdatert)
      </Lenkepanel>

      <Lenkepanel
        className="resource-link iconSidebar__linkPanels"
        href="https://github.com/navikt/nav-frontend-ikoner-backend/tree/master/src/main/resources/static/api/icons"
        border
        tittelProps="undertittel"
      >
        <GithubLogo />
        Streamline-ikoner (utdatert)
      </Lenkepanel>
    </div>
  );
};

export default IconSidebar;
