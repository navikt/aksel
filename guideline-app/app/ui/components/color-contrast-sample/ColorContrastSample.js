import React, { Component } from 'react';
import PT from 'prop-types';
import {
    Systemtittel,
    Normaltekst,
    Undertittel
} from './../../../../../packages/node_modules/nav-frontend-typografi';

import createContrastString from './../../../utils/ColorContrast';

import './styles.less';

export default class ColorContrastSample extends Component {
    createStyle() {
        const bgColor = this.props.contrast.hex;
        const style = {
            color: this.props.color.hex,
            backgroundColor: bgColor,
            border: bgColor === '#fff' ? '1px solid #c6c2bf' : `1px solid ${bgColor}`
        };
        return style;
    }

    render() {
        const color = this.props.color;
        const contrast = this.props.contrast;

        return (
            <div className="colorContrastSample" style={this.createStyle()}>
                <h4>{ contrast.label }</h4>
                <div className="hex">{ color.hex }</div>

                <div className="uuText">
                    { createContrastString(this.props.color.hex, this.props.contrast.hex) }
                </div>
            </div>
        );
    }
}

ColorContrastSample.propTypes = {
    color: PT.shape({
        hex: PT.string.isRequired
    }).isRequired,
    contrast: PT.shape({
        hex: PT.string.isRequired
    })
};

ColorContrastSample.defaultProps = {
    contrast: null
};
