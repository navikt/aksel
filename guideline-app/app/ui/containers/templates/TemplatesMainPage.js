import React from 'react';

import Panel from 'NavFrontendModules/nav-frontend-paneler';
import { Systemtittel } from 'NavFrontendModules/nav-frontend-typografi';

import './styles.less';

const TemplatesMainPage = () => (
    <article className="mainContent mainContent--grey templatesWrapper">
        <section className="content">
            <Panel border>
                <Systemtittel>Maler kommer</Systemtittel>
                <p>
                    Vi jobber med å lage flere større eksempler som skal vise hvordan man kan bruke og kombinere
                    komponenter i en større sammenheng. Samtidig pågår det et arbeid med å lage maler for mer
                    kjente side-typer.
                </p>
                <p>
                    Mer informasjon om dette kommer.
                </p>
            </Panel>
        </section>
    </article>
);

export default TemplatesMainPage;
