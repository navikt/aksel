import React from 'react';
import PT from 'prop-types';
import {
    Ingress
} from './../../../../../../packages/node_modules/nav-frontend-typografi';
import Sample from './common/Sample';
import Tabs from './../../../../../../packages/node_modules/nav-frontend-tabs';
import GuidelineContentForDesigners from './designers/GuidelineContent.designers';
import GuidelineContentForDevelopers from './developers/GuidelineContent.developers';
import MdContent from './../../../components/md-content/MdContent';
import './styles.less';

class ComponentGuidelinePage extends React.Component {

    componentWillMount() {
        this.tabContent = [
            GuidelineContentForDesigners,
            GuidelineContentForDevelopers
        ];

        if (this.hasDeveloperGuidelinesOnly()) {
            this.setState({ activeContent: this.tabContent[1] });
        } else {
            this.setState({ activeContent: this.tabContent[0] });
        }
    }

    hasDeveloperGuidelinesOnly() {
        return !this.props.textData;
    }

    updateActiveContent = (e, index) => {
        this.setState({ activeContent: this.tabContent[index] });
    }

    renderIngress() {
        return (<MdContent content={this.props.textData.ingress} typography="ingress" />);
    }

    renderGuidelinePageWithDesignGuidelines() {
        return (
            <div>
                <div className="section">
                    { this.renderIngress() }
                    <Sample {... this.props} />
                </div>

                <div className="section componentGuidelinePage__tabbarContainer">
                    <Tabs onChange={this.updateActiveContent}>
                        { !this.hasDeveloperGuidelinesOnly() && <Tabs.Tab>Retnings&shy;linjer for design</Tabs.Tab> }
                        <Tabs.Tab>Utvikler&shy;dokumentasjon</Tabs.Tab>
                    </Tabs>
                </div>

                <div className="section">
                    <this.state.activeContent {... this.props} />
                </div>
            </div>
        );
    }

    renderGuidelinePageWithDeveloperGuidelinesOnly() {
        return (
            <div>
                <Ingress>
                    Det er ikke skrevet noen designretningslinjer for denne komponenten, så her
                    er det kun utviklerdokumentasjon foreløpig.
                </Ingress>
                <Sample {... this.props} />
                <this.state.activeContent {... this.props} />
            </div>
        );
    }

    render() {
        let content;

        if (this.hasDeveloperGuidelinesOnly()) {
            content = this.renderGuidelinePageWithDeveloperGuidelinesOnly();
        } else {
            content = this.renderGuidelinePageWithDesignGuidelines();
        }

        return (
            <div className="componentGuidelinePage">
                { content }
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
