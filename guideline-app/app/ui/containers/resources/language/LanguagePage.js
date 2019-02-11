import React from 'react';
import Language from './Language.mdx';
import MdxContent from './../../../components/mdx-content/MdxContent';
import './styles.less';

class LanguagePage extends React.Component {
    render() {
        return (
            <React.Fragment>
                <MdxContent>{Language}</MdxContent>
            </React.Fragment>
        );
    }
}

export default LanguagePage;
