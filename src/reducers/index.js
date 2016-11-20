import { combineReducers } from 'redux';
import ApplicationModeReducer from './applicationModeReducer';

const dhisApp = combineReducers({
    applicationMode: ApplicationModeReducer
});

export default dhisApp;
