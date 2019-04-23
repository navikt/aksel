import React from 'react';
import classnames from 'classnames';
import Color from 'color';

import './styles.less';

const cls = (col) => classnames({
    'color-sample': true,
    light: col.isLight()
});

const ColorSample = (props) => {
    const color = Color(props.color);
    return (
        <div
            className={cls(color)}
            style={{ background: color.hex(), borderColor: color.hex() }}
            role={(props.onClick === 'function') ? 'button' : undefined}
            tabindex="0"
            onClick={
                (typeof props.onClick === 'function') ?
                    () => props.onClick({ name: props.name, color }) :
                    undefined
                }
        >
            <span>{props.name}</span>
            <span>{color.hex()}</span>
        </div>
    );
};

export default ColorSample;
