import React from 'react';
import Prism from 'prismjs';

import 'prismjs/themes/prism-coy.css';

import './styles.less';

const Codeblock = (props) => {
    // const lang = this.props.className.split('-')[1];
    const highlighted = Prism.highlight(props.children, Prism.languages.jsx);
    return (
        <pre className="language-jsx">
            <code className="language-jsx" dangerouslySetInnerHTML={{ __html: highlighted }} />
        </pre>
    );
};

export const InlineCode = (props) => (<code className="inline">{props.children}</code>);

export const Bash = (props) => (<code className="bash">{props.children}</code>);

export default Codeblock;
