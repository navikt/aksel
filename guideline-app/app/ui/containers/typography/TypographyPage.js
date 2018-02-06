import React from 'react';

import {
    SourceSansProSection,
    TypographyHierarchySection,
    WeightCombinationsSection
} from './sections';

import './styles.less';

const TypographyPage = () => (
    <div className="typographyPage">

        <SourceSansProSection />
        <TypographyHierarchySection className="wrapper wrapper--extra" />
        <WeightCombinationsSection className="wrapper" />

    </div>
);

export default TypographyPage;
