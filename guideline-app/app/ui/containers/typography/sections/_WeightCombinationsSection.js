import React from 'react';

import {
    Normaltekst,
    Innholdstittel,
    Undertittel
} from './../../../../../../packages/node_modules/nav-frontend-typografi';

import {
    Row,
    Column
} from './../../../../../../packages/node_modules/nav-frontend-grid';

import SectionTitle from './../../../components/section-title/SectionTitle';

const WeightCombinationsSection = (props) => (
    <div className="weightCombinationsSection" {... props}>
        <Innholdstittel>Vektkombinasjoner</Innholdstittel>
        <hr/>

        <Row className="weightCombinationsSection__example">
            <Column xs="12">
                <Normaltekst>Norske Folkeeventyr</Normaltekst>
            </Column>
            <Column xs="12">
                <Innholdstittel>En gammeldags juleaften</Innholdstittel>
            </Column>
        </Row>

        <Row className="weightCombinationsSection__example">
            <Column xs="12">
                <Normaltekst>
                    01.09.16 /
                    <b style={{ fontSize: '14px' }}> Viktig informasjon</b>
                </Normaltekst>
            </Column>
            <Column xs="12">
                <Undertittel>En gammeldags juleaften</Undertittel>
                <Normaltekst>
                    Veggene var prydet med oljemalerier, portretter av stive damer med pudrede koafyrer, av
                    Oldenborgere og andre berømmelige personer i panser og plate eller røde kjoler.
                </Normaltekst>
            </Column>
        </Row>

        <Row className="weightCombinationsSection__example">
            <Column xs="12">
                <Undertittel>En gammeldags juleaften</Undertittel>
                <Normaltekst>(1841-1844) – Peter Christen Asbjørnsen</Normaltekst>
            </Column>
        </Row>
    </div>
);

export default WeightCombinationsSection;
