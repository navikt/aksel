import React from 'react';
import Prism from 'prismjs';

import './styles.less';
import 'prismjs/themes/prism-coy.css';

class Code extends React.Component {
    render() {
        // const lang = this.props.className.split('-')[1];
        const highlighted = Prism.highlight(this.props.children, Prism.languages.jsx);
        return (
            <pre className="language-jsx">
                <code className="language-jsx" dangerouslySetInnerHTML={{ __html: highlighted }} />
            </pre>
        );
    }
}

export const Inline = (props) => (<code className="inline">{props.children}</code>);

export const Bash = (props) => (<code className="bash">{props.children}</code>);

export default Code;
