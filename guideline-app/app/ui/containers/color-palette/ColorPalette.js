import React from 'react';

import { ColorSample } from './../../components/color-sample/ColorSample';
import { Normaltekst } from './../../../../../packages/node_modules/nav-frontend-typografi';

import './styles.less';

export class ColorPalette extends React.Component {
    renderColorSamples () {
        return (
            this.props.colors.map(
                (color, key) => {
                    return (
                        <div className="colorSampleWrapper" key={ key }>
                            <ColorSample color={ color } />

                            <Normaltekst className="description">{ color.description }</Normaltekst>
                        </div>
                    );
                }
            )
        );
    };

    render () {
        return (
            <div className="colorPalette">
                { this.renderColorSamples() }
            </div>
        )
    }
}