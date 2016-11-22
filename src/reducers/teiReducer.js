import { TEI_DATA_SET } from '../actions/actions';

export default function(state = [], action) {
    switch (action.type) {
        case TEI_DATA_SET:
            return action.TEIData
        default:
            return state
    }
}
