import { SINGLETON_DATA_ELEMENTS_SET,
         SINGLETON_EVENTS_SET,
         SINGLETON_STARTDATE_SET,
         SINGLETON_ENDDATE_SET } from '../actions/actions';

const initialState = {
    dataElements: [],
    events: []
}

export default function(state = initialState, action) {
    switch (action.type) {
        case SINGLETON_DATA_ELEMENTS_SET:
            return Object.assign({}, state, {
                dataElements: action.dataElements
            })
        case SINGLETON_EVENTS_SET:
            return Object.assign({}, state, {
                events: action.singletonEvents
            })
        case SINGLETON_STARTDATE_SET:
            return Object.assign({}, state, {
                startDate: action.startDate
            })
        case SINGLETON_ENDDATE_SET:
            return Object.assign({}, state, {
                endDate: action.endDate
            })
        default:
            return state
    }
}
