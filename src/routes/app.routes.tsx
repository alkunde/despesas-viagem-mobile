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
import ExpensesToTravel from '../pages/ExpensesToTravel';
import SettingsScreen from '../pages/SettingsScreen';
import CategoriesScreen from '../pages/CategoriesScreen';
import CategoryDetail from '../pages/CategoryDetail';
import CostCenterListScreen from '../pages/CostCenterListScreen';
import CostCenterDetail from '../pages/CostCenterDetail';
import LedgerAccountListScreen from '../pages/LedgerAccountListScreen';
import LedgerAccountDetail from '../pages/LedgerAccountDetail';
import UserListScreen from '../pages/UserListScreen';

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
    <App.Screen name="ExpensesToTravel" component={ExpensesToTravel} />
    <App.Screen name="SettingsScreen" component={SettingsScreen} />
    <App.Screen name="CategoriesScreen" component={CategoriesScreen} />
    <App.Screen name="CategoryDetail" component={CategoryDetail} />
    <App.Screen name="CostCenterListScreen" component={CostCenterListScreen} />
    <App.Screen name="CostCenterDetail" component={CostCenterDetail} />
    <App.Screen name="LedgerAccountListScreen" component={LedgerAccountListScreen} />
    <App.Screen name="LedgerAccountDetail" component={LedgerAccountDetail} />
    <App.Screen name="UserListScreen" component={UserListScreen} />
  </App.Navigator>
)

export default AppRoutes;
