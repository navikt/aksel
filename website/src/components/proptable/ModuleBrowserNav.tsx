import React from "react";
import classnames from "classnames";
import { Select } from "nav-frontend-skjema";

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
          if (module.displayName === undefined) return null;
          return (
            <li key={module.displayName}>
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
                {module.displayName}
                {module.displayName === context.defaultExport && (
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
        if (module.displayName === undefined) return null;
        return (
          <option key={module.displayName} value={i}>
            {module.displayName}
          </option>
        );
      })}
    </Select>
  );
};
