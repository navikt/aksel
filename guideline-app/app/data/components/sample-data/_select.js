import React from 'react';

import { // eslint-disable-line import/no-extraneous-dependencies
    Select
} from 'NavFrontendModules/nav-frontend-skjema'; // eslint-disable-line import/extensions, import/no-unresolved

import {
    createSampleData,
    newType,
    newMultipleChoiceModifier
} from './../sampleDataHelper';

const options = [
    { value: 'norge', label: 'Norge' },
    { value: 'sverige', label: 'Sverige' },
    { value: 'danmark', label: 'Danmark' }
];

const optionChildren = () => options.map((option) =>
    (<option value={option.value} key={option.value}>{ option.label }</option>)
);

const selectSizes = ['fullbredde', 'XS', 'S', 'L', 'XL', 'XXL'];

const types = selectSizes.map((selectSize) => {
    const attrs = { label: 'Hvilket land er best om sommeren?', bredde: selectSize.toLowerCase() };
    return newType(Select, selectSize, optionChildren(), attrs);
});
const modifiers = [
    newMultipleChoiceModifier('disabled', 'Disabled'),
    newMultipleChoiceModifier({
        feil: {
            feilmelding: 'Her ble det feil altså.'
        }
    }, 'Med feil')
];

export default createSampleData(types, modifiers);
