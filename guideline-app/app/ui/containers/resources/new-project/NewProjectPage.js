import React from 'react';
import NewProject from './NewProject.mdx';
import MdxContent from './../../../components/mdx-content/MdxContent';
import './styles.less';

const NewProjectPage = () => (
    <div className="new-project-page">
        <MdxContent>{NewProject}</MdxContent>
    </div>
);

export default NewProjectPage;
