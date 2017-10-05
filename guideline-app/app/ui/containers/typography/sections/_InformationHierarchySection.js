import React from 'react';
import PT from 'prop-types';
import {
    Row,
    Column
} from './../../../../../../packages/node_modules/nav-frontend-grid';

import { InformationHierarchyData as samples } from '../../../../data/index';
import SectionTitle from './../../../components/section-title/SectionTitle';

const InformationHierarchySection = (props) => (
    <div {... props}>
        <SectionTitle title="Informasjonshierarki" />
        <div className="informationHierarchySection">
            {
                samples.map(
                    (sample, index) => (
                        <Sample
                            component={sample.component}
                            content={sample.content}
                            key={index} // eslint-disable-line react/no-array-index-key
                        />
                    )
                )
            }
        </div>
    </div>
);

export const Sample = (props) => (
    <Row>
        <Column xs="6">
            <props.component>
                { props.content }
            </props.component>
        </Column>
    </Row>
);

Sample.propTypes = {
    content: PT.string.isRequired
};

export default InformationHierarchySection;
