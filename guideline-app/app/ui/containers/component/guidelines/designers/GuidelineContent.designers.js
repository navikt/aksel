import React, { Component } from 'react';
import PT from 'prop-types';

import {
    Undertittel,
    Normaltekst
} from './../../../../../../../packages/node_modules/nav-frontend-typografi';

import MdContent from './../../../../components/md-content/MdContent';

class GuidelineContentForDesigners extends Component {

    ALLOWED_TAGS = ['a', 'ul', 'li', 'ol', 'h4', 'img'];

    renderHowToUseSection() {
        return (
            <div className="section">
                <Undertittel>Hvordan bruker jeg {this.props.componentData.label}?</Undertittel>
                <MdContent
                    content={this.props.textData.usage}
                    allowedTags={this.ALLOWED_TAGS}
                    component={Normaltekst}
                />
            </div>
        );
    }

    renderAccessibilitySection() {
        return (
            <div className="section">
                <Undertittel>{ this.props.componentData.label } og universell utforming</Undertittel>
                <MdContent
                    content={this.props.textData.accessibility}
                    allowedTags={this.ALLOWED_TAGS}
                    component={Normaltekst}
                />
            </div>
        );
    }

    render() {
        return (
            <div className="designerGuidelineSection">
                { this.renderHowToUseSection() }
                { this.renderAccessibilitySection() }
            </div>
        );
    }

}

GuidelineContentForDesigners.propTypes = {
    componentData: PT.shape({
        label: PT.string
    }).isRequired,
    textData: PT.shape({
        usage: PT.string,
        accessibility: PT.string
    }).isRequired
};


export default GuidelineContentForDesigners;
