import React from 'react';

import Lenke from 'NavFrontendModules/nav-frontend-lenker';
import { Systemtittel } from 'NavFrontendModules/nav-frontend-typografi';
import Hjelpetekst from 'NavFrontendModules/nav-frontend-hjelpetekst';
import Panel from 'NavFrontendModules/nav-frontend-paneler';
import Tabs, { Tab } from 'NavFrontendModules/nav-frontend-tabs';

import ModuleBrowser from './../../../../components/module-browser/ModuleBrowser';
import { Bash } from './../../../../components/code/Code';

class Technical extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            activeTab: 0
        };

        this.isStyle = (this.props.componentData.manifest.name.indexOf('-style') !== -1);

        this.tabs = this.getTabs();

        this.installInstructions = [
            `npm install ${this.props.componentData.dependencies.join(' ')} --save`,
            `npm install ${this.props.componentData.dependencies.filter(
                (dep) => dep.indexOf('-style') !== -1 || dep.indexOf('-core') !== -1
            ).join(' ')} --save`
        ];
    }

    getTabs = () => {
        if (this.isStyle) return ['Kun Less'];
        return [
            'React + Less',
            'Kun Less'
        ];
    }

    toggleInstallInstructions = () => {
        this.setState({
            activeTab: (this.state.activeTab) ? 0 : 1
        });
    }

    renderInstallInstructions = () => (
        <div className="install-doc">
            <Systemtittel id="install">
                Installering
                <Hjelpetekst>
                    De fleste komponentene våre består av en React-pakke og en tilhørende Less-pakke. React-pakkene
                    er avhengige av Less-pakkene, men ikke motsatt. Det betyr at du kan velge å installere kun
                    Less-pakkene hvis du f.eks. vil bruke et Javascript-rammeverk som er inkompatibelt med React -
                    eller hvis du av andre grunner ønsker å håndtere HTML og Javascript selv.
                </Hjelpetekst>
            </Systemtittel>
            <Tabs
                onChange={this.toggleInstallInstructions}
            >
                {this.getTabs().map((tab) => <Tab key={tab} label={tab} />)}
            </Tabs>
            <Panel border>
                <Bash>{ this.installInstructions[this.state.activeTab] }</Bash>
            </Panel>
        </div>
    );

    render() {
        const { name, version } = this.props.componentData.manifest;

        return (
            <React.Fragment>
                <section className="section full">
                    <Systemtittel id="npm-pakke">NPM-pakke</Systemtittel>
                    <table className="tabell">
                        <tbody>
                            <tr>
                                <th>Navn:</th>
                                <td>
                                    <Lenke href={`https://www.npmjs.com/package/${name}`}>
                                        {name}
                                    </Lenke>
                                </td>
                            </tr>
                            <tr>
                                <th>Siste versjon:</th>
                                <td>
                                    <Lenke href={`https://www.npmjs.com/package/${name}?activeTab=versions`}>
                                        {version}
                                    </Lenke>
                                </td>
                            </tr>
                            <tr>
                                <th>Peer&nbsp;dependencies:</th>
                                <td className="dependencies">
                                    {
                                        Object.keys(this.props.componentData.manifest.peerDependencies).map((dep) =>
                                            [
                                                <Lenke
                                                    key={dep}
                                                    href={`https://www.npmjs.com/package/${dep}`}
                                                >
                                                    {dep}
                                                </Lenke>,
                                                ' '
                                            ]
                                        )
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
                    {
                        this.props.componentData.packageModules &&
                        <ModuleBrowser data={this.props.componentData} package={this.props.componentData.manifest} />
                    }
                </section>
            </React.Fragment>
        );
    }
}

export default Technical;
