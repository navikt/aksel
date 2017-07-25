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

    renderAboutSection() {
        return (
            <div className="section">
                <Ingress>
                    { this.props.aboutText }
                    {
                        // todo: Remove this once content is in place.
                        this.props.aboutText.length < 200  &&
                        `
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ego quoque, inquit, didicerim libentius
                        si quid attuleris, quam te reprehenderim. Quae quo sunt excelsiores, eo dant clariora indicia
                        naturae.
                        `
                    }
                </Ingress>

                {
                    this.props.sampleData &&
                    <Sample
                        { ... this.props }
                    />
                }
                <Normaltekst>
                    Duarum enim vitarum nobis erunt instituta capienda. Conferam avum tuum Drusum cum C. Atqui reperies,
                    inquit, in hoc quidem pertinacem; Universa enim illorum ratione cum tota vestra confligendum puto.
                    Sed haec nihil sane ad rem; Nam quibus rebus efficiuntur voluptates, eae non sunt in potestate
                    sapientis. Gloriosa ostentatio in constituendo summo bono. Eadem nunc mea adversum te oratio est.
                </Normaltekst>
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