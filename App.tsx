import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/redux';
import { Main } from './src/containers';

import { Colors } from 'react-native/Libraries/NewAppScreen';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={Colors.darker}>
        <Main />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
