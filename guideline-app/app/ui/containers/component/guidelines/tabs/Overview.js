import React from 'react';

import Sample from './../common/Sample';

import Panel from './../../../../../../../packages/node_modules/nav-frontend-paneler';

class Overview extends React.Component {

    /*
    <div className="sample">
        <h2>{example.title || 'Default'}</h2>
        { example.text && <p>{example.text}</p> }
        <Panel border style={{padding:'3rem'}}>
            <this.props.componentData.baseType {...example.attrs} />
        </Panel>
    </div>
    */

    render() {
        return (
            <section>
                <Sample {...this.props} />
                {/*
                    this.props.componentData.examples.map((example, index) => (
                        <this.props.componentData.baseType {...example.attrs} />
                    ))
                */}
            </section>
        );
    }
}

export default Overview;