import React from 'react';
import Color from 'color';

import './styles.less';

const cls = (col) => {
    return (col.isLight()) ? 'color-sample light' : 'color-sample' ;
}

const ColorSample = (props) => {
    const color = Color(props.color);
    return (
        <div className={cls(color)} style={{background: color.hex()}} {...props}>
            <span>{props.name}</span>
            <span>{color.hex()}</span>
        </div>
    );
};

export default ColorSample;