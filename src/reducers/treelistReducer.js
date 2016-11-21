import { TREELIST_CURSOR_SET, TREE_DATA_LOAD_AND_SET } from '../actions/actions';

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
        case TREE_DATA_LOAD_AND_SET:
            return Object.assign({}, state, {
                treeData: action.treeData
            });
        default:
            return state
    }
}
