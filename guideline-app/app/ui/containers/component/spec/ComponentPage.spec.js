import React from 'react';

import {
    Normaltekst,
    Undertittel,
    Ingress
} from './../../../../../../packages/node_modules/nav-frontend-typografi';

import { Sample } from './sampling/Sample';

export class ComponentSpecPage extends React.Component {

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
                    <Sample { ... this.props } />
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

    renderHowToUseSection() {
        return (
            <div className="section">
                <Undertittel>Hvordan bruker jeg { this.props.componentName }?</Undertittel>
                <Normaltekst>
                    { this.props.howToUse }
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ego quoque, inquit, didicerim libentius
                    si quid attuleris, quam te reprehenderim. Quae quo sunt excelsiores, eo dant clariora indicia
                    naturae. Duo enim genera quae erant, fecit tria. Traditur, inquit, ab Epicuro ratio neglegendi
                    doloris. Parvi enim primo ortu sic iacent, tamquam omnino sine animo sint. Duo Reges: constructio
                    interrete. Quoniam, si dis placet, ab Epicuro loqui discimus. Etiam beatissimum?
                </Normaltekst>
            </div>
        );
    }

    renderAccessibilitySection() {
        return (
            <div className="section">
                <Undertittel>{ this.props.componentName } og universell utforming</Undertittel>
                <Normaltekst>
                    { this.props.accessibility }
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ego quoque, inquit, didicerim libentius
                    si quid attuleris, quam te reprehenderim. Quae quo sunt excelsiores, eo dant clariora indicia
                    naturae. Duo enim genera quae erant, fecit tria. Traditur, inquit, ab Epicuro ratio neglegendi
                    doloris. Parvi enim primo ortu sic iacent, tamquam omnino sine animo sint. Duo Reges: constructio
                    interrete. Quoniam, si dis placet, ab Epicuro loqui discimus. Etiam beatissimum?
                </Normaltekst>
            </div>
        );
    }

    render () {
        return (
            <div className="componentSpecPage">
                { this.renderAboutSection() }
                { this.renderHowToUseSection() }
                { this.renderAccessibilitySection() }
            </div>
        );
    }
}