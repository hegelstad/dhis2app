import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import dhisApp from './reducers';
import App from './components/App';

const initialState = {
    applicationMode: "SINGLETON_MODE"
}

const store = createStore(dhisApp, initialState);

// Render the App component into the .app element
render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('.app')
);
