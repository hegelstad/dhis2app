import { TREELIST_CURSOR_SET, TREELIST_DATA_SET } from '../actions/actions';

const initialState = {
    cursor: {},
    treeData: {}
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
        default:
            return state
    }
}
