import React, { useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { FlatList, Alert, ActivityIndicator } from 'react-native';

import Header from '../../components/Header';
import Button from '../../components/Button';
import { Expense, ExpenseProps } from '../../components/Expense';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import { Container, Content } from './styles';

const Expenses: React.FC = () => {
  const [expenseList, setExpenseList] = useState<ExpenseProps[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const { navigate } = useNavigation();

  useFocusEffect(
    useCallback(() => {
      loadExpenses()
    }, [])
  );

  const loadExpenses = useCallback(async () => {
    try {
      setLoading(true);
      const { id } = user;
      const response = await api.get(`/expenses/users/${id}`);

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

  function handleExpenseDetail(expenseSelected: ExpenseProps) {
    navigate("ExpenseDetail", { expenseSelected });
  }

  return (
    <Container>
      <Header>Despesas</Header>
      <Content>
        <Button
          loading={false}
          onPress={() => handleExpenseDetail({} as ExpenseProps)}
        >
          Nova despesa
        </Button>
        { loading && <ActivityIndicator style={{ marginTop: 16 }} size="large" color="#666" /> }
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

export default Expenses;
