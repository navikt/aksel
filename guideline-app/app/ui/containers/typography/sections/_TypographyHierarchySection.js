import React from 'react';
import PT from 'prop-types';

import {
    Normaltekst,
    Innholdstittel
} from './../../../../../../packages/node_modules/nav-frontend-typografi';

import { TypographyHierarchyData as samples } from '../../../../data/index';
import SectionTitle from './../../../components/section-title/SectionTitle';

const TypographyHierarchySection = (props) => {
    const renderDescription = () => (
        <div className="description">
            <Normaltekst>
                Hierarkiet er inspirert av typografisk tradisjon hvor man gir en bestemt størrelse i en font et
                bestemt navn. Intensjonen med dette er å etablere et felles domene som vi kan bruke på tvers av
                roller og spesialiteter, hvor alle får en felles referanse til de ulike størrelsene.
            </Normaltekst>
        </div>
    );

    const renderSamples = (data) => (
        <div>
            {
                data.map((sample) => (
                    <Sample
                        component={sample.component}
                        label={sample.label}
                        desktopText={sample.desktopText}
                        mobileText={sample.mobileText}
                        key={sample.label}
                    />
                ))
            }
        </div>
    );

    return (
        <div {... props} className="typographyHierarchySection wrapper">
            <Innholdstittel>Typografisk Hierarki</Innholdstittel>
            <hr/>

            { renderDescription() }

            <div className="typographyHierarchySection__hierarchySamples">
                { renderSamples(samples) }
            </div>
        </div>
    );
};

const Sample = (props) => (
    <div className="typographyHierarchySection__sample">
        <props.component>{props.label}</props.component>
        <span><strong>Desktop:</strong> {props.desktopText}</span>
        <span><strong>Mobil:</strong> {props.mobileText}</span>
    </div>
);

Sample.propTypes = {
    label: PT.string.isRequired,
    desktopText: PT.string.isRequired,
    mobileText: PT.string.isRequired
};

export default TypographyHierarchySection;
