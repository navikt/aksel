import React from 'react';
import PT from 'prop-types';
import {
    Ingress
} from './../../../../../../packages/node_modules/nav-frontend-typografi';
import Sample from './common/Sample';
import Tabs from './../../../../../../packages/node_modules/nav-frontend-tabs';
// import GuidelineContentForDesigners from './designers/GuidelineContent.designers';
// import GuidelineContentForDevelopers from './developers/GuidelineContent.developers';

import Overview from './tabs/Overview';

import MdContent from './../../../components/md-content/MdContent';
import './styles.less';

class ComponentGuidelinePage extends React.Component {
    componentWillMount() {
        console.log('ComponentGuidelinePage props', this.props);
        this.tabs = [
            { 
                label: 'Oversikt', 
                content: Overview
            },
            { 
                label: 'Teknisk', 
                content: (<div>Teknisk</div>)
            },
            { 
                label: 'Tilgjengelighet', 
                content: (<div>Tilgjengelighet</div>)
            },
            { 
                label: 'Diskusjon', 
                content: (<div>Diskusjon</div>)
            }
        ];

        this.state = {
            activeContent: this.tabs[0].content
        };
    }

    renderIngress() {
        return (<MdContent content={this.props.textData.ingress} typography="ingress" />);
    }

    render() {
        return (
            <div className="componentGuidelinePage">
                <div>
                    <div className="section">
                        { this.renderIngress() }

                        <div className="section componentGuidelinePage__tabbarContainer">
                            <Tabs onChange={this.updateActiveContent} tabs={this.tabs} />
                        </div>
                    </div>
                    <div className="section">
                        <this.state.activeContent {... this.props} />
                    </div>
                </div>
            </div>
        );
    }
}

ComponentGuidelinePage.propTypes = {
    textData: PT.shape({
        ingress: PT.string.isRequired
    })
};

ComponentGuidelinePage.defaultProps = {
    textData: {
        ingress: '',
        accessibility: '',
        usage: ''
    }
};

export default ComponentGuidelinePage;
