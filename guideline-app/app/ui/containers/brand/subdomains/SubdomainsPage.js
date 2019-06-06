import React from 'react';
import Subdomains from './Subdomains.mdx';
import MdxContent from './../../../components/mdx-content/MdxContent';
import './styles.less';

const SubdomainsPage = () => (
    <React.Fragment>
        <MdxContent>{Subdomains}</MdxContent>
    </React.Fragment>
);

export default SubdomainsPage;
