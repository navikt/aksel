import React from 'react';
import Language from './Language.mdx';
import MdxContent from './../../../components/mdx-content/MdxContent';
import './styles.less';

const LanguagePage = () => (
    <React.Fragment>
        <MdxContent>{Language}</MdxContent>
    </React.Fragment>
);

export default LanguagePage;
