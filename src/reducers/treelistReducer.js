import { TREELIST_CURSOR_SET, TREELIST_DATA_SET } from '../actions/actions';

const initialState = {
    cursor: {},
    treeData: {
        name: 'root',
        toggled: true,
        children: [
            {
                id: "123",
                name: "Nikolai",
                toggled: true,
                children: [
                    {
                        active: true,
                        id: "1234",
                        name: "bo"
                    },
                    {
                        id: "12345",
                        name: "bombali"
                    }
                ]
            }
        ]
    }
}

export default function(state = initialState, action) {
    switch (action.type) {
        case TREELIST_CURSOR_SET:
            return Object.assign({}, state, {
                cursor: action.cursor
            });
        case TREELIST_DATA_SET:
            return Object.assign({}, state, {
                treeData: action.treeData
            });
        default:
            return state
    }
}
