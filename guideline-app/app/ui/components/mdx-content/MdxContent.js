import React from 'react';
import Code, { Inline } from './../code/Code';
import { Innholdstittel, Systemtittel, Undertittel } from 'NavFrontendModules/nav-frontend-typografi';

const MdxContent = (props) => (
    <section className="section">
        <props.children
            components={{
                h1: Innholdstittel,
                h2: Systemtittel,
                h3: Undertittel,
                code: Code,
                inlineCode: Inline
            }}
        />
    </section>
);

export default MdxContent;