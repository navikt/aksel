import React from 'react';
import {
    Innholdstittel,
    Undertittel,
    Normaltekst,
    Ingress
} from './../../../../../packages/node_modules/nav-frontend-typografi';

function HowWeWrite() {
    return (
        <div className="howWeWritePage">
            <Ingress>
                NAVs tekster leses av alle lag av befolkningen i alle mulige slags situasjoner.
                Derfor må tekstene våre være utformet slik at de er lett å forstå.
                På Navet finner du retningslinjene <a className="lenke" href="/">Slik skriver vi i NAV.</a>
                De hjelper deg å skrive klart og tydelig.
            </Ingress>
        </div>
    )
}