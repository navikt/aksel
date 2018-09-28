import React from 'react';
import { Code, Inline } from './../code/Code';

const MdxContent = (props) => (
    <props.children components={{
        code: Code,
        inlineCode: Inline
    }} />
);

export default MdxContent;