import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import { LenkepanelBase } from 'NavFrontendModules/nav-frontend-lenkepanel';
import { Systemtittel } from 'NavFrontendModules/nav-frontend-typografi';

import './styles.less';

const GetStartedPage = () => (
    <article className="mainContent mainContent--grey">
        <section className="actionsWrapper">
            <div className="grid">
                <LenkepanelBase
                    linkCreator={(props) => (
                        <NavLink
                            className="lenkepanel lenkepanel--border"
                            to={props.href}
                        >
                            {props.children}
                        </NavLink>
                    )}
                    href="/resources/new-project"
                    border
                >
                    <div>
                        <Systemtittel>Start et nytt prosjekt</Systemtittel>
                        <p>
                            Her finner du veiledning for hvordan du går frem for å starte et nytt prosjekt som
                            bruker Designsystemet.
                        </p>
                    </div>
                </LenkepanelBase>
                <LenkepanelBase
                    linkCreator={(props) => (
                        <NavLink
                            className="lenkepanel lenkepanel--border"
                            to={props.href}
                        >
                            {props.children}
                        </NavLink>
                    )}
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
                <LenkepanelBase
                    href="https://github.com/navikt/nav-frontend-moduler/blob/master/README.md"
                    border
                >
                    <div>
                        <Systemtittel>Bidra med kode</Systemtittel>
                        <p>
                            Her finner du veiledning for hvordan du kan bidra til den åpne kodebasen vår på
                            Github.
                        </p>
                    </div>
                </LenkepanelBase>
                <LenkepanelBase
                    linkCreator={(props) => (
                        <NavLink
                            className="lenkepanel lenkepanel--border"
                            to={props.href}
                        >
                            {props.children}
                        </NavLink>
                    )}
                    href="/community"
                    border
                >
                    <div>
                        <Systemtittel>Bli med i diskusjonen</Systemtittel>
                        <p>
                            Har du forslag til forbedringer, eller bare noen spørsmål? Diskuter med oss her.
                        </p>
                    </div>
                </LenkepanelBase>
            </div>
        </section>
    </article>
);

export default withRouter(GetStartedPage);
