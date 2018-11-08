import React from 'react';
import MdxContent from './../../../../components/mdx-content/MdxContent';

class Overview extends React.Component {
    render() {
        console.log(this.props);
        if (this.props.textData['overview']) {
            return (
                <section className="section" ref={node => this.node = node}>
                    <MdxContent>{this.props.textData.overview.default}</MdxContent>
                </section>
            )
        } 

        return 'Ingen informasjon.';
    }
}

export default Overview;