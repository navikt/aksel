import React from "react";
import classnames from "classnames";
import { Select } from "nav-frontend-skjema";

import "./styles.less";

export const ModuleBrowserNav = ({
  context,
  modules,
  activeModule,
  onClick,
}) => {
  return (
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
                onClick={() => onClick(i)}
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
  );
};
export const ModuleBrowserMobileNav = ({
  context,
  modules,
  activeModule,
  onClick,
}) => {
  return (
    <Select
      label="Velg modul"
      onChange={(e) => onClick(Number(e.target.value))}
      value={activeModule}
    >
      {modules.map((module, i) => {
        if (module.name === undefined) return null;
        return (
          <option key={module.name} value={i}>
            {module.name}
          </option>
        );
      })}
    </Select>
  );
};
