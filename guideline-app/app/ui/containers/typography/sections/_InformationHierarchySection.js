import React from 'react';

import {
    Row,
    Column
} from 'nav-frontend-grid';

import { InformationHierarchyData as samples } from '../../../../data/index';
import { SectionTitle } from './../../../components/section-title/SectionTitle';

export const _InformationHierarchySection = (props) => {
    return (
        <div { ... props }>
            <SectionTitle title="Informasjonshierarki" />
            <div className="informationHierarchySection">
                {
                    samples.map((sample, index) => {
                        return (
                            <Sample
                                component={ sample.component }
                                content={ sample.content }
                                key={ index }
                            />
                        );
                    })
                }
            </div>
        </div>
    )
};

export const Sample = (props) => {
    return (
        <Row>
            <Column xs="6">
                <props.component>
                    { props.content }
                </props.component>
            </Column>
        </Row>
    )
};