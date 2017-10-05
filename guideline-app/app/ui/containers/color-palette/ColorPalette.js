import React from 'react';
import PT from 'prop-types';

import ColorSample from './../../components/color-sample/ColorSample';
import { Normaltekst } from './../../../../../packages/node_modules/nav-frontend-typografi';

import './styles.less';

class ColorPalette extends React.Component {
    renderColorSamples() {
        return this.props.colors.map(
            (color, key) => (
                // eslint-disable-next-line react/no-array-index-key
                <div className="colorSampleWrapper" key={key}>
                    <ColorSample color={color} />

                    <Normaltekst className="description">{ color.description }</Normaltekst>
                </div>
            )
        );
    }

    render() {
        return (
            <div className="colorPalette">
                { this.renderColorSamples() }
            </div>
        );
    }
}

ColorPalette.propTypes = {
    colors: PT.arrayOf(PT.shape({})).isRequired
};

export default ColorPalette;
