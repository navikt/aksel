import React from 'react';

import {
    InformationHierarchySection,
    SourceSansProSection,
    TypographyHierarchySection,
    WeightCombinationsSection
} from './sections';

import './styles.less';

export class TypographyPage extends React.Component {

    render () {
        return (
            <div className="typographyPage">

                <SourceSansProSection />
                <TypographyHierarchySection className="wrapper wrapper--extra" />
                <InformationHierarchySection className="wrapper" />
                <WeightCombinationsSection className="wrapper" />

            </div>
        );
    }

}