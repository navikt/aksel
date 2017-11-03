import React from 'react';
import PT from 'prop-types';
import { Undertittel, Normaltekst } from './../../../../../packages/node_modules/nav-frontend-typografi';
import logoPng from './../../../assets/images/logo/logo.png';
import './styles.less';


function ImageTextAside(props) {
    return (
        <div className="imageTextAside">
            <img src={props.image || logoPng} alt="" className="image" />
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
    image: PT.shape({})
};

export default ImageTextAside;
