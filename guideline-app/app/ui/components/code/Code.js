import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import github from 'react-syntax-highlighter/styles/hljs/github';
import './styles.less';

export const Code = (props) => {
    const lang = props.className.split('-')[1];
    return (
        <SyntaxHighlighter
            language={lang}
            style={github}
            customStyle={{padding: '1rem', background: '#f4f4f4'}}
        >
            {props.children}
        </SyntaxHighlighter>
    );
};

export const Inline = (props) => (<code className="inline">{props.children}</code>);