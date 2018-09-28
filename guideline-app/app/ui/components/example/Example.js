import React from 'react';
import cn from 'classnames';

import './styles.less';

const cls = (greyBg) => cn('example', {
    'example--greyBg': greyBg
});

class Example extends React.Component {
    render() {
        return (
            <div className={cls(this.props.greyBg)}>
                <div className="example__inner">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Example;
