import React from 'react';
import { withRouter } from 'react-router-dom';

import Tabs, { Tab } from 'NavFrontendModules/nav-frontend-tabs';

import { getFlattenedPaths } from './../../../utils/routing/routes.utils';

class TabbedContainer extends React.Component {
    constructor(props) {
        super(props);

        const currentPath = this.props.history.location.pathname;
        this.basePath = getFlattenedPaths().reverse().find((path) => currentPath.indexOf(path) !== -1);
        this.defaultActive = 0;

        if (currentPath !== this.basePath) {
            const lastCurrentPathFragment = currentPath.split('/').slice(-1).pop();
            this.defaultActive = this.props.tabs.findIndex((tab) => tab.id === lastCurrentPathFragment);
        }

        if (this.defaultActive < 0) this.defaultActive = 0;

        this.state = {
            activeContent: this.props.tabs[this.defaultActive].content
        };
    }

    changeTab = (index) => {
        const tabId = this.props.tabs[index].id || '';
        const newPath = this.basePath.split('/').concat([tabId]).join('/');

        this.props.history.push(newPath);

        this.setState({
            activeContent: this.props.tabs[index].content
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="tabsContainer tabsContainer--fullWidth">
                    <div className="tabsContainer__inner">
                        <Tabs
                            defaultAktiv={this.defaultActive}
                            onChange={(e, i) => this.changeTab(i)}
                            >

                            {this.props.tabs.map((tab) => (<Tab key={tab.label} label={tab.label} />))}
                        </Tabs>
                    </div>
                </div>
                <this.state.activeContent {...this.props} />
            </React.Fragment>
        );
    }
}

export default withRouter(TabbedContainer);
