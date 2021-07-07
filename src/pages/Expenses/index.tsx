import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList, ActivityIndicator } from 'react-native';

import Header from '../../components/Header';
import { Expense, ExpenseProps } from '../../components/Expense';
import api from '../../services/api';
import Button from '../../components/Button';

import { Container, Content } from './styles';

const Expenses: React.FC = () => {
  const [expenseList, setExpenseList] = useState<ExpenseProps[]>([]);
  const [loading, setLoading] = useState(true);

  const { navigate } = useNavigation();

  useEffect(() => {
    async function getExpenses(): Promise<void> {
      const response = await api.get("/expenses");

      setExpenseList(response.data);
      setLoading(false);
    }

    getExpenses();
  }, []);

  function handleExpenseDetail(expenseSelected: ExpenseProps) {
    navigate("ExpenseDetail", { expenseSelected });
  }

  return (
    <Container>
      <Header>Despesas</Header>
      <Content>
        <Button loading={false} onPress={() => handleExpenseDetail({} as ExpenseProps)}>Nova despesa</Button>
        {loading ? <ActivityIndicator size="large" color="#666" /> : <></>}
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
