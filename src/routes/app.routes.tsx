import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import Expenses from '../pages/Expenses';
import Travels from '../pages/Travels';
import ExpenseDetail from '../pages/ExpenseDetail';
import TravelDetail from '../pages/TravelDetail';
import TravelExpenses from '../pages/TravelExpenses';
import Approvals from '../pages/Approvals';
import ApprovalDetail from '../pages/ApprovalDetail';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator screenOptions={{
    headerShown: false,
    cardStyle: { backgroundColor: "#3f88c5" }
  }}>
    <App.Screen name="Dashboard" component={Dashboard} />
    <App.Screen name="Expenses" component={Expenses} />
    <App.Screen name="Travels" component={Travels} />
    <App.Screen name="Approvals" component={Approvals} />
    <App.Screen name="ExpenseDetail" component={ExpenseDetail} />
    <App.Screen name="TravelDetail" component={TravelDetail} />
    <App.Screen name="ApprovalDetail" component={ApprovalDetail} />
    <App.Screen name="TravelExpenses" component={TravelExpenses} />
  </App.Navigator>
)

export default AppRoutes;
