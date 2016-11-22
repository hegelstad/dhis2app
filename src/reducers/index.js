import { combineReducers } from 'redux';
import ErrorReducer from './errorReducer';
import ToggleReducer from './toggleReducer';
import TreelistReducer from './treelistReducer';

const rootReducer = combineReducers({
    error: ErrorReducer,
    isToggled: ToggleReducer,
    tree: TreelistReducer
});

export default rootReducer;
