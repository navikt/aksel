import React from 'react';
import { NavLink, Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Alertstripe from 'NavFrontendModules/nav-frontend-alertstriper';
import Panel from 'NavFrontendModules/nav-frontend-paneler';
import Knapp, { Flatknapp } from 'NavFrontendModules/nav-frontend-knapper';
import Lenkepanel, { LenkepanelBase } from 'NavFrontendModules/nav-frontend-lenkepanel';
import { Innholdstittel, Systemtittel, Undertittel, Ingress } from 'NavFrontendModules/nav-frontend-typografi';
import EtikettBase, { EtikettFokus } from 'NavFrontendModules/nav-frontend-etiketter';

import './styles.less';

class GetStartedPage extends React.Component {
    render() {
        return (
            <article className="mainContent mainContent--grey">
                <section className="actionsWrapper">
                    <div className="container container--start">
                        <div className="grid">
                            <LenkepanelBase
                                linkCreator={(props) => <NavLink className="lenkepanel lenkepanel--border" to={props.href}>{props.children}</NavLink>}
                                href="/resources/new-project"
                                border
                            >
                                <div>
                                    <Systemtittel>Start et nytt prosjekt</Systemtittel>
                                    <p>
                                        Her finner du veiledning for hvordan du går frem for å starte et nytt prosjekt som bruker Designsystemet.
                                    </p>
                                </div>
                            </LenkepanelBase>
                            <LenkepanelBase
                                linkCreator={(props) => <NavLink className="lenkepanel lenkepanel--border" to={props.href}>{props.children}</NavLink>}
                                href="/components"
                                border
                            >
                                <div>
                                    <Systemtittel>Utforsk komponenter</Systemtittel>
                                    <p>
                                        Se forhåndsvisninger og kode-eksempler for alle våre komponenter.
                                    </p>
                                </div>
                            </LenkepanelBase>
                            <LenkepanelBase href="https://github.com/erlendev/nav-frontend-moduler/blob/master/guideline-app/README.developer.md" border>
                                <div>
                                    <Systemtittel>Bidra med kode</Systemtittel>
                                    <p>
                                        Her finner du veiledning for hvordan du kan bidra til den åpne kodebasen vår på Github.
                                    </p>
                                </div>
                            </LenkepanelBase>
                            <LenkepanelBase
                                linkCreator={(props) => <NavLink className="lenkepanel lenkepanel--border" to={props.href}>{props.children}</NavLink>}
                                href="/community"
                                border
                            >
                                <div>
                                    <Systemtittel>Bli med i diskusjonen</Systemtittel>
                                    <p>
                                        Har du forslag til forbedringer, eller bare noen spørsmål? Diskutèr med oss her.
                                    </p>
                                </div>
                            </LenkepanelBase>
                        </div>
                    </div>
                </section>
            </article>
        );
    }
}

export default withRouter(GetStartedPage);
