import * as types from './../constants/ActionTypes';

export const sampleModifierChange = (value) => ({
    type: types.ACTIVE_MODIFIER_CHANGE,
    value
});
export const sampleMultipleChoiceModifierChange = (value) => ({
    type: types.ACTIVE_MULTIPLE_CHOICE_MODIFIER_CHANGE,
    value
});
export const sampleTypeChange = (value) => ({
    type: types.ACTIVE_TYPE_CHANGE,
    value
});
export const activeRefChange = (value) => ({
    type: types.ACTIVE_REF_CHANGE,
    value
});