import React from 'react';
import PropTypes from 'prop-types';

import { sanitizeHtml } from './../../../utils/dom/code-sampling.utils';

export const MdContent = (props) => {
    const paragraphs = props.content
        .split(/\n/g)
        .filter(
            (paragraph) =>
                (paragraph && paragraph.length > 0)
        );

    return (
        <div>
            {
                paragraphs.map((paragraph, i) => {
                    const sanitizedHtml = sanitizeHtml(
                        paragraph,
                        { ALLOWED_TAGS: ['a'] }
                    );

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