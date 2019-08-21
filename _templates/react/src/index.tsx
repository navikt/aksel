import * as React from 'react';
import * as PT from 'prop-types';
import * as classnames from 'classnames';

export interface <%name.camelcase%>Props {
    /**
     * Egendefinert klassenavn.
     */
    className?: string;
}

class <%name.camelcase%> extends React.Component<<%name.camelcase%>Props> {
    render() {
        const { children, className } = this.props;
        return (
            <div className={classnames(<%name.kebabcase%>, className)}>
                <h2>Hello from <%name.original%></h2>
                {children}
            </div>
        );
    }
}

(<%name.camelcase%> as React.ComponentClass).propTypes = {
    /**
     * Egendefinert klassenavn.
     */
    className: PT.string
};

export default <%name.camelcase%>;
