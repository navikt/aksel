import React, { Component } from 'react';
import PT from 'prop-types';

import { Undertittel } from './../../../../../../../packages/node_modules/nav-frontend-typografi';

import MdContent from './../../../../components/md-content/MdContent';
import './styles.less';

class GuidelineContentForDesigners extends Component {

    renderHowToUseSection() {
        return (
            <div className="section">
                <Undertittel>Hvordan bruker jeg {this.props.componentData.label}?</Undertittel>
                <MdContent content={this.props.textData.usage} warn />
            </div>
        );
    }

    renderAccessibilitySection() {
        if (this.props.textData.accessibility) {
            return (
                <div className="section">
                    <Undertittel>{ this.props.componentData.label } og universell utforming</Undertittel>
                    <MdContent content={this.props.textData.accessibility} warn />
                </div>
            );
        }
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
