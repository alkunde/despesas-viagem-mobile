import 'react-native-gesture-handler';

import React from 'react';
import { View, StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AppProvider from './hooks';
import Routes from './routes';

const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#3f88c5" barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppProvider>
        <View style={{ flex: 1 }}>
          <Routes />
        </View>
      </AppProvider>
    </NavigationContainer>
  )
};

export default App;
