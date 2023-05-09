/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {NativeBaseProvider} from 'native-base';
import { Store , persistor} from './src/redux/auth/Store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';




export default function Root() {
    return (
      <>

<Provider store={Store}>
        <PersistGate loading={null} persistor={persistor}>
          <NativeBaseProvider>
            <App />
          </NativeBaseProvider>
        </PersistGate>
      </Provider>
      </>
    );
  }

AppRegistry.registerComponent(appName, () => Root);
