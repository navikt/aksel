import React from 'react';
import Accessibility from './Accessibility.mdx';
import MdxContent from './../../../components/mdx-content/MdxContent';
// import './styles.less';

class AccessibilityPage extends React.Component {
    render() {
        return (
            <React.Fragment>
                <MdxContent>{Accessibility}</MdxContent>
            </React.Fragment>
        );
    }
}

export default AccessibilityPage;
