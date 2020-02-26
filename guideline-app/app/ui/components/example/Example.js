import React from 'react';
import cn from 'classnames';

import OverflowDetector from '../overflow-detector/OverflowDetector';

import './styles.less';

const cls = (className, greyBg) => cn('example', className, {
    'example--greyBg': greyBg
});

const Example = ({children, className, noscroll, greyBg, ...rest}) => {
    return (
        <div className={cls(className, greyBg)} aria-label="Eksempel" {...rest}>
            {
                (noscroll)
                ? <div className="example__inner">{children}</div>
                : <OverflowDetector><div className="example__inner">{children}</div></OverflowDetector>
            }
        </div>
    );
};

export default Example;
