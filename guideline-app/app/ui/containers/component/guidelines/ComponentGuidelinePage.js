import React from 'react';
import PT from 'prop-types';
import {
    Ingress
} from './../../../../../../packages/node_modules/nav-frontend-typografi';
import Sample from './common/Sample';
import Tabbar from './../../../components/tabbar/Tabbar';
import GuidelineContentForDesigners from './designers/GuidelineContent.designers';
import GuidelineContentForDevelopers from './developers/GuidelineContent.developers';
import MdContent from './../../../components/md-content/MdContent';
import './styles.less';

class ComponentGuidelinePage extends React.Component {

    componentWillMount() {
        this.tabbarItems = [
            { label: 'Retnings&shy;linjer for design', content: GuidelineContentForDesigners, defaultActive: true },
            { label: 'Utvikler&shy;dokumentasjon', content: GuidelineContentForDevelopers }
        ];

        if (this.hasDeveloperGuidelinesOnly()) {
            this.setState({ activeContent: this.tabbarItems[1].content });
        } else {
            this.setState({ activeContent: this.tabbarItems[0].content });
        }
    }

    hasDeveloperGuidelinesOnly() {
        return !this.props.textData;
    }

    updateActiveContent(item) {
        this.setState({ activeContent: item.content });
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
                    <Tabbar
                        items={this.tabbarItems}
                        onActiveItemChange={(item) => this.updateActiveContent(item)}
                    />
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
    }).isRequired
};

export default ComponentGuidelinePage;
