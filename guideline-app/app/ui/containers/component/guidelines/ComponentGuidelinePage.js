import React from 'react';

import {
    Normaltekst,
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
            { label: 'Retningslinjer for design', defaultActive: true, content: GuidelineContentForDesigners },
            { label: 'Utviklerdokumentasjon', content: GuidelineContentForDevelopers }
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
                    this.props.sampleData &&
                    <Sample { ... this.props } />
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
            <Tabbar
                items={ this.tabbarItems }
                activeItemChange={ (item) => this.updateActiveContent(this.tabbarItems.indexOf(item)) }
                activeIndex={ this.state.activeIndex }
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