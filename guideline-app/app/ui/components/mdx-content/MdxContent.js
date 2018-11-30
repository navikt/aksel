import React from 'react';
import Code, { Inline } from './../code/Code';
import { Systemtittel } from 'NavFrontendModules/nav-frontend-typografi';

const MdxContent = (props) => (
    <section className="section">
        <props.children
            components={{
                h2: Systemtittel,
                code: Code,
                inlineCode: Inline
            }}
        />
    </section>
);

export default MdxContent;