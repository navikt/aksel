import React from 'react';
import Color from 'color';

import './styles.less';

const cls = (col) => {
    return (col.isLight()) ? 'color-sample light' : 'color-sample' ;
}

const ColorSample = (props) => {
    const { color, onClick, ...rest } = props;
    const col = Color(props.color);

    return (
        <button 
            className={cls(col)}
            style={{background: col.hex()}} 
            role={(typeof props.onClick === 'function') ? 'button' : undefined}
            onClick={(typeof props.onClick === 'function') ? () => props.onClick({name: props.name, col}) : undefined }
            {...props}
        >
            <span>{props.name}</span>
            <span>{col.hex()}</span>
        </button>
    );
};

export default ColorSample;