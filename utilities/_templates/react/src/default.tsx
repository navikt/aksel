import React, { forwardRef } from "react";
import cl from 'classnames';
import '@nav-fronted/<%name.indexfileUncapped%>-styles';

export interface <%name.stripped%>Props {
    /**
     * User defined classname
     */
    className?: string;
}

const <%name.stripped%> = forwardRef<HTMLDivElement, <%name.stripped%>Props>(
    ({ children, className }, ref) => {
        return (
            <div ref={ref} className={cl('navds-<%name.indexfileUncapped%>', className)}>
                <h2>Hello from <%name.original%></h2>
                {children}
            </div>
        );
    }
)

export default <%name.stripped%>;
