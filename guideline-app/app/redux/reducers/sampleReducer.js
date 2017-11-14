import * as types from './../constants/ActionTypes';

const initialState = {
    activeMultipleChoiceModifiers: [],
    activeType: {
        component: null
    },
    activeRef: null
};

function sample(state = initialState, action) {
    switch (action.type) {
        case types.ACTIVE_MODIFIER_CHANGE: {
            return Object.assign({}, {
                ...state,
                activeModifier: action.value
            });
        }

        case types.ACTIVE_TYPE_CHANGE: {
            let multipleChoiceModifiers = state.activeMultipleChoiceModifiers;
            if (action.value.resetModifiers === true) {
                multipleChoiceModifiers = [];
            }

            return Object.assign({}, {
                ...state,
                activeType: action.value.type,
                activeMultipleChoiceModifiers: multipleChoiceModifiers
            });
        }

        case types.ACTIVE_MULTIPLE_CHOICE_MODIFIER_CHANGE: {
            const indexOfValue = state.activeMultipleChoiceModifiers.indexOf(action.value);
            if (indexOfValue > -1) {
                return Object.assign({}, {
                    ...state,
                    activeMultipleChoiceModifiers:
                        state.activeMultipleChoiceModifiers.filter((el) => el !== action.value)
                });
            }

            return Object.assign({}, state, {
                activeMultipleChoiceModifiers: state.activeMultipleChoiceModifiers.concat([action.value])
            });
        }

        case types.ACTIVE_REF_CHANGE: {
            return Object.assign({}, { ...state }, {
                activeRef: action.value
            });
        }

        default:
            return state;
    }
}

export default sample;
