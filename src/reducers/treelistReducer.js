import { TREELIST_CURSOR_SET, TREELIST_DATA_FETCHING, TREELIST_DATA_SET } from '../actions/actions';

const initialState = {
    cursor: {},
    treeData: {},
    treeDataIsLoading: true
}

export default function(state = initialState, action) {
    switch (action.type) {
        case TREELIST_CURSOR_SET:
            return Object.assign({}, state, {
                cursor: action.cursor
            });
        case TREELIST_DATA_FETCHING:
            return Object.assign({}, state, {
                treeDataIsLoading: true
            })
        case TREELIST_DATA_SET:
            return Object.assign({}, state, {
                treeDataIsLoading: false,
                treeData: action.treeData.organisationUnits
            });
        default:
            return state
    }
}
