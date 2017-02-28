import React from 'react';
import ReactMarkdown from 'react-markdown';
import Collapsable from 'react-storybook-addon-sections/dist/components/groupings/collapsable';
import titleHoc from 'react-storybook-addon-sections/dist/components/title-hoc';
import Inline from 'react-storybook-addon-sections/dist/components/groupings/inline';

const renderers = {
    Heading: ({ level, nodeKey, literal, ...props }) => {
        if (level === 1) {
            return null;
        }
        return React.createElement(`h${level + 1}`, { ...props, key: nodeKey });
    }
};
function ReadmeViewComponent(src) {
    return () => (<ReactMarkdown renderers={renderers} source={src} />);
}
const Readme = (src) => titleHoc('Readme', ReadmeViewComponent(src));


function InnstallasjonComponent(pkg) {
    return () => (<div><p>Her kommer innstall data for {pkg.name}</p></div>);
}
const Innstallasjon = (pkg) => titleHoc('Innstallasjon', InnstallasjonComponent(pkg));


function DokumentasjonSeksjon(pkg, readme) {
    return Inline(Innstallasjon(pkg), Readme(readme));
}

export default (pkg, readme) => titleHoc('Dokumentasjon', DokumentasjonSeksjon(pkg, readme));