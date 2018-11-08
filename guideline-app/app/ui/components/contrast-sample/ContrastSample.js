import React from 'react';
import Color from 'color';
import classnames from 'classnames';

import { EtikettLiten as Etikett } from 'NavFrontendModules/nav-frontend-typografi';

import './styles.less';

const sampleCls = (props) => classnames('contrast-sample', {
    border: props.border
});

const contrastCls = (contrast) => classnames('contrast-ratio', {
    pass: contrast > 4.5
});

const ContrastSample = (props) => {

    const background = Color(props.background);
    const foreground = Color(props.foreground);
    const contrast = Math.round(foreground.contrast(background) * 100) / 100;

    return (
        <React.Fragment>
            <Etikett>
                {props.label}
                <span className={contrastCls(contrast)}>WCAG: {contrast}:1</span>
            </Etikett>
            <div className={sampleCls(props)} style={{background: background.hex(), color: foreground.hex()}}>
                Lorem ipsum dolor sit amet
            </div>
        </React.Fragment>
    );
}

export default ContrastSample;