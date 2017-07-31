import React from 'react';
import DOMPurify from 'dompurify';
import prettifyXml from 'prettify-xml';
import { renderComponentWithModifiersAndChildren } from './render.utils';
import jsxToString from 'jsx-to-string';
const beautify_css = require('js-beautify').css;


export const sanitizeHtml = (html, options = {}) => {
    return DOMPurify.sanitize(html, options);
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


const getMatchingCSSRulesForElement = (el, css = el.ownerDocument.styleSheets) => {
    const stylesheets = [ ... css ];
    const rules = stylesheets
        .map((stylesheet) =>
            [ ... stylesheet.cssRules || [], ... stylesheet.rules || [] ]
        )
        .reduce((someRules, someOtherRules) =>
            [ ... someRules, ... someOtherRules ]
        );
    return rules.filter(rule => rule && rule.selectorText && el.matches(rule.selectorText));
};

const getMatchingCSSRulesForElementWithChildren = (el) => {
    const allElements = [ el, ... el.querySelectorAll('*') ];
    const stylesheetRoot = el.styleSheets;

    return allElements
        .map((element) => ([ ... getMatchingCSSRulesForElement(element, stylesheetRoot) ]))
        .filter((element) => (element))
        .reduce((rules, otherRules) => [ ... rules, ... otherRules ]);
};

export const getCSSCodeForComponent = (domRef) => {
    const rules = getMatchingCSSRulesForElementWithChildren(domRef);
    let cssTexts = [];
    rules.forEach((rule) => {
        if (cssTexts.indexOf(rule.cssText) <= -1) {
            cssTexts.push(rule.cssText);
        }
    });

    const cssText = cssTexts.join(' ');
    return (beautify_css(cssText));
};