import React from 'react';

import Tabs from 'NavFrontendModules/nav-frontend-tabs';

class TabbedContainer extends React.Component {
    constructor(props){
        super(props);

        const hash = (window.location.hash) ? window.location.hash.split('#')[1] : undefined ;
        const hashTabIndex = this.props.tabs.findIndex(tab => tab['id'] === hash);

        this.defaultAktiv = (hashTabIndex !== -1) ? hashTabIndex : 0;
        this.state = {
            activeContent: this.props.tabs[this.defaultAktiv].content
        };
    }

    changeTab = (index) => {
        const hash = this.props.tabs[index]['id'] || '';
        window.history.pushState(null, null, `#${hash}`);

        this.setState({
            activeContent: this.props.tabs[index].content
        });
    }

    render(){
        return (
            <React.Fragment>
                <div className="tabsContainer tabsContainer--fullWidth">
                    <Tabs
                        defaultAktiv={this.defaultAktiv}
                        onChange={(e, i) => this.changeTab(i)}
                        tabs={this.props.tabs.map((tab) => ({ label: tab.label }))}
                    />
                </div>
                <this.state.activeContent { ...this.props } />
            </React.Fragment>
        );
    }
}

export default TabbedContainer;