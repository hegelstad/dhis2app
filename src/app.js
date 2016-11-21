import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import DevTools from './utils/ReduxDevTools';
import thunk from 'redux-thunk';
import reducers from './reducers';
import App from './components/App';

const isProduction = process.env.NODE_ENV === 'production';

let store;

if (isProduction) {
    store = createStore(reducers, applyMiddleware(thunk));
} else {
    const enhancer = compose(
        applyMiddleware(thunk),
        DevTools.instrument()
    );

    store = createStore(reducers, enhancer);
}

// Render the App component into the .app element
render(
    <Provider store={store}>
        <div>
            <App />
            { !isProduction && <DevTools /> }
        </div>
    </Provider>,
    document.querySelector('.app')
);
