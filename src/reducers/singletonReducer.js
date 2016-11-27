import { SINGLETON_DATA_ELEMENTS_SET, SINGLETON_EVENTS_SET } from '../actions/actions';

export default function(state = { dataElements: [], events: [] }, action) {
    switch (action.type) {
        case SINGLETON_DATA_ELEMENTS_SET:
            return Object.assign({}, state, {
                dataElements: action.dataElements
            })
        case SINGLETON_EVENTS_SET:
            return Object.assign({}, state, {
                events: action.singletonEvents
            })
        default:
            return state
    }
}
