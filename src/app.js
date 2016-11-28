import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import DevTools from './utils/ReduxDevTools';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import AppContainer from './containers/AppContainer';

const isProduction = process.env.NODE_ENV === 'production';

let store;

if (isProduction) {
    store = createStore(rootReducer, applyMiddleware(thunk));
} else {
    const enhancer = compose(
        applyMiddleware(thunk),
        DevTools.instrument()
    );
    store = createStore(rootReducer, enhancer);
}

// Render the AppContainer into the .app element
render(
    <Provider store={store}>
        <div>
            <AppContainer />
            { !isProduction && <DevTools /> }
        </div>
    </Provider>,
    document.querySelector('.app')
);
