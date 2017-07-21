import React, { Component } from 'react';

import { CodeExample } from './code-example/CodeExample';

export class GuidelineContentForDevelopers extends Component {

    render() {
        const showReactTab = this.props.sampleData.react !== false;
        return (
            <div className="section">
                <CodeExample
                    showReactTab={ showReactTab }
                    { ... this.props }
                />
            </div>
        )
    }

}
