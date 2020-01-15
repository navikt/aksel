import React from 'react';
import cn from 'classnames';

import OverflowDetector from '../overflow-detector/OverflowDetector';

import './styles.less';

const cls = (props) => cn('example', props.className, {
    'example--greyBg': props.greyBg
});

const Example = (props) => (
    <div className={cls(props)}>
        {
            (props.noscroll)
            ? <div className="example__inner">{props.children}</div>
            : <OverflowDetector><div className="example__inner">{props.children}</div></OverflowDetector>
        }
    </div>
);

export default Example;
