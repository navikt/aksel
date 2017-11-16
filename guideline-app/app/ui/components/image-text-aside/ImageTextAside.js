import React from 'react';
import PT from 'prop-types';
import { Undertittel, Normaltekst } from './../../../../../packages/node_modules/nav-frontend-typografi';
import './styles.less';


function ImageTextAside(props) {
    return (
        <div className="imageTextAside">
            <div className="textSection">
                <Undertittel>
                    {props.title}
                </Undertittel>
                <Normaltekst>
                    {props.text}
                </Normaltekst>
            </div>
        </div>
    );
}

ImageTextAside.propTypes = {
    title: PT.string.isRequired,
    text: PT.string.isRequired,
};

export default ImageTextAside;
