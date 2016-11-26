import { MODE_TOGGLE } from '../actions/actions';

export default function(state = false, action) {
    switch (action.type) {
        case MODE_TOGGLE:
            return !state;
        default:
            return state;
    }
}
