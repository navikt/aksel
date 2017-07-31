import React from 'react';

import {
    Normaltekst,
    Ingress
} from './../../../../../../packages/node_modules/nav-frontend-typografi';

import { Sample } from './common/Sample';
import { Tabbar } from './../../../components/tabbar/Tabbar';

import { GuidelineContentForDesigners } from './designers/GuidelineContent.designers';
import { GuidelineContentForDevelopers } from './developers/GuidelineContent.developers';

import './styles.less';

export class ComponentGuidelinePage extends React.Component {

    componentWillMount() {
        this.tabbarItems = [
            { label: 'Retningslinjer for design', defaultActive: true, content: GuidelineContentForDesigners },
            { label: 'Utviklerdokumentasjon', content: GuidelineContentForDevelopers }
        ];

        this.state = {
            activeContent: this.tabbarItems[0].content
        };
    }

    createIngress() {
        return { __html: this.props.ingress };
    }

    createGeneralText() {
        return { __html: this.props.general }
    }

    renderAboutSection() {
        return (
            <div className="section">
                <Ingress>{this.props.ingress}</Ingress>

                {
                    this.props.sampleData &&
                    <Sample
                        { ... this.props }
                    />
                }
                <Normaltekst dangerouslySetInnerHTML={ this.createGeneralText() } />
            </div>
        );
    }

    updateActiveContent(index) {
        this.setState({
            activeContent: this.tabbarItems[index].content,
            activeIndex: index
        });
    }

    renderTabbar() {
        return (
            <div className="section">
                <Tabbar
                    items={ this.tabbarItems }
                    activeItemChange={ (item) => this.updateActiveContent(this.tabbarItems.indexOf(item)) }
                    activeIndex={ this.state.activeIndex }
                />
            </div>
        )
    }

    render () {
        return (
            <div className="componentGuidelinePage">
                { this.renderAboutSection() }
                { this.renderTabbar() }

                <this.state.activeContent { ... this.props } />
            </div>
        );
    }
}