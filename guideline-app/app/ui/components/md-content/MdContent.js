import React from 'react';
import PropTypes from 'prop-types';
import './../../../../../packages/node_modules/nav-frontend-lenker-style';

import { sanitizeHtml } from './../../../utils/dom/code-sampling.utils';

export const MdContent = (props) => {
    const paragraphs = props.content
        .split(/\n\n/g)
        .filter(
            (paragraph) =>
                (paragraph && paragraph.length > 0)
        );

    return (
        <div>
            {
                paragraphs.map((paragraph, i) => {
                    let sanitizedHtml = sanitizeHtml(
                        paragraph,
                        { ALLOWED_TAGS: ['a', 'ul', 'ol', 'li'] }
                    );

                    sanitizedHtml = sanitizedHtml.replace(/<a/g, '<a class="lenke" ');

                    return (
                        <props.component
                            dangerouslySetInnerHTML={
                                ({
                                    __html: sanitizedHtml
                                })
                            }
                            key={ i }
                        />
                    )
                })
            }
        </div>
    )

};

MdContent.propTypes = {
    content: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired
};