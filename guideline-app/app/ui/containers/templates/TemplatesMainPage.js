import React from 'react';

import Panel from './../../../../../packages/node_modules/nav-frontend-paneler';

import './styles.less';

const TemplatesMainPage = () => (
    <article className="mainContent mainContent--grey templatesWrapper">
        <section className="content">
            <Panel border>
                <h2>Maler kommer</h2>
                <p>
                    Vi jobber med å lage flere større eksempler på side-typer og maler som skal vise hvordan
                    man kan bruke og kombinere komponenter i en større sammenheng. I dette arbeidet vil vi 
                    bl.a. hente eksempler fra allerede eksisterende/pågående prosjekter i NAV.
                </p>
                <p>
                    <strong>Merk at disse malene kun er ment som forslag og eksempler på bruk, og skal ikke være
                    strenge regler for hvordan alle sidene på NAV må se ut.</strong>
                </p>
            </Panel>
        </section>
    </article>
);

export default TemplatesMainPage;
