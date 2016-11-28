import { PROGRAM_DATA_SET,
         PROGRAM_CURSOR_SET } from '../actions/actions';

const initialState = {
    data: {},
    cursor: {
        displayName: "",
        id: ""
    }
}

export default function(state = initialState, action) {
    switch (action.type) {
        case PROGRAM_DATA_SET:
            return Object.assign({}, state, {
                data: action.programData
            })
        case PROGRAM_CURSOR_SET:
            return Object.assign({}, state, {
                cursor: action.program
            })
        default:
            return state
    }
}
