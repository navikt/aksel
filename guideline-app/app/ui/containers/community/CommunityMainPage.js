import React from 'react';

import Panel from 'NavFrontendModules/nav-frontend-paneler';
import Lenke from 'NavFrontendModules/nav-frontend-lenker';
import { Systemtittel } from 'NavFrontendModules/nav-frontend-typografi';

import '../templates/styles.less';

const issueUrl = 'https://github.com/navikt/nav-frontend-moduler/issues';

const CommunityMainPage = () => (
    <article className="mainContent mainContent--grey templatesWrapper">
        <section className="content">
            <Panel border>
                <Systemtittel>Diskusjonsforum kommer</Systemtittel>
                <p>
                    Vi jobber med å sette opp et forum på disse sidene hvor man kan stille spørsmål og få svar, foreslå
                    endringer eller bare snakke løst om designsystemet på en ordnet og oversiktlig måte. Før dette er
                    på plass kan dere gjerne <Lenke href={issueUrl}>bruke Github</Lenke> til å opprette saker og
                    diskutere der.
                </p>
            </Panel>
        </section>
    </article>
);

export default CommunityMainPage;
