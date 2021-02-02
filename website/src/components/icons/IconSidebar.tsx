import * as cls from "classnames";
import Lenkepanel from "nav-frontend-lenkepanel";
import { Normaltekst, Undertekst, Undertittel } from "nav-frontend-typografi";
import React, { useEffect, useState } from "react";
import { FigmaIcon, GithubLogo } from "../../components/assets/images/svg";
import { Download } from "@navikt/ds-icons";
import "./styles.less";

const IconSidebar = () => {
  const [sidebar, setSidebar] = useState(true);

  const handleResize = () => {
    setSidebar(window.innerWidth > 1439);
  };

  useEffect(() => {
    setSidebar(window.innerWidth > 1439);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={cls({
        "table-of-contents": sidebar,
        iconSidebar__links: !sidebar,
      })}
    >
      <Undertittel className="iconPage__headlines iconPage__linkHeadlines">
        Nedlastning
      </Undertittel>
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
