import { combineReducers } from 'redux';
import ToggleReducer from './toggleReducer';
import TreelistReducer from './treelistReducer';

const reducers = combineReducers({
    isToggled: ToggleReducer,
    tree: TreelistReducer
});

export default reducers;
