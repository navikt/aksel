import * as Icons from "@navikt/ds-icons";
import Knapp from "nav-frontend-knapper";
import Modal from "nav-frontend-modal";
import { Input, Checkbox } from "nav-frontend-skjema";
import { Systemtittel, Undertittel } from "nav-frontend-typografi";
import React, { useEffect, useState } from "react";
import { renderToString } from "react-dom/server";
import Code from "../code/Code";
import IconBox from "./IconBox";
import IconSidebar from "./IconSidebar";
import "./styles.less";

const beautify_html = require("js-beautify").html;

const IconPage = () => {
  useEffect(() => {
    Modal.setAppElement(".mainWrapper");
  }, []);

  const [filter, setFilter] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [modalIcon, setModalIcon] = useState("");
  const [checkedBox, setCheckedBox] = useState(0);

  const Icon = modalIcon && Icons[modalIcon];

  const filteredIcons = Object.keys(Icons)
    .filter((name) => name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
    .filter((name) => {
      switch (checkedBox) {
        case 1:
          return !name.endsWith("Fill");
        case 2:
          return name.endsWith("Fill");
        default:
          return true;
      }
    });

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

  const headline =
    filteredIcons.length === Object.keys(Icons).length
      ? `${Object.keys(Icons).length} ikoner`
      : filteredIcons.length !== 0
      ? `${filteredIcons.length} treff`
      : "Ingen ikoner funnet";

  return (
    <div className="iconpage">
      <label htmlFor="ikonsidefilter">
        <Systemtittel id="ikonsidetittel">
          Søk på NAV sine nye ikoner
        </Systemtittel>
      </label>
      <Undertittel className="iconpage__headlines iconpage__headlines--sidebar">
        Ressurser
      </Undertittel>
      <IconSidebar />
      <Input
        id="ikonsidefilter"
        aria-labelledby="ikonsidetittel"
        className="iconpage__input"
        onChange={(e) => setFilter(e.target.value)}
        autoComplete="on"
        placeholder={`Søk etter ${Object.keys(Icons).length} ikoner...`}
      />
      <div className="iconpage__checkboxWrapper">
        <Checkbox
          checked={checkedBox === 0}
          onClick={() => setCheckedBox(0)}
          label="All"
        />
        <Checkbox
          checked={checkedBox === 1}
          onClick={() => {
            checkedBox === 1 ? setCheckedBox(0) : setCheckedBox(1);
          }}
          label="Regular"
        />
        <Checkbox
          checked={checkedBox === 2}
          onClick={() => {
            checkedBox === 2 ? setCheckedBox(0) : setCheckedBox(2);
          }}
          label="Filled"
        />
      </div>
      <Undertittel className="iconpage__headlines">{headline}</Undertittel>

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
              <Icon
                className="iconpage__modalIcons--light"
                aria-label={`${modalIcon}-ikon mørk`}
                role="img"
              />
              <Icon
                className="iconpage__modalIcons--dark"
                aria-label={`${modalIcon}-ikon mørk`}
                role="img"
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default IconPage;
