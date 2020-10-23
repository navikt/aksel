import classnames from "classnames";
import Panel from "nav-frontend-paneler";
import { Select } from "nav-frontend-skjema";
import { Systemtittel, Undertittel } from "nav-frontend-typografi";
import React, { useEffect, useState } from "react";
import { useProps } from "../../useProps";
import Code from "../code/Code";
import Copy from "../copy/Copy";
import PropTable from "./PropTable";
import "./styles.less";

// import Alertstriper from "nav-frontend-alertstriper";
const ModuleBrowser = ({ context, ...props }) => {
  const modules = useProps(context.source);

  const [activeModule, setActiveModule] = useState<number>(0);

  useEffect(() => {
    setActiveModule(getInitialActiveModule());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getInitialActiveModule = () => {
    const urlComponentName = window.location.pathname.split("/")[2];
    const componentIndex = modules.findIndex(
      (module) => module.name.toLowerCase() === urlComponentName.toLowerCase()
    );
    const defaultIndex = modules.findIndex(
      (module) => module.name === context.defaultExport
    );

    return Math.max(0, defaultIndex, componentIndex);
  };

  const generateImportStatement = () => {
    const format =
      modules[activeModule].name === context.defaultExport
        ? modules[activeModule].name
        : `{ ${modules[activeModule].name} }`;
    return `import ${format} from '${context.name}';`;
  };

  return (
    modules.length !== 0 && (
      <div className="module-browser">
        <Systemtittel id="moduler">Moduler</Systemtittel>
        <Panel border className="module-browser__wrapper">
          <nav>
            <ul className="nav-list">
              {modules.map((module, i) => {
                if (module.name === undefined) return null;
                return (
                  <li key={module.name}>
                    <button
                      className={classnames(
                        "module-browser--reset-button",
                        "module-browser__button",
                        {
                          active: activeModule === i,
                        }
                      )}
                      onClick={(e) => setActiveModule(i)}
                    >
                      {module.name}
                      {module.name === context.defaultExport && (
                        <span>&nbsp;(default)</span>
                      )}
                    </button>
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
              <Copy copyText={generateImportStatement()} />
            </div>
            <Code className="language-jsx">{generateImportStatement()}</Code>

            <Undertittel>React props</Undertittel>

            <PropTable moduleProps={modules[activeModule]} />
          </div>
        </Panel>
      </div>
    )
  );
};

export default ModuleBrowser;
