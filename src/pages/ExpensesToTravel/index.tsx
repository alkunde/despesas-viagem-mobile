import React, { useState, useCallback } from 'react';
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import { FlatList, Alert, ActivityIndicator } from 'react-native';

import api from '../../services/api';

import Header from '../../components/Header';
import NotFound from '../../components/NotFound';
import ServerDown from '../../components/ServerDown';
import { Expense, ExpenseProps } from '../../components/Expense';
import { TravelProps } from '../../components/Travel';

import { Container, Content } from './styles';

interface RouteParams {
  travelSelected: TravelProps;
}

const ExpensesToTravel: React.FC = () => {
  const route = useRoute();
  const routeParams = route.params as RouteParams;

  const [loading, setLoading] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [expenseList, setExpenseList] = useState<ExpenseProps[]>([]);

  const { goBack } = useNavigation();

  const loadExpenses = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/expenses/no-travel');

      setExpenseList(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setNetworkError(true);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadExpenses();
    }, []),
  );

  async function handleExpenseDetail(expenseSelected: ExpenseProps) {
    try {
      await api.patch(
        `/expenses/${expenseSelected.id}/travel/${routeParams.travelSelected.id}`,
      );
      goBack();
    } catch (err) {
      Alert.alert('Aviso', 'Falha na comunicação');
    }
  }

  return (
    <Container>
      <Header>Selecionar Despesa</Header>
      <Content>
        {loading && (
          <ActivityIndicator
            style={{ marginTop: 16 }}
            size="large"
            color="#666"
          />
        )}
        {networkError && <ServerDown />}
        {!networkError && (!expenseList || expenseList.length === 0) && (
          <NotFound />
        )}
        {!loading && !networkError && (
          <FlatList
            style={{ marginTop: 8 }}
            data={expenseList}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Expense data={item} onPress={() => handleExpenseDetail(item)} />
            )}
          />
        )}
      </Content>
    </Container>
  );
};

export default ExpensesToTravel;
