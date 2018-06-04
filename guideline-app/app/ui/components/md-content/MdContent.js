import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { AlertStripeInfo } from './../../../../../packages/node_modules/nav-frontend-alertstriper';
import './styles.less';

class MdContent extends React.Component {
    renderMdContent = () => (
        <ReactMarkdown
            source={this.props.content}
            className={`mdContent mdContent--${this.props.typography}`}
            containerTagName="div"
            allowedTypes={['Paragraph', 'Heading', 'Image', 'List', 'Item', 'Text', 'Link']}
        />
    );

    render() {
        const helpUrl = 'https://github.com/erlendev/nav-frontend-moduler/blob/master/guideline-app/README.design.md';
        const placeholderText = (
            <div className="mdContent mdContent--normal">
                <AlertStripeInfo>
                    Tekst mangler. Se <a href={helpUrl}>denne oppskriften</a> for informasjon om hvordan du kan
                    hjelpe oss og bidra med tekster.
                </AlertStripeInfo>
            </div>
        );

        return ((this.props.content || !this.props.warn) ? this.renderMdContent() : placeholderText);
    }
}

MdContent.propTypes = {
    content: PropTypes.string.isRequired,
    typography: PropTypes.string,
    warn: PropTypes.boolean
};

MdContent.defaultProps = {
    typography: 'normal',
    warn: false
};

export default MdContent;
