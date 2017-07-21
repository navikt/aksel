import DOMPurify from 'dompurify';
import prettifyXml from 'prettify-xml';
import { renderComponentWithModifiersAndChildren } from './render.utils';

export const sanitizeHtml = (html) => {
    return DOMPurify.sanitize(html);
};

export const getShallowComponent = (component, modifiers) => (renderComponentWithModifiersAndChildren(component, modifiers, '', true));

export const getHtmlCodeForComponent = (component, activeModifiers) => {
    const shallowComponent = getShallowComponent(component, activeModifiers);
    const html = shallowComponent.html();
    const prettifiedHtml = prettifyXml(html);
    const sanitizedHtml = sanitizeHtml(prettifiedHtml);
    return sanitizedHtml;
};

export const getReactCodeForComponent = (component, activeModifiers) => {
    const shallowComponent = getShallowComponent(component, activeModifiers);
    console.log(shallowComponent);
    return shallowComponent.text();
};

export const getCSSCodeForComponent = (component, activeModifiers) => {
    // todo: get css for comp
    return getHtmlCodeForComponent(component,activeModifiers);
};