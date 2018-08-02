import React from 'react';
import PT from 'prop-types';
import './styles.less';

import createContrastString from './../../../utils/ColorContrast';

function ColorSample(props) {
    const color = props.color;

    function getTextColor() {
        return { color: color.textColor };
    }

    function getBackgroundColor() {
        return { backgroundColor: color.hex };
    }

    return (
        <div
            className="colorSample"
            style={getBackgroundColor()}
        >
            <div className="colorSample__colorInfo">
                <h4 className="colorSample__colorInfo__header" style={getTextColor()}>
                    { color.label }
                </h4>

                <p className="colorSample__colorInfo__subtext" style={getTextColor()}>
                    { color.hex }
                </p>
            </div>

            <div className="colorSample__accessibilityInfo">
                <p className="colorSample__accessibilityInfo__text" style={getTextColor()}>
                    { createContrastString(color.textColor || '#ffffff', color.hex) }
                </p>
            </div>

        </div>
    );
}

ColorSample.propTypes = {
    color: PT.shape({
        label: PT.string.isRequired,
        hex: PT.string.isRequired,
        textColor: PT.string
    }).isRequired
};

ColorSample.defaultProps = {
    color: {
        textColor: 'white'
    }
};

export default ColorSample;
