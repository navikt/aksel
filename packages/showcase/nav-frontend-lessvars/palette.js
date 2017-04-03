import React, { Component } from 'react';
import lessvars from 'lessvars';
import convert from 'color-convert';
import colornames from 'color-name';
import './style.less';

// eslint-disable-next-line import/no-webpack-loader-syntax, import/first, import/no-unresolved, import/extensions
import lesssrc from '!!raw-loader!nav-frontend-core/less/_variabler.less';

class ObjectFilter {
    static value(filter) {
        return ([_, value]) => filter(value);
    }
}

class ColorUtils {
    static rgb = /rgb\((\d+), (\d+), (\d+)\)/;
    static map = {
        keyword: ColorUtils.isKeyword,
        hex: ColorUtils.isHex,
        rgb: ColorUtils.isRgb
    };

    static isKeyword(value) {
        return !!colornames[value];
    }

    static isHex(value) {
        return value.startsWith('#');
    }

    static isRgb(value) {
        return value.startsWith('rgb(');
    }

    static isColor(value) {
        return ColorUtils.isKeyword(value) || ColorUtils.isHex(value) || ColorUtils.isRgb(value);
    }

    static colorType(value) {
        return Object.entries(ColorUtils.map)
            .find(([_, predicate]) => predicate(value))[0];
    }

    static colorParse(value) {
        const type = ColorUtils.colorType(value);

        if (type === 'rgb') {
            const [_, r, g, b] = ColorUtils.rgb.exec(value);
            return [r, g, b];
        }
        return value;
    }

    static print(format, value) {
        if (typeof value === 'string') {
            if (format === 'hex' && !value.startsWith('#')) {
                return `#${value}`.toLocaleLowerCase();
            }
            return value.toLocaleLowerCase();
        }

        let prettyvalues;
        if (format === 'hsl') {
            prettyvalues = value.map((v, i) => ((i > 0) ? `${v}%` : v));
        } else {
            prettyvalues = value;
        }

        return `${format}(${prettyvalues.join(', ')})`.toLowerCase();
    }

    static convert(format, value) {
        const type = ColorUtils.colorType(value);

        if (type === format) {
            return value;
        }
        return ColorUtils.print(format, convert[type][format](ColorUtils.colorParse(value)));
    }
}

class ColorSort {
    static sortByLuma(var1, var2) {
        const type1 = ColorUtils.colorType(var1[1]);
        const type2 = ColorUtils.colorType(var2[1]);
        const [r1, g1, b1] = convert.lab.rgb(convert[type1].lab(ColorUtils.colorParse(var1[1])));
        const [r2, g2, b2] = convert.lab.rgb(convert[type2].lab(ColorUtils.colorParse(var2[1])));
        const sort1 = 0.299 * r1 + 0.587 * g1 + 0.114 * b1; // eslint-disable-line no-mixed-operators
        const sort2 = 0.299 * r2 + 0.587 * g2 + 0.114 * b2; // eslint-disable-line no-mixed-operators

        return sort2 - sort1;
    }
}

function PaletteElement([name, color]) {
    return (
        <div key={name} className="palette__element">
            <div className="palette__color" style={{ backgroundColor: color }} />
            <div className="palette__meta">
                <div className="palette__metaentry fullwidth">
                    <span className="palette__metaentry-header">Variable</span>
                    <span className="palette__metaentry-value">@{name}</span>
                </div>
                <div className="palette__metaentry">
                    <span className="palette__metaentry-header">HEX</span>
                    <span className="palette__metaentry-value">{ColorUtils.convert('hex', color)}</span>
                </div>
                <div className="palette__metaentry">
                    <span className="palette__metaentry-header">RGB</span>
                    <span className="palette__metaentry-value">{ColorUtils.convert('rgb', color)}</span>
                </div>
                <div className="palette__metaentry">
                    <span className="palette__metaentry-header">HSL</span>
                    <span className="palette__metaentry-value">{ColorUtils.convert('hsl', color)}</span>
                </div>
            </div>
        </div>
    );
}

class Palette extends Component {
    constructor(props) {
        super(props);

        this.state = { vars: {} };
    }

    componentDidMount() {
        lessvars(lesssrc).then((vars) => this.setState({ vars }));
    }

    render() {
        if (!this.state.vars) {
            return <p>Loading...</p>;
        }

        const colors = Object.entries(this.state.vars)
            .filter(ObjectFilter.value(ColorUtils.isColor))
            .sort(ColorSort.sortByLuma)
            .map(PaletteElement);

        return (
            <div className="palette">
                {colors}
            </div>
        );
    }
}

export default Palette;
