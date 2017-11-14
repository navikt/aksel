import React from 'react';

import {
    InformationHierarchySection,
    SourceSansProSection,
    TypographyHierarchySection,
    WeightCombinationsSection
} from './sections';

import './styles.less';

const TypographyPage = () => (
    <div className="typographyPage">

        <SourceSansProSection />
        <TypographyHierarchySection className="wrapper wrapper--extra" />
        <InformationHierarchySection className="wrapper" />
        <WeightCombinationsSection className="wrapper" />

    </div>
);

export default TypographyPage;
