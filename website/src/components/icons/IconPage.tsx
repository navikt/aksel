import * as Icons from "@navikt/ds-icons";
import { guid } from "nav-frontend-js-utils";
import Knapp from "nav-frontend-knapper";
import Modal from "nav-frontend-modal";
import { Input, Checkbox } from "nav-frontend-skjema";
import { Systemtittel, Undertittel } from "nav-frontend-typografi";
import React, { useEffect, useRef, useState } from "react";
import { renderToString } from "react-dom/server";
import Code from "../code/Code";
import IconBox from "./IconBox";
import IconSidebar from "./IconSidebar";
import "./styles.less";

const startCase = require("lodash.startcase");
const metadata = require("@navikt/ds-icons/figma-api/metadata.json");
const beautify_html = require("js-beautify").html;

interface CategoryType {
  category: string;
  icons: MetaType[];
}

interface MetaType {
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  pageName: string;
  visible?: boolean;
}

const IconPage = () => {
  useEffect(() => {
    Modal.setAppElement(".mainWrapper");
  }, []);

  const [filter, setFilter] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [checkedBox, setCheckedBox] = useState(0);
  const [selectedIcon, setSelectedIcon] = useState<MetaType>(null);

  const [meta, setMeta] = useState([]);

  const Icon = selectedIcon && Icons[selectedIcon.name];

  useEffect(() => {
    for (const icon of metadata) {
      icon.visible = true;
      icon.name = startCase(icon.name).replace(/\s/g, "");
      // Strip emojis
      icon.pageName = icon.pageName.replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
        ""
      );
    }
    setMeta([...metadata]);
  }, []);

  useEffect(() => {
    const data: MetaType[] = [...metadata];
    for (const icon of data) {
      icon.visible =
        icon.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1 ||
        icon.pageName.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      if (icon.visible) {
        switch (checkedBox) {
          case 0:
            break;
          case 1:
            icon.visible = !(
              icon.name.endsWith("Filled") || icon.name.endsWith("Solid")
            );
            break;
          case 2:
            icon.visible = icon.name.endsWith("Filled");
            break;
          case 3:
            icon.visible = icon.name.endsWith("Solid");
            break;
          default:
            break;
        }
      }
    }
    setMeta([...data]);
  }, [checkedBox, filter]);

  const generateCategories = () => {
    const categories: CategoryType[] = [];

    for (const icon of meta) {
      const i = categories.findIndex(
        ({ category }) => icon.pageName === category
      );
      i !== -1
        ? categories[i].icons.push(icon)
        : categories.push({ category: icon.pageName, icons: [icon] });
    }
    return categories.sort((a, b) => a.category.localeCompare(b.category));
  };

  const handleModal = (icon: MetaType) => {
    setOpenModal(true);
    setSelectedIcon(icon);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setSelectedIcon(null);
  };

  const downloadSvg = () => {
    const element = document.createElement("a");
    const file = new Blob([renderToString(<Icon />)], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${selectedIcon.name}.svg`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const checkIfVisible = (category: CategoryType) => {
    return category.icons.length === 0 ||
      category.icons.filter((icon) => icon.visible).length === 0
      ? false
      : true;
  };

  const headline = () => {
    const nVisible = meta.filter((icon) => icon.visible).length;
    if (Object.keys(Icons).length === nVisible) {
      return `${nVisible} ikoner`;
    } else if (nVisible > 0) {
      return `${nVisible} treff`;
    } else {
      return `Ingen ikoner funnet`;
    }
  };

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
          onChange={() => setCheckedBox(0)}
          label="All"
        />
        <Checkbox
          checked={checkedBox === 1}
          onChange={() => {
            checkedBox === 1 ? setCheckedBox(0) : setCheckedBox(1);
          }}
          label="Outline"
        />
        <Checkbox
          checked={checkedBox === 2}
          onChange={() => {
            checkedBox === 2 ? setCheckedBox(0) : setCheckedBox(2);
          }}
          label="Filled"
        />
        <Checkbox
          checked={checkedBox === 3}
          onChange={() => {
            checkedBox === 3 ? setCheckedBox(0) : setCheckedBox(3);
          }}
          label="Solid"
        />
      </div>
      <Undertittel className="iconpage__headlines">{headline()}</Undertittel>

      {generateCategories().map((category) => {
        return (
          checkIfVisible(category) && (
            <div key={`${category.category}`}>
              <Undertittel className="iconpage__headlines">
                {category.category}
              </Undertittel>
              <div className="iconpage__icons">
                {category.icons.map(
                  (icon) =>
                    icon.visible && (
                      <IconBox
                        key={`${icon.name}${icon.created_at}`}
                        iconObj={icon}
                        onClick={(icon: MetaType) => handleModal(icon)}
                      />
                    )
                )}
              </div>
            </div>
          )
        );
      })}
      {selectedIcon && (
        <Modal
          className="iconpage__modal"
          isOpen={openModal}
          closeButton={true}
          onRequestClose={() => handleModalClose()}
          contentLabel="Modal for icon-visning"
        >
          <div>
            <Systemtittel>{selectedIcon.name}</Systemtittel>
            <Knapp kompakt onClick={() => downloadSvg()}>
              Last ned SVG
            </Knapp>
            <Undertittel className="iconpage__headlines">React</Undertittel>
            <Code popupUnder className="language-jsx">
              {`import { ${selectedIcon.name} } from '@navikt/ds-icons'`}
            </Code>
            <Undertittel className="iconpage__headlines">SVG</Undertittel>
            <Code popupUnder className="language-jsx iconpage__modalSvg">
              {`${beautify_html(renderToString(<Icon />))}`}
            </Code>
            <div className="iconpage__modalIcons">
              <Icon
                className="iconpage__modalIcons--light"
                aria-label={`${selectedIcon.name}-ikon mørk`}
                role="img"
              />
              <Icon
                className="iconpage__modalIcons--dark"
                aria-label={`${selectedIcon.name}-ikon mørk`}
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
