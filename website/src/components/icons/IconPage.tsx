import * as Icons from "@navikt/ds-icons";
import { List, System } from "@navikt/ds-icons";
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

  const [openModal, setOpenModal] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<MetaType>(null);
  const [filter, setFilter] = useState("");
  const [checkedBox, setCheckedBox] = useState(0);
  const [listView, setListView] = useState(0);

  const [meta, setMeta] = useState([...metadata]);

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
            icon.visible = !icon.name.endsWith("Filled");
            break;
          case 2:
            icon.visible = icon.name.endsWith("Filled");
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

  const generateList = () => {
    return !listView ? (
      generateCategories().map((category) => {
        return (
          checkIfVisible(category) && (
            <div key={`${category.category}`}>
              <Undertittel className="iconPage__headlines iconPage__headlines--fadein">
                {category.category}
              </Undertittel>
              <div className="iconPage__icons">
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
      })
    ) : (
      <div className="iconPage__icons">
        {meta.map(
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
    );
  };

  const Icon = selectedIcon && Icons[selectedIcon.name];

  return (
    <div className="iconPage">
      <label htmlFor="ikonsidefilter">
        <Systemtittel id="ikonsidetittel">Søk på NAV ikoner</Systemtittel>
      </label>
      <Undertittel className="iconPage__headlines iconPage__headlines--sidebar">
        Ressurser
      </Undertittel>
      <IconSidebar />

      <Input
        id="ikonsidefilter"
        aria-labelledby="ikonsidetittel"
        onChange={(e) => setFilter(e.target.value)}
        autoComplete="off"
        placeholder={`Søk etter ${Object.keys(Icons).length} ikoner...`}
      />

      <span className="iconPage__checkboxes">
        <Checkbox
          checked={checkedBox === 1}
          onChange={() => {
            checkedBox === 1 ? setCheckedBox(0) : setCheckedBox(1);
          }}
          label="Outline"
          aria-label={
            checkedBox === 1 ? "Vis alle ikoner" : "Vis bare outline ikoner"
          }
        />
        <Checkbox
          checked={checkedBox === 2}
          onChange={() => {
            checkedBox === 2 ? setCheckedBox(0) : setCheckedBox(2);
          }}
          label="Filled"
          aria-label={
            checkedBox === 2 ? "Vis alle ikoner" : "Vis bare filled ikoner"
          }
        />
      </span>
      <span className="iconPage__viewSelect">
        <Undertittel className="iconPage__headlines">{headline()}</Undertittel>
        <span>
          <Knapp
            kompakt
            mini
            onClick={() => setListView(0)}
            type={listView ? "flat" : "standard"}
            aria-label="Vis ikoner med kategorier"
          >
            <List />
          </Knapp>
          <Knapp
            kompakt
            mini
            onClick={() => setListView(1)}
            type={listView ? "standard" : "flat"}
            aria-label="Vis ikoner uten kategorier"
          >
            <System />
          </Knapp>
        </span>
      </span>

      {generateList()}

      {selectedIcon && (
        <Modal
          className="iconPage__modal"
          isOpen={openModal}
          closeButton={true}
          onRequestClose={() => handleModalClose()}
          contentLabel="Modal for ikon-visning"
        >
          <div>
            <Systemtittel>{selectedIcon.name}</Systemtittel>
            <Knapp
              kompakt
              onClick={() => downloadSvg()}
              style={{ textTransform: "none" }}
            >
              {`Last ned ${selectedIcon.name}.svg`}
            </Knapp>
            <Undertittel className="iconPage__headlines">React</Undertittel>
            <Code popupUnder className="language-jsx">
              {`import { ${selectedIcon.name} } from '@navikt/ds-icons'`}
            </Code>
            <Undertittel className="iconPage__headlines">SVG</Undertittel>
            <Code popupUnder className="language-jsx iconPage__modalSvg">
              {`${beautify_html(renderToString(<Icon />))}`}
            </Code>
            <span className="iconPage__modalIcons">
              <Icon
                className="iconPage__modalIcons--light"
                aria-label={`${selectedIcon.name}-ikon mørk`}
                role="img"
              />
              <Icon
                className="iconPage__modalIcons--dark"
                aria-label={`${selectedIcon.name}-ikon mørk`}
                role="img"
              />
            </span>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default IconPage;
