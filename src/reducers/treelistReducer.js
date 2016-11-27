import { TREELIST_CURSOR_SET, TREELIST_DATA_SET, TREELIST_ERROR_SET, TREELIST_ERROR_CLEAR } from '../actions/actions';

const initialState = {
    treeData: {},
    error: false
}

export default function(state = initialState, action) {
    switch (action.type) {
        case TREELIST_CURSOR_SET:
            return Object.assign({}, state, {
                cursor: action.cursor
            });
        case TREELIST_DATA_SET:
            return Object.assign({}, state, {
                treeData: action.treeData.organisationUnits
            });
        case TREELIST_ERROR_SET:
            return Object.assign({}, state, {
                error: true
            });
        case TREELIST_ERROR_CLEAR:
            return Object.assign({}, state, {
                error: false
            });
        default:
            return state
    }
}
