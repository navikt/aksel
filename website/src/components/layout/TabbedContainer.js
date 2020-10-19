import React from "react";
import Tabs from "nav-frontend-tabs";
import { navigate } from "gatsby";
import { guid } from "nav-frontend-js-utils";
const TabbedContainer = ({ tabs, defaultActive }) => (
  <React.Fragment>
    <div className="tabsContainer tabsContainer--fullWidth">
      <div className="tabsContainer__inner">
        <Tabs
          defaultAktiv={defaultActive === undefined ? 0 : defaultActive}
          onChange={(e, i) => navigate(tabs[i].path, { replace: true })}
          tabs={tabs.map((tab, i) => ({
            label: tab.label,
            key: guid(),
            aktiv: defaultActive === i,
          }))}
        />
      </div>
    </div>
  </React.Fragment>
);

export default TabbedContainer;
