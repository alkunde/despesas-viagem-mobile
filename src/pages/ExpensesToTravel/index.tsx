import React, { useState, useCallback } from 'react';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { FlatList, Alert, ActivityIndicator } from 'react-native';

import Header from '../../components/Header';
import Button from '../../components/Button';
import { Expense, ExpenseProps } from '../../components/Expense';
import { TravelProps } from '../../components/Travel';
import api from '../../services/api';

import { Container, Content } from './styles';

interface RouteParams {
  travelSelected: TravelProps;
}

const ExpensesToTravel: React.FC = () => {
  const route = useRoute();
  const routeParams = route.params as RouteParams;

  const [expenseList, setExpenseList] = useState<ExpenseProps[]>([]);
  const [loading, setLoading] = useState(false);

  const { goBack } = useNavigation();

  useFocusEffect(
    useCallback(() => {
      loadExpenses()
    }, [])
  );

  const loadExpenses = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get("/expenses/no-travel");

      setExpenseList(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      Alert.alert(
        'Aviso',
        'Falha na conexão'
      );
    }
  }, []);

  async function handleExpenseDetail(expenseSelected: ExpenseProps) {
    try {
      await api.put(`/expenses/${expenseSelected.id}/travel/${routeParams.travelSelected.id}`);
      goBack();
    } catch (err) {
      Alert.alert(
        'Aviso',
        'Falha na comunicação'
      );
    }
  }

  return (
    <Container>
      <Header>Selecionar Despesa</Header>
      <Content>
        <Button
          loading={false}
          onPress={() => handleExpenseDetail({} as ExpenseProps)}
        >
          Nova despesa
        </Button>
        {
          loading
            ? <ActivityIndicator style={{ marginTop: 16 }} size="large" color="#666" />
            : <></>
        }
        <FlatList
          style={{ marginTop: 8 }}
          data={expenseList}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Expense
              data={item}
              onPress={() => handleExpenseDetail(item)}
            />
          )}
        />
      </Content>
    </Container>
  );
}

export default ExpensesToTravel;
