import React from 'react';

import Lenkepanel from './../../../../../../../packages/node_modules/nav-frontend-lenkepanel';
import { Systemtittel } from './../../../../../../../packages/node_modules/nav-frontend-typografi';

import PropTypeTable from './../../../../components/prop-type-table/PropTypeTable';

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
        console.log(this.props);

        // eslint-disable-next-line no-underscore-dangle
        const docgenInfo = this.props.componentData.__docgenInfo;

        return (
            <React.Fragment>
                <section className="section full">
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
                                <td>{Object.keys(this.props.componentData.pkg.peerDependencies).map((dep, i) => [<a key={i} href="#">{dep}</a>, ' '])}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                <section className="section full">
                    { this.renderInstallInstructions() }
                </section>
                <section className="section full">
                    {
                        docgenInfo &&
                        docgenInfo.props &&
                        this.renderReactSpecificDoc(docgenInfo)
                    }
                </section>
            </React.Fragment>
        );
    }
}

export default Technical;
