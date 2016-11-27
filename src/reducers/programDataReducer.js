import { PROGRAM_DATA_SET } from '../actions/actions';

export default function(state = {}, action) {
    switch (action.type) {
        case PROGRAM_DATA_SET:
            return action.programData
        default:
            return state
    }
}
