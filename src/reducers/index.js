import { combineReducers } from 'redux';
import ErrorReducer from './errorReducer';
import ToggleReducer from './toggleReducer';
import TreelistReducer from './treelistReducer';
import TEIReducer from './teiReducer';
import ProgramDataReducer from './programReducer';
import SingletonReducer from './singletonReducer';


const rootReducer = combineReducers({
    error: ErrorReducer,
    isToggled: ToggleReducer,
    tei: TEIReducer,
    tree: TreelistReducer,
    program: ProgramDataReducer,
    singleton: SingletonReducer
});

export default rootReducer;
