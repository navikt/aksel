import React from 'react';
import Prism from 'prismjs';

import 'prismjs/themes/prism-coy.css';
// import 'prismjs/themes/prism-okaidia.css';

import './styles.less';

const Codeblock = ({ children, className, ...rest }) => {
    const highlighted = Prism.highlight(children, Prism.languages.jsx);
    return (
        <pre className={className} aria-label="Kode-eksempel" {...rest}>
            <code className={className} dangerouslySetInnerHTML={{ __html: highlighted }} />
        </pre>
    );
};

export const InlineCode = (props) => (<code className="inline">{props.children}</code>);

export const Bash = (props) => (<code className="bash">{props.children}</code>);

export default Codeblock;
