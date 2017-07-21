import React, { Component } from 'react';

import {
    Normaltekst,
    Undertittel
} from './../../../../../../../packages/node_modules/nav-frontend-typografi';

export class GuidelineContentForDesigners extends Component {

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

    render() {
        return (
            <div>
                { this.renderHowToUseSection() }
                { this.renderAccessibilitySection() }
            </div>
        )
    }

}
