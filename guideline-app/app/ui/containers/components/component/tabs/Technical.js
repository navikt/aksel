import React from 'react';

import Lenkepanel from './../../../../../../../packages/node_modules/nav-frontend-lenkepanel';
import { Systemtittel } from './../../../../../../../packages/node_modules/nav-frontend-typografi';

import PropTypeTable from './../../../../components/prop-type-table/PropTypeTable';
// import Sample from './../common/Sample';
// import CodeExample from '../developers/code-example/CodeExample';

class Technical extends React.Component {

    renderReactSpecificDoc = (doc) => (
        <div className="react-doc">
            <h2>React props</h2>
            <p>{ doc.description }</p>
            <PropTypeTable docgenInfo={doc} />
        </div>
    );

    renderInstallInstructions = () => (
        <div className="install-doc">
            <h2>Installering</h2>
            <pre>
                <code className="hljs">
                    { this.props.componentData.installInstructions }
                </code>
            </pre>
        </div>
    );

    render() {
        // eslint-disable-next-line no-underscore-dangle
        const docgenInfo = this.props.componentData.__docgenInfo || this.props.activeType.component.__docgenInfo;
        // eslint-disable-next-line react/prop-types, max-len
        const isImplementedInReact = !this.props.componentData.tabOptions || !this.props.componentData.tabOptions.react || this.props.componentData.tabOptions.react.show !== false;

        return (
            <section className="section">
                {/*
                <h2>Live demo</h2>

                <section className="section">
                    <Sample {... this.props} />
                    <CodeExample {... this.props} />
                </section>
                */}

                <h2>Detaljer</h2>

                <table>
                    <tbody>
                        <tr>
                            <th>Pakkenavn:</th>
                            <td>{this.props.componentData.pkg.name}</td>
                        </tr>
                        <tr>
                            <th>Versjon:</th>
                            <td>{this.props.componentData.pkg.version}</td>
                        </tr>
                        <tr>
                            <th>Peer&nbsp;dependencies:</th>
                            <td>{Object.keys(this.props.componentData.pkg.peerDependencies).map((dep) => [<a href="#">{dep}</a>, ' '])}</td>
                        </tr>
                    </tbody>
                </table>

                { this.renderInstallInstructions() }
                {
                    docgenInfo &&
                    docgenInfo.props &&
                    isImplementedInReact &&
                    this.renderReactSpecificDoc(docgenInfo)
                }
            </section>
        );
    }
}

export default Technical;
