import React from 'react';
import classnames from 'classnames';
import Color from 'color';
import { keyCodes } from 'NavFrontendModules/nav-frontend-js-utils';

import './styles.less';

const cls = (col) => classnames({
    'color-sample': true,
    light: col.isLight()
});

class ColorSample extends React.Component {
    click = () => {
        if (typeof this.props.onClick === 'function') {
            this.props.onClick({ name: this.props.name, color: this.color });
        }
    }

    render(){
        this.color = Color(this.props.color);
        return (
            <div
                className={cls(this.color)}
                style={{ background: this.color.hex(), borderColor: this.color.hex() }}
                role={(this.props.onClick === 'function') ? 'button' : undefined}
                tabIndex="0"
                onKeyDown={(e) => { if (e.keyCode === keyCodes.enter || e.keyCode === keyCodes.space) this.click(); }}
                onClick={this.click}
                    
            >
                <span>{this.props.name}</span>
                <span>{this.color.hex()}</span>
            </div>
        );}
};

export default ColorSample;
