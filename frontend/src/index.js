import ReactDOM from 'react-dom/client';
import Router from './router'
import {persistor, store} from './redux/Store'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Router />
        </PersistGate>
    </Provider>,
    
);