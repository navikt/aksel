import React from 'react';
import PropTypes from 'prop-types';
import './../../../../../packages/node_modules/nav-frontend-lenker-style';

import { sanitizeHtml } from './../../../utils/dom/code-sampling.utils';

import './styles.less'

const navFrontendifyHtml = (html) => (
    html
        .replace(/<a/g, '<a class="lenke" ')
        .replace(/<h4/g, '<p class="typo-element" ')
        .replace(/<\/h4/g, '<\/p')
);

export const MdContent = (props) => {
    const paragraphs = props.content
        .split(/\n\n/g)
        .filter(
            (paragraph) =>
                (paragraph && paragraph.length > 0)
        );

    const renderMdContentWrappedInComponent = (html, key) => (
        <props.component dangerouslySetInnerHTML={ ({ __html: html }) } key={ key } />
    );

    const renderMdContentWrappedInDiv = (html, key) => (
        <div dangerouslySetInnerHTML={ ({ __html: html }) } key={ key }></div>
    );

    const renderMdContent = () => (
        <div className="mdContent">
            {
                paragraphs.map((paragraph, i) => {
                    let sanitizedHtml = sanitizeHtml(
                        paragraph,
                        { ALLOWED_TAGS: props.allowedTags || ['a', 'ul', 'ol', 'li'] }
                    );
                    sanitizedHtml = navFrontendifyHtml(sanitizedHtml);

                    if (props.component) {
                        return renderMdContentWrappedInComponent(sanitizedHtml, i);
                    }
                    else {
                        return renderMdContentWrappedInDiv(sanitizedHtml, i);
                    }
                })


            }
        </div>
    );

    return (renderMdContent());
};

MdContent.propTypes = {
    content: PropTypes.string.isRequired
};