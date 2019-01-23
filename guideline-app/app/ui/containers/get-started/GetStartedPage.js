import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { LenkepanelBase } from 'NavFrontendModules/nav-frontend-lenkepanel';

import './styles.less';

class GetStartedPage extends React.Component {
    render() {
        console.log(this.props.history);

        return (
            <article className="mainContent mainContent--grey getStartedWrapper">
                <section className="aboutWrapper">
                    Hello
                </section>
                <section className="actionsWrapper">
                    <section className="grid">
                        <LenkepanelBase href="https://github.com/navikt/nav-frontend-moduler/tree/master/examples" border>
                            <section>
                                <h2>Start et nytt prosjekt</h2>
                                <p>
                                    Her finner du veiledning for hvordan du går frem for å starte et nytt prosjekt som bruker frontend-rammeverket.
                                </p>
                            </section>
                        </LenkepanelBase>
                        <LenkepanelBase
                            linkCreator={(props) => <NavLink className="lenkepanel lenkepanel--border" to={props.href}>{props.children}</NavLink>}
                            href="/components"
                            border
                        >
                            <section>
                                <h2>Utforsk komponenter</h2>
                                <p>
                                    Se forhåndsvisninger og kode-eksempler for alle våre komponenter.
                                </p>
                            </section>
                        </LenkepanelBase>
                        <LenkepanelBase href="https://github.com/erlendev/nav-frontend-moduler/blob/master/guideline-app/README.developer.md" border>
                            <section>
                                <h2>Bidra med kode</h2>
                                <p>
                                    Her finner du veiledning for hvordan du kan bidra til den åpne kodebasen vår på Github.
                                </p>
                            </section>
                        </LenkepanelBase>
                        <LenkepanelBase
                            linkCreator={(props) => <NavLink className="lenkepanel lenkepanel--border" to={props.href}>{props.children}</NavLink>}
                            href="/community"
                            border
                        >
                            <section>
                                <h2>Bli med i diskusjonen</h2>
                                <p>
                                    Har du forslag til forbedringer, eller bare noen spørsmål? Diskutèr med oss her.
                                </p>
                            </section>
                        </LenkepanelBase>
                    </section>
                </section>
            </article>
        );
    }
}

export default withRouter(GetStartedPage);
