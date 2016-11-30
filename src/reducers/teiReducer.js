import { TEI_DUPLICATE_DATA_SET,
         TEI_DUPLICATE_DATA_REMOVE,
         TEI_DUPLICATE_SEARCHING } from '../actions/actions';

export default function(state = [], action) {
    switch (action.type) {
        case TEI_DUPLICATE_DATA_SET:
            return Object.assign({}, state, {
                searching: false,
                duplicates: action.duplicates
            })
        case TEI_DUPLICATE_DATA_REMOVE:
            return Object.assign({}, state, {
                duplicates: null
            })
        case TEI_DUPLICATE_SEARCHING:
            return Object.assign({}, state, {
                searching: true
            })
        default:
            return state
    }
}
