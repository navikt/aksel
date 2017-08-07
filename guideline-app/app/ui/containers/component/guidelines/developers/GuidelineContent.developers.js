import React, { Component } from 'react';

import { Normaltekst, Systemtittel } from './../../../../../../../packages/node_modules/nav-frontend-typografi';
import { CodeExample } from './code-example/CodeExample';
import { PropTypeList } from './../../../../components/prop-type-list/PropTypeList';

import './styles.less';

export class GuidelineContentForDevelopers extends Component {

    renderReactSpecificDoc(doc) {
        return (
            <div className="react-doc">
                <Systemtittel>
                    PropTypes
                </Systemtittel>
                <Normaltekst>
                    { doc.description }
                </Normaltekst>
                <PropTypeList docgenInfo={ this.props.componentData.__docgenInfo } />
            </div>
        );
    }

    render() {
        const isImplementedInReact = this.props.componentData.react !== false;
        const docgenInfo = this.props.componentData.__docgenInfo;

        return (
            <div className="section">


                <CodeExample
                    showReactTab={ isImplementedInReact }
                    { ... this.props }
                />

                {
                    docgenInfo !== null &&
                    isImplementedInReact &&
                    this.renderReactSpecificDoc(docgenInfo)
                }
            </div>
        )
    }

}
