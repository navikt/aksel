import React from "react";
import Tabs from "nav-frontend-tabs";

class TabbedContainer extends React.Component {
  constructor(props) {
    super(props);
    this.defaultActive = 0;
  }

  render() {
    return (
      <React.Fragment>
        <div className="tabsContainer tabsContainer--fullWidth">
          <div className="tabsContainer__inner">
            <Tabs
              defaultAktiv={this.defaultActive}
              onChange={(e, i) => this.changeTab(i)}
              tabs={this.props.tabs.map((tab) => ({
                label: tab.label,
                key: tab.label,
              }))}
            />
          </div>
        </div>
        <this.state.activeContent {...this.props} />
      </React.Fragment>
    );
  }
}

export default TabbedContainer;
