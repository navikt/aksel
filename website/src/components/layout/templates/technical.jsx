import React, { useState } from "react";

import Panel from "nav-frontend-paneler";
import Tabs from "nav-frontend-tabs";
import Lenke from "nav-frontend-lenker";
import { Systemtittel } from "nav-frontend-typografi";
import Hjelpetekst from "nav-frontend-hjelpetekst";

import { Bash, copyImport } from "../../code/Code";

import ModuleBrowser from "../../proptable/ModuleBrowser";

import "./styles.less";

const Technical = ({ pageContext, ...props }) => {
  const [activeToggle, setActiveToggle] = useState(0);

  const { version, name, peerDep, allDep } = pageContext;

  const deps = allDep;

  const installInstructions = [
    `npm install ${deps.join(" ")} --save`,
    `npm install ${deps
      .filter(
        (dep) => dep.indexOf("-style") !== -1 || dep.indexOf("-core") !== -1
      )
      .join(" ")} --save`,
    `yarn add ${deps.join(" ")}`,
    `yarn add ${deps
      .filter(
        (dep) => dep.indexOf("-style") !== -1 || dep.indexOf("-core") !== -1
      )
      .join(" ")}`,
  ];

  const getTabs = () => {
    if (name.indexOf("-style") !== -1) return [{ label: "Kun Less" }];
    return [{ label: "React + Less" }, { label: "Kun Less" }];
  };

  const tabs = getTabs();

  const renderInstallInstructions = () => (
    <div className="install-doc">
      <Systemtittel id="install">
        Installering
        <Hjelpetekst>
          De fleste komponentene våre består av en React-pakke og en tilhørende
          Less-pakke. React-pakkene er avhengige av Less-pakkene, men ikke
          motsatt. Det betyr at du kan velge å installere kun Less-pakkene hvis
          du f.eks. vil bruke et Javascript-rammeverk som er inkompatibelt med
          React - eller hvis du av andre grunner ønsker å håndtere HTML og
          Javascript selv.
        </Hjelpetekst>
      </Systemtittel>
      <Tabs tabs={tabs} onChange={(i, x) => setActiveToggle(x)} />
      <Panel border>
        <Bash onClick={(e) => copyImport(e, installInstructions[activeToggle])}>
          {installInstructions[activeToggle]}
        </Bash>
        <br />
        <Bash
          onClick={(e) => copyImport(e, installInstructions[activeToggle + 2])}
        >
          {installInstructions[activeToggle + 2]}
        </Bash>
      </Panel>
    </div>
  );

  return (
    <div className="componentGuidelinePage">
      <section className="section full">
        <Systemtittel id="npm-pakke">NPM-pakke</Systemtittel>
        <table className="tabell">
          <tbody>
            <tr>
              <th>Navn:</th>
              <td>
                <Lenke href={`https://www.npmjs.com/package/${name}`}>
                  {name}
                </Lenke>
              </td>
            </tr>
            <tr>
              <th>Siste versjon:</th>
              <td>
                <Lenke
                  href={`https://www.npmjs.com/package/${name}?activeTab=versions`}
                >
                  {version}
                </Lenke>
              </td>
            </tr>
            <tr>
              <th>Peer&nbsp;dependencies:</th>
              <td className="dependencies">
                {Object.keys(peerDep).map((dep) => [
                  <Lenke
                    key={dep}
                    href={`https://www.npmjs.com/package/${dep}`}
                  >
                    {dep}
                  </Lenke>,
                  " ",
                ])}
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <section className="section full">{renderInstallInstructions()}</section>
      <section className="section full">
        <ModuleBrowser context={pageContext} {...props} />
      </section>
    </div>
  );
};

export default Technical;
