import React, { PropTypes as PT } from 'react';

function <%name.camelcase%>(props) {
    return (
        <div className="<%name.kebabcase%>">
            <h2>Hello from <%name.original%></h2>
        </div>
    );
}

    <%name.camelcase%>.propTypes = {};

export default <%name.camelcase%>;
