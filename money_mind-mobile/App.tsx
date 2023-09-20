import Routes from './src/Routes';
import store, {persistor} from './src/store/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

const App = (): JSX.Element => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Routes/>
            </PersistGate>
        </Provider>
    );
};

export default App;