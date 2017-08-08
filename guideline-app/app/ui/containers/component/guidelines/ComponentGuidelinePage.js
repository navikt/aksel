import React from 'react';

import {
    Ingress
} from './../../../../../../packages/node_modules/nav-frontend-typografi';

import { Sample } from './common/Sample';
import { Tabbar } from './../../../components/tabbar/Tabbar';

import { GuidelineContentForDesigners } from './designers/GuidelineContent.designers';
import { GuidelineContentForDevelopers } from './developers/GuidelineContent.developers';

import { MdContent } from './../../../components/md-content/MdContent';

import './styles.less';

export class ComponentGuidelinePage extends React.Component {

    componentWillMount() {
        this.tabbarItems = [
            { label: 'Retningslinjer for design', content: GuidelineContentForDesigners, defaultActive: true },
            { label: 'Utviklerdokumentasjon', content: GuidelineContentForDevelopers },
            { label: 'Universell utforming', content: GuidelineContentForDevelopers }
        ];

        this.state = {
            activeContent: this.tabbarItems[0].content
        };
    }

    renderAboutSection() {
        return (
            <div className="section">
                <MdContent content={ this.props.ingress } component={ Ingress } />

                {
                    this.props.componentData &&
                    <Sample { ... this.props } />
                }
            </div>
        );
    }

    updateActiveContent(item) {
        this.setState({ activeContent: item.content });
    }

    renderTabbar() {
        return (
            <Tabbar
                items={ this.tabbarItems }
                onActiveItemChange={ (item) => this.updateActiveContent(item) }
            />
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