import React, { useState, useEffect } from "react";
import { Systemtittel } from "nav-frontend-typografi";
import Panel from "nav-frontend-paneler";
import { Select } from "nav-frontend-skjema";
import { useProps } from "../../useProps";
import OverflowDetector from "../overflow-detector/OverflowDetector";
import "./styles.less";
import { Undertittel } from "nav-frontend-typografi";
import classnames from "classnames";
import { Flatknapp } from "nav-frontend-knapper";
import { CopyIcon } from "../assets/images/svg";
import Code from "../code/Code";
import Popover from "nav-frontend-popover";

import PropTable from "./PropTable";
// import Alertstriper from "nav-frontend-alertstriper";
const ModuleBrowser = ({ context, ...props }) => {
  const modules = useProps(context.source);

  console.log(modules);
  const [activeModule, setActiveModule] = useState<number>(0);
  const [anchor, setAnchor] = useState(undefined);
  const [defaultModule, setDefaultModule] = useState();

  // getInitialActiveModule = () => {
  //   const urlComponentName = window.location.pathname.split("/")[2];
  //   const componentIndex = Object.keys(this.modules).findIndex(
  //     (key) => key.toLowerCase() === urlComponentName
  //   );
  //   const defaultIndex = Object.keys(this.modules).findIndex(
  //     (key) => key === "default"
  //   );

  //   const index = Math.max(0, defaultIndex, componentIndex);

  //   return Object.keys(this.modules).find((module, i) => i === index);
  // };

  // console.log(props.location.pathname);
  const initialModule = () => {
    setActiveModule(0);
  };

  const generateImportStatement = () => {
    return `import { ${modules[activeModule].name} } from '${context.name}';`;
  };
  const copyContent = (e, content) => {
    setAnchor(anchor ? undefined : e.currentTarget);
    const textArea = document.createElement("textarea");
    textArea.value = content;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("Copy");
    textArea.remove();
  };

  return (
    <div className="module-browser">
      <Systemtittel id="moduler">Moduler</Systemtittel>
      <Panel border className="module-browser__wrapper">
        <nav>
          <ul className="nav-list">
            {modules.map((module, i) => {
              if (module.name === undefined) return null;
              return (
                <li key={module.name}>
                  <a
                    href={`#${module.name}`}
                    className={classnames({
                      active: activeModule === i,
                    })}
                    onClick={(e) => setActiveModule(i)}
                  >
                    {module.name}
                    {/* {moduleName === "default" && (
                      <span>
                        &nbsp;
                        {`(${moduleName})`}
                      </span>
                    )} */}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="module-browser__content">
          <Select
            label="Velg modul"
            onChange={(e) => setActiveModule(Number(e.target.value))}
            value={activeModule}
          >
            {modules.map((module, i) => {
              if (module.name === undefined) return null;
              return (
                <option key={module.name} value={i}>
                  {module.name}
                  {/* {moduleName === "default" && ` (${moduleName})`} */}
                </option>
              );
            })}
          </Select>

          <div className="module-browser--innline">
            <Undertittel className="first">Import</Undertittel>
            <Flatknapp
              className="module-browser__copyknapp"
              aria-label="Kopier import til utklippstavle"
              // eslint-disable-next-line max-len
              onClick={(e) => copyContent(e, generateImportStatement())}
              kompakt
            >
              <CopyIcon />
            </Flatknapp>
          </div>
          <Code className="language-jsx">{generateImportStatement()}</Code>
          <Popover
            orientering="over"
            ankerEl={anchor}
            onRequestClose={() => setAnchor(undefined)}
          >
            <p className="module-browser__popover"> Kopiert! </p>
          </Popover>
          <Undertittel>React props</Undertittel>
          <PropTable moduleProps={modules[activeModule]} />
        </div>
      </Panel>
    </div>
  );
};

export default ModuleBrowser;
