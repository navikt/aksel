import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
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
        return (this.renderMdContent());
    }
}

MdContent.propTypes = {
    content: PropTypes.string.isRequired,
    typography: PropTypes.string
};

MdContent.defaultProps = {
    typography: 'normal'
};

export default MdContent;
