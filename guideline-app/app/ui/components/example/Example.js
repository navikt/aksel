import React from 'react';
import cn from 'classnames';

import './styles.less';

const cls = (greyBg) => cn('example', {
    'example--greyBg': greyBg
});

const Example = (props) => (
    <div className={cls(props.greyBg)}>
        <div className="example__inner">
            {props.children}
        </div>
    </div>
);

export default Example;
