/* eslint-disable react/prop-types */
import React from 'react';
import ReactMarkdown from 'react-markdown';
import titleHoc from 'react-storybook-addon-sections/dist/components/title-hoc';
import Collapsable from 'react-storybook-addon-sections/dist/components/groupings/collapsable';
import Inline from 'react-storybook-addon-sections/dist/components/groupings/inline';
import Tabbable from 'react-storybook-addon-sections/dist/components/groupings/tabbable';
import Group from 'react-storybook-addon-sections/dist/components/groupings/group';
import ReactView from 'react-storybook-addon-sections/dist/components/sections/reactview';
import HtmlView from 'react-storybook-addon-sections/dist/components/sections/htmlview';
import CssView from 'react-storybook-addon-sections/dist/components/sections/cssview';
import RawView from 'react-storybook-addon-sections/dist/components/sections/rawview';
import './dokumentasjon.less';

const renderers = {
    Heading: ({ level, nodeKey, literal: _literal, ...props }) => {
        if (level === 1) {
            return null;
        }
        return React.createElement(`h${level + 1}`, { ...props, key: nodeKey });
    }
};

function ReadmeViewComponent(src) {
    return () => (
        <ReactMarkdown className="readme-section storybook-addons-info__section" renderers={renderers} source={src} />
    );
}

function removeDisclaimerFromMarkdown(markdown) {
    return markdown.replace(/#+\s?Disclaimer(?:.|\s)*/, '');
}

export const Readme = (src) => {
    const source = removeDisclaimerFromMarkdown(src);
    return titleHoc('Readme', ReadmeViewComponent(source));
}

function InnstallasjonComponent(pkg) {
    return () => {
        const installDeps = [pkg.name].concat(Object.keys(pkg.peerDependencies || {})).join(' ');
        return (
            <div>
                <p>Innstallering:</p>
                <pre><code>{`npm install ${installDeps} --save`}</code></pre>
            </div>
        );
    };
}
const Innstallasjon = (pkg) => titleHoc('Innstallasjon', InnstallasjonComponent(pkg));

function HrComponent() {
    return <div style={{ borderBottom: '1px solid rgb(238, 238, 238)' }} />;
}

function componentName(component) {
    return component.name || component.displayName || 'Unknown';
}

function ProptypesComponent(element) {
    const header = (
        <tr>
            <th>property</th>
            <th>proptype</th>
            <th>required</th>
            <th>default</th>
            <th>description</th>
        </tr>
    );

    const docgen = element.__docgenInfo; // eslint-disable-line no-underscore-dangle
    if (!docgen) {
        console.error('found no docgeninfo on:', element); // eslint-disable-line no-console
        return () => null;
    }

    const description = docgen.description;
    const content = Object.keys(docgen.props)
        .sort()
        .map((propName) => ({ propName, ...docgen.props[propName] }))
        .map((prop) => (
            <tr key={prop.propName}>
                <td>{prop.propName}</td>
                <td>{prop.type.name}</td>
                <td>{prop.required.toString()}</td>
                <td>{(prop.defaultValue && prop.defaultValue.value) || '–'}</td>
                <td>
                    <ReactMarkdown renderers={renderers} source={prop.description || '–'} />
                </td>
            </tr>
        ));

    return () => (
        <div className="proptypes-section">
            <h3>Proptypes: {componentName(element)}</h3>
            <p><ReactMarkdown renderers={renderers} source={description} /></p>
            <table>
                <thead>
                    {header}
                </thead>
                <tbody>
                    {content}
                </tbody>
            </table>
        </div>
    );
}

const Proptypes = (element) => titleHoc(`Proptypes: ${componentName(element)}`, ProptypesComponent(element));

export const JSDokumentasjon = (pkg, readme, element, source) => {
    // Installasjon temporarily commented out due to duplicate install instructions, replace line under when fixed:
    // const informasjon = Group(Innstallasjon(pkg), HrComponent, Readme(readme)).withTitle('Dokumentasjon');
    const informasjon = Group(HrComponent, Readme(readme)).withTitle('Dokumentasjon');
    const reactvisning = source ? (
            Group(
                Collapsable(RawView(source, 'javascript').withTitle('Kildekode')), Proptypes(element)
            ).withTitle('React')
        ) : (
            Group(ReactView, Proptypes(element)).withTitle('React')
        );

    return Group(
        Collapsable(informasjon),
        Tabbable(reactvisning, HtmlView, CssView)
    );
};

export const LESSDokumentasjon = (pkg, readme) => Group(
    // Installasjon temporarily commented out due to duplicate install instructions, replace line under when fixed:
    // Inline(Group(Innstallasjon(pkg), HrComponent, Readme(readme)).withTitle('Dokumentasjon')),
    Inline(Group(HrComponent, Readme(readme)).withTitle('Dokumentasjon')),
    Tabbable(HtmlView, CssView)
);
