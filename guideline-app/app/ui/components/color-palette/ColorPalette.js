import React from 'react';
import Color from 'color';

import ColorSample from '../color-sample/ColorSample';

import palette from '../../../data/colors/palette';

import './styles.less';

const white = Color("#FFFFFF");
const black = Color("#3E3832");

const variations = (baseColor, modifyer) => {
    const colors = [];
    for (let i = 80; i > 0; i = i - 20) {
        colors.push(baseColor.mix(modifyer, i/100));
    }
    return colors;
};

const colorName = (base, i) => {
    if (i === 4) return base;
    return (i < 4) ? base + `Darken${80 - (i * 20)}` : base + `Lighten${(i * 20) - 80}` ;
};

const ColorPalette = () => (
    <div className="color-palette">
        {
            Object.keys(palette).map(colorVar => {

                let color = Color(palette[colorVar]);
                let lightVersions = variations(color, white);
                    lightVersions.push(color);
                let darkVersions = variations(color, black);
                let group = lightVersions.concat(darkVersions.reverse()).reverse();

                return (
                    <div className="color-group">
                        {
                            group.map((col, i) => {
                                return (<ColorSample name={colorName(colorVar, i)} color={col.hex()} />);
                            })
                        }
                    </div>
                )
            })
        }
    </div>
);

export default ColorPalette;