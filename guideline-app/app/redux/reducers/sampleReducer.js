import * as types from './../constants/ActionTypes';

const initialState = {
    activeMultipleChoiceModifiers: [],
    activeComponent: null
};

export function sample(state = initialState, action) {
    switch (action.type) {
        case types.ACTIVE_MODIFIER_CHANGE:
            return Object.assign({}, {
                ... state,
                activeModifier: action.value
            });

        case types.ACTIVE_COMPONENT_CHANGE:
            let multipleChoiceModifiers = state.activeMultipleChoiceModifiers;
            if (action.value.resetModifiers === true) {
                multipleChoiceModifiers = [];
            }

            return Object.assign({}, {
                ... state,
                activeComponent: action.value.component,
                activeMultipleChoiceModifiers: multipleChoiceModifiers
            });

        case types.ACTIVE_MULTIPLE_CHOICE_MODIFIER_CHANGE:
            const indexOfValue = state.activeMultipleChoiceModifiers.indexOf(action.value);
            if (indexOfValue > -1) {
                return Object.assign({}, {
                    ... state,
                    activeMultipleChoiceModifiers:
                        state.activeMultipleChoiceModifiers.filter((el) => el !== action.value)
                });
            }

            return Object.assign({}, state, {
                activeMultipleChoiceModifiers: state.activeMultipleChoiceModifiers.concat([ action.value ])
            });

        default:
            return state;
    }
}