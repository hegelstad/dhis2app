import { ERROR_SET, ERROR_CLEAR } from '../actions/actions';

export default function(state = null, action) {
    switch (action.type) {
        case ERROR_SET:
            return action.message;
        case ERROR_CLEAR:
            return null;
        default:
            return state;
    }
}
