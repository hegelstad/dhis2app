import { SET_APPLICATION_MODE, ApplicationModes } from '../actions/actions';

const initialState = {
    applicationMode: ApplicationModes.SINGLETON_MODE,
}

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_APPLICATION_MODE:
            return Object.assign({}, state, {
                applicationMode: action.mode
            });
        default:
            return state
    }
}
