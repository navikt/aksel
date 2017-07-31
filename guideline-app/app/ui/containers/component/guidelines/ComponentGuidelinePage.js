import React from 'react';

import {
    Normaltekst,
    Ingress
} from './../../../../../../packages/node_modules/nav-frontend-typografi';

import { Sample } from './common/Sample';
import { Tabbar } from './../../../components/tabbar/Tabbar';

import { GuidelineContentForDesigners } from './designers/GuidelineContent.designers';
import { GuidelineContentForDevelopers } from './developers/GuidelineContent.developers';

import { sanitizeHtml } from './../../../../utils/dom/code-sampling.utils';

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

    getSanitizedMdFileContent(mdFileContent) {
        return sanitizeHtml(mdFileContent, { ALLOWED_TAGS: [], KEEP_CONTENT: true });
    }

    renderAboutSection() {
        return (
            <div className="section">
                <Ingress>{ this.getSanitizedMdFileContent(this.props.ingress) }</Ingress>

                {
                    this.props.sampleData &&
                    <Sample
                        { ... this.props }
                    />
                }
                <Normaltekst>{ this.getSanitizedMdFileContent(this.props.general) }</Normaltekst>
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