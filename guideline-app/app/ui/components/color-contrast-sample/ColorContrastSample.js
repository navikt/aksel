import React, { Component } from 'react';
import {
    Systemtittel,
    Normaltekst,
    Undertittel
} from './../../../../../packages/node_modules/nav-frontend-typografi';

import './styles.less';

export class ColorContrastSample extends Component {
    createStyle() {
        const bgColor = this.props.contrast.hex;
        const style = {
            color: this.props.color.hex,
            backgroundColor: bgColor,
            border: bgColor === '#fff' ? '1px solid #c6c2bf' : '1px solid ' + bgColor
        };
        return style;
    }

    render() {
        const color = this.props.color;
        const contrast = this.props.contrast;

        return (
            <div className="colorContrastSample" style={ this.createStyle() }>
                <Systemtittel>{ contrast.label }</Systemtittel>
                <Normaltekst>{ color.hex }</Normaltekst>

                <div className="uuText">
                    <Undertittel>{ contrast.wcag }</Undertittel>
                </div>
            </div>
        );
    }
}
