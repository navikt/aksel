import * as types from './../constants/ActionTypes';

const initialState = {
    bgColor: false
};

function sample(state = initialState, action) {
    switch (action.type) {
        case types.BG_COLOR_CHANGE: {
            return Object.assign({}, { ...state }, {
                bgColor: action.value
            });
        }
        default:
            return state;
    }
}

export default sample;
