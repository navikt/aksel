import React, { useState, useEffect } from "react";
import { Systemtittel } from "nav-frontend-typografi";
import Panel from "nav-frontend-paneler";
import { Select } from "nav-frontend-skjema";
import { useProps } from "../../useProps";
import OverflowDetector from "../overflow-detector/OverflowDetector";
import "./styles.less";
import { Undertittel } from "nav-frontend-typografi";

// import Alertstriper from "nav-frontend-alertstriper";
const PropTable = ({ context, ...props }) => {
  const modules = useProps(context.source);

  console.log(context);
  const [activeModule, setActiveModule] = useState();
  const [anchor, setAnchor] = useState(undefined);
  const [defaultModule, setDefaultModule] = useState();
  // activeModule: this.getInitialActiveModule(),

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
  const initialModule = () => {};
  return (
    <div className="module-browser">
      <Systemtittel id="moduler">Moduler</Systemtittel>
      <Panel border className="module-browser__wrapper">
        <nav>
          <ul className="nav-list">
            {/* {Object.keys(this.modules)
              .sort()
              .map((moduleName) => {
                const module = this.modules[moduleName];
                if (!module.__docgenInfo) return null;
                return (
                  <li key={module.__docgenInfo.displayName}>
                    <a
                      href={`#${module.__docgenInfo.displayName}`}
                      className={classnames({
                        active: this.state.activeModule === moduleName,
                      })}
                      onClick={(e) => this.setActiveModule(e, moduleName)}
                    >
                      {module.__docgenInfo.displayName}
                      {moduleName === "default" && (
                        <span>
                          &nbsp;
                          {`(${moduleName})`}
                        </span>
                      )}
                    </a>
                  </li>
                );
              })} */}
          </ul>
        </nav>
        <div className="module-browser__content">
          {/* <Select
            label="Velg modul"
            onChange={(e) => this.setActiveModule(null, e.target.value)}
            value={this.state.activeModule}
          >
            {Object.keys(this.modules)
              .sort()
              .map((moduleName) => {
                const module = this.modules[moduleName];
                if (!module.__docgenInfo) return null;
                return (
                  <option
                    key={module.__docgenInfo.displayName}
                    value={moduleName}
                  >
                    {module.__docgenInfo.displayName}
                    {moduleName === "default" && ` (${moduleName})`}
                  </option>
                );
              })}
          </Select> */}
          {/* <div className="module-browser--innline">
            <Undertittel className="first">Import</Undertittel>
            <Flatknapp
              className="module-browser__copyknapp"
              aria-label="Kopier import til utklippstavle"
              // eslint-disable-next-line max-len
              onClick={(e) =>
                this.copyContent(
                  e,
                  this.generateImportStatement(this.state.activeModule)
                )
              }
              kompakt
            >
              <CopyIcon />
            </Flatknapp>
          </div>
          <Code>{this.generateImportStatement(this.state.activeModule)}</Code>
          <Popover
            orientering="over"
            ankerEl={this.state.popoverAnchor}
            onRequestClose={() => this.setState({ popoverAnchor: undefined })}
          >
            <p className="module-browser__popover"> Kopiert! </p>
          </Popover> */}
          <Undertittel>React props</Undertittel>
        </div>
      </Panel>
    </div>
  );
};

export default PropTable;
