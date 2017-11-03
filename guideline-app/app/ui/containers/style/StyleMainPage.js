import React from 'react';
import PT from 'prop-types';

import SubRoutesWrapper from '../../../utils/routing/subroutesWrapper.component';

function StyleMainPage(props) {
    return (
        <div>
            <SubRoutesWrapper routes={props.routes} />
        </div>
    );
}

StyleMainPage.propTypes = {
    routes: PT.arrayOf(PT.shape).isRequired
};

export default StyleMainPage;
