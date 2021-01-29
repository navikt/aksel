import * as Icons from "@navikt/ds-icons";
import * as cls from "classnames";
import Lenkepanel from "nav-frontend-lenkepanel";
import { Undertittel } from "nav-frontend-typografi";
import React, { useEffect, useState } from "react";
import { renderToString } from "react-dom/server";
import { FigmaIcon, GithubLogo } from "../../components/assets/images/svg";
import { Download } from "@navikt/ds-icons";
import "./styles.less";
const JSZip = require("jszip");

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

  // Zips all icons and downloads them
  const downloadAllSvg = async () => {
    const element = document.createElement("a");
    var zip = new JSZip();

    for (const name in Icons) {
      const IconComp = Icons[name];
      zip.folder("Ikonpakke").file(`${name}.svg`, renderToString(<IconComp />));
    }

    const file = await zip.generateAsync({ type: "blob" });
    console.log(file.size);
    element.href = URL.createObjectURL(file);
    element.download = `NAV-ikonpakke.zip`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

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

      <button
        style={{ cursor: "pointer" }}
        className="lenkepanel lenkepanel--border resource-link iconSidebar__linkPanels"
        onClick={() => downloadAllSvg()}
        aria-label="Last ned alle ikoner"
      >
        <Undertittel>NAV-ikonpakke.zip</Undertittel>
        <span className="iconSidebar__save">
          <Download />
        </span>
      </button>
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
