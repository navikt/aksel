import React from 'react';
import PT from 'prop-types';
import Ikon from 'NavFrontendModules/nav-frontend-ikoner-assets'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved, import/extensions, max-len
import { Undertekst, UndertekstBold } from 'NavFrontendModules/nav-frontend-typografi'; // eslint-disable-line import/no-extraneous-dependencies, import/no-unresolved, import/extensions, max-len

import './styles.less';

const IconSquare = (props) => (
    <div className="iconSquareWrapper">
        <div className="iconSquare">
            <Ikon kind={props.kind} />
        </div>

        <div className="textSection">
            <UndertekstBold>{props.name}</UndertekstBold>
            <Undertekst>{props.kind}</Undertekst>
        </div>
    </div>
);

IconSquare.propTypes = {
    name: PT.string.isRequired,
    kind: PT.string.isRequired
};

export default IconSquare;
