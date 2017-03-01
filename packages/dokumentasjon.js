/* eslint-disable react/prop-types */
import React from 'react';
import ReactMarkdown from 'react-markdown';
import titleHoc from 'react-storybook-addon-sections/dist/components/title-hoc';
import Collapsable from 'react-storybook-addon-sections/dist/components/groupings/collapsable';
import Tabbable from 'react-storybook-addon-sections/dist/components/groupings/tabbable';
import Group from 'react-storybook-addon-sections/dist/components/groupings/group';
import ReactView from 'react-storybook-addon-sections/dist/components/sections/reactview';
import HtmlView from 'react-storybook-addon-sections/dist/components/sections/htmlview';
import CssView from 'react-storybook-addon-sections/dist/components/sections/cssview';
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
    return () => (<ReactMarkdown className="readme-section" renderers={renderers} source={src}/>);
}
const Readme = (src) => titleHoc('Readme', ReadmeViewComponent(src));

function InnstallasjonComponent(pkg) {
    return () => (<div><p>Her kommer innstall data for {pkg.name}</p></div>);
}
const Innstallasjon = (pkg) => titleHoc('Innstallasjon', InnstallasjonComponent(pkg));

function HrComponent() {
    return <div style={{ borderBottom: '1px solid rgb(238, 238, 238)' }}/>
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

    const docgen = element.__docgenInfo;
    const description = docgen.description;
    const content = Object.keys(docgen.props)
        .sort()
        .map((propName) => ({ propName, ... docgen.props[propName] }))
        .map((prop) => (
            <tr key={prop.propName}>
                <td>{prop.propName}</td>
                <td>{prop.type.name}</td>
                <td>{'' + prop.required}</td>
                <td>{prop.defaultValue.value}</td>
                <td>
                    <ReactMarkdown renderers={renderers} source={prop.description || '-'}/>
                </td>
            </tr>
        ));

    return () => (
        <div className="proptypes-section">
            <h3>Proptypes: {componentName(element)}</h3>
            <p><ReactMarkdown renderers={renderers} source={description}/></p>
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

export const JSDokumentasjon = (pkg, readme, element) => Group(
    Collapsable(
        Group(
            Innstallasjon(pkg), HrComponent, Readme(readme)
        ).withTitle('Dokumentasjon')),
    Tabbable(Group(ReactView, Proptypes(element)).withTitle('React'), HtmlView, CssView)
);