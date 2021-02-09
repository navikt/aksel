import React, { useState } from "react";
import Panel from "nav-frontend-paneler";
import { Systemtittel, Undertittel } from "nav-frontend-typografi";
import { useProps } from "../../useProps";
import { Code } from "../code-preview/preview/Code";
import { ModuleBrowserMobileNav, ModuleBrowserNav } from "./ModuleBrowserNav";
import PropTable from "./PropTable";

const ModuleBrowser = ({ context }) => {
  const modules = useProps(context.source);

  const useExportName = (name: string) => {
    const [exportName, setExport] = useState<string>(
      name && name[0].toUpperCase() + name.slice(1)
    );
    const setExportName = (s: string) =>
      setExport(s && s[0].toUpperCase() + s.slice(1));

    return { exportName, setExportName };
  };

  const initialState = (): { index: number; name: string } => {
    let name: string, index: number;
    const urlComponentName = context.source
      .match(/\/.*\/(.*)\.overview/)[1]
      .toLowerCase();

    const cIndex = modules.findIndex(
      (module) => module.name.toLowerCase() === urlComponentName.toLowerCase()
    );
    const dIndex = modules.findIndex(
      (module) => module.name === context.defaultExport
    );
    index = Math.max(0, dIndex, cIndex);
    // In cases where a components have multiple exports from file and no default export (eks checkbox, radio)
    name =
      dIndex === -1 && cIndex === -1 && context.name === "nav-frontend-skjema"
        ? urlComponentName
        : modules[index]?.name || "";
    return { index, name };
  };

  const { exportName, setExportName } = useExportName(initialState().name);
  const [activeModule, setActiveModule] = useState<number>(
    initialState().index
  );

  const generateImportStatement = () => {
    const format =
      exportName === context.defaultExport ? exportName : `{ ${exportName} }`;
    return `import ${format} from '${context.name}';`;
  };

  const handlePropChange = (x: number) => {
    setActiveModule(x);
    setExportName(modules[x].name);
  };

  return (
    modules.length !== 0 && (
      <div className="module-browser">
        <Systemtittel id="moduler">Moduler</Systemtittel>
        <Panel border className="module-browser__wrapper">
          <ModuleBrowserNav
            context={context}
            modules={modules}
            onClick={handlePropChange}
            activeModule={activeModule}
          />
          <div className="module-browser__content">
            <ModuleBrowserMobileNav
              context={context}
              modules={modules}
              onClick={handlePropChange}
              activeModule={activeModule}
            />
            <div className="module-browser--innline">
              <Undertittel className="first">Import</Undertittel>
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
