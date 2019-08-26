import React from 'react';

import { Innholdstittel, Ingress } from 'NavFrontendModules/nav-frontend-typografi';
import { EtikettFokus } from 'NavFrontendModules/nav-frontend-etiketter';

import Overview from './tabs/Overview';
import Technical from './tabs/Technical';
import Accessibility from './tabs/Accessibility';
import Discussion from './tabs/Discussion';

import TabbedContainer from './../../tabbed-container/TabbedContainer';

import './styles.less';

class ComponentGuidelinePage extends React.Component {
    constructor(props) {
        super(props);

        this.tabs = [
            {
                label: 'Oversikt',
                content: Overview
            },
            {
                id: 'technical',
                label: 'Teknisk',
                content: Technical
            },
            {
                id: 'accessibility',
                label: 'Tilgjengelighet',
                content: Accessibility
            },
            {
                id: 'discussion',
                label: 'Diskusjon',
                content: Discussion
            }
        ];
    }

    render() {
        console.log(this.props);
        return (
            <div className="componentGuidelinePage">
                <div className="componentTitle">
                    <Innholdstittel>
                        {this.props.componentData.name}
                    </Innholdstittel>
                    {
                        (this.props.componentData.manifest.version.indexOf('beta') !== -1) &&
                        <EtikettFokus>Beta</EtikettFokus>
                    }
                </div>
                {
                    this.props.textData.ingress &&
                    <Ingress tag="div" className="intro"><this.props.textData.ingress.default /></Ingress>
                }
                {/*<EtikettFokus>Beta</EtikettFokus>*/}
                <TabbedContainer tabs={this.tabs} {...this.props} />
            </div>
        );
    }
}

export default ComponentGuidelinePage;
