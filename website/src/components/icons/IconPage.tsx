import React, { useEffect, useState } from "react";
import { renderToString } from "react-dom/server";
import * as Icons from "@navikt/ds-icons";
import { Input } from "nav-frontend-skjema";
import Modal from "nav-frontend-modal";
import "./styles.less";
import IconBox from "./IconBox";
import Code from "../code/Code";
import Lenkepanel from "nav-frontend-lenkepanel";
import { Systemtittel, Undertittel } from "nav-frontend-typografi";
import { FigmaIcon } from "../../components/assets/images/svg";
import Knapp from "nav-frontend-knapper";

const beautify_html = require("js-beautify").html;
const JSZip = require("jszip");

const IconPage = () => {
  useEffect(() => {
    Modal.setAppElement(".mainWrapper");
  }, []);

  const [filter, setFilter] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [modalIcon, setModalIcon] = useState("");

  const Icon = modalIcon && Icons[modalIcon];

  const filteredIcons = Object.keys(Icons).filter(
    (name) => name.toLowerCase().indexOf(filter.toLowerCase()) !== -1
  );

  const handleModal = (name) => {
    setOpenModal(true);
    setModalIcon(name);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setModalIcon("");
  };

  const downloadSvg = () => {
    const element = document.createElement("a");
    const file = new Blob([renderToString(<Icon />)], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${modalIcon}.svg`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

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
    <div className="iconpage">
      <Input
        className="iconpage__input"
        label="Filter"
        description={filteredIcons.length + " ikoner matcher søket"}
        onChange={(e) => setFilter(e.target.value)}
        autoComplete="on"
      />
      <Lenkepanel
        className="resource-link iconpage__figma"
        href="https://www.figma.com/proto/UmEVH3pZ71uJPsSz9ilP3Y/NAV-ikoner-2.1-Figma-i-test?node-id=241%3A696&scaling=min-zoom"
        border
        tittelProps="undertittel"
      >
        <FigmaIcon focusable={false} />
        Ikon&shy;bibliotek i Figma
      </Lenkepanel>
      <Lenkepanel
        className="resource-link iconpage__figma"
        onClick={() => downloadAllSvg()}
        href="#"
        border
        tittelProps="undertittel"
      >
        Last ned ikonpakke (SVG)
      </Lenkepanel>

      <div className="iconpage__icons">
        {filteredIcons.map((name) => (
          <IconBox
            key={name}
            name={name}
            onClick={(name) => handleModal(name)}
          />
        ))}
      </div>
      {modalIcon !== "" && (
        <Modal
          className="iconpage__modal"
          isOpen={openModal}
          closeButton={true}
          onRequestClose={() => handleModalClose()}
          contentLabel="Modal for icon-visning"
        >
          <div>
            <Systemtittel>{modalIcon}</Systemtittel>
            <Knapp kompakt onClick={() => downloadSvg()}>
              Last ned SVG
            </Knapp>
            <Undertittel className="iconpage__headlines">React</Undertittel>
            <Code popupUnder className="language-jsx">
              {`import { ${modalIcon} } from '@navikt/ds-icons'`}
            </Code>
            <Undertittel className="iconpage__headlines">SVG</Undertittel>
            <Code popupUnder className="language-jsx iconpage__modalSvg">
              {`${beautify_html(renderToString(<Icon />))}`}
            </Code>
            <div className="iconpage__modalIcons">
              <Icon className="iconpage__modalIcons--light" />
              <Icon className="iconpage__modalIcons--dark" />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default IconPage;
