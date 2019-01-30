import React from 'react';
import Icons from './Icons.mdx'
import MdxContent from './../../../components/mdx-content/MdxContent';
import './styles.less';

class IconsPage extends React.Component {
    render() {
        return (
            <React.Fragment>
                <MdxContent>{Icons}</MdxContent>
            </React.Fragment>
        );
    }
}

export default IconsPage;
