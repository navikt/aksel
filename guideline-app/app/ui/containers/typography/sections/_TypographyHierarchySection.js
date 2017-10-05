import React from 'react';
import PT from 'prop-types';

import {
    Normaltekst,
    Undertittel
} from './../../../../../../packages/node_modules/nav-frontend-typografi';

import {
    Row,
    Column
} from './../../../../../../packages/node_modules/nav-frontend-grid';

import { TypographyHierarchyData as samples } from '../../../../data/index';
import SectionTitle from './../../../components/section-title/SectionTitle';

const TypographyHierarchySection = (props) => {
    const renderDescription = () => (
        <Row>
            <Column xs="10">
                <div className="description">
                    <Normaltekst>
                        Hierarkiet er inspirert i typografisk tradisjon ved å gi en bestemt størrelse i en font et
                        bestemt navn. Tankegangen med dette navnigving valg, i vår tillfelle, er å etablere en
                        felles domene som vi kan brukeepå tverrs av rollene og spesialiteter. Det fungerer også som
                        en referanse for designere og utviklere for å velge forskjellige størrelser i riktig sted.
                    </Normaltekst>
                </div>
            </Column>
        </Row>
    );

    const renderSampleHeaders = () => (
        <Row style={{ marginTop: '48px' }}>
            <Column xs="4">
                <Undertittel>Typografisk Hierarki - desktop</Undertittel>
            </Column>
            <Column xs="4">
                <Undertittel>Typografisk Hierarki - mobil</Undertittel>
            </Column>
        </Row>
    );

    const renderSamples = (data) => (
        <div>
            {
                data.map((sample) => (
                    <Sample
                        component={sample.component}
                        label={sample.label}
                        subtext={sample.subtext}
                        key={sample.label}
                    />
                ))
            }
        </div>
    );

    return (
        <div {... props}>
            <SectionTitle title="Typografisk Hierarki" />

            { renderDescription() }
            { renderSampleHeaders() }

            <Row>
                <Column xs="4" className="typographyHierarchySection__hierarchySamples">
                    { renderSamples(samples.desktop) }
                </Column>

                <Column
                    xs="4"
                    // eslint-disable-next-line max-len
                    className="typographyHierarchySection__hierarchySamples typographyHierarchySection__hierarchySamples--framed"
                >
                    { renderSamples(samples.mobile) }
                </Column>
            </Row>
        </div>
    );
};

const Sample = (props) => (
    <div>
        <props.component>{props.label}</props.component>
        <span>{props.subtext}</span>
    </div>
);

Sample.propTypes = {
    label: PT.string.isRequired,
    subtext: PT.string.isRequired
};

export default TypographyHierarchySection;
