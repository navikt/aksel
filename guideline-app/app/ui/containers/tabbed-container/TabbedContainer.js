import React from 'react';
import { withRouter, Router } from 'react-router';

// import routeConfig, { flattenedPaths } from './../../../utils/routing/routes.config';
import { getFlattenedPaths } from './../../../utils/routing/routes.utils';

import Tabs from 'NavFrontendModules/nav-frontend-tabs';

class TabbedContainer extends React.Component {
    constructor(props){
        super(props);

        console.log(getFlattenedPaths());

        const currentPath = this.props.history.location.pathname;
        this.basePath = getFlattenedPaths().reverse().find(path => currentPath.indexOf(path) !== -1);

        if (currentPath === this.basePath) {
            this.state = {
                activeTab: 0
            };
        } else {
            const lastCurrentPathFragment = currentPath.split('/').slice(-1).pop();
            const matchingTabIndex = this.props.tabs.findIndex(tab => tab['id'] === lastCurrentPathFragment);

            console.log(matchingTabIndex);

            this.state = {
                activeTab: matchingTabIndex || 0
            };
        }

        // console.log(lastCurrentPathFragment, basePath, currentPath);

        // let hash = (window.location.hash) ? window.location.hash.split('?')[1] : undefined ;
        //     // hash = (hash.indexOf('#'))

        // const hashTabIndex = this.props.tabs.findIndex(tab => tab['id'] === hash);

        // this.defaultAktiv = (hashTabIndex !== -1) ? hashTabIndex : 0;
        // this.state = {
        //     activeContent: this.props.tabs[this.defaultAktiv].content
        // };
    }

    changeTab = (index) => {
        const tabId = this.props.tabs[index]['id'] || '';

        // let newPath = this.basePath.split('/').push()

        // window.history.pushState(null, null, `?${tabId}`);

        this.setState({
            activeTab: index
        });
    }

    render(){
        const content = this.props.tabs[this.state.activeTab].content;

        console.log(this.props.tabs);
        
        return (
            <React.Fragment>
                <div className="tabsContainer tabsContainer--fullWidth">
                    <div className="tabsContainer__inner">
                        <Tabs
                            defaultAktiv={this.state.activeTab}
                            onChange={(e, i) => this.changeTab(i)}
                            tabs={this.props.tabs.map((tab) => ({ label: tab.label }))}
                        />
                    </div>
                </div>
                <content />
            </React.Fragment>
        );
    }
}

export default withRouter(TabbedContainer);