import React from 'react';
import cn from 'classnames';

import './styles.less';

const cls = (props) => cn('example', props.className, {
    'example--greyBg': props.greyBg
});

const Example = (props) => (
    <div className={cls(props)}>
        <div className="example__inner">
            {props.children}
        </div>
    </div>
);

export default Example;
