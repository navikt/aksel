import React from "react";
import Tabs from "nav-frontend-tabs";
import { navigate } from "gatsby";

const TabbedContainer = ({ tabs, defaultActive }) => (
  <React.Fragment>
    <div className="tabsContainer tabsContainer--fullWidth">
      <div className="tabsContainer__inner">
        <Tabs
          defaultAktiv={defaultActive === undefined ? 0 : defaultActive}
          onChange={(e, i) => navigate(tabs[i].path, { replace: true })}
          tabs={tabs.map((tab, i) => ({
            label: tab.label,
            key: tab.label,
            aktiv: defaultActive === i,
          }))}
        />
      </div>
    </div>
  </React.Fragment>
);

export default TabbedContainer;
