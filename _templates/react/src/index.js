import React, { PropTypes as PT } from 'react';

function <%name.camelcase%>({ children }) {
    return (
        <div className="<%name.kebabcase%>">
            <h2>Hello from <%name.original%></h2>
            {children}
        </div>
    );
}

<%name.camelcase%>.propTypes = {
    children: PT.node.isRequired
};

export default <%name.camelcase%>;
