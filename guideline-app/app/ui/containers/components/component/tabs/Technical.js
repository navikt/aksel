import React from 'react';
import classnames from 'classnames';

import Lenkepanel from './../../../../../../../packages/node_modules/nav-frontend-lenkepanel';
import { Systemtittel } from './../../../../../../../packages/node_modules/nav-frontend-typografi';

import ModuleBrowser from './../../../../components/module-browser/ModuleBrowser';

class Technical extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            activeModule: 0
        };

        console.log(props);
    }

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
        const docgenInfo = this.props.componentData.mainModule.__docgenInfo;

        return (
            <React.Fragment>
                <section className="section full">
                    <h2>NPM-pakke</h2>
                    <table>
                        <tbody>
                            <tr>
                                <th>Navn:</th>
                                <td>
                                    <a href={`https://www.npmjs.com/package/${this.props.componentData.manifest.name}`}>
                                        {this.props.componentData.manifest.name}
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <th>Siste versjon:</th>
                                <td>
                                    <a href={`https://www.npmjs.com/package/${this.props.componentData.manifest.name}?activeTab=versions`}>
                                        {this.props.componentData.manifest.version}
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <th>Peer&nbsp;dependencies:</th>
                                <td className="dependencies">
                                    {
                                        Object.keys(this.props.componentData.manifest.peerDependencies).map((dep, i) => {
                                            return [<a key={i} href={`https://www.npmjs.com/package/${dep}`}>{dep}</a>, ' '];
                                        })
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                <section className="section full">
                    { this.renderInstallInstructions() }
                </section>
                <section className="section full">
                    <ModuleBrowser data={this.props.componentData} package={this.props.componentData.manifest} />
                </section>
            </React.Fragment>
        );
    }
}

export default Technical;
