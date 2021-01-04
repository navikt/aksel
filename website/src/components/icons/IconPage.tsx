import React, { useEffect, useState } from "react";
import * as cls from "classnames";
import * as Icons from "@navikt/ds-icons";
import { Input } from "nav-frontend-skjema";
import Modal from "nav-frontend-modal";
import "./styles.less";
import IconBox from "./IconBox";
import Code from "../code/Code";
import { Systemtittel } from "nav-frontend-typografi";

const IconPage = () => {
  useEffect(() => {
    Modal.setAppElement(".mainWrapper");
  }, []);

  const [filter, setFilter] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [modalIcon, setModalIcon] = useState("");

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

  const Icon = modalIcon && Icons[modalIcon];
  return (
    <div className="iconpage">
      <Input
        className="iconpage__input"
        bredde="XL"
        label="Filter"
        description={filteredIcons.length + " ikoner matcher søket"}
        onChange={(e) => setFilter(e.target.value)}
      />
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
            <Code className="language-jsx">{`import { ${modalIcon} } from '@navikt/ds-icons'`}</Code>
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
