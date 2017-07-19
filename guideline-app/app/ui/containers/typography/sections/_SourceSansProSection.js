import React from 'react';

import {
    Row,
    Column
} from 'nav-frontend-grid';

import { Normaltekst } from 'nav-frontend-typografi';

import { SourceSansProData as samples } from '../../../../data/index';
import { SectionTitle } from './../../../components/section-title/SectionTitle';

export const _SourceSansProSection = (props) => {
    const renderSamples = () => {
        return (
            <div { ... props }>
                {
                    samples.map((sample) => {
                      return (
                          <Sample
                              label={ sample.label }
                              type={ sample.type }
                              key={ sample.type }
                          />
                      )
                    })
                }
            </div>
        )
    };

    return (
        <div>
            <SectionTitle title="Source Sans Pro" />

            <Row>
                <Column xs="4">
                    <h1 className="sourceSansProSection__bigLetters">Aa</h1>

                    <div className="sourceSansProSection__samplesWrapper">
                        { renderSamples() }
                    </div>
                </Column>

                <Column xs="8">
                    <div className="description">
                        <Normaltekst>
                            Source Sans Pro was designed by Paul D. Hunt under the guidance of Robert Slimbach. It was Adobe's first open source typeface family, conceived primarily as a typeface for user interfaces. Source Sans Pro draws inspiration from the clarity and legibility of twentieth-century American gothic typeface designs. Distilling the best archetypical qualities of these models, Paul followed a rational design approach by simplifying glyph shapes by paring them to their essential form. However, in order to more easily differentiate similar letter shapes (such as uppercase I and lowercase L), some additional details have been added. Besides providing such explicitly clarity in short text strings, another fundamental design consideration was to create a typeface that reads well in extended settings. This can be seen in the general proportions: Source Sans Pro has been designed with a more generous width than many other comparable gothics, and its shorter majuscule letters, combined with minuscule letters with longer extenders, create a more pleasant reading texture in longer text passages - adobe.com
                        </Normaltekst>
                    </div>

                    <div className="description" style={{ marginTop: '70px' }}>
                        <Normaltekst>
                            Source Sans Pro kommer i 12 vekter, fra Extra Light til Black. Vi bruker hovedsaklig 4 av disse vektene:
                        </Normaltekst>
                    </div>

                    <SampleWithDescription
                        label="Bold"
                        type="bolder"
                        description="Brukes ved for å gjøre scanning av teksten letere, som regler brukt på tittler og tekst elementer som skal fremheves"
                    />

                    <SampleWithDescription
                        label="Regular"
                        type="regular"
                        description="Vekten brukes til brødtekst og i alle enkleste tekst visninger"
                    />

                    <SampleWithDescription
                        label="Italic"
                        type="light italic"
                        description="Brukes ved feilmeldinger og for å visualisere input fra brukeren, 'brukerenstemme'."
                    />
                </Column>
            </Row>
        </div>
    )
};

const Sample = (props) => {
    const getClassList = () => {
        return 'sample ' + props.type;
    };

    return (
        <div className="sourceSansProSection__samples">
            <span className={ getClassList() }>{ props.label }</span>
            <span className={ getClassList().concat(' italic') }>{ props.label }</span>
        </div>
    )
};

const SampleWithDescription = (props) => {
    return (
        <div className="description">
            <span className={ 'sample ' + props.type }>
                { props.label }
            </span>
            <Normaltekst>
                { props.description }
            </Normaltekst>
        </div>
    )
}