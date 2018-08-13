import React from 'react';
import PT from 'prop-types';

import { Normaltekst, Ingress } from './../../../../../../packages/node_modules/nav-frontend-typografi';
import SectionTitle from './../../../components/section-title/SectionTitle';

const SourceSansProSection = () => {
    const authorLink = 'http://www.adobe.com/products/type/font-designers/paul-hunt.html';
    const downloadLink = 'https://fonts.google.com/specimen/Source+Sans+Pro';
    return (
        <div>
            <SectionTitle title="Source Sans Pro" />
            <div className="sourceSansProSection__intro">
                <div className="sourceSansProSection__bigLetters">Aa</div>
                <Ingress>
                    Source® Sans Pro, Adobe sin første open source font-familie, ble designet
                    av <a href={authorLink} target="_blank" rel="noopener noreferrer">Paul D. Hunt</a>.
                    Det er en sans serif font som er ment å fungere spesielt bra på digitale brukergrensesnitt.
                    <br /><br />
                    <a href={downloadLink}>Last ned hele font-familien fra Google Fonts</a>
                </Ingress>
            </div>
        </div>
    );
};

const Sample = (props) => {
    const getClassList = () => (`sample ${props.type}`);

    return (
        <div className="sourceSansProSection__samples">
            <span className={getClassList()}>{ props.label }</span>
            <span className={getClassList().concat(' italic')}>{ props.label }</span>
        </div>
    );
};

Sample.propTypes = {
    type: PT.string.isRequired,
    label: PT.string.isRequired
};

const SampleWithDescription = (props) => (
    <div className="description">
        <span className={`sample ${props.type}`}>
            { props.label }
        </span>
        <Normaltekst>
            { props.description }
        </Normaltekst>
    </div>
);

SampleWithDescription.propTypes = {
    type: PT.string.isRequired,
    label: PT.string.isRequired,
    description: PT.string.isRequired
};

export default SourceSansProSection;
