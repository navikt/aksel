import React from 'react';
import PropTypes from 'prop-types'

import { Sidetittel } from './../../../../../packages/node_modules/nav-frontend-typografi';
import './styles.less';

export const SectionTitle = (props) => {
    return (
        <div className="sectionTitle">
            <Sidetittel>{ props.title }</Sidetittel>
            { !props.noHr && <hr /> }
        </div>
    )
};

SectionTitle.propTypes = {
    title: PropTypes.string.isRequired
};