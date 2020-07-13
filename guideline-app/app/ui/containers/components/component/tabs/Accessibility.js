import React from 'react';
import MdxContent from '../../../../components/mdx-content/MdxContent';

class Accessibility extends React.Component {
    render() {
        if (this.props.textData.accessibility) {
            return (
                <MdxContent>{this.props.textData.accessibility.default}</MdxContent>
            );
        }

        return 'Ingen informasjon.';
    }
}

export default Accessibility;
