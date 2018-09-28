import React from 'react';

import Panel from './../../../../../packages/node_modules/nav-frontend-paneler';

import '../templates/styles.less';

const CommunityMainPage = () => (
    <article className="mainContent templatesWrapper">
        <section className="content">
            <Panel border>
                <h2>Diskusjonsforum kommer</h2>
                <p>
                    Vi jobber med å sette opp et forum på disse sidene hvor man kan stille spørsmål og få svar, foreslå endringer 
                    eller bare snakke løst om designsystemet på en ordnet og oversiktlig måte. Før dette er på plass kan dere 
                    gjerne <a href="https://github.com/navikt/nav-frontend-moduler/issues">bruke Github</a> til å opprette saker
                    og diskutere der.
                </p>
                <p>
                    Vi kommer mest sannsynlig til å bruke <a href="https://www.discourse.org/">Discourse</a> som
                    forum-plattform.
                </p>
            </Panel>
        </section>
    </article>
);

export default CommunityMainPage;
