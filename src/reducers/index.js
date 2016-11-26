import { combineReducers } from 'redux';
import ErrorReducer from './errorReducer';
import ToggleReducer from './toggleReducer';
import TreelistReducer from './treelistReducer';
import TEIReducer from './teiReducer';

const rootReducer = combineReducers({
    error: ErrorReducer,
    isToggled: ToggleReducer,
    tree: TreelistReducer,
    tei: TEIReducer
});

export default rootReducer;
