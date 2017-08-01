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

    renderAboutSection() {
        const ingress = sanitizeHtml(this.props.ingress, { ALLOWED_TAGS: [] });
        const general = sanitizeHtml(this.props.general, { ALLOWED_TAGS: [] });

        let ingressParagraphs = (ingress.split(/\n/g)).filter((paragraph) => (paragraph && paragraph.length > 0));
        let generalParagraphs = (general.split(/\n/g)).filter((paragraph) => (paragraph && paragraph.length > 0));

        return (
            <div className="section">
                {
                    ingressParagraphs.map((ingressParagraph, idx) =>
                        (<Ingress key={ idx }>{ ingressParagraph }</Ingress>)
                    )
                }

                {
                    this.props.sampleData &&
                    <Sample
                        { ... this.props }
                    />
                }

                {
                    generalParagraphs.map((generalParagraph, idx) =>
                        (<Normaltekst key={ idx }>{ generalParagraph }</Normaltekst>)
                    )
                }
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