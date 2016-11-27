import { combineReducers } from 'redux';
import ErrorReducer from './errorReducer';
import ToggleReducer from './toggleReducer';
import TreelistReducer from './treelistReducer';
import TEIReducer from './teiReducer';
import ProgramDataReducer from './ProgramDataReducer';

const rootReducer = combineReducers({
    error: ErrorReducer,
    isToggled: ToggleReducer,
    tree: TreelistReducer,
    tei: TEIReducer,
    programData: ProgramDataReducer
});

export default rootReducer;
