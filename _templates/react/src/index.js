import React, { Component, PropTypes as PT } from 'react';

class <%name.camelcase%> extends Component {
    render() {
        const { children } = this.props;
        return (
            <div className="<%name.kebabcase%>">
                <h2>Hello from <%name.original%></h2>
                {children}
            </div>
        );
    }
}

<%name.camelcase%>.propTypes = {
    children: PT.node
};

export default <%name.camelcase%>;
