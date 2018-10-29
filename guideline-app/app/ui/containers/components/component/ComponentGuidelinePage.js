import React from 'react';
// import PT from 'prop-types';
import {
    Ingress
} from './../../../../../../packages/node_modules/nav-frontend-typografi';
import Sample from './common/Sample';
import Etikett from './../../../../../../packages/node_modules/nav-frontend-etiketter';
import Tabs from './../../../../../../packages/node_modules/nav-frontend-tabs';
// import GuidelineContentForDesigners from './designers/GuidelineContent.designers';
// import GuidelineContentForDevelopers from './developers/GuidelineContent.developers';

import Overview from './tabs/Overview';
import Technical from './tabs/Technical';
import Accessibility from './tabs/Accessibility';
import Discussion from './tabs/Discussion';

import MdContent from './../../../components/md-content/MdContent';
import './styles.less';

class ComponentGuidelinePage extends React.Component {
    constructor(props) {
        super(props);

        this.tabs = [
            { 
                label: 'Oversikt', 
                content: Overview
            },
            { 
                label: 'Teknisk', 
                content: Technical
            },
            { 
                label: 'Tilgjengelighet', 
                content: Accessibility
            },
            { 
                label: 'Diskusjon', 
                content: Discussion
            }
        ];

        this.state = {
            activeContent: this.tabs[0].content
        };
    }

    renderIngress() {
        return (this.props.textData['ingress']) ? <Ingress tag="div"><this.props.textData.ingress.default /></Ingress> : null ;
    }

    render() {
        return (
            <div className="componentGuidelinePage">
                <div>
                    <div>
                        { this.renderIngress() }

                        <div className="tabsContainer tabsContainer--fullWidth">
                            <Tabs
                                onChange={(e, i) => this.setState({ activeContent: this.tabs[i].content })}
                                tabs={this.tabs.map((tab) => ({ label: tab.label }))}
                            />
                        </div>
                    </div>
                    <div className="componentGuidelinePage__content">
                        <this.state.activeContent { ...this.props } />
                    </div>
                </div>
            </div>
        );
    }
}

// ComponentGuidelinePage.propTypes = {
//     textData: PT.shape({
//         ingress: PT.string.isRequired
//     })
// };

// ComponentGuidelinePage.defaultProps = {
//     textData: {
//         ingress: '',
//         accessibility: '',
//         usage: ''
//     }
// };

export default ComponentGuidelinePage;
