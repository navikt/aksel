import React from 'react';
import ReactDOM from 'react-dom';
import DOMPurify from 'dompurify';
import prettifyXml from 'prettify-xml';
import { renderComponentWithModifiersAndChildren } from './render.utils';
import jsxToString from 'jsx-to-string';

export const sanitizeHtml = (html) => {
    return DOMPurify.sanitize(html);
};

export const getShallowComponent = (component, modifiers, children) => (renderComponentWithModifiersAndChildren(component, modifiers, children, true));

export const getHtmlCodeForComponent = (component, activeModifiers, children) => {
    const shallowComponent = getShallowComponent(component, activeModifiers, children);
    const html = shallowComponent.html();
    const prettifiedHtml = prettifyXml(html);
    const sanitizedHtml = sanitizeHtml(prettifiedHtml);
    return sanitizedHtml;
};

export const getReactCodeForComponent = (component, activeModifiers, children) => {
    const jsxMainComponent = renderComponentWithModifiersAndChildren(component, activeModifiers, children);
    return jsxToString(jsxMainComponent);
};

export const getCSSCodeForComponent = (domRef) => {
    console.log('Got domRef', domRef);
    return '.someClazz { background-color: white; }';
};