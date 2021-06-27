import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import Expenses from '../pages/Expenses';
import Travels from '../pages/Travels';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#312e38' } }}>
    <App.Screen name="Dashboard" component={Dashboard} />
    <App.Screen name="Expenses" component={Expenses} />
    <App.Screen name="Travels" component={Travels} />
  </App.Navigator>
);

export default AppRoutes;
