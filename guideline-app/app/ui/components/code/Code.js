import React from 'react';
import Prism from 'prismjs';

import 'prismjs/themes/prism-coy.css';
// import 'prismjs/themes/prism-okaidia.css';

import './styles.less';

const Codeblock = ({ children, className, ...rest }) => {
    const highlighted = Prism.highlight(children, Prism.languages.jsx);
    return (
        <figure role="figure" aria-label="Kode-eksempel">
            <pre className={className} {...rest}>
                <code className={className} dangerouslySetInnerHTML={{ __html: highlighted }} />
            </pre>
        </figure>
    );
};

export const InlineCode = (props) => (<code className="inline">{props.children}</code>);

export const Bash = (props) => (<code className="bash">{props.children}</code>);

export default Codeblock;
