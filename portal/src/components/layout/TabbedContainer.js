import React from "react";
import Tabs from "nav-frontend-tabs";
import { navigate } from "gatsby";

const TabbedContainer = ({ tabs }) => (
  <React.Fragment>
    <div className="tabsContainer tabsContainer--fullWidth">
      <div className="tabsContainer__inner">
        <Tabs
          defaultAktiv={0}
          onChange={(e, i) => navigate(tabs[i].path, { replace: true })}
          tabs={tabs.map((tab) => ({
            label: tab.label,
            key: tab.label,
          }))}
        />
      </div>
    </div>
  </React.Fragment>
);

export default TabbedContainer;
